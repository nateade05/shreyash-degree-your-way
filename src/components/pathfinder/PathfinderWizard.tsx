/* eslint-disable */
// @ts-nocheck -- verbatim port of the design's untyped logic class; typed at its boundary (Props).
'use client';
// Pathfinder, guided direction (1a): the logic class from "Pathfinder Wizard.dc.html", ported as a
// React class component. Production changes are marked PORT:.
import React from 'react';
import PF from '@/lib/pathfinderEngine';
import { saveLead } from '@/lib/leads';
import PathfinderWizardView from './PathfinderWizardView';
import { SAVE_KEY, loadSaved, clearSaved } from './progress';

type Props = {
  startStep?: string;
  useAI?: boolean;
  autoAdvance?: boolean;
  framed?: boolean;
  knownLead?: { name: string; email: string; phone: string } | null;
  onExit?: () => void;
  onCourse?: () => void;
};

// Steps: 0 intro, 1..N questions (N depends on the path), then these two.
const BUILD = 100, REPORT = 101;
// Time per line on the "Building your report" screen.
const BUILD_MS = 800;

const poss = name => name + (/s$/.test(name) ? '\'' : '\'s');

export default class PathfinderWizard extends React.Component<Props, any> {
  [k: string]: any;
  scRef = React.createRef(); screenRef = React.createRef(); headRef = React.createRef();
  // PORT: the engine is an imported module, so it's always ready.
  state = { pf: true, step: 0, p: PF.blank(), rep: null, ai: 'rules', build: 0, buildSteps: [], maxHit: false };

  componentDidMount() {
    if (!this.props.startStep) this.restore();
    this.applyStart();
    this.onKey = e => this.handleKey(e);
    if (!this.props.framed) window.addEventListener('keydown', this.onKey);
  }
  componentWillUnmount() { clearTimeout(this.t); clearTimeout(this.adv); clearInterval(this.bt); window.removeEventListener('keydown', this.onKey); }
  componentDidUpdate() {
    const prev = this._prev || { step: this.state.step, start: this.props.startStep };
    this._prev = { step: this.state.step, start: this.props.startStep };
    if (prev.start !== this.props.startStep) this.applyStart();
    this.save();
    if (prev.step !== this.state.step) {
      const el = this.screenRef.current, reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (el && el.animate && !reduce) el.animate([{ opacity: 0, transform: 'translateY(6px)' }, { opacity: 1, transform: 'none' }], { duration: 220, easing: 'cubic-bezier(0.23, 1, 0.32, 1)' });
      if (this.headRef.current) this.headRef.current.focus({ preventScroll: true });
      if (this.scRef.current) this.scRef.current.scrollTop = 0;
    }
  }
  restore() {
    const saved = loadSaved();
    if (!saved || !saved.step) return;
    // A finished report is rebuilt from the answers (no build screen, no second lead).
    if (saved.step >= BUILD) this.setState({ p: saved.p }, () => this.finish(true, true));
    else this.setState({ p: saved.p, step: saved.step === 1 ? 0 : saved.step });
  }
  save() {
    if (this.props.startStep) return; // design previews don't touch the student's progress
    const { step, p } = this.state;
    if (this._saved && this._saved.step === step && this._saved.p === p) return;
    this._saved = { step, p };
    try {
      if (step === 0) localStorage.removeItem(SAVE_KEY);
      else localStorage.setItem(SAVE_KEY, JSON.stringify({ v: 1, at: Date.now(), step: step >= BUILD ? REPORT : step, p }));
    } catch {}
  }
  applyStart() {
    const st = this.props.startStep;
    if (!st || st === 'intro') return;
    if (st === 'report') { this.setState({ p: { ...PF.DEMO } }, () => this.finish(true)); return; }
    const n = Number(String(st).replace('q', ''));
    const p = PF.blank(), D = PF.DEMO;
    PF.questionsFor(D).slice(0, n - 1).forEach(q => {
      if (q.id === 'gcse') Object.assign(p, { maths: D.maths, english: D.english, resit: D.resit });
      else if (q.id === 'subjects') Object.assign(p, { subjects: D.subjects, other: D.other });
      else if (q.id === 'grades') Object.assign(p, { grades: D.grades, sizes: D.sizes, noPred: D.noPred });
      else p[q.id] = D[q.id];
    });
    this.setState({ p, step: n });
  }

  Qs() { return PF.questionsFor(this.state.p); }
  cur() { const s = this.state.step, qs = this.Qs(); return s >= 1 && s <= qs.length ? qs[s - 1] : null; }
  setP(patch) { this.setState(s => ({ p: { ...s.p, ...patch } })); }
  go(step) { clearTimeout(this.adv); this.setState({ step, maxHit: false }); }
  need() { const q = this.cur(); return q ? !PF.answered(this.state.p, q.id) : false; }
  // Question 1 sits on the intro screen: tapping an answer starts the Pathfinder at question 2.
  pickIntro(label) {
    const q = this.Qs()[0];
    this.setP(this.patchFor(q, label));
    PF.push('quiz_start');
    this.go(2);
  }
  patchFor(q, label) {
    const p = this.state.p;
    const patch = { [q.id]: label };
    // Answers that belong to another path are cleared so they don't reach the report or the lead.
    if (q.id === 'stage') Object.assign(patch, label === 'Left school' ? { noPred: false } : { now: null, age: null });
    if (q.id === 'quals') {
      const allowed = new Set(PF.groupsFor(label).flatMap(([, list]) => list));
      patch.subjects = p.subjects.filter(s => allowed.has(s));
    }
    return patch;
  }
  pickSingle(q, label) {
    const at = this.state.step;
    this.setP(this.patchFor(q, label));
    if ((this.props.autoAdvance ?? true) && !q.note) { clearTimeout(this.adv); this.adv = setTimeout(() => { if (this.state.step === at) this.next(); }, 240); }
  }
  toggleMulti(q, label) {
    this.setState(s => {
      const cur = s.p[q.id], none = q.none || 'None yet';
      if (cur.includes(label)) return { p: { ...s.p, [q.id]: cur.filter(x => x !== label) }, maxHit: false };
      if (label === none) return { p: { ...s.p, [q.id]: [none] }, maxHit: false };
      const rest = cur.filter(x => x !== none);
      if (q.max && rest.length >= q.max) return { maxHit: true };
      return { p: { ...s.p, [q.id]: [...rest, label] }, maxHit: false };
    });
  }
  toggleSubject(label) {
    this.setState(st => { const c = st.p.subjects; return { p: { ...st.p, subjects: c.includes(label) ? c.filter(x => x !== label) : [...c, label] } }; });
  }
  setGrade(subject, grade) { this.setState(st => ({ p: { ...st.p, grades: { ...st.p.grades, [subject]: grade } } })); }
  setSize(subject, size) { this.setState(st => ({ p: { ...st.p, sizes: { ...st.p.sizes, [subject]: size } } })); }
  next() {
    const s = this.state.step;
    if (s === 0) return; // the intro starts by answering question 1
    if (this.need()) return;
    if (s < this.Qs().length) this.go(s + 1);
    else this.finish(false);
  }
  finish(instant, restored) {
    const p = this.state.p;
    if (!restored) PF.push('quiz_complete');
    const rep = PF.report(p);
    const useAi = this.props.useAI ?? true;
    // The build screen names the real checks, using this student's own top matches.
    const emps = [...new Set(rep.matches.map(m => m.emp))];
    const buildSteps = ['Checking your grades against ' + PF.SCHEMES.length + ' entry bars']
      .concat(emps[0] ? ['Checking ' + poss(emps[0]) + ' entry bar'] : [])
      .concat(emps[1] ? ['Checking when ' + emps[1] + ' opens applications'] : [])
      .concat(['Laying out your 12 months', 'Writing your advice']);
    this.setState({ rep, ai: useAi ? 'loading' : 'rules', step: instant ? REPORT : BUILD, build: 0, buildSteps });
    if (!instant) {
      clearInterval(this.bt);
      this.bt = setInterval(() => this.setState(st => { if (st.build >= st.buildSteps.length) { clearInterval(this.bt); return { step: REPORT }; } return { build: st.build + 1 }; }), BUILD_MS);
    }
    const k = this.props.knownLead;
    if (k && k.email && !restored) this.saveLead('quiz_roadmap', { name: k.name, email: k.email, phone: k.phone, ...PF.leadFields(p, rep) }).catch(() => PF.push('lead_failed'));
    if (useAi) {
      const token = (this.tok = (this.tok || 0) + 1);
      PF.aiEnhance(p, rep).then(r => { if (this.tok === token) this.setState({ rep: r, ai: 'ai' }); }).catch(() => { if (this.tok === token) this.setState({ ai: 'rules' }); });
    }
  }
  handleKey(e) {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    const t = e.target, tag = t && t.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA') return;
    if (this.state.step === 0 && /^[1-9]$/.test(e.key)) { const o = this.Qs()[0].opts[Number(e.key) - 1]; if (o) { e.preventDefault(); this.pickIntro(o); } return; }
    const q = this.cur();
    if (q && q.kind === 'single' && /^[1-9]$/.test(e.key)) { const i = Number(e.key) - 1; if (i < q.opts.length) { e.preventDefault(); this.pickSingle(q, q.opts[i]); } return; }
    if (e.key === 'Enter' && q && !(t && t.closest && t.closest('button,a'))) { e.preventDefault(); this.next(); }
  }
  // PORT: leads go through the site's one lead path (POST /api/lead), not the design's endpoint prop.
  saveLead(source, fields) { return saveLead(source, fields, 'quiz'); }

  renderVals() {
    const s = this.state;
    const base = { scRef: this.scRef, screenRef: this.screenRef, headRef: this.headRef, rootH: this.props.framed ? '100%' : '100dvh', exit: () => this.props.onExit ? this.props.onExit() : this.setState({ step: 0, p: PF.blank() }) };
    const p = s.p, step = s.step, qs = this.Qs(), N = qs.length, q = this.cur(), need = this.need();
    const isLeft = PF.left(p);
    const on = (x, a, b) => x ? a : b;
    const multi = q && q.kind === 'multi';
    const opts = q && (q.kind === 'single' || multi) ? q.opts.map(label => {
      const sel = multi ? p[q.id].includes(label) : p[q.id] === label;
      return { label: PF.LABELS[label] || label, sub: PF.SUBS[label] || '', on: sel ? 'true' : 'false', pick: () => multi ? this.toggleMulti(q, label) : this.pickSingle(q, label),
        bd: on(sel, 'var(--oxblood)', 'var(--rule)'), ring: on(sel, 'var(--oxblood)', 'transparent'), bg: on(sel, 'var(--bone)', 'var(--warm-white)'),
        radius: multi ? '6px' : '50%', tick: multi && sel, dotBd: on(sel, 'var(--oxblood)', 'var(--input-border)'), dotBg: multi && sel ? 'var(--oxblood)' : 'var(--warm-white)', dotFill: !multi && sel ? '5px' : '0px' };
    }) : [];
    const pill = sel => ({ on: sel ? 'true' : 'false', bd: on(sel, 'var(--oxblood)', 'var(--rule)'), bg: on(sel, 'var(--oxblood)', 'var(--warm-white)'), fg: on(sel, 'var(--warm-white)', 'var(--blackberry)') });
    const subs = p.subjects;
    const groups = PF.groupsFor(p.quals).map(([name, list]) => ({ name, chips: list.map(label => ({ label, isOn: subs.includes(label), ...pill(subs.includes(label)), pick: () => this.toggleSubject(label) })) }));
    // One row per picked subject: its grade, and for a BTEC its size.
    const gradeRows = p.noPred ? [] : subs.map((subj, i) => {
      const kind = PF.KIND_OF[subj] || 'a', sc = PF.SCALES[kind], g = p.grades[subj];
      const name = subj === 'Other' && p.other.trim() ? p.other.trim() : subj;
      return {
        id: 'pfw-g' + i, name, note: g ? (kind === 'a' ? 'Grade ' + g : sc.names[sc.grades.indexOf(g)]) : 'Pick a grade',
        cols: 'repeat(' + sc.grades.length + ',minmax(0,1fr))',
        cells: sc.grades.map((gr, j) => ({ label: gr, aria: name + ' ' + sc.names[j], ...pill(g === gr), pick: () => this.setGrade(subj, gr) })),
        hasSize: kind === 'btec',
        sizes: kind === 'btec' ? PF.BTEC_SIZES.map(([n, label]) => ({ label, aria: name + ': ' + label + ', the size of ' + n + ' A-level' + (n > 1 ? 's' : ''), ...pill(PF.sizeOf(p, subj) === n), pick: () => this.setSize(subj, n) })) : []
      };
    });
    const ungraded = subs.filter(x => !p.grades[x]).length;
    const gRow = (key, label) => ({ id: 'pfw-' + key, label, note: p[key] == null ? 'Pick one' : 'Grade ' + PF.Q.gcse[p[key]],
      cells: PF.Q.gcse.map((v, i) => { const sel = p[key] === i; return { label: v, aria: label + ' grade ' + v, ...pill(sel),
        font: v.length > 1 ? "'Source Sans 3',sans-serif" : "'Newsreader',serif", size: v.length > 1 ? '15px' : '22px', pick: () => this.setP({ [key]: i }) }; }) });
    const low = PF.Q.gcse.length - 1;
    const answeredN = qs.filter(x => PF.answered(p, x.id)).length;
    const counts = PF.PARTS.map((_, i) => qs.filter(x => x.part === i).length);
    const parts = PF.PARTS.map((label, i) => {
      const inPart = qs.filter(x => x.part === i), doneIn = inPart.filter(x => PF.answered(p, x.id)).length;
      return { label, fill: step >= BUILD ? '1' : String(doneIn / Math.max(1, inPart.length)), fg: q && q.part === i ? 'var(--blackberry)' : 'var(--muted)' };
    });
    const secs = q ? (N + 1 - step) * 15 : 0;
    const needText = !q ? '' : q.kind === 'subjects' ? 'Pick at least one subject' : q.kind === 'grades' ? 'Add a grade for ' + (ungraded === 1 ? 'one more subject' : ungraded + ' more subjects') : q.kind === 'gcse' ? 'Pick a grade for each' : multi ? 'Pick at least one, or ' + (q.none || 'None yet') : 'Pick one to continue';
    const worryElse = q && q.id === 'worry' && p.worry;
    const steps = s.buildSteps || [];
    return {
      ...base, ready: true,
      isIntro: step === 0, isQ: !!q, isBuilding: step === BUILD, isReport: step === REPORT, showProg: (step >= 1 && step <= N) || step === BUILD,
      introList: [
        { n: '01', t: 'Your matches, ranked', d: 'Real schemes, why each one fits and what each asks for.' },
        { n: '02', t: 'Your 12 months', d: 'What to do each month, with the windows in the right place.' },
        { n: '03', t: 'Stage by stage', d: 'Forms, tests, video interview and assessment centre.' },
        { n: '04', t: 'If it doesn\'t go to plan', d: 'The backup routes worth having ready.' }
      ],
      parts, partCols: counts.map(c => Math.max(1, c) + 'fr').join(' '), qNum: answeredN, qMax: N,
      countText: q ? 'Question ' + step + ' of ' + N + ', ' + (secs >= 60 ? 'about ' + Math.round(secs / 60) + ' min left' : 'under a minute left') : '',
      qTitle: q ? q.title : '', qHelp: q ? q.help || '' : '',
      isList: !!opts.length, opts, maxNote: s.maxHit && q && q.max ? 'You can pick up to ' + (q.max === 2 ? 'two' : q.max) + '. Untick one to change it.' : '',
      introQ: qs[0].title, introOpts: qs[0].opts.map(label => ({ label: PF.LABELS[label] || label, pick: () => this.pickIntro(label) })),
      isSubjects: !!q && (q.kind === 'subjects' || q.kind === 'grades'), showChips: !!q && q.kind === 'subjects', groups, subCount: subs.length ? subs.length + ' picked' : 'None picked', subCountFg: subs.length ? 'var(--oxblood)' : 'var(--muted)',
      showOther: subs.includes('Other'), other: p.other, setOther: e => this.setP({ other: e.target.value.slice(0, 60) }),
      showGrades: !!q && q.kind === 'grades', gradeRows,
      gradesHint: subs.some(x => PF.KIND_OF[x] === 'btec') ? 'For a Diploma or Extended Diploma, pick the grade you have most of.' : '',
      showNoPred: !isLeft, noPred: p.noPred, noPredOn: p.noPred ? 'true' : 'false', toggleNoPred: () => this.setP({ noPred: !p.noPred }),
      isGcse: !!q && q.kind === 'gcse', gcse: [gRow('maths', 'Maths'), gRow('english', 'English')],
      showResit: p.maths === low || p.english === low, resit: p.resit, resitOn: p.resit ? 'true' : 'false', toggleResit: () => this.setP({ resit: !p.resit }),
      showNote: !!worryElse, noteLabel: p.worry === 'Something else' ? 'What is it?' : 'Anything specific?', noteHint: 'Optional', note: p.worryNote, setNote: e => this.setP({ worryNote: e.target.value.slice(0, 300) }),
      buildSteps: steps.map((t, i) => { const done = s.build > i; return { t, fg: done || s.build === i ? 'var(--blackberry)' : 'var(--muted)', bd: done ? 'var(--oxblood)' : 'var(--input-border)', fill: done ? '8px' : '0px' }; }),
      rep: s.rep, prof: p, aiState: s.ai, known: this.props.knownLead || null,
      onSave: fields => this.saveLead('quiz_roadmap', { ...fields, phone: (this.props.knownLead || {}).phone || '', ...PF.leadFields(p, s.rep) }),
      onLead: (source, fields) => this.saveLead(source, { ...fields, phone: (this.props.knownLead || {}).phone || '', ...PF.leadFields(p, s.rep) }),
      restart: () => { this.tok = (this.tok || 0) + 1; clearInterval(this.bt); clearSaved(); this.setState({ step: 1, p: PF.blank(), rep: null, ai: 'rules', maxHit: false }); },
      onCourse: this.props.onCourse || null,
      showFoot: !!q, back: () => this.go(step <= 2 ? 0 : step - 1),
      need, needText, nextDis: need ? 'true' : 'false', nextOp: need ? '0.45' : '1', nextCursor: need ? 'not-allowed' : 'pointer', nextPress: need ? 'transform:none' : 'transform:scale(0.97)',
      nextLabel: step === N ? 'Build my report' : 'Next', next: () => this.next()
    };
  }

  render() {
    return <PathfinderWizardView v={this.renderVals()} />;
  }
}
