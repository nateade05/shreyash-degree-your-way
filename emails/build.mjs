// Builds the Resend templates in templates.mjs into emails/dist:
//   <slug>.html, <slug>.txt   ready to paste into Resend, or upload with push.mjs
//   manifest.json             name, subject, variables and files for each template
//   index.html                a local preview of every email, with sample values filled in
//
//   node emails/build.mjs
//
// Site settings come from the same env vars as the site (see .env.example), with the same
// defaults as src/lib/site.ts. Set SITE_URL to the live domain before uploading.
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { TEMPLATES } from './templates.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const out = join(here, 'dist');

const SITE = (process.env.SITE_URL || 'https://degreeyourway.example').replace(/\/$/, '');
const WA = process.env.NEXT_PUBLIC_WHATSAPP || '447463870657';
const WA_DISPLAY = '0' + WA.slice(2, 6) + ' ' + WA.slice(6);
const WA_LINK = 'https://wa.me/' + WA;
const CONSTS = {
  SITE,
  WA_DISPLAY,
  WA_LINK,
  GUIDE_URL: SITE + '/assets/get-in-parents-guide-2026-27.pdf',
  CALL_FALLBACK: process.env.NEXT_PUBLIC_CAL_LINK || WA_LINK + '?text=' + encodeURIComponent('Hi, I would like to book a free call.'),
};
if (SITE.endsWith('.example')) console.warn('! SITE_URL is not set: links point at ' + SITE + '. Set it before uploading.');

const fill = s => String(s).replace(/%([A-Z_]+)%/g, (m, k) => (k in CONSTS ? CONSTS[k] : m));

// Tokens from docs/DESIGN.md. Web fonts load in Apple Mail and iOS; elsewhere the fallbacks show.
const C = {
  bone: '#F4EFE6', paper: '#FBF9F5', ink: '#30202A', body: '#51444A', accent: '#823D48',
  muted: '#716769', rule: '#D7CFC6', onDark: '#E4DCD9', onDarkMuted: '#B9AEB2',
};
const SERIF = "'Newsreader',Georgia,'Times New Roman',serif";
const SANS = "'Source Sans 3','Helvetica Neue',Helvetica,Arial,sans-serif";

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// Inline markup: [label](url) and **bold**. Text is escaped first; {{{VARS}}} pass through.
function inline(s, linkColour = C.ink) {
  return esc(s)
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (m, t, u) => `<a href="${u}" style="color:${linkColour};font-weight:600;text-decoration:underline;text-underline-offset:3px;">${t}</a>`)
    .replace(/\*\*([^*]+)\*\*/g, '<strong style="font-weight:600;">$1</strong>');
}
const plain = s => String(s).replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1 ($2)').replace(/\*\*([^*]+)\*\*/g, '$1');

function button([label, url], bg = C.accent) {
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:8px 0 28px;"><tr><td bgcolor="${bg}" style="background:${bg};border-radius:2px;">
<a href="${url}" style="display:inline-block;padding:16px 28px;font-family:${SANS};font-size:15px;line-height:20px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:${C.paper};text-decoration:none;border-radius:2px;">${esc(label)}</a>
</td></tr></table>`;
}

const P = `margin:0 0 16px;font-family:${SANS};font-size:17px;line-height:1.55;color:${C.body};`;

const html = {
  label: t => `<p style="margin:0 0 12px;font-family:${SANS};font-size:12px;line-height:16px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:${C.muted};">${inline(t)}</p>`,
  h1: t => `<h1 class="h1" style="margin:0 0 20px;font-family:${SERIF};font-size:38px;line-height:1.1;font-weight:400;letter-spacing:-0.02em;color:${C.ink};">${inline(t)}</h1>`,
  h2: t => `<h2 style="margin:32px 0 12px;font-family:${SERIF};font-size:26px;line-height:1.2;font-weight:400;letter-spacing:-0.01em;color:${C.ink};">${inline(t)}</h2>`,
  p: t => `<p style="${P}">${inline(t)}</p>`,
  small: t => `<p style="margin:0 0 16px;font-family:${SANS};font-size:15px;line-height:1.5;color:${C.muted};">${inline(t, C.muted)}</p>`,
  button,
  facts: rows => `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:8px 0 24px;border-bottom:1px solid ${C.rule};">${rows.map(([k, v]) => `<tr>
<td class="fk" valign="top" width="132" style="padding:12px 16px 12px 0;border-top:1px solid ${C.rule};font-family:${SANS};font-size:12px;line-height:22px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:${C.muted};">${esc(k)}</td>
<td valign="top" style="padding:12px 0;border-top:1px solid ${C.rule};font-family:${SANS};font-size:16px;line-height:1.45;color:${C.ink};">${inline(v)}</td>
</tr>`).join('')}</table>`,
  steps: items => `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 24px;">${items.map((t, i) => `<tr>
<td valign="top" width="40" style="padding:12px 0;border-top:${i ? 1 : 2}px solid ${i ? C.rule : C.ink};font-family:${SANS};font-size:13px;line-height:24px;font-weight:600;color:${C.accent};">0${i + 1}</td>
<td valign="top" style="padding:12px 0;border-top:${i ? 1 : 2}px solid ${i ? C.rule : C.ink};font-family:${SANS};font-size:16px;line-height:1.5;color:${C.body};">${inline(t)}</td>
</tr>`).join('')}</table>`,
  panel: ({ title, body, button: b }) => `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:8px 0 28px;"><tr><td class="panel" bgcolor="${C.ink}" style="background:${C.ink};padding:28px 28px 4px;">
<p style="margin:0 0 8px;font-family:${SERIF};font-size:24px;line-height:1.2;font-weight:400;color:${C.paper};">${inline(title)}</p>
<p style="margin:0 0 20px;font-family:${SANS};font-size:16px;line-height:1.5;color:${C.onDark};">${inline(body, C.paper)}</p>
${b ? button(b) : ''}</td></tr></table>`,
  sign: () => `<p style="margin:28px 0 0;font-family:${SANS};font-size:17px;line-height:1.5;color:${C.body};">Shreyash<br><span style="font-size:15px;color:${C.muted};">Founder, DegreeYourWay</span></p>`,
};

const text = {
  label: t => plain(t).toUpperCase(),
  h1: t => plain(t),
  h2: t => plain(t).toUpperCase(),
  p: plain,
  small: plain,
  button: ([l, u]) => `${l}: ${u}`,
  facts: rows => rows.map(([k, v]) => `${k}: ${plain(v)}`).join('\n'),
  steps: items => items.map((t, i) => `${i + 1}. ${plain(t)}`).join('\n'),
  panel: ({ title, body, button: b }) => [plain(title).toUpperCase(), plain(body), b ? `${b[0]}: ${b[1]}` : ''].filter(Boolean).join('\n'),
  sign: () => 'Shreyash\nFounder, DegreeYourWay',
};

const render = (blocks, fmt) => blocks.map(b => { const [k, v] = Object.entries(b)[0]; return fmt[k](v); });

function page(t) {
  const body = render(t.blocks, html).join('\n');
  // Padding after the preheader stops clients pulling body text into the inbox preview.
  const pad = '&#847;&zwnj;&nbsp;'.repeat(60);
  return `<!doctype html>
<html lang="en-GB">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="x-apple-disable-message-reformatting">
<meta name="color-scheme" content="light only">
<meta name="supported-color-schemes" content="light only">
<title>${esc(t.subject)}</title>
<link href="https://fonts.googleapis.com/css2?family=Newsreader:opsz,wght@6..72,400&amp;family=Source+Sans+3:wght@400;600&amp;display=swap" rel="stylesheet">
<style>
body{margin:0;padding:0;background:${C.bone};-webkit-text-size-adjust:100%;}
a{color:${C.ink};}
@media (max-width:620px){
  .wrap{width:100%!important;}
  .pad{padding-left:24px!important;padding-right:24px!important;}
  .h1{font-size:32px!important;}
  .fk{width:96px!important;}
  .panel{padding:24px 20px 4px!important;}
}
</style>
</head>
<body style="margin:0;padding:0;background:${C.bone};">
<div style="display:none;max-height:0;max-width:0;overflow:hidden;opacity:0;mso-hide:all;">${esc(t.preheader)}${pad}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${C.bone}" style="background:${C.bone};">
<tr><td align="center" style="padding:32px 12px 40px;">
<table role="presentation" class="wrap" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:600px;">
<tr><td class="pad" style="padding:0 40px 20px;">
<a href="${SITE}" style="font-family:${SERIF};font-size:24px;line-height:1;font-weight:400;letter-spacing:-0.02em;color:${C.ink};text-decoration:none;">DegreeYourWay</a>
</td></tr>
<tr><td class="pad" bgcolor="${C.paper}" style="background:${C.paper};border:1px solid ${C.rule};padding:40px 40px 44px;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 28px;"><tr><td width="40" height="3" bgcolor="${C.accent}" style="background:${C.accent};font-size:0;line-height:0;">&nbsp;</td></tr></table>
${body}
</td></tr>
<tr><td class="pad" style="padding:24px 40px 0;font-family:${SANS};font-size:13px;line-height:1.6;color:${C.muted};">
<p style="margin:0 0 8px;">DegreeYourWay, degree apprenticeship application coaching.<br>
WhatsApp <a href="${WA_LINK}" style="color:${C.muted};">${WA_DISPLAY}</a> | <a href="${SITE}" style="color:${C.muted};">Website</a> | <a href="${SITE}/privacy" style="color:${C.muted};">Privacy</a></p>
<p style="margin:0;">${esc(t.reason)}</p>
</td></tr>
</table>
</td></tr>
</table>
</body>
</html>
`;
}

function plainText(t) {
  return [
    ...render(t.blocks, text),
    '--',
    `DegreeYourWay, degree apprenticeship application coaching.\nWhatsApp ${WA_DISPLAY} | ${SITE}`,
    t.reason,
  ].join('\n\n') + '\n';
}

// Sample values for the local preview only.
const SAMPLE = {
  NAME: 'Priya', PARENT_NAME: 'Anita', STUDENT_NAME: 'Priya', PLACE: 'Founding, £595', BALANCE: '£495',
  CALL_URL: '#', RESCHEDULE_URL: '#', HANDOUT_URL: '#', CALL_TIME: 'Thursday 16 October, 6:30pm',
  CALL_LOCATION: 'Google Meet, link in your calendar invite',
  RESULT: 'Your best fit: Finance and accounting.', ALSO: 'Consulting',
  TOP_MATCHES: 'PwC Flying Start; Deloitte BrightStart; KPMG 360', TOP_MATCH: 'PwC Flying Start',
  SCHOOL: 'Hampton Sixth Form', DATES: 'Week of 3 November',
};
const sample = s => s.replace(/\{\{\{([A-Z_]+)\}\}\}/g, (m, k) => esc(SAMPLE[k] ?? m));

mkdirSync(out, { recursive: true });
const manifest = [];
const previews = [];
for (const t0 of TEMPLATES) {
  const t = JSON.parse(fill(JSON.stringify(t0)));
  const h = page(t);
  const used = new Set([...(h + t.subject).matchAll(/\{\{\{([A-Z_]+)\}\}\}/g)].map(m => m[1]));
  const declared = new Set(t.variables.map(v => v.key));
  for (const k of used) if (!declared.has(k)) throw new Error(`${t.slug}: {{{${k}}}} is used but not declared`);
  for (const k of declared) if (!used.has(k)) console.warn(`! ${t.slug}: ${k} is declared but never used`);
  // House style (docs/DESIGN.md): no middots, em dashes or exclamation marks in the copy.
  if (/[·—!]/.test(JSON.stringify(t0.blocks) + t0.subject + t0.preheader + t0.reason)) {
    throw new Error(`${t.slug}: copy contains a middot, em dash or exclamation mark`);
  }

  writeFileSync(join(out, t.slug + '.html'), h);
  writeFileSync(join(out, t.slug + '.txt'), plainText(t));
  manifest.push({ alias: t.slug, name: 'DegreeYourWay: ' + t.name, trigger: t.trigger, subject: t.subject, variables: t.variables, html: t.slug + '.html', text: t.slug + '.txt' });
  previews.push({ t, h: sample(h) });
}
writeFileSync(join(out, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n');

writeFileSync(join(out, 'index.html'), `<!doctype html><html lang="en-GB"><head><meta charset="utf-8"><title>DegreeYourWay emails</title>
<style>body{margin:0;background:#E9E3D9;font-family:${SANS};color:${C.ink}}header{padding:32px 24px 8px;max-width:1280px;margin:auto}h1{font-family:${SERIF};font-weight:400;margin:0 0 4px}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(420px,1fr));gap:24px;padding:24px;max-width:1280px;margin:auto}
.card{background:${C.paper};border:1px solid ${C.rule}}.meta{padding:16px 20px;border-bottom:1px solid ${C.rule}}.meta b{display:block;font-size:17px}.meta span{font-size:13px;color:${C.muted}}
iframe{display:block;width:100%;height:900px;border:0}</style></head><body>
<header><h1>DegreeYourWay emails</h1><p style="color:${C.muted};margin:0">${TEMPLATES.length} templates, sample values filled in. Built from emails/templates.mjs.</p></header>
<div class="grid">${previews.map(({ t, h }) => `<div class="card"><div class="meta"><b>${esc(sample(t.subject))}</b><span>${esc(t.slug)}: ${esc(t.trigger)}</span></div><iframe srcdoc="${esc(h)}" title="${esc(t.name)}"></iframe></div>`).join('')}</div>
</body></html>`);

console.log(`Built ${manifest.length} templates into ${out}`);
