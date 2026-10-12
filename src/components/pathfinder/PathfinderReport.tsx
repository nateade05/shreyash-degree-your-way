/* eslint-disable */
// @ts-nocheck -- verbatim port of the design's untyped logic class; typed at its boundary (Props).
'use client';
// Pathfinder report: the logic class from "Pathfinder Report.dc.html", ported as a React class
// component. Production changes are marked PORT:.
import React from 'react';
import PF from '@/lib/pathfinderEngine';
import { saveLead } from '@/lib/leads';
import { calUrl, FOUNDER_PHOTO, SITE } from '@/lib/site';
import PathfinderReportView from './PathfinderReportView';
import { SAVE_KEY } from './progress';

type Props = {
  report?: any;
  profile?: any;
  aiState?: 'loading' | 'ai' | 'rules';
  known?: { name: string; email: string } | null;
  startUnlocked?: boolean;
  onSave?: (fields: Record<string, string>) => Promise<unknown>;
  onLead?: (source: string, fields: Record<string, string>) => Promise<unknown>;
  onBook?: () => void;
  onRestart?: () => void;
  onCourse?: () => void;
};

export default class PathfinderReport extends React.Component<Props, any> {
  [k: string]: any;
  rootRef = React.createRef(); headRef = React.createRef(); nameRef = React.createRef(); emailRef = React.createRef();
  secMatches = React.createRef(); secPlan = React.createRef(); secPrep = React.createRef(); secWorry = React.createRef(); secBack = React.createRef(); secSave = React.createRef(); secCall = React.createRef(); secGate = React.createRef(); secCv = React.createRef();
  // PORT: the engine is an imported module, so it's always ready.
  state = { pf: true, w: {}, active: 'matches', saveSeen: false, cv: { mode: 'upload', fileName: '', input: null, ans: {}, status: 'idle', err: '', res: null, prog: 0 } };

  setCv(patch) { this.setState(s => ({ cv: { ...s.cv, ...patch } })); }
  lead(source, fields) {
    const rep = this.props.report || PF.report(PF.DEMO), prof = this.props.profile || PF.DEMO, w = this.state.w;
    const all = { name: w.name || '', email: w.email || '', ...fields };
    return this.props.onLead ? this.props.onLead(source, all) : this.saveLead(source, { ...all, ...PF.leadFields(prof, rep) });
  }
  async onFile(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    this.setCv({ fileName: file.name, input: null, err: '' });
    try { const input = await PF.readCvFile(file); this.setCv({ input }); }
    catch (er) {
      // PORT: PDFs are read in the browser; a scanned PDF has no text to read.
      const m = er.message === 'too big' ? 'That file is over 8 MB. Try a smaller PDF or a Word file.' : er.message === 'bad docx' ? 'We couldn\'t read that Word file. Save it as a PDF and try again.' : er.message === 'pdf no text' || /pdf/i.test(file.name) ? 'We couldn\'t find any text in that PDF. It may be a scanned image. Try a Word file, or answer the four questions instead.' : 'That file type won\'t work. Use a PDF, Word (.docx) or .txt file, or answer the four questions instead.';
      this.setCv({ fileName: '', err: m });
    }
  }
  check() {
    const cv = this.state.cv, rep = this.props.report || PF.report(PF.DEMO), prof = this.props.profile || PF.DEMO;
    let input;
    if (cv.mode === 'upload') { if (!cv.input) return; input = cv.input; }
    else {
      const filled = PF.NO_CV_QS.filter(q => (cv.ans[q.id] || '').trim().length >= 8);
      if (filled.length < 2) return;
      input = { fromQs: true, text: PF.NO_CV_QS.map(q => q.label + ': ' + (cv.ans[q.id] || '').trim()).join('\n') };
    }
    this.setCv({ status: 'checking', prog: 0.15, err: '' });
    setTimeout(() => this.setCv({ prog: 0.6 }), 60);
    PF.push('cv_check_start');
    const finish = (res, note) => {
      this.setCv({ status: 'done', res, prog: 1, note: note || '' });
      PF.push('cv_check_done');
      this.lead('cv_check', { cv_source: cv.mode === 'upload' ? 'upload' : 'questions', cv_file: cv.fileName, cv_text: (input.text || '').slice(0, 6000), cv_gaps: res.gaps.map(g => g.title).join('; '), cv_strengths: res.strengths.join('; '), cv_check_source: res.source });
    };
    PF.cvGaps(prof, rep, input).then(r => finish(r)).catch(() => finish(PF.ruleGaps(prof, rep, input.text || ''), input.pdf ? 'We couldn\'t read your PDF in detail, so this check uses your Pathfinder answers. A Word file gives a fuller check.' : ''));
  }

  componentDidMount() {
    this.bind();
    const k = this.props.known;
    let unlocked = null;
    try { unlocked = JSON.parse(localStorage.getItem(SAVE_KEY + '_w') || 'null'); } catch {}
    if (k && k.email) this.setState({ w: { name: k.name || '', email: k.email, sent: true } });
    // Unlocked before in this browser: stay unlocked after a refresh.
    else if (unlocked && unlocked.sent) this.setState({ w: unlocked });
    else if (this.props.startUnlocked) this.setState({ w: { name: 'Amara', email: 'amara@example.com', sent: true } });
  }
  componentWillUnmount() { clearTimeout(this.t); if (this.sc && this.onScroll) this.sc.removeEventListener('scroll', this.onScroll); }
  scroller() {
    let el = this.rootRef.current && this.rootRef.current.parentElement;
    while (el && el !== document.body) { const o = getComputedStyle(el).overflowY; if ((o === 'auto' || o === 'scroll') && el.scrollHeight > el.clientHeight) return el; el = el.parentElement; }
    return window;
  }
  bind() {
    setTimeout(() => {
      this.sc = this.scroller();
      this.onScroll = () => {
        const secs = [['matches', this.secMatches], ['plan', this.secPlan], ['prep', this.secPrep], ['worry', this.secWorry], ['backups', this.secBack]];
        let cur = 'matches';
        secs.forEach(([k, r]) => { if (r.current && r.current.getBoundingClientRect().top < 140) cur = k; });
        const save = this.state.w.sent ? this.secSave.current : this.secGate.current, top = save ? save.getBoundingClientRect().top : 9999;
        const vh = this.sc === window ? window.innerHeight : this.sc.getBoundingClientRect().bottom;
        const seen = top < vh - 40;
        if (cur !== this.state.active || seen !== this.state.saveSeen) this.setState({ active: cur, saveSeen: seen });
      };
      this.sc.addEventListener('scroll', this.onScroll, { passive: true });
    }, 60);
  }
  jump(ref) {
    const el = ref.current; if (!el) return;
    const sc = this.sc || this.scroller();
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (sc === window) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 52, behavior: reduce ? 'auto' : 'smooth' });
    else sc.scrollTo({ top: el.getBoundingClientRect().top - sc.getBoundingClientRect().top + sc.scrollTop - 52, behavior: reduce ? 'auto' : 'smooth' });
  }
  // PORT: leads go through the site's one lead path (POST /api/lead).
  saveLead(source, fields) { return saveLead(source, fields, 'quiz'); }

  renderVals() {
    const rep = this.props.report || PF.report(PF.DEMO);
    const prof = this.props.profile || PF.DEMO;
    const ai = this.props.aiState || rep.source;
    const s = this.state, w = s.w;
    const setW = patch => this.setState(p => ({ w: { ...p.w, ...patch } }));
    const fitStyle = f => ({
      'Strong fit': { tagBg: 'var(--blackberry)', tagFg: 'var(--bone)', tagBd: 'var(--blackberry)', tagLine: 'solid' },
      'Reach': { tagBg: 'transparent', tagFg: 'var(--blackberry)', tagBd: 'var(--blackberry)', tagLine: 'solid' },
      'Stretch': { tagBg: 'transparent', tagFg: 'var(--muted)', tagBd: 'var(--rule)', tagLine: 'solid' },
      'Unverified': { tagBg: 'transparent', tagFg: 'var(--muted)', tagBd: 'var(--input-border)', tagLine: 'dashed' },
      'Check grades': { tagBg: 'transparent', tagFg: 'var(--muted)', tagBd: 'var(--rule)', tagLine: 'solid' }
    })[f] || {};
    const navDefs = [['matches', 'Matches', this.secMatches], ['plan', '12 months', this.secPlan], ['prep', 'Stage by stage', this.secPrep]].concat(rep.worry ? [['worry', 'Your worry', this.secWorry]] : []).concat([['backups', 'Backups', this.secBack]]);
    const fName = w.name || '', fEmail = w.email || '';
    return {
      ready: true, rootRef: this.rootRef, headRef: this.headRef, nameRef: this.nameRef, emailRef: this.emailRef,
      secMatches: this.secMatches, secPlan: this.secPlan, secPrep: this.secPrep, secWorry: this.secWorry, secBack: this.secBack, secSave: this.secSave,
      srcText: ai === 'loading' ? 'Personalising your advice…' : ai === 'ai' ? 'Written for your answers' : 'Built from your answers',
      srcDot: ai === 'loading' ? 'var(--input-border)' : 'var(--oxblood)',
      sector: rep.sector, read: w.sent ? rep.read : rep.readShort || rep.read, deadline: rep.deadline || '', also: rep.also, checked: rep.checked,
      hasMeter: rep.standingIdx >= 0,
      meter: ['Not there yet', 'Close to the bar', 'On the bar'].map((label, i) => { const on = i === rep.standingIdx; return { label, cur: on ? 'true' : 'false', bar: on ? 'var(--oxblood)' : 'var(--rule)', fg: on ? 'var(--blackberry)' : 'var(--muted)', w: on ? '600' : '400' }; }),
      nav: navDefs.map(([k, label, ref]) => { const on = s.active === k; return { label, cur: on ? 'true' : 'false', fg: on ? 'var(--blackberry)' : 'var(--muted)', line: on ? 'var(--blackberry)' : 'transparent', go: () => this.jump(ref) }; }),
      matches: rep.matches.slice(0, (s.more || {}).m || !w.sent ? 99 : 3).map((m, i) => ({ ...m, n: '0' + (i + 1), hasData: !m.unverified && !!m.bar, reasons: m.reasons.map(t => ({ t })), ...fitStyle(m.fit) })),
      planSub: prof.stage === 'Year 12' ? 'Use this year to build things to write about. You apply next autumn.' : prof.stage === 'Left school' ? 'From now to a September start. Some schemes recruit all year, so you can apply in any month.' : 'From now to your start date. Scheme windows are in the months they open.',
      plan: rep.plan.slice(0, (s.more || {}).p || !w.sent ? 99 : 3).map(m => ({ label: m.label, now: !!m.now, items: m.items.map(t => ({ t, w: /^(Apply|Open now)/.test(t) ? '600' : '400' })) })),
      prep: rep.prep.map((p, i) => ({ n: '0' + (i + 1), stage: p.stage, status: p.status, statusFg: p.status === 'Done before' ? 'var(--blackberry)' : 'var(--muted)', tips: p.tips.slice(0, (s.more || {}).s || !w.sent ? 9 : 1).map(t => ({ t })) })),
      hasWorry: !!rep.worry, worryQ: rep.worry ? rep.worry.q : '', worryBody: rep.worry ? rep.worry.body : '',
      backups: rep.backups,
      notSent: !w.sent, sent: !!w.sent, locked: !w.sent, unlocked: !!w.sent, fName, fEmail, fParent: w.parent || '', secGate: this.secGate,
      lockedAttr: w.sent ? 'false' : 'true', blur: w.sent ? '0px' : '7px', lockOp: w.sent ? '1' : '0.75', lockMax: w.sent ? 'none' : '820px', lockSel: w.sent ? 'auto' : 'none', lockPE: w.sent ? 'auto' : 'none', lockMask: w.sent ? 'none' : 'linear-gradient(to bottom, #000 35%, transparent 100%)',
      teaser: (() => {
        const top = rep.matches[0], wins = rep.plan.reduce((n, m) => n + m.items.filter(t => /^(Apply|Open now)/.test(t)).length, 0);
        const t = [];
        if (top) t.push({ a: 'Why ' + top.emp + ' fits,', b: 'its entry bar and window, plus ' + (rep.matches.length - 1) + ' more matches ranked.' });
        t.push(wins ? { a: wins + ' application windows', b: 'placed month by month in your 12-month plan.' } : { a: 'A month-by-month plan', b: 'from now to your start date.' });
        t.push({ a: 'How to prepare for all four stages,', b: 'based on what you\'ve done before.' });
        if (rep.worry) t.push({ a: 'An answer to your worry', b: 'about ' + rep.worry.q.replace(/^My /, 'your ').replace(/^./, c => c.toLowerCase()) + '.' });
        t.push({ a: rep.backups.length + ' backup routes', b: 'if it doesn\'t go to plan.' });
        return t;
      })(),
      nameErr: !!w.nameErr, nameInv: w.nameErr ? 'true' : 'false', nameBd: w.nameErr ? 'var(--oxblood)' : 'var(--input-border)',
      emailErr: !!w.emailErr, emailInv: w.emailErr ? 'true' : 'false', emailBd: w.emailErr ? 'var(--oxblood)' : 'var(--input-border)',
      fail: !!w.fail, busyAttr: w.busy ? 'true' : 'false', btn: w.busy ? 'Unlocking…' : 'See my full report',
      setName: e => setW({ name: e.target.value, nameErr: false }),
      setEmail: e => setW({ email: e.target.value, emailErr: false }),
      setParent: e => setW({ parent: e.target.value }),
      submit: e => {
        e.preventDefault();
        if (w.busy) return;
        const name = (w.name || '').trim(), email = (w.email || '').trim();
        const bn = !name, be = !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
        if (bn || be) { setW({ nameErr: bn, emailErr: be, fail: false }); setTimeout(() => { const r = bn ? this.nameRef : this.emailRef; r.current && r.current.focus(); }, 0); return; }
        if (!navigator.onLine) { setW({ fail: true }); return; }
        setW({ busy: true, fail: false });
        const fields = { name, email, parent_email: (w.parent || '').trim() };
        const p = this.props.onSave ? this.props.onSave(fields) : this.saveLead('quiz_roadmap', { ...fields, ...PF.leadFields(prof, rep) });
        Promise.resolve(p).then(() => { setW({ sent: true, busy: false }); try { localStorage.setItem(SAVE_KEY + '_w', JSON.stringify({ name, email, parent: fields.parent_email, sent: true })); } catch {} PF.push('report_unlocked'); setTimeout(() => this.jump(this.secCv), 80); }).catch(() => setW({ fail: true, busy: false }));
      },
      download: () => { PF.pdf(rep, fName); PF.push('roadmap_pdf'); },
      // Before the unlock, the top match shows its name and fit only; the details stay blurred.
      topMatch: rep.matches[0] ? { emp: rep.matches[0].emp, scheme: rep.matches[0].scheme, fit: rep.matches[0].fit, ...fitStyle(rep.matches[0].fit) } : null,
      ...(() => {
        // Book the free call: the calendar when one is set, with name, email and result filled in; WhatsApp otherwise.
        const notes = 'Pathfinder: ' + rep.headline + (rep.matches[0] ? ' Top match: ' + rep.matches[0].emp + ', ' + rep.matches[0].scheme + '.' : '');
        const cal = calUrl({ name: fName, email: fEmail, notes });
        const n = rep.matches.filter(m => !m.unverified).length;
        return {
          callHref: cal || PF.wa('Hi Shreyash, I used the DegreeYourWay Pathfinder and would like a free discovery call.\nMy result: ' + rep.headline + '\nTop match: ' + (rep.matches[0] ? rep.matches[0].emp + ', ' + rep.matches[0].scheme : '')),
          callNote: cal ? 'Pick a time that suits you. Your details are filled in.' : 'Opens WhatsApp with your result filled in.',
          callBtn: cal ? 'Pick a time' : 'Book my discovery call',
          callHead: 'Go through your ' + n + ' matches with Shreyash.',
          callBody: 'A free 30-minute call. You\'ll leave knowing which scheme to apply to first and what to fix before you do.',
          photo: FOUNDER_PHOTO, secCall: this.secCall
        };
      })(),
      showBar: !w.sent && !s.saveSeen,
      ...(() => {
        const cv = s.cv, C = PF.COURSE, top = rep.matches.filter(m => !m.unverified);
        const emps = [...new Set(top.slice(0, 3).map(m => m.emp))];
        const isUp = cv.mode === 'upload';
        const filled = PF.NO_CV_QS.filter(q => (cv.ans[q.id] || '').trim().length >= 8).length;
        const ready = isUp ? !!cv.input : filled >= 2;
        const gaps = cv.res ? cv.res.gaps : [];
        const done = cv.status === 'done';
        return {
          secCv: this.secCv,
          cvHead: 'Check your CV against ' + (emps[0] || 'your matches') + (emps.length > 1 ? ' and your other matches.' : '.'),
          cvIdle: cv.status === 'idle', cvBusy: cv.status === 'checking', cvDone: done,
          cvTabs: [['upload', 'Upload my CV'], ['qs', 'No CV yet']].map(([k, label]) => { const on = cv.mode === k; return { label, sel: on ? 'true' : 'false', bg: on ? 'var(--blackberry)' : 'transparent', fg: on ? 'var(--bone)' : 'var(--blackberry)', pick: () => this.setCv({ mode: k, err: '' }) }; }),
          cvModeUpload: isUp, cvModeQs: !isUp,
          cvFileLabel: cv.fileName ? cv.fileName + (cv.input ? '' : ' (reading…)') : 'Choose your CV',
          cvOnFile: e => this.onFile(e),
          cvQs: PF.NO_CV_QS.map(q => ({ label: q.label, ph: q.ph, val: cv.ans[q.id] || '', set: e => { const v = e.target.value; this.setState(st => ({ cv: { ...st.cv, ans: { ...st.cv.ans, [q.id]: v } } })); } })),
          cvErr: cv.err, cvBtn: isUp ? 'Check my CV' : 'Check my answers',
          cvDis: ready ? 'false' : 'true', cvOp: ready ? '1' : '0.45', cvCursor: ready ? 'pointer' : 'not-allowed',
          cvNeed: ready ? 'Used only for this check and your application support.' : isUp ? 'Choose a file to continue.' : 'Answer at least two to continue.',
          cvCheck: () => this.check(),
          cvProg: String(cv.prog || 0), cvBusyText: 'Comparing ' + (isUp ? 'your CV' : 'your answers') + ' with what ' + PF.listText(emps) + ' screen for…',
          cvNote: cv.note || '',
          cvStrengths: cv.res ? cv.res.strengths.map(t => ({ t })) : [],
          cvGapLabel: gaps.length + ' gap' + (gaps.length === 1 ? '' : 's') + ' to close before you apply',
          cvGaps: gaps.map((g, i) => ({ n: '0' + (i + 1), title: g.title, detail: g.detail, part: SITE.courseOffer ? C.parts[g.area].part : '' })),
          cvOfferHead: 'Close ' + (gaps.length === 1 ? 'this gap' : 'these ' + gaps.length + ' gaps') + ' before your first application.',
          cvCallHref: calUrl({ name: fName, email: fEmail, notes: 'Pathfinder CV check. Gaps: ' + gaps.map(g => g.title).join('; ') }) || PF.wa('Hi Shreyash, I did the DegreeYourWay Pathfinder and CV check and would like a free discovery call.\nBest fit: ' + rep.sector + '\nMy gaps: ' + gaps.map(g => g.title).join('; ')),
          cvCallTap: () => PF.push('discovery_call_whatsapp_cv'),
          cvReset: () => { this.setCv({ status: 'idle', res: null, input: null, fileName: '', prog: 0, note: '' }); this.jump(this.secCv); },
          cvBottomTitle: done ? 'You have ' + gaps.length + ' gap' + (gaps.length === 1 ? '' : 's') + ' to close.' : 'Check your CV before you apply.',
          cvBottomBody: done ? 'Go through them with Shreyash on the free call.' : 'Upload it, or answer four questions if you don\'t have one yet. We\'ll show what ' + (emps[0] || 'your top match') + ' will see and what\'s missing.',
          cvBottomBtn: done ? 'See my gaps' : 'Check my CV',
          toCv: () => this.jump(this.secCv)
        };
      })(),
      ...(() => {
        // Before the unlock there's no "Now" prompt: the result comes first, then the form.
        const at = !w.sent ? 1 : 2;
        const labels = ['Questions', 'Unlock report', 'Book a free call'];
        const now = [null, [null, null, null], ['book a free 30-minute call to go through it.', 'Book', () => this.jump(this.secCall)]][at];
        return {
          journey: labels.map((label, i) => { const done = i < at, cur = i === at; return { label: (done ? '✓ ' : '') + label, cur: cur ? 'step' : 'false', bar: done || cur ? 'var(--oxblood)' : 'var(--rule)', fg: cur ? 'var(--blackberry)' : done ? 'var(--blackberry-soft)' : 'var(--muted)', w: cur ? '600' : '400' }; }),
          nowText: now[0], nowBtn: now[1], nowGo: now[2]
        };
      })(),
      ...(() => {
        const more = s.more || {};
        const t = k => () => this.setState(st => ({ more: { ...(st.more || {}), [k]: !(st.more || {})[k] } }));
        const mAll = rep.matches.length, pAll = rep.plan.length;
        return {
          mMoreHas: mAll > 3, mMoreExp: more.m ? 'true' : 'false', mMoreTog: t('m'), mMoreLabel: more.m ? 'Show top 3 only' : 'Show ' + (mAll - 3) + ' more match' + (mAll - 3 === 1 ? '' : 'es'),
          pMoreHas: pAll > 3, pMoreExp: more.p ? 'true' : 'false', pMoreTog: t('p'), pMoreLabel: more.p ? 'Show next 3 months only' : 'Show all ' + pAll + ' months',
          sMoreHas: true, sMoreExp: more.s ? 'true' : 'false', sMoreTog: t('s'), sMoreLabel: more.s ? 'Show one tip per stage' : 'Show all tips'
        };
      })(),
      barText: 'Your full report is waiting.', barBtn: 'Unlock report',
      toSave: () => { this.jump(this.secGate); setTimeout(() => this.nameRef.current && this.nameRef.current.focus({ preventScroll: true }), 450); },
      callTap: () => PF.push('discovery_call_whatsapp'),
      goCourse: e => { if (this.props.onCourse) { e.preventDefault(); this.props.onCourse(); } },
      restart: () => { if (this.props.onRestart) this.props.onRestart(); },
      course: SITE.courseOffer
    };
  }

  render() {
    return <PathfinderReportView v={this.renderVals()} />;
  }
}
