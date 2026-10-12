// Production edits applied to the views generated from the design prototype (run by port.sh).
// Each edit must find its anchor, so a design change that moves one fails loudly here.
import fs from 'node:fs';

function edit(file, list) {
  let s = fs.readFileSync(file, 'utf8');
  for (const [name, re, to] of list) {
    const before = s;
    s = s.replace(re, to);
    if (s === before) throw new Error(`${file}: edit "${name}" found nothing to change`);
  }
  fs.writeFileSync(file, s);
}

const V = 'src/components/GetInView.tsx';
const consent = (color) =>
  `<p style={{ margin: "0", fontSize: "13px", lineHeight: "1.5", color: "${color}" }}>\n` +
  `  By sending this you agree to our {" "}<a href="/privacy" target="_blank" rel="noopener" style={{ color: "inherit", textUnderlineOffset: "3px" }}>privacy policy</a>.\n` +
  `</p>`;
// Adds the consent line as the last child of the form whose onSubmit handler is `handler`.
const underForm = (handler, color) => [
  `consent under ${handler}`,
  new RegExp(`(<form onSubmit=\\{v\\.${handler}\\}[\\s\\S]*?)(\\n(\\s*)</form>)`),
  (m, body, close, ind) => `${body}\n${ind}  ${consent(color).replace(/\n/g, '\n' + ind + '  ')}${close}`,
];

edit(V, [
  // Real routes and assets instead of the prototype's in-page links.
  ['handout link', /<a href="Get In Student Handout\.dc\.html"/, '<a href={v.handoutHref}'],
  ['guide pdf', /href="assets\/get-in-parents-guide/, 'href="/assets/get-in-parents-guide'],
  ['quiz link', /<a href="#quiz"/g, '<a href="/pathfinder"'],
  ['course link', /<a href="#course"/g, '<a href="/course"'],
  ['nav links', /<button onClick=\{n\.go\} className="gi-nav"(.*?)>\n(.*?)\n(\s*)<\/button>/s, '<a href={n.href} onClick={n.go} className="gi-nav"$1>\n$2\n$3</a>'],
  ['home link', /<button onClick=\{v\.goHome\} className="gi-ghost" aria-label="DegreeYourWay, home"(.*?)<\/button>/s, '<a href="/" onClick={v.goHome} className="gi-ghost" aria-label="DegreeYourWay, home"$1</a>'],
  ['footer terms', /<button type="button" onClick=\{v\.goTerms\} className="gi-ghost"(.*?)>([\s\S]*?)<\/button>/, '<a href="/terms" onClick={v.goTermsLink} className="gi-ghost"$1>$2</a>'],
  ['footer pathfinder', /<button type="button" onClick=\{v\.goQuiz\} className="gi-ghost"(.*?)>(\s*Pathfinder\s*)<\/button>/, '<a href="/pathfinder" onClick={v.goQuizLink} className="gi-ghost"$1>$2</a>'],
  // Cookie settings link in the footer, shown when analytics is configured.
  ['cookie settings', /(\n(\s*)<a href="\/privacy" style=\{\{ color: "var\(--blackberry\)"[^\n]*\n[^\n]*\n\s*<\/a>)/,
    (m, a, ind) => `${a}\n${ind}{v.showCookieSettings ? (\n${ind}  <button type="button" onClick={v.openCookieSettings} className="gi-ghost" style={{ all: "unset", cursor: "pointer", color: "var(--blackberry)", textDecoration: "underline", textUnderlineOffset: "3px" }}>Cookie settings</button>\n${ind}) : null}`],
  // Every "Book a free call" button reports as call_booked (UPDATE-v12 §10); the section still
  // goes to the dataLayer through track().
  ['call_booked ids', /onClick=\{v\.cta\.(?!placement\})(\w+)\} data-cta="\w+"/g, 'onClick={v.cta.$1} data-cta="call_booked"'],
  // The phone booking bar hardcodes the old label in the v12 file; UPDATE-v12 §3 says every
  // primary button reads "Book a free call".
  ['mobile bar label', /(onClick=\{v\.cta\.mobile\}[^>]*>\n\s*)Reserve a place/, '$1<span className="sc-interp">{v.ctaLabel}</span>'],
  // "By sending this you agree to our privacy policy." under every form (UPDATE-v12 §8).
  underForm('submit', 'var(--muted)'),
  underForm('sendSchool', 'var(--muted)'),
  underForm('sendOffer', 'var(--on-dark-muted)'),
  underForm('unlockGuide', 'var(--muted)'),
]);

// The Pathfinder runs full screen at its own route (src/app/pathfinder), so the shell drops its quiz.
{
  let s = fs.readFileSync(V, 'utf8');
  const start = s.indexOf('{v.isQuiz ? (');
  if (start < 0) throw new Error('quiz block not found');
  const indent = s.slice(s.lastIndexOf('\n', start) + 1, start);
  const endMark = '\n' + indent + ') : null}';
  const end = s.indexOf(endMark, start);
  if (end < 0) throw new Error('end of quiz block not found');
  s = s.slice(0, start) + s.slice(end + endMark.length);
  fs.writeFileSync(V, s);
}

edit('src/components/HandoutView.tsx', [
  ['handout url', /\[Needs input: website address\]\/pathfinder/, '{v.pathfinderLabel}'],
  ['handout qr', /<image-slot[^\n]*<\/image-slot>/, '<div role="img" aria-label="QR code to the Pathfinder" style={{ width: "100%", height: "100%" }} dangerouslySetInnerHTML={{ __html: v.qrSvg }} />'],
]);
// House style: no middots or em dashes in copy. Separators become commas, ranges become "to".
for (const file of [V, 'src/components/HandoutView.tsx', 'src/components/pathfinder/PathfinderWizardView.tsx', 'src/components/pathfinder/PathfinderReportView.tsx']) {
  if (!fs.existsSync(file)) continue;
  const s = fs.readFileSync(file, 'utf8');
  fs.writeFileSync(file, s.replace(/(\d)\u2013(\d)/g, '$1 to $2').replace(/([A-Za-z]+)\u2013([A-Za-z]+)/g, '$1 to $2').replace(/ \u00b7 /g, ', ').replace(/\s*\u2014\s*/g, ', '));
}
console.log('port edits applied');
