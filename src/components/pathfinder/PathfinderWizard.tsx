/* eslint-disable */
// @ts-nocheck -- verbatim port of the design's untyped logic class; typed at its boundary (Props).
'use client';
// Pathfinder, guided direction (1a): the logic class from "Pathfinder Wizard.dc.html", ported as a
// React class component. Production changes are marked PORT:.
import React from 'react';
import PF from '@/lib/pathfinderEngine';
import { saveLead } from '@/lib/leads';
import PathfinderWizardView from './PathfinderWizardView';

type Props = {
  startStep?: string;
  useAI?: boolean;
  autoAdvance?: boolean;
  framed?: boolean;
  knownLead?: { name: string; email: string; phone: string } | null;
  onExit?: () => void;
  onCourse?: () => void;
};

export default class PathfinderWizard extends React.Component<Props, any> {
  [k: string]: any;
  scRef = React.createRef(); screenRef = React.createRef(); headRef = React.createRef();
  // PORT: the engine is an imported module, so it's always ready.
  state = { pf: true, step: 0, p: PF.blank(), rep: null, ai: 'rules', build: 0 };

  componentDidMount() {
    this.applyStart();
    this.onKey = e => this.handleKey(e);
    if (!this.props.framed) window.addEventListener('keydown', this.onKey);
  }
  componentWillUnmount() { clearTimeout(this.t); clearTimeout(this.adv); clearInterval(this.bt); window.removeEventListener('keydown', this.onKey); }
  componentDidUpdate() {
    const prev = this._prev || { step: this.state.step, start: this.props.startStep };
    this._prev = { step: this.state.step, start: this.props.startStep };
    if (prev.start !== this.props.startStep) this.applyStart();
    if (prev.step !== this.state.step) {
      const el = this.screenRef.current, reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (el && el.animate && !reduce) el.animate([{ opacity: 0, transform: 'translateY(6px)' }, { opacity: 1, transform: 'none' }], { duration: 220, easing: 'cubic-bezier(0.23, 1, 0.32, 1)' });
      if (this.headRef.current) this.headRef.current.focus({ preventScroll: true });
      if (this.scRef.current) this.scRef.current.scrollTop = 0;
    }
  }
  applyStart() {
    const st = this.props.startStep;
    if (!st || st === 'intro') return;
    if (st === 'report') { this.setState({ p: { ...PF.DEMO } }, () => this.finish(true)); return; }
    const n = Number(String(st).replace('q', ''));
    const p = PF.blank(), keys = PF.QUESTIONS.slice(0, n - 1).map(q => q.id);
    keys.forEach(k => { if (k === 'gcse') { p.maths = PF.DEMO.maths; p.english = PF.DEMO.english; } else p[k] = PF.DEMO[k]; });
    this.setState({ p, step: n });
  }

  Qs() { return PF.QUESTIONS; }
  cur() { const s = this.state.step; return s >= 1 && s <= 11 ? this.Qs()[s - 1] : null; }
  setP(patch) { this.setState(s => ({ p: { ...s.p, ...patch } })); }
  go(step) { clearTimeout(this.adv); this.setState({ step }); }
  need() { const q = this.cur(); return q ? !PF.answered(this.state.p, q.id) : false; }
  pickSingle(q, label) {
    const at = this.state.step;
    this.setP({ [q.id]: label });
    if ((this.props.autoAdvance ?? true) && !q.note) { clearTimeout(this.adv); this.adv = setTimeout(() => { if (this.state.step === at) this.next(); }, 240); }
  }
  toggleMulti(q, label) {
    this.setState(s => {
      const cur = s.p[q.id];
      let v = cur.includes(label) ? cur.filter(x => x !== label) : label === 'None yet' ? ['None yet'] : [...cur.filter(x => x !== 'None yet'), label];
      return { p: { ...s.p, [q.id]: v } };
    });
  }
  next() {
    const s = this.state.step;
    if (s === 0) { PF.push('quiz_start'); this.go(1); return; }
    if (this.need()) return;
    if (s < 11) this.go(s + 1);
    else this.finish(false);
  }
  finish(instant) {
    const p = this.state.p;
    PF.push('quiz_complete');
    const rep = PF.report(p);
    const useAi = this.props.useAI ?? true;
    this.setState({ rep, ai: useAi ? 'loading' : 'rules', step: instant ? 13 : 12, build: 0 });
    if (!instant) {
      clearInterval(this.bt);
      this.bt = setInterval(() => this.setState(st => { if (st.build >= 3) { clearInterval(this.bt); return { step: 13 }; } return { build: st.build + 1 }; }), 380);
    }
    const k = this.props.knownLead;
    if (k && k.email) this.saveLead('quiz_roadmap', { name: k.name, email: k.email, phone: k.phone, ...PF.leadFields(p, rep) }).catch(() => PF.push('lead_failed'));
    if (useAi) {
      const token = (this.tok = (this.tok || 0) + 1);
      PF.aiEnhance(p, rep).then(r => { if (this.tok === token) this.setState({ rep: r, ai: 'ai' }); }).catch(() => { if (this.tok === token) this.setState({ ai: 'rules' }); });
    }
  }
  handleKey(e) {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    const t = e.target, tag = t && t.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA') return;
    const q = this.cur();
    if (q && q.kind === 'single' && /^[1-9]$/.test(e.key)) { const i = Number(e.key) - 1; if (i < q.opts.length) { e.preventDefault(); this.pickSingle(q, q.opts[i]); } return; }
    if (e.key === 'Enter' && this.state.step <= 11 && !(t && t.closest && t.closest('button,a'))) { e.preventDefault(); this.next(); }
  }
  // PORT: leads go through the site's one lead path (POST /api/lead), not the design's endpoint prop.
  saveLead(source, fields) { return saveLead(source, fields, 'quiz'); }

  renderVals() {
    const s = this.state;
    const base = { scRef: this.scRef, screenRef: this.screenRef, headRef: this.headRef, rootH: this.props.framed ? '100%' : '100dvh', exit: () => this.props.onExit ? this.props.onExit() : this.setState({ step: 0, p: PF.blank() }) };
    const p = s.p, step = s.step, q = this.cur(), need = this.need();
    const on = (x, a, b) => x ? a : b;
    const multi = q && q.kind === 'multi';
    const opts = q && (q.kind === 'single' || multi) ? q.opts.map(label => {
      const sel = multi ? p[q.id].includes(label) : p[q.id] === label;
      return { label, on: sel ? 'true' : 'false', pick: () => multi ? this.toggleMulti(q, label) : this.pickSingle(q, label),
        bd: on(sel, 'var(--oxblood)', 'var(--rule)'), ring: on(sel, 'var(--oxblood)', 'transparent'), bg: on(sel, 'var(--bone)', 'var(--warm-white)'),
        radius: multi ? '6px' : '50%', tick: multi && sel, dotBd: on(sel, 'var(--oxblood)', 'var(--input-border)'), dotBg: multi && sel ? 'var(--oxblood)' : 'var(--warm-white)', dotFill: !multi && sel ? '5px' : '0px' };
    }) : [];
    const subs = p.subjects;
    const groups = PF.Q.groups.map(([name, list]) => ({ name, chips: list.map(label => { const sel = subs.includes(label); return { label, isOn: sel, on: sel ? 'true' : 'false',
      bd: on(sel, 'var(--oxblood)', 'var(--rule)'), bg: on(sel, 'var(--oxblood)', 'var(--warm-white)'), fg: on(sel, 'var(--warm-white)', 'var(--blackberry)'),
      pick: () => this.setState(st => { const c = st.p.subjects; return { p: { ...st.p, subjects: c.includes(label) ? c.filter(x => x !== label) : [...c, label] } }; }) }; }) }));
    const gRow = (key, label) => ({ id: 'pfw-' + key, label, note: p[key] == null ? 'Pick one' : 'Grade ' + PF.Q.gcse[p[key]],
      cells: PF.Q.gcse.map((v, i) => { const sel = p[key] === i; return { label: v, aria: label + ' grade ' + v, on: sel ? 'true' : 'false',
        bd: on(sel, 'var(--oxblood)', 'var(--rule)'), bg: on(sel, 'var(--oxblood)', 'var(--warm-white)'), fg: on(sel, 'var(--warm-white)', 'var(--blackberry)'),
        font: v === 'Resit' ? "'Source Sans 3',sans-serif" : "'Newsreader',serif", size: v === 'Resit' ? '15px' : '22px', pick: () => this.setP({ [key]: i }) }; }) });
    const answeredN = PF.QUESTIONS.filter(x => PF.answered(p, x.id)).length;
    const partCounts = [5, 3, 3], partStart = [0, 5, 8];
    const parts = PF.PARTS.map((label, i) => {
      const doneIn = PF.QUESTIONS.slice(partStart[i], partStart[i] + partCounts[i]).filter(x => PF.answered(p, x.id)).length;
      const isCur = q && q.part === i;
      return { label, fill: step >= 12 ? '1' : String(doneIn / partCounts[i]), fg: isCur ? 'var(--blackberry)' : 'var(--muted)' };
    });
    const left = step >= 1 && step <= 11 ? 12 - step : 0;
    const secs = left * 15;
    const needText = !q ? '' : q.kind === 'subjects' ? 'Pick at least one subject' : q.kind === 'gcse' ? 'Pick a grade for each' : multi ? 'Pick at least one, or None yet' : 'Pick one to continue';
    const worryElse = q && q.id === 'worry' && p.worry;
    return {
      ...base, ready: true,
      isIntro: step === 0, isQ: !!q, isBuilding: step === 12, isReport: step === 13, showProg: step >= 1 && step <= 12,
      introList: [
        { n: '01', t: 'Your matches, ranked', d: 'Real schemes, why each one fits and what each asks for.' },
        { n: '02', t: 'Your 12 months', d: 'What to do each month, with the windows in the right place.' },
        { n: '03', t: 'Stage by stage', d: 'Forms, tests, video interview and assessment centre.' },
        { n: '04', t: 'If it doesn\'t go to plan', d: 'The backup routes worth having ready.' }
      ],
      parts, qNum: answeredN,
      countText: q ? 'Question ' + step + ' of 11 · ' + (secs >= 60 ? 'about ' + Math.round(secs / 60) + ' min left' : 'under a minute left') : '',
      qTitle: q ? q.title : '', qHelp: q ? q.help || '' : '',
      isList: !!opts.length, opts,
      isSubjects: !!q && q.kind === 'subjects', groups, subCount: subs.length ? subs.length + ' picked' : 'None picked', subCountFg: subs.length ? 'var(--oxblood)' : 'var(--muted)',
      showOther: subs.includes('Other'), other: p.other, setOther: e => this.setP({ other: e.target.value.slice(0, 60) }),
      isGcse: !!q && q.kind === 'gcse', gcse: [gRow('maths', 'Maths'), gRow('english', 'English')],
      showNote: !!worryElse, noteLabel: p.worry === 'Something else' ? 'What is it?' : 'Anything specific?', noteHint: 'Optional', note: p.worryNote, setNote: e => this.setP({ worryNote: e.target.value.slice(0, 300) }),
      buildSteps: ['Ranking ' + PF.SCHEMES.length + ' schemes against your answers', 'Laying out your 12 months', 'Writing your advice'].map((t, i) => { const done = s.build > i; return { t, fg: done || s.build === i ? 'var(--blackberry)' : 'var(--muted)', bd: done ? 'var(--oxblood)' : 'var(--input-border)', fill: done ? '8px' : '0px' }; }),
      rep: s.rep, prof: p, aiState: s.ai, known: this.props.knownLead || null,
      onSave: fields => this.saveLead('quiz_roadmap', { ...fields, phone: (this.props.knownLead || {}).phone || '', ...PF.leadFields(p, s.rep) }),
      onLead: (source, fields) => this.saveLead(source, { ...fields, phone: (this.props.knownLead || {}).phone || '', ...PF.leadFields(p, s.rep) }),
      restart: () => { this.tok = (this.tok || 0) + 1; this.setState({ step: 1, p: PF.blank(), rep: null, ai: 'rules' }); },
      onCourse: this.props.onCourse || null,
      showFoot: !!q, back: () => this.go(Math.max(0, step - 1)),
      need, needText, nextDis: need ? 'true' : 'false', nextOp: need ? '0.45' : '1', nextCursor: need ? 'not-allowed' : 'pointer', nextPress: need ? 'transform:none' : 'transform:scale(0.97)',
      nextLabel: step === 11 ? 'Build my report' : 'Next', next: () => this.next()
    };
  }

  render() {
    return <PathfinderWizardView v={this.renderVals()} />;
  }
}
