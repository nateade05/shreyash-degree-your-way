// Uploads the built templates (emails/dist) to Resend and publishes them.
//
//   SITE_URL=https://… node emails/build.mjs
//   RESEND_API_KEY=re_… EMAIL_FROM='Shreyash at DegreeYourWay <hello@…>' EMAIL_REPLY_TO=… node emails/push.mjs
//
// Each template is created with its slug as the alias. If the alias already exists it is updated
// instead, so running this again after a copy change is safe. Add --dry-run to see what would be sent.
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const dist = join(dirname(fileURLToPath(import.meta.url)), 'dist');
const dry = process.argv.includes('--dry-run');
const key = process.env.RESEND_API_KEY;
if (!key && !dry) throw new Error('Set RESEND_API_KEY');

const manifest = JSON.parse(readFileSync(join(dist, 'manifest.json'), 'utf8'));
const html = readFileSync(join(dist, manifest[0].html), 'utf8');
if (html.includes('degreeyourway.example') && !dry) throw new Error('Links still point at degreeyourway.example. Rebuild with SITE_URL set.');

async function api(method, path, body) {
  const r = await fetch('https://api.resend.com' + path, {
    method,
    headers: { Authorization: 'Bearer ' + key, 'Content-Type': 'application/json' },
    body: body && JSON.stringify(body),
  });
  const out = await r.json().catch(() => ({}));
  return { ok: r.ok, status: r.status, out };
}

for (const t of manifest) {
  const body = {
    name: t.name,
    alias: t.alias,
    subject: t.subject,
    html: readFileSync(join(dist, t.html), 'utf8'),
    text: readFileSync(join(dist, t.text), 'utf8'),
    variables: t.variables,
    ...(process.env.EMAIL_FROM && { from: process.env.EMAIL_FROM }),
    ...(process.env.EMAIL_REPLY_TO && { reply_to: process.env.EMAIL_REPLY_TO }),
  };
  if (dry) {
    console.log(`would upload ${t.alias}: "${t.subject}" (${t.variables.map(v => v.key).join(', ')})`);
    continue;
  }
  let res = await api('POST', '/templates', body);
  if (!res.ok) {
    const { alias, ...update } = body;
    res = await api('PATCH', '/templates/' + alias, update);
  }
  if (!res.ok) {
    console.error(`✗ ${t.alias}: ${res.status} ${JSON.stringify(res.out)}`);
    continue;
  }
  const id = res.out.id || t.alias;
  const pub = await api('POST', `/templates/${id}/publish`);
  console.log(pub.ok ? `✓ ${t.alias} (${id})` : `✗ ${t.alias} uploaded but not published: ${pub.status} ${JSON.stringify(pub.out)}`);
}
