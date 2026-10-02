import { getCloudflareContext } from '@opennextjs/cloudflare';
import { signHandout } from '@/lib/handoutToken';

// Every form on the site reaches this route through saveLead() (see GetInApp).
// Leads are forwarded to LEAD_WEBHOOK_URL (Google Sheets Apps Script, Zapier, Make, HubSpot…)
// and, when a LEADS KV namespace is bound, also kept in Cloudflare KV as a backup.

// Fields each form must send; anything else is optional.
const REQUIRED: Record<string, string[]> = {
  discovery_call: ['name', 'email'],
  popup_pathfinder: ['name', 'email'],
  parents_guide: ['email'],
  quiz_roadmap: ['email'],
  booking: ['email'],
  school_talk: ['school', 'name', 'email'],
  // Pathfinder CV check: the CV text (or four short answers) and the gaps found.
  cv_check: ['email'],
};
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MAX_BYTES = 24_000;
// Most fields are short; CV text from the Pathfinder CV check is allowed more room.
const LONG_FIELDS: Record<string, number> = { cv_text: 6000 };

type Env = {
  LEAD_WEBHOOK_URL?: string;
  LEADS?: { put(key: string, value: string): Promise<unknown> };
  LEAD_LIMITER?: { limit(opts: { key: string }): Promise<{ success: boolean }> };
};

const fail = (error: string, status: number) => Response.json({ ok: false, error }, { status });

// Spreadsheets run cells that start with = + - @ as formulas; store them as text instead.
// Phone numbers such as +44 7700 900123 are left alone.
const cell = (v: string) => (/^[=+\-@\t\r]/.test(v) && !/^\+[\d\s]+$/.test(v) ? "'" + v : v);

export async function POST(req: Request) {
  // Same-site forms only: browsers always send Origin on a cross-site POST.
  const origin = req.headers.get('origin');
  if (origin && new URL(origin).host !== new URL(req.url).host) return fail('bad_origin', 403);
  if (!(req.headers.get('content-type') || '').includes('application/json')) return fail('bad_type', 415);
  if (Number(req.headers.get('content-length') || 0) > MAX_BYTES) return fail('too_large', 413);

  let env: Env = {};
  try {
    env = getCloudflareContext().env as unknown as Env;
  } catch {}

  if (env.LEAD_LIMITER) {
    const ip = req.headers.get('cf-connecting-ip') || 'unknown';
    const { success } = await env.LEAD_LIMITER.limit({ key: ip });
    if (!success) return fail('rate_limited', 429);
  }

  const raw = await req.text();
  if (raw.length > MAX_BYTES) return fail('too_large', 413);
  let body: Record<string, unknown>;
  try {
    body = JSON.parse(raw);
  } catch {
    return fail('bad_json', 400);
  }
  const source = String(body?.source ?? '');
  if (!body || typeof body !== 'object' || !REQUIRED[source]) return fail('bad_source', 400);

  // Flatten to short strings so nothing odd reaches the CRM.
  const lead: Record<string, string> = {};
  for (const [k, v] of Object.entries(body).slice(0, 40)) {
    lead[k.slice(0, 40)] = cell((Array.isArray(v) ? v.join(', ') : v == null ? '' : String(v)).trim().slice(0, LONG_FIELDS[k] ?? 2000));
  }
  if (REQUIRED[source].some(k => !lead[k])) return fail('missing_fields', 422);
  if (!EMAIL.test(lead.email)) return fail('bad_email', 422);
  lead.received_at = new Date().toISOString();
  const id = crypto.randomUUID();
  lead.id = id;

  const webhook = env.LEAD_WEBHOOK_URL || process.env.LEAD_WEBHOOK_URL;
  const jobs: Promise<unknown>[] = [];
  if (env.LEADS?.put) jobs.push(env.LEADS.put(`${lead.received_at}:${source}:${id}`, JSON.stringify(lead)));
  if (webhook) {
    jobs.push(
      fetch(webhook, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(lead) }).then(async r => {
        if (!r.ok) throw new Error('webhook ' + r.status);
        // Google Apps Script always answers 200, so its verdict is in the body.
        if ((r.headers.get('content-type') || '').includes('json')) {
          const out = (await r.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
          if (out && out.ok === false) throw new Error('webhook rejected: ' + out.error);
        }
      }),
    );
  }

  // Logs carry no personal data (the site collects details of under-18s): source and id only.
  if (!jobs.length) console.warn('[lead] not stored: set LEAD_WEBHOOK_URL or bind LEADS', source, id);
  const results = await Promise.allSettled(jobs);
  const failed = results.filter(r => r.status === 'rejected').length;
  if (failed) console.error('[lead] store failures', source, id, failed, 'of', jobs.length);
  if (jobs.length && failed === jobs.length) return fail('store_failed', 502);

  const res: Record<string, unknown> = { ok: true };
  if (source === 'school_talk') {
    try {
      res.handout = '/handout?t=' + (await signHandout());
    } catch {
      console.error('[lead] handout link not issued: HANDOUT_SECRET missing');
    }
  }
  return Response.json(res);
}
