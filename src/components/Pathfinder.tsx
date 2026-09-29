'use client';
// The Pathfinder quiz (PATHFINDER_CLAUDE_CODE.md). Presentation only: answers, scoring, leads and
// analytics live in GetInApp (quizVals → `pf`), unchanged from the design's logic.
import { useEffect, useRef } from 'react';

type Row = { emp: string; scheme: string; bar: string; win: string };
type Answers = { year: string | null; quals: string | null; grades: string | null; tue: string | null; subjects: string[]; other: string; maths: number | null; english: number | null };
type SingleKey = 'year' | 'quals' | 'grades' | 'tue';

export type PathfinderModel = {
  step: number;
  furthest: number;
  need: boolean;
  reason: string;
  rail: { n: number; label: string; answer: string | null; current: boolean; enabled: boolean }[];
  Q1: string[]; Q2: string[]; Q4: string[]; Q6: string[]; Q_VALS: string[];
  groups: [string, string[]][];
  answers: Answers;
  next: () => void;
  back: () => void;
  goStep: (n: number) => void;
  pick: (key: SingleKey, label: string) => void;
  toggleSubject: (label: string) => void;
  setOther: (v: string) => void;
  setGcse: (key: 'maths' | 'english', i: number) => void;
  close: () => void;
  restart: () => void;
  courseLink: (e: React.MouseEvent) => void;
  result: null | { sector: string; standing: string; body: string; also: string; rows: Row[]; road: { n: number; when: string; what: string }[]; otherSectors: { name: string; rows: Row[] }[] };
  pdf: () => void;
  callHref: string;
  callTap: () => void;
  wall: {
    name: string; email: string; parent: string; nameErr: boolean; emailErr: boolean; fail: boolean; offline: boolean; busy: boolean; sent: boolean;
    nameRef: React.RefObject<HTMLInputElement>; emailRef: React.RefObject<HTMLInputElement>;
    setName: (v: string) => void; setEmail: (v: string) => void; setParent: (v: string) => void;
    submit: (e: React.FormEvent) => void;
  };
};

const SINGLE: Record<number, { key: SingleKey; list: keyof PathfinderModel; title: string; note?: string }> = {
  1: { key: 'year', list: 'Q1', title: 'Where are you now?' },
  2: { key: 'quals', list: 'Q2', title: 'What are you taking?' },
  4: { key: 'grades', list: 'Q4', title: 'What grades are you predicted?', note: 'Or the BTEC equivalent. D* is an A*, D is an A, M is a C.' },
  6: { key: 'tue', list: 'Q6', title: 'Which would you rather do on a Tuesday afternoon?' },
};
const STANDINGS: [string, string][] = [['not there yet', 'Not there yet'], ['a few grades short', 'A few grades short'], ['on the bar', 'On the bar']];

const Arrow = () => <span className="gi-pf-arrow" aria-hidden="true">→</span>;
const Tick = () => (
  <svg className="gi-pf-tick" viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3.5 8.5l3 3 6-7" /></svg>
);
const Lock = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="7" width="10" height="7" rx="1" /><path d="M5.5 7V5a2.5 2.5 0 015 0v2" /></svg>
);

export default function Pathfinder({ pf }: { pf: PathfinderModel }) {
  const { step } = pf;
  const screenRef = useRef<HTMLDivElement>(null);
  const anim = useRef<Animation | null>(null);
  const pfRef = useRef(pf);
  const mounted = useRef(false);
  useEffect(() => {
    pfRef.current = pf;
  });

  // Each step: fade/rise the screen in (WAAPI, so rapid Back/Next stays interruptible) and move
  // focus to the new heading. Reduced motion skips the movement; focus still moves.
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    const el = screenRef.current;
    if (!el) return;
    anim.current?.cancel();
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && el.animate) {
      anim.current = el.animate(
        [{ opacity: 0, transform: 'translateY(6px)' }, { opacity: 1, transform: 'none' }],
        { duration: 220, easing: 'cubic-bezier(0.23, 1, 0.32, 1)' },
      );
    }
    el.querySelector<HTMLElement>('#pf-h1')?.focus({ preventScroll: true });
  }, [step]);

  // Keyboard: 1–9 pick on single-choice screens; Enter runs Next unless focus is on a control.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const p = pfRef.current;
      if (e.metaKey || e.ctrlKey || e.altKey || e.shiftKey || e.repeat) return;
      const t = e.target instanceof Element ? e.target : null;
      if (t && t.closest('input, textarea, select, [contenteditable="true"], [role="dialog"]')) return;
      const single = SINGLE[p.step];
      if (single && /^[1-9]$/.test(e.key)) {
        const list = p[single.list] as string[];
        const i = Number(e.key) - 1;
        if (i < list.length) {
          e.preventDefault();
          p.pick(single.key, list[i]);
        }
        return;
      }
      if (e.key === 'Enter' && p.step >= 0 && p.step <= 6) {
        if (t && t.closest('button, a, summary')) return;
        e.preventDefault();
        p.next();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const inQuestions = step >= 1 && step <= 6;
  const showRail = step >= 1 && step <= 7;
  const a = pf.answers;
  const secondsLeft = (6 - step + 1) * 15;

  const h1 = (text: string, cls = 'gi-pf-h1') => (
    <h1 id="pf-h1" tabIndex={-1} className={cls}>
      {text}
    </h1>
  );

  let screen: React.ReactNode = null;
  if (step === 0) {
    screen = (
      <div className="gi-pf-intro" style={{ display: 'contents' }}>
        <p className="gi-pf-eyebrow">Free Pathfinder</p>
        {h1('Which degree apprenticeship fits you?')}
        <p className="gi-pf-sub">Six questions, 90 seconds. You get a roadmap PDF: the sector that fits, where your grades stand and three real schemes.</p>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 8 }}>
          <button type="button" className="gi-pf-next" onClick={pf.next}>
            Start <Arrow />
          </button>
          <p className="gi-pf-note" style={{ fontSize: 12 }}>No sign-up to start.</p>
        </div>
      </div>
    );
  } else if (SINGLE[step]) {
    const { key, list, title, note } = SINGLE[step];
    const opts = pf[list] as string[];
    screen = (
      <>
        {h1(title)}
        {note ? <p className="gi-pf-sub">{note}</p> : null}
        <div role="group" aria-labelledby="pf-h1" className="gi-pf-opts">
          {opts.map((label, i) => {
            const on = a[key] === label;
            return (
              <button key={label} type="button" aria-pressed={on} className={'gi-pf-opt' + (step === 6 ? ' is-tall' : '')} onClick={() => pf.pick(key, label)}>
                <span className="gi-pf-key" aria-hidden="true">{i + 1}</span>
                <span>{label}</span>
                <span className="gi-pf-dot" aria-hidden="true" />
              </button>
            );
          })}
        </div>
      </>
    );
  } else if (step === 3) {
    const n = a.subjects.length;
    screen = (
      <>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {h1('Pick your subjects.')}
          <p className="gi-pf-sub">Tap everything you&apos;re taking.</p>
          <p className={'gi-pf-count' + (n > 0 ? ' is-on' : '')} aria-live="polite">{n} picked</p>
        </div>
        <div className="gi-pf-groups">
          {pf.groups.map(([name, labels], gi) => (
            <div key={name} className="gi-pf-group" role="group" aria-labelledby={'pf-g' + gi}>
              <p id={'pf-g' + gi} className="gi-pf-glabel">{name}</p>
              <div className="gi-pf-chips">
                {labels.map(label => {
                  const on = a.subjects.includes(label);
                  return (
                    <button key={label} type="button" aria-pressed={on} className="gi-pf-chip" onClick={() => pf.toggleSubject(label)}>
                      {on ? <Tick /> : null}
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        {a.subjects.includes('Other') ? (
          <label className="gi-pf-field">
            What is it?
            <input className="gi-pf-in" maxLength={60} value={a.other} onChange={e => pf.setOther(e.target.value)} />
          </label>
        ) : null}
      </>
    );
  } else if (step === 5) {
    const row = (key: 'maths' | 'english', name: string) => {
      const v = a[key];
      const val = v == null ? null : pf.Q_VALS[v];
      return (
        <div className="gi-pf-gcse" role="group" aria-labelledby={'pf-' + key}>
          <div className="gi-pf-gcsehead">
            <span id={'pf-' + key} className="gi-pf-gcsename">{name}</span>
            <span className={'gi-pf-gcsehint' + (val ? ' is-set' : '')}>{val == null ? 'Pick one' : val === 'Resit' ? 'Resit' : 'Grade ' + val}</span>
          </div>
          <div className="gi-pf-cells">
            {pf.Q_VALS.map((g, i) => (
              <button key={g} type="button" aria-pressed={v === i} aria-label={g === 'Resit' ? name + ': resit' : name + ' grade ' + g} className={'gi-pf-cell' + (g === 'Resit' ? ' is-resit' : '')} onClick={() => pf.setGcse(key, i)}>
                {g}
              </button>
            ))}
          </div>
        </div>
      );
    };
    screen = (
      <>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {h1('GCSE Maths and English?')}
          <p className="gi-pf-sub">Several schemes filter on these before anyone reads your application.</p>
        </div>
        {row('maths', 'Maths')}
        {row('english', 'English')}
        <p className="gi-pf-note">Grade 4 is a standard pass. 9 is the top grade.</p>
      </>
    );
  } else if (step === 7) {
    screen = (
      <div role="status" style={{ display: 'flex', flexDirection: 'column', gap: 12, paddingTop: 32 }}>
        {h1('Building your roadmap.')}
        <p className="gi-pf-sub">Matching your answers against 18 schemes in six sectors.</p>
      </div>
    );
  } else if (step === 8 && pf.result) {
    const r = pf.result;
    const w = pf.wall;
    screen = (
      <>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <p className="gi-pf-eyebrow">Your best fit</p>
          {h1(r.sector, 'gi-pf-sector')}
          {r.standing !== 'grades not entered' ? (
            <ol className="gi-pf-meter" aria-label="Where your grades stand">
              {STANDINGS.map(([id, label]) => (
                <li key={id} aria-current={r.standing === id ? 'true' : undefined}>
                  {label}
                </li>
              ))}
            </ol>
          ) : null}
          <p className="gi-pf-sub">{r.body}</p>
          <div className="gi-pf-also">
            <span className="gi-pf-eyebrow">Also a fit</span>
            <span style={{ fontSize: 16, fontWeight: 600, color: 'var(--blackberry)' }}>{r.also}</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <h2 className="gi-pf-h2">Three schemes to aim for</h2>
          <ul className="gi-pf-schemes">
            {r.rows.map(row => (
              <li key={row.emp + row.scheme}>
                <span className="gi-pf-emp">
                  <b>{row.emp}</b> · {row.scheme}
                </span>
                {w.sent ? (
                  <>
                    <span className="gi-pf-meta">Entry bar: {row.bar}</span>
                    <span className="gi-pf-meta">Window: {row.win}</span>
                  </>
                ) : (
                  <span className="gi-pf-locked">
                    <Lock />
                    Entry bar and application window in your roadmap
                  </span>
                )}
              </li>
            ))}
          </ul>
          {w.sent ? <p className="gi-pf-note">Entry bars and dates checked 24 September 2026. Always check the employer&apos;s page.</p> : null}
        </div>

        <div className="gi-pf-panel">
          {!w.sent ? (
            <>
              <h2 className="gi-pf-h2">Your roadmap is ready.</h2>
              <p className="gi-pf-sub">Add your details to see your three schemes and download the PDF.</p>
              <form onSubmit={w.submit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div className="gi-pf-fields">
                  <label className="gi-pf-field">
                    First name
                    <input ref={w.nameRef} className="gi-pf-in" name="name" autoComplete="given-name" value={w.name} onChange={e => w.setName(e.target.value)} aria-invalid={w.nameErr} aria-describedby={w.nameErr ? 'pf-nerr' : undefined} />
                    {w.nameErr ? <span id="pf-nerr" className="gi-pf-err">Add your first name</span> : null}
                  </label>
                  <label className="gi-pf-field">
                    Your email
                    <input ref={w.emailRef} className="gi-pf-in" type="email" name="email" autoComplete="email" value={w.email} onChange={e => w.setEmail(e.target.value)} aria-invalid={w.emailErr} aria-describedby={w.emailErr ? 'pf-eerr' : undefined} />
                    {w.emailErr ? <span id="pf-eerr" className="gi-pf-err">That email doesn&apos;t look right</span> : null}
                  </label>
                  <label className="gi-pf-field">
                    A parent&apos;s email (optional)
                    <input className="gi-pf-in" type="email" name="parent" autoComplete="off" value={w.parent} onChange={e => w.setParent(e.target.value)} />
                  </label>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 8 }}>
                  <button type="submit" className="gi-btn gi-btn-ox gi-pf-send" aria-busy={w.busy} aria-disabled={w.busy}>
                    {w.busy ? 'Sending…' : 'See my roadmap'}
                  </button>
                </div>
                {w.offline ? <p role="alert" className="gi-pf-err" style={{ margin: 0 }}>You&apos;re offline. Check your connection, then press See my roadmap again.</p> : null}
                {w.fail ? <p role="alert" className="gi-pf-err" style={{ margin: 0 }}>That didn&apos;t send. Try again.</p> : null}
                <p className="gi-pf-note" style={{ fontSize: 13 }}>
                  One email. No newsletter unless you ask. By sending this you agree to our{' '}
                  <a href="/privacy" target="_blank" rel="noopener" style={{ color: 'inherit', textUnderlineOffset: 3 }}>
                    privacy policy
                  </a>
                  .
                </p>
              </form>
            </>
          ) : (
            <div role="status" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 16 }}>
              <h2 className="gi-pf-h2">Your roadmap is ready.</h2>
              <p className="gi-pf-sub">Open it and save it as a PDF. A copy is on its way to {w.email}.</p>
              <button type="button" className="gi-pf-next" onClick={pf.pdf}>
                Download my roadmap (PDF)
              </button>
            </div>
          )}
        </div>

        {w.sent ? (
          <>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <h2 className="gi-pf-h2">Your next three steps</h2>
              <ol className="gi-pf-road">
                {r.road.map(m => (
                  <li key={m.n}>
                    <span className="gi-pf-eyebrow">0{m.n}</span>
                    <span>
                      <b>{m.when}</b> {m.what}
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            <details className="gi-pf-others">
              <summary>
                Schemes in the other five sectors
                <span aria-hidden="true" className="gi-plus">+</span>
              </summary>
              <div className="gi-pf-othersbody">
                {r.otherSectors.map(sec => (
                  <div key={sec.name} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <p className="gi-pf-glabel">{sec.name}</p>
                    <ul className="gi-pf-schemes">
                      {sec.rows.map(row => (
                        <li key={row.emp + row.scheme}>
                          <span className="gi-pf-emp">
                            <b>{row.emp}</b> · {row.scheme}
                          </span>
                          <span className="gi-pf-meta">Entry bar: {row.bar}</span>
                          <span className="gi-pf-meta">Window: {row.win}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </details>

            <div className="gi-pf-call">
              <p className="gi-pf-eyebrow" style={{ color: 'var(--on-dark-label)' }}>Free discovery call · 30 minutes</p>
              <h2 className="gi-pf-h2">Talk your roadmap through with Shreyash.</h2>
              <p>Offers from Deloitte, Goldman Sachs, PwC and Accenture. Bring your roadmap, leave knowing where to apply first.</p>
              <a href={pf.callHref} target="_blank" rel="noopener" onClick={pf.callTap} className="gi-btn gi-btn-ox" style={{ alignSelf: 'flex-start' }}>
                Book my discovery call
              </a>
              <span style={{ fontSize: 13, color: 'var(--on-dark-muted)' }}>Opens WhatsApp with your result filled in.</span>
            </div>

            <div className="gi-pf-end">
              <p style={{ margin: 0, fontFamily: "'Newsreader',serif", fontStyle: 'italic', fontSize: 24, lineHeight: 1.3, color: 'var(--blackberry)' }}>
                The ones who get in have usually sat a mock first.
              </p>
              <a href="/course" onClick={pf.courseLink} className="gi-ghost" style={{ fontSize: 16, fontWeight: 600, color: 'var(--blackberry)', textUnderlineOffset: 4 }}>
                See how DegreeYourWay prepares you for every stage
              </a>
              <button type="button" className="gi-pf-restart" onClick={pf.restart}>
                Start again
              </button>
            </div>
          </>
        ) : null}
      </>
    );
  }

  const keysHint = SINGLE[step] ? `Press 1–${(pf[SINGLE[step].list] as string[]).length} to pick · Enter to continue` : 'Enter to continue';

  return (
    <section data-screen-label="05 Pathfinder" className="gi-pf">
      <div className={'gi-pf-wrap' + (showRail ? ' has-rail' : '') + (step === 8 ? ' is-wide' : '')}>
        {showRail ? (
          <aside className="gi-pf-rail" aria-label="Your answers">
            <ol className="gi-pf-railist">
              {pf.rail.map(r => (
                <li key={r.n}>
                  <button type="button" className="gi-pf-railbtn" disabled={!r.enabled || r.current} aria-current={r.current ? 'step' : undefined} onClick={() => pf.goStep(r.n)}>
                    <span className="gi-pf-railn">0{r.n}</span>
                    <span className="gi-pf-raillab">{r.label}</span>
                    <span className={'gi-pf-railans' + (r.current || !r.answer ? ' is-empty' : '')}>{r.current ? 'Answering now' : r.answer || '—'}</span>
                  </button>
                </li>
              ))}
            </ol>
            {pf.furthest >= 2 ? <p className="gi-pf-railtip">Tap an answer to change it.</p> : null}
          </aside>
        ) : null}

        <div className="gi-pf-main">
          {step <= 6 ? (
            <div className="gi-pf-top">
              <button type="button" className="gi-pf-close" onClick={pf.close}>
                Close <span aria-hidden="true">×</span>
              </button>
            </div>
          ) : null}
          {inQuestions ? (
            <div className="gi-pf-strip">
              <div className="gi-pf-segs" role="progressbar" aria-label="Pathfinder progress" aria-valuemin={0} aria-valuemax={6} aria-valuenow={step} aria-valuetext={`Question ${step} of 6`}>
                {[1, 2, 3, 4, 5, 6].map(n => (
                  <span key={n} className="gi-pf-seg">
                    <span className="gi-pf-segfill" style={{ transform: `scaleX(${n < step ? 1 : n === step ? 0.4 : 0})` }} />
                  </span>
                ))}
              </div>
              <div className="gi-pf-labels">
                <span>Question {step} of 6</span>
                <span>About {secondsLeft} seconds left</span>
              </div>
            </div>
          ) : null}

          <div ref={screenRef} className={'gi-pf-screen' + (step === 8 ? ' gi-pf-result' : '')}>
            {screen}
          </div>

          {inQuestions ? (
            <div className="gi-pf-foot">
              <div className="gi-pf-footl">
                {step >= 2 ? (
                  <button type="button" className="gi-pf-back" onClick={pf.back}>
                    <span aria-hidden="true">←</span> Back
                  </button>
                ) : null}
                <span className="gi-pf-keys">{keysHint}</span>
              </div>
              <div className="gi-pf-footr">
                {pf.need ? (
                  <p id="pf-reason" className="gi-pf-reason">
                    {pf.reason}
                  </p>
                ) : null}
                <button type="button" className="gi-pf-next" aria-disabled={pf.need} aria-describedby={pf.need ? 'pf-reason' : undefined} onClick={pf.next}>
                  {step === 6 ? 'See my result' : 'Next'} <Arrow />
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
