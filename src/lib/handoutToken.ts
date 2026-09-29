// Signed, expiring links to the student handout. The handout is only reachable after a school
// submits the For schools form (README: "Gate it").
const enc = new TextEncoder();
const b64url = (buf: ArrayBuffer | Uint8Array) =>
  btoa(String.fromCharCode(...new Uint8Array(buf))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

async function hmac(secret: string, data: string) {
  const key = await crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  return b64url(await crypto.subtle.sign('HMAC', key, enc.encode(data)));
}

function secret() {
  const s = process.env.HANDOUT_SECRET;
  if (!s && process.env.NODE_ENV === 'production') throw new Error('HANDOUT_SECRET is not set');
  return s || 'dev-only-handout-secret';
}

export const HANDOUT_DAYS = 30;

export async function signHandout(now = Date.now()) {
  const exp = String(Math.floor(now / 1000) + HANDOUT_DAYS * 86400);
  return exp + '.' + (await hmac(secret(), 'handout:' + exp));
}

export async function verifyHandout(token: string | undefined | null, now = Date.now()) {
  if (!token) return false;
  const [exp, sig] = token.split('.');
  if (!exp || !sig || !/^\d+$/.test(exp) || Number(exp) * 1000 < now) return false;
  const want = await hmac(secret(), 'handout:' + exp);
  if (want.length !== sig.length) return false;
  let diff = 0;
  for (let i = 0; i < want.length; i++) diff |= want.charCodeAt(i) ^ sig.charCodeAt(i);
  return diff === 0;
}
