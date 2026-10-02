/* eslint-disable */
// @ts-nocheck -- verbatim port of the prototype's untyped logic class; typed at its boundary (Props).
'use client';
// The site's behaviour, ported from the prototype's logic class (`class Component` in
// Get In v11.dc.html). Copy data, quiz scoring and every handler are kept as they were; the
// changes for production are marked "PORT:".
import React from 'react';
import GetInView from './GetInView';
import { PAGE_PATH, type Page } from '@/lib/pages';
import { SITE, whatsappDisplay } from '@/lib/site';

type Props = {
  startPage: Page;
  // PORT: navigation goes through the Next.js router so every page has its own URL.
  navigate: (path: string) => void;
  seatsLeft?: number | string;
  ctaLabel?: string;
  leadEndpoint?: string;
  // Booking link for the free call (Cal.com, Calendly…). Empty: falls back to WhatsApp.
  calLink?: string;
  previewOffer?: boolean;
  showProofPreview?: boolean;
  previewPing?: boolean;
};

export default class GetInApp extends React.Component<Props, any> {
  [k: string]: any;
  state = { chatOpen: false, chatDraft: '', chatMsgs: [{ from: 'bot', text: "Hi. Ask anything about the course, or tap a question below." }], pastHero: false, guideOpen: false, guideSent: false, guideEmail: '', page: this.props.startPage ?? 'home', place: 'founding', submitted: false, parentName: '', email: '' };
  SEATS = 10; // seats per cohort; every seat count on the site reads from here
  seatsFull() { const v = this.props.seatsLeft; return v == null || v === '' || Number(v) >= this.SEATS; }
  bookRef = React.createRef();
  chatLogRef = React.createRef();
  WA = SITE.whatsapp; // PORT: set once in lib/site.ts
  IG = SITE.instagram;
  wa(text) { return 'https://wa.me/' + this.WA + '?text=' + encodeURIComponent(text); }
  openWa(text) { const w = window.open(this.wa(text), '_blank', 'noopener'); if (!w) window.location.href = this.wa(text); }
  answer(q) {
    const t = q.toLowerCase();
    // PORT: keywords match from the start of a word. The prototype matched anywhere, so "seat"
    // hit the lunch answer ("eat"), "stage" the age answer and "update" the dates answer.
    const KB = [
      [/\b(cancel|move|change date|reschedul|transfer)/, 'Cancel before the balance is due and the deposit is refunded in full. After that, the deposit is kept. Moving to a later cohort is free once.', null, null],
      [/guarantee.*(apprentice|job|place)|guaranteed|promise.*offer/, 'No. Employers make every hiring decision. We guarantee the preparation, not the outcome. If they do everything and get no offer within 12 months, the next course is free.', 'Read the full guarantee', 'guarantee'],
      [/which scheme|what scheme|employer|firms|companies|don.?t know (which|where)|not sure (which|where)/, 'Any scheme with online tests, video interviews and assessment centres: most large employers in finance, tech, engineering and professional services. Not sure which? Try the free Pathfinder.', 'Try the Pathfinder', 'quiz'],
      [/after (i|we) reserve|what happens next|next step/, "Your details open in WhatsApp. The founder replies with the deposit details and a time for a call about your child's plans.", null, null],
      [/£|\b(price|cost|how much|fees?\b|pay|deposit|balance|refund)/, '£595 for the founding cohort (full price £695). £100 refundable deposit now, £495 before the course. With a placement: £950.', 'Reserve a place', 'book'],
      [/\b(date|when|december|where|london|venue|time|hours)/, 'Two days in London, 9.30 to 4.30. Dates and the venue are confirmed when you reserve.', 'See the course', 'days'],
      [/\b(guarantee|no offer|free|money back)/, "Attend both days, apply to three schemes with our review, and if there's no offer within 12 months the next course is free.", 'Read the full guarantee', 'guarantee'],
      [/\b(online|remote|evening)/, 'The online cohort runs over four evenings and costs £450. It suits students outside London or aged 19–23.', null, null],
      [/\b(support|after|deadline line|whatsapp|help|contact|speak|call)/, 'From booking until their final application deadline, your child can message the founder on WhatsApp. Message 24/7. Replies within 24 hours, every day.', null, null],
      [/\b(parent|attend|watch|stay)/, 'Parents are welcome at the opening briefing on the first morning. After that, the course is for the students.', null, null],
      [/\b(lunch|food|eat)/, 'Lunch is provided both days.', null, null],
      [/\b(placement|work experience|950)/, '2–3 days in a small local firm on a real brief, ending with a write-up and a reference on their letterhead. £950, five seats.', null, null],
      [/\b(school|teacher|talk)/, 'Schools can book a free 30-minute talk for Year 12 and 13, and a parent evening.', 'For schools', 'schools'],
      [/\b(who\b|age\b|aged|year \d|year group|old\b|older|sixth|19|gap\b)/, "It's for students in Year 12 or 13, or aged 19–23, applying to degree apprenticeships. Outside London, or 19–23? There is an online cohort, four evenings, £450.", null, null],
      [/\b(book|reserve|sign up|join|seat|space)/, 'Tap below to reserve. Your details open in WhatsApp, and the founder replies with the deposit details.', 'Reserve a place', 'book'],
      [/what('s| is) (included|in it|on the course)|include|learn|cover|document|leave with|timetable|schedule|stages?\b|course/, 'Two days of practice for every stage: online tests, a scored video interview, a full mock assessment centre, and their real application reviewed line by line. They leave with six documents, including a route map and a next-step plan.', 'See the course', 'days'],
    ];
    for (const [re, a, label, act] of KB) if (re.test(t)) return { text: a, label, act };
    return { text: "I don't have an answer to that here. The founder can help on WhatsApp and replies within 24 hours, every day.", label: 'Ask on WhatsApp', act: 'wa' };
  }
  ask(q) {
    if (!q || !q.trim()) return;
    const a = this.answer(q);
    this.lastQ = q;
    this.setState(s => ({ chatDraft: '', chatMsgs: [...s.chatMsgs, { from: 'me', text: q.trim() }, { from: 'bot', text: a.text, label: a.label, act: a.act }] }), () => { const el = this.chatLogRef.current; if (el) el.scrollTop = el.scrollHeight; });
    this.push('chat_question');
  }
  runAct(act) {
    if (act === 'book') { this.setState({ chatOpen: false }); this.go('price', true); }
    else if (act === 'days') { this.setState({ chatOpen: false }); this.go('days'); }
    else if (act === 'guarantee') { this.setState({ chatOpen: false }); this.go('price', 'guarantee'); }
    else if (act === 'schools') { this.setState({ chatOpen: false }); this.go('schools'); }
    else if (act === 'quiz') { this.setState({ chatOpen: false, quiz: this.quizDefault(), wall: {} }); this.go('quiz'); }
    else if (act === 'wa') this.openWa('Hi, I have a question about DegreeYourWay: ' + (this.lastQ || ''));
  }
  focusables(root) { return [...root.querySelectorAll('a[href],button:not([disabled]),input,select,textarea,[tabindex]:not([tabindex="-1"])')].filter(el => el.offsetParent !== null); }
  topOffset() { const hd = document.querySelector('header'); const mb = document.querySelector('.gi-mbar'); const barOn = mb && getComputedStyle(mb).display !== 'none' && this.state.pastHero; return (hd ? hd.offsetHeight : 72) + (barOn ? mb.offsetHeight : 0) + 8; }
  // ---- Quiz: all quiz rules live here; the template only reads the values quizVals() returns.
  Q_VALS = ['9', '8', '7', '6', '5', '4', '3', 'Resit'];
  Q1 = ['Year 12', 'Year 13', 'Left school, aged 19 to 23', 'Other'];
  Q2 = ['A-levels', 'BTEC', 'T-level', 'A mix', 'Not sure'];
  Q3 = ['Maths', 'Further Maths', 'Physics', 'Chemistry', 'Biology', 'Computer Science', 'Economics', 'Business', 'Accounting', 'English', 'History', 'Politics', 'Law', 'Psychology', 'Sociology', 'Geography', 'Design and Technology', 'Engineering (BTEC)', 'Health and Social Care', 'Applied Science', 'IT (BTEC)', 'Art or Design', 'A language', 'Other'];
  Q4 = ['Mostly A* and A', 'Mostly A and B', 'Mostly B and C', 'Mostly C and D', 'D or below', "Don't know yet"];
  Q6 = ['Work out why a business is losing money', 'Build or fix something that has to work', 'Write code that other people use', 'Argue a case and win it', 'Look after someone who needs help', 'Wear a uniform and keep people safe'];
  // sector -> grade band needed (index into Q4), minimum GCSE, schemes
  SECTORS = {
    'Finance and banking': { band: 1, gcse: 6, rows: [['Barclays', 'Business Banking, Level 6', 'BBB, GCSE Maths 6', 'opens September'], ['Lloyds', 'Apprenticeships', 'GCSE Maths and English 4', 'opens 3 November'], ['JPMorgan', 'Technology and Financial Services', 'BBB with Maths or Computing', 'not yet published']] },
    'Accountancy and consulting': { band: 2, gcse: 5, rows: [['Deloitte', 'BrightStart', '104 UCAS points', 'not yet published, closes early'], ['KPMG', 'Audit, Tax, Consulting, Technology', '120 UCAS points, GCSE Maths and English 5', 'final-stage days from 17 November'], ['EY', 'Assurance, Consulting, Tax', 'three A-levels, GCSE Maths and English 4', 'not yet published']] },
    'Technology': { band: 1, gcse: 4, rows: [['Amazon', 'Software Development Engineer, Level 6', 'ABB with Maths or Computer Science', 'opens February'], ['JPMorgan', 'Technology, Level 6', 'BBB with Maths or Computing', 'not yet published'], ['Capgemini', 'Digital and Technology Solutions', 'three A-levels at C, seven GCSEs at 4', 'not yet published']] },
    'Engineering': { band: 2, gcse: 4, rows: [['BAE Systems', 'Degree apprenticeships', '96 UCAS points, five GCSEs including Maths and English', 'opens January, six weeks'], ['JLR', 'Level 6 Engineering', 'A-level Maths at B plus a STEM subject', 'not yet published'], ['Network Rail', 'Level 6 Engineering', 'BBC with Maths and a science, or DMM BTEC', 'not yet published']] },
    'Law': { band: 0, gcse: 6, rows: [['Slaughter and May', 'Solicitor apprenticeship', 'AAB, seven GCSEs at 6', '12 October to 6 January'], ['A&O Shearman', 'Solicitor apprenticeship', 'AAB, seven GCSEs at 6', '1 December to 17 February'], ['Weightmans', 'Solicitor apprenticeship', '120 UCAS points, five GCSEs at 4, aged 16 to 21', '28 September to 22 October']] },
    'Health and public service': { band: 3, gcse: 4, rows: [['NHS', 'Registered Nurse Degree Apprenticeship', 'Level 3 plus Maths and English', 'trust by trust, all year'], ['Police', 'Police Constable Degree Apprenticeship', 'two A-levels or Level 3, GCSE English 4', 'rolling'], ['Civil Service', 'Apprenticeships, Levels 2 to 7', '16 and over', 'advertised through the year']] }
  };
  // how strongly each answer points at each sector
  Q_WEIGHTS = {
    'Work out why a business is losing money': { 'Accountancy and consulting': 4, 'Finance and banking': 3 },
    'Build or fix something that has to work': { 'Engineering': 4 },
    'Write code that other people use': { 'Technology': 4 },
    'Argue a case and win it': { 'Law': 4 },
    'Look after someone who needs help': { 'Health and public service': 4 },
    'Wear a uniform and keep people safe': { 'Health and public service': 4 },
    'Maths': { 'Finance and banking': 1, 'Accountancy and consulting': 1, 'Engineering': 1, 'Technology': 0.5 },
    'Further Maths': { 'Engineering': 1, 'Finance and banking': 1, 'Technology': 1 },
    'Physics': { 'Engineering': 2 }, 'Chemistry': { 'Engineering': 1, 'Health and public service': 1 }, 'Biology': { 'Health and public service': 2 },
    'Computer Science': { 'Technology': 3 }, 'Economics': { 'Finance and banking': 2, 'Accountancy and consulting': 1 }, 'Business': { 'Accountancy and consulting': 2, 'Finance and banking': 1 },
    'Accounting': { 'Accountancy and consulting': 3 }, 'English': { 'Law': 1 }, 'History': { 'Law': 2 }, 'Politics': { 'Law': 2, 'Health and public service': 0.5 }, 'Law': { 'Law': 3 },
    'Psychology': { 'Health and public service': 2, 'Law': 0.5 }, 'Sociology': { 'Health and public service': 2 }, 'Geography': { 'Engineering': 0.5, 'Health and public service': 0.5 },
    'Design and Technology': { 'Engineering': 2 }, 'Engineering (BTEC)': { 'Engineering': 3 }, 'Health and Social Care': { 'Health and public service': 3 }, 'Applied Science': { 'Health and public service': 1, 'Engineering': 1 },
    'IT (BTEC)': { 'Technology': 3 }, 'Art or Design': { 'Technology': 1 }, 'A language': { 'Law': 1, 'Accountancy and consulting': 0.5 }
  };
  // PORT (Pathfinder redesign, PATHFINDER_CLAUDE_CODE.md): Q3 is shown in four groups with the
  // same labels; `furthest` lets the answers rail jump back; GCSEs start unanswered.
  Q3_GROUPS = [
    ['Maths and sciences', ['Maths', 'Further Maths', 'Physics', 'Chemistry', 'Biology', 'Computer Science']],
    ['Business and money', ['Economics', 'Business', 'Accounting']],
    ['Humanities and languages', ['English', 'History', 'Politics', 'Law', 'Psychology', 'Sociology', 'Geography', 'A language']],
    ['Applied, technical and creative', ['Design and Technology', 'Engineering (BTEC)', 'Health and Social Care', 'Applied Science', 'IT (BTEC)', 'Art or Design', 'Other']],
  ];
  quizDefault() { return { step: 0, furthest: 0, year: null, quals: null, subjects: [], other: '', grades: null, maths: null, english: null, tue: null }; }
  setQ(patch) { this.setState(s => ({ quiz: { ...(s.quiz || this.quizDefault()), ...patch } })); }
  // Every navigation clears a pending auto-advance and records the furthest question reached.
  quizStepTo(step) {
    clearTimeout(this.qAdv);
    this.setState(s => { const q = s.quiz || this.quizDefault(); return { quiz: { ...q, step, furthest: step >= 1 && step <= 6 ? Math.max(q.furthest || 0, step) : q.furthest || 0 } }; });
    window.scrollTo({ top: 0, behavior: 'instant' });
  }
  gcseIdx(v) { return v == null ? 5 : v; } // unanswered falls back to grade 4
  // The fields every quiz_roadmap lead carries, whichever way it is saved.
  quizLead(q, res, who) {
    return { name: who.name || '', email: who.email || '', parent_email: who.parent_email || '', phone: who.phone || '',
      result: res.head, also: res.also, year: q.year, quals: q.quals,
      subjects: q.subjects.join(', ') + (q.other ? ' (' + q.other + ')' : ''), grades: q.grades,
      gcse_maths: this.Q_VALS[this.gcseIdx(q.maths)], gcse_english: this.Q_VALS[this.gcseIdx(q.english)], tuesday: q.tue };
  }
  quizResult(q) {
    const score = {}; Object.keys(this.SECTORS).forEach(k => score[k] = 0);
    [q.tue, ...q.subjects].forEach(a => { const w = this.Q_WEIGHTS[a] || {}; Object.keys(w).forEach(k => score[k] += w[k]); });
    const order = Object.keys(score).sort((a, b) => score[b] - score[a]);
    const sector = order[0], also = order[1], S = this.SECTORS[sector];
    const band = this.Q4.indexOf(q.grades);
    const gcse = v => v === 'Resit' ? 3 : Number(v);
    let standing;
    if (band === 5) standing = 'grades not entered';
    else {
      let gap = band - S.band;
      if (Math.min(gcse(this.Q_VALS[this.gcseIdx(q.maths)]), gcse(this.Q_VALS[this.gcseIdx(q.english)])) < S.gcse) gap += 1;
      standing = gap <= 0 ? 'on the bar' : gap === 1 ? 'a few grades short' : 'not there yet';
    }
    const list = q.subjects.filter(x => x !== 'Other').concat(q.subjects.includes('Other') && q.other.trim() ? [q.other.trim()] : []);
    const subj = list.length === 0 ? 'Your subjects' : list.length === 1 ? list[0] : list.slice(0, -1).join(', ') + ' and ' + list[list.length - 1];
    const one = list.length === 1;
    const sl = sector.toLowerCase();
    const body = {
      'on the bar': 'Your predicted grades and GCSEs meet the usual entry bar for ' + sl + '. ' + subj + (one ? ' points' : ' point') + ' the same way. The competition is about six applicants per place, so the bar gets you in the door, not through it.',
      'a few grades short': "You're about one grade band below the usual bar for " + sl + '. KPMG and Accenture both say to apply anyway if you\'re a few grades short and have a reason; several others don\'t. Aim your first applications at the schemes with the lower bar in the list below.',
      'not there yet': 'The usual bar for ' + sl + " is higher than your predictions right now. That's not a no. Level 4 and 5 apprenticeships in the same sector have lower bars and several feed into degree level later. Your second sector may be closer.",
      'grades not entered': subj + ' and what you enjoy point to ' + sl + '. Add your predicted grades when you have them and this will tell you where you stand against the entry bar.'
    }[standing];
    const mock = ['Before any assessment centre:', 'sit a mock, so the real one is not your first.'];
    const road = {
      'on the bar': [['This month:', 'read the entry page for each scheme above.'], ['When a window opens:', 'apply in the first week. Several close early.'], mock],
      'a few grades short': [['This month:', 'ask your teachers what would lift your predictions by one band.'], ['When windows open:', 'apply first to the scheme with the lowest bar above.'], mock],
      'not there yet': [['This month:', 'look at Level 4 and 5 apprenticeships in ' + sl + '.'], ['Next:', 'check ' + also.toLowerCase() + ' against its entry bar.'], mock],
      'grades not entered': [['Now:', 'read the entry page for each scheme above.'], ['When you get predictions:', 'run the Pathfinder again.'], mock]
    }[standing];
    return { head: sector + ", and you're " + standing + '.', body, also, rows: S.rows, road, sector, standing };
  }
  quizVals(s) {
    const q = s.quiz || this.quizDefault(), w = s.wall || {};
    const step = q.step;
    const need = { 1: !q.year, 2: !q.quals, 3: q.subjects.length === 0, 4: !q.grades, 5: q.maths == null || q.english == null, 6: !q.tue }[step] || false;
    const reason = { 1: 'Pick one to continue', 2: 'Pick one to continue', 3: 'Pick at least one subject', 4: 'Pick one to continue', 5: 'Pick a grade for each', 6: 'Pick one to continue' }[step] || '';
    const rowsOf = r => r.map(([emp, scheme, bar, win]) => ({ emp, scheme, bar, win }));
    const res = step === 8 ? this.quizResult(q) : null;
    const leave = () => { clearTimeout(this.qAdv); clearTimeout(this.qMatch); };
    const next = () => {
      if (need) return;
      if (step === 0) { this.push('quiz_start'); this.quizStepTo(1); return; }
      if (step < 6) { this.quizStepTo(step + 1); return; }
      if (step !== 6) return;
      this.quizStepTo(7); this.push('quiz_complete');
      const o = s.offer;
      clearTimeout(this.qMatch);
      this.qMatch = setTimeout(() => {
        this.quizStepTo(8);
        // Details already given in the pop-up: skip the wall and save one lead now.
        if (o && o.email) {
          const q0 = this.state.quiz, res0 = this.quizResult(q0);
          this.saveLead('quiz_roadmap', this.quizLead(q0, res0, { name: o.name, email: o.email, phone: o.phone })).catch(() => this.push('lead_failed'));
          this.setState(p => ({ wall: { ...(p.wall || {}), name: o.name, email: o.email, sent: true } }));
        }
      }, 900);
    };
    const rail = [
      [1, 'Where you are', q.year],
      [2, 'Qualifications', q.quals],
      [3, 'Subjects', q.subjects.length ? q.subjects.map(x => x === 'Other' && q.other.trim() ? q.other.trim() : x).join(', ') : null],
      [4, 'Predicted grades', q.grades],
      [5, 'GCSE Maths and English', q.maths == null && q.english == null ? null : 'Maths ' + (q.maths == null ? '—' : this.Q_VALS[q.maths]) + ' · English ' + (q.english == null ? '—' : this.Q_VALS[q.english])],
      [6, 'Tuesday afternoon', q.tue],
    ].map(([n, label, answer]) => ({ n, label, answer, current: n === step, enabled: n <= (q.furthest || 0) }));
    return {
      isQuiz: s.page === 'quiz', notQuiz: s.page !== 'quiz',
      qFlyCls: s.qFly ? 'is-open' : '', qFlyOpen: s.qFly ? 'true' : 'false',
      qFlyToggle: () => this.setState(p => ({ qFly: !p.qFly })), qFlyClose: () => this.setState({ qFly: false }),
      qFlyOpts: this.Q1.map(label => ({ label, pick: () => { this.push('quiz_start_flyout'); this.setState({ qFly: false, wall: {}, quiz: { ...this.quizDefault(), year: label, step: 2, furthest: 1 } }); this.go('quiz'); } })),
      goQuiz: () => { this.setState({ quiz: this.quizDefault(), wall: {} }); this.go('quiz'); },
      goQuizLink: e => { if (e && (e.metaKey || e.ctrlKey || e.shiftKey)) return; e.preventDefault(); this.setState({ quiz: this.quizDefault(), wall: {} }); this.go('quiz'); },
      goDaysLink: e => { if (e && (e.metaKey || e.ctrlKey || e.shiftKey)) return; e.preventDefault(); this.go('days'); }
    };
  }
  wRef = React.createRef();
  wNameRef = React.createRef();
  tlRef = React.createRef();
  // Auto-peek: the first time a drop-down list scrolls into view, its first item opens for a
  // moment to show the list is expandable, then closes. Skipped if the visitor touches the list.
  armAutoPeek() {
    if (!('IntersectionObserver' in window)) return;
    this.peeked = this.peeked || new WeakSet();
    if (this.peekIO) this.peekIO.disconnect();
    const lists = new Set();
    document.querySelectorAll('main details.gi-faq').forEach(d => { if (d.parentElement) lists.add(d.parentElement.closest('ol,ul,div')); });
    document.querySelectorAll('main .gi-stg').forEach(li => lists.add(li.parentElement));
    this.peekIO = new IntersectionObserver(entries => entries.forEach(en => {
      if (!en.isIntersecting || this.peeked.has(en.target)) return;
      this.peeked.add(en.target); this.peekIO.unobserve(en.target);
      const list = en.target; let touched = false;
      const mark = () => { touched = true; };
      list.addEventListener('pointerdown', mark, { once: true }); list.addEventListener('focusin', mark, { once: true });
      const d = list.querySelector('details.gi-faq');
      const stg = list.querySelector('.gi-stg');
      setTimeout(() => {
        if (touched) return;
        if (d && !d.open) { d.open = true; setTimeout(() => { if (!touched && !d.matches(':hover')) d.open = false; }, 2600); }
        else if (stg) { this.setState({ openStage: 0 }); setTimeout(() => { if (!touched && this.state.openStage === 0) this.setState({ openStage: null }); }, 2600); }
      }, 350);
    }), { threshold: 0.35 });
    lists.forEach(l => l && this.peekIO.observe(l));
  }
  showPing() {
    if (this.state.offerOpen || this.state.chatOpen) { this.pingT = setTimeout(() => this.showPing(), 8000); return; }
    try { sessionStorage.setItem('gi_ping', '1'); } catch (e) {}
    this.setState({ ping: 'mount', seatDrop: true }, () => requestAnimationFrame(() => requestAnimationFrame(() => this.setState({ ping: 'in' }))));
    this.push('seat_ping');
    this.pingHide = setTimeout(() => this.hidePing(), 9000);
  }
  hidePing() { clearTimeout(this.pingHide); this.setState({ ping: 'out' }); setTimeout(() => this.setState({ ping: null }), 200); }
  // Carousel for the five stages on narrow screens. The <ol>'s own scroll position is the
  // single source of truth; tlIdx only mirrors it so the dots can render.
  // Shared by every snap carousel: the element's own scroll position is the source of truth,
  // state[key] only mirrors it so the dots can render.
  carNearest(ref) {
    const el = ref.current; if (!el) return 0;
    const pad = parseFloat(getComputedStyle(el).scrollPaddingLeft || 0);
    let best = 0, dist = Infinity;
    [...el.children].forEach((c, i) => { const d = Math.abs(c.offsetLeft - el.offsetLeft - el.scrollLeft - pad); if (d < dist) { dist = d; best = i; } });
    return best;
  }
  carGo(ref, key, i) {
    const el = ref.current; if (!el) return;
    const n = Math.max(0, Math.min(el.children.length - 1, i)); const card = el.children[n]; if (!card) return;
    const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollTo({ left: card.offsetLeft - el.offsetLeft - parseFloat(getComputedStyle(el).scrollPaddingLeft || 0), behavior: smooth ? 'smooth' : 'instant' });
    this.setState({ [key]: n });
  }
  carVals(ref, key, count, noun) {
    const cur = this.state[key] || 0;
    return {
      // One measurement per frame, however fast the scroll events arrive.
      scroll: () => { if (this.carRaf) return; this.carRaf = requestAnimationFrame(() => { this.carRaf = 0; const i = this.carNearest(ref); if (i !== (this.state[key] || 0)) this.setState({ [key]: i }); }); },
      dots: Array.from({ length: count }, (_, i) => ({ go: () => this.carGo(ref, key, i), cls: cur === i ? 'is-on' : '', cur: cur === i ? 'step' : 'false', label: noun + ' ' + (i + 1) }))
    };
  }
  pkRef = React.createRef();
  tlNearest() {
    const el = this.tlRef.current; if (!el) return 0;
    const cards = [...el.children]; let best = 0, dist = Infinity;
    cards.forEach((c, i) => { const d = Math.abs(c.offsetLeft - el.offsetLeft - el.scrollLeft - parseFloat(getComputedStyle(el).scrollPaddingLeft || 0)); if (d < dist) { dist = d; best = i; } });
    return best;
  }
  tlGo(i) {
    const el = this.tlRef.current; if (!el) return;
    const n = Math.max(0, Math.min(el.children.length - 1, i)); const card = el.children[n]; if (!card) return;
    const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollTo({ left: card.offsetLeft - el.offsetLeft - parseFloat(getComputedStyle(el).scrollPaddingLeft || 0), behavior: smooth ? 'smooth' : 'instant' });
    this.setState({ tlIdx: n });
  }
  // One place for every form on the site. Adds source, page and campaign data, keeps a local
  // backup, pushes to analytics, and POSTs to leadEndpoint (Google Sheets script, Formspree, Zapier…)
  // when one is set in Tweaks. Returns a promise that rejects only on a network failure.
  saveLead(source, fields) {
    const q = new URLSearchParams(window.location.search);
    const lead = { source, ...fields, page: this.state.page, referrer: document.referrer || '',
      utm_source: q.get('utm_source') || '', utm_medium: q.get('utm_medium') || '', utm_campaign: q.get('utm_campaign') || '',
      at: new Date().toISOString() };
    try { const L = JSON.parse(localStorage.getItem('gi_leads') || '[]'); L.push(lead); localStorage.setItem('gi_leads', JSON.stringify(L)); } catch (e) {}
    this.push('lead_' + source);
    // PORT: posts to the site's own /api/lead route, which forwards to the CRM.
    const url = this.props.leadEndpoint ?? '/api/lead';
    if (!url) return Promise.resolve(lead);
    return fetch(url, { method: 'POST', keepalive: true, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(lead) })
      .then(r => r.ok ? r.json().catch(() => ({})) : Promise.reject(new Error('lead ' + r.status)))
      .then(res => ({ ...lead, ...res }));
  }
  // Builds a one-page printable roadmap; the browser's print dialog saves it as a PDF.
  roadmapPdf(res) {
    const esc = t => String(t).replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[c]);
    const rows = res.rows.map(([e, s, b, w]) => '<tr><td><b>' + esc(e) + '</b><br>' + esc(s) + '</td><td>' + esc(b) + '</td><td>' + esc(w) + '</td></tr>').join('');
    const road = res.road.map(([a, b], i) => '<li><span>0' + (i + 1) + '</span><div><b>' + esc(a) + '</b> ' + esc(b) + '</div></li>').join('');
    const doc = '<!doctype html><html><head><meta charset="utf-8"><title>DegreeYourWay roadmap</title>'
      + '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Newsreader:opsz,wght@6..72,400&family=Source+Sans+3:wght@400;600&display=swap">'
      + '<style>@page{size:A4;margin:18mm}body{font-family:"Source Sans 3",sans-serif;color:#30202A;margin:0;font-size:11pt;line-height:1.5}h1,h2{font-family:Newsreader,serif;font-weight:400;margin:0}h1{font-size:28pt;line-height:1.05}h2{font-size:15pt;margin:22pt 0 8pt}.k{font-size:8pt;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:#716769}.bar{height:3pt;background:#823D48;width:40pt;margin:10pt 0 14pt}p{margin:8pt 0;color:#51444A}table{width:100%;border-collapse:collapse}td{padding:7pt 8pt 7pt 0;border-top:.6pt solid #D7CFC6;vertical-align:top;font-size:10pt}ol{list-style:none;padding:0;margin:0}li{display:flex;gap:10pt;padding:6pt 0;border-top:.6pt solid #D7CFC6}li span{color:#716769;font-weight:600;font-size:9pt;min-width:18pt}.call{margin-top:22pt;background:#30202A;color:#F4EFE6;padding:14pt 16pt}.call h2{margin:0 0 4pt;color:#F4EFE6}.call p{color:#E4DCD9;margin:0}.foot{margin-top:16pt;font-size:8pt;color:#716769}</style></head><body>'
      + '<div class="k">DegreeYourWay · Your degree apprenticeship roadmap</div><div class="bar"></div>'
      + '<h1>' + esc(res.head) + '</h1><p>' + esc(res.body) + '</p><p><span class="k">Also a fit</span>&nbsp; ' + esc(res.also) + '</p>'
      + '<h2>Three schemes to aim for</h2><table>' + rows + '</table>'
      + '<h2>Your next three steps</h2><ol>' + road + '</ol>'
      + '<div class="call"><h2>Free discovery call, 30 minutes</h2><p>Talk this roadmap through with Shreyash Singh, who used this process to get offers from Deloitte, Goldman Sachs, PwC and Accenture. Message him on WhatsApp: ' + whatsappDisplay(this.WA) + '.</p></div>'
      + '<div class="foot">Entry bars and dates checked 24 September 2026. Always check the employer\'s page. Employers make every hiring decision.</div>'
      + '<script>document.fonts.ready.then(function(){setTimeout(function(){window.print()},300)})<\/script></body></html>';
    const w = window.open('', '_blank');
    if (w && w.document) { w.document.open(); w.document.write(doc); w.document.close(); }
    else { const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([doc], { type: 'text/html' })); a.download = 'DegreeYourWay roadmap.html'; a.click(); }
    this.push('roadmap_pdf');
  }
  wRef2 = null;
  railEls = [];
  railFillRef = React.createRef();
  railFillMRef = React.createRef();
  buildRail() {
    const secs = [...document.querySelectorAll('main section')].filter(s => s.offsetHeight > 120);
    this.railEls = secs;
    const hd = document.querySelector('header'); if (hd) document.documentElement.style.setProperty('--gi-head', hd.offsetHeight + 'px');
    const items = secs.map((s, i) => {
      const k = [...s.querySelectorAll('p,span')].find(x => x.classList.contains('gi-up') && x.textContent.trim().length > 2 && x.textContent.trim().length < 40 && !x.closest('.gi-paper'));
      const hd = s.querySelector('h1,h2');
      let label = i === 0 ? 'Top' : (k ? k.textContent.trim() : (s.getAttribute('aria-label') || (hd ? hd.textContent.trim() : 'Section')));
      label = label.replace(/\s+/g, ' ');
      if (label.length > 28) label = label.slice(0, 26) + '…';
      return { label, h: s.offsetHeight };
    });
    this.setState({ rail: items }, () => this.railTick());
  }
  railTick() {
    const els = this.railEls;
    if (!els.length || !document.contains(els[0])) { if (!this.railPending) { this.railPending = true; requestAnimationFrame(() => { this.railPending = false; this.buildRail(); }); } return; }
    const line = window.innerHeight * 0.4; let a = 0;
    els.forEach((s, i) => { if (s.getBoundingClientRect().top <= line) a = i; });
    if ((window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 4) a = els.length - 1;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const pr = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    if (this.railFillRef.current) this.railFillRef.current.style.transform = 'scaleY(' + pr + ')';
    if (this.railFillMRef.current) this.railFillMRef.current.style.transform = 'scaleX(' + pr + ')';
    const bgc = getComputedStyle(els[a]).backgroundColor; const m = bgc.match(/\d+/g); const dark = m ? (0.299 * m[0] + 0.587 * m[1] + 0.114 * m[2]) < 90 : false;
    if (a !== this.state.railActive || dark !== !!this.state.railDark) this.setState({ railActive: a, railDark: dark });
  }
  railGo(i) {
    const el = this.railEls[i]; if (!el) return;
    const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: i === 0 ? 0 : el.getBoundingClientRect().top + window.scrollY - this.topOffset(), behavior: smooth ? 'smooth' : 'instant' });
  }
  openId(st) { st = st || this.state; return st.offerOpen ? 'dlg-offer' : st.sample != null ? 'dlg-sample' : st.guideOpen ? 'dlg-guide' : st.chatOpen ? 'dlg-chat' : null; }
  dlg(patch) {
    const before = this.openId();
    if (!before) this.returnFocus = document.activeElement;
    this.setState(patch, () => setTimeout(() => {
      const now = this.openId();
      if (now && now !== before) { const d = document.getElementById(now); if (!d) return; const f = now === 'dlg-chat' ? d.querySelector('input') : this.focusables(d)[0]; f && f.focus({ preventScroll: true }); }
      else if (!now && before) { const r = this.returnFocus; this.returnFocus = null; if (r && document.contains(r) && r !== document.body) r.focus({ preventScroll: true }); else { const b = document.querySelector('.gi-chatbtn'); b && b.focus({ preventScroll: true }); } }
    }, 40));
  }
  
  componentDidMount() {
    setTimeout(() => this.buildRail(), 300);
    setTimeout(() => this.armAutoPeek(), 600);
    // Seat ping: once per visit, after 30s on the site. Slides in, auto-hides after 9s unless hovered.
    try { if ((this.props.previewPing ?? true) || !sessionStorage.getItem('gi_ping')) this.pingT = setTimeout(() => this.showPing(), 30000); } catch (e) {}
    try { const saved = JSON.parse(localStorage.getItem('gi_offer') || 'null'); if (saved) this.setState({ offer: saved, offerDone: true }); const g = JSON.parse(localStorage.getItem('gi_guide') || 'null'); if (g) this.setState({ guideLead: g }); } catch (e) {}
    if (this.state.chatOpen || this.state.qFly) this.setState({ chatOpen: false, qFly: false });
    const tryOffer = () => {
      let seen = false; try { seen = !!sessionStorage.getItem('gi_offer_seen') || !!localStorage.getItem('gi_offer'); } catch (e) {}
      if (this.props.previewOffer ?? true) { seen = false; if (this.state.offerDone) this.setState({ offerDone: false }); }
      if (seen || this.state.page === 'schools' || this.state.page === 'quiz') return;
      const open = this.openId();
      if (open && open !== 'dlg-chat') { this.offerT = setTimeout(tryOffer, 1000); return; }
      try { sessionStorage.setItem('gi_offer_seen', '1'); } catch (e) {}
      this.dlg({ chatOpen: false, qFly: false, offerOpen: true }); this.push('offer_shown');
    };
    this.offerT = setTimeout(tryOffer, 5000);
    this.onRailResize = () => this.buildRail(); window.addEventListener('resize', this.onRailResize);
    this.onTrap = ev => {
      if (ev.key === 'Escape' && this.state.qFly) { this.setState({ qFly: false }); }
      const id = this.openId();
      if (!id) return;
      if (ev.key === 'Escape') { ev.preventDefault(); this.dlg({ sample: null, guideOpen: false, chatOpen: false, offerOpen: false }); return; }
      if (ev.key !== 'Tab' || id === 'dlg-chat') return;
      const d = document.getElementById(id); if (!d) return; const f = this.focusables(d); if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (ev.shiftKey && document.activeElement === first) { ev.preventDefault(); last.focus(); }
      else if (!ev.shiftKey && (document.activeElement === last || !d.contains(document.activeElement))) { ev.preventDefault(); first.focus(); }
    };
    window.addEventListener('keydown', this.onTrap);
    this.onKey = ev => { if (this.state.sample == null) return; if (ev.key === 'Escape') return; else if (ev.key === 'ArrowRight') this.setState(p => ({ sample: (p.sample + 1) % 6 })); else if (ev.key === 'ArrowLeft') this.setState(p => ({ sample: (p.sample + 5) % 6 })); }; window.addEventListener('keydown', this.onKey); this.onScroll = () => { this.railTick(); const y = window.scrollY; { const mb = document.querySelector('.gi-mbar'); const vis = mb && y > 640 && getComputedStyle(mb).display !== 'none'; document.documentElement.style.setProperty('--gi-bar', vis ? mb.offsetHeight + 'px' : '0px'); } const p = y > 640, sc = y > 8; if (p !== this.state.pastHero || sc !== this.state.scrolled) this.setState({ pastHero: p, scrolled: sc }); }; window.addEventListener('scroll', this.onScroll, { passive: true }); }
  // PORT: back/forward (or any link) changes the route; mirror it into state.page.
  componentDidUpdate(prev) {
    if (prev.startPage !== this.props.startPage) {
      const via = this.routing; this.routing = null;
      if (via === PAGE_PATH[this.props.startPage] || this.props.startPage === this.state.page) return;
      this.setState({ page: this.props.startPage }, () => { window.scrollTo({ top: 0, behavior: 'instant' }); this.railEls = []; setTimeout(() => this.buildRail(), 120); setTimeout(() => this.armAutoPeek(), 400); });
    }
  }
  componentWillUnmount() { if (this.peekIO) this.peekIO.disconnect(); clearTimeout(this.offerT); clearTimeout(this.pingT); clearTimeout(this.pingHide); window.removeEventListener('resize', this.onRailResize); window.removeEventListener('keydown', this.onTrap); window.removeEventListener('keydown', this.onKey); window.removeEventListener('scroll', this.onScroll); }
  push(event, section?) { const w = window as any; (w.dataLayer = w.dataLayer || []).push({ event, section, page: this.state.page }); }
  // Every primary CTA books the free call. Details go through saveLead (via the pop-up) first,
  // then the visitor picks a time on the booking link.
  track(event, section?) { this.push('call_booked_click', section); if (this.state.offer && this.state.offer.email) { this.openCal(); return; } this.dlg({ offerOpen: true, offerDone: false }); }
  calHref() { return this.props.calLink || this.wa('Hi Shreyash, I would like to book the free 30-minute call.'); }
  openCal() { const w = window.open(this.calHref(), '_blank', 'noopener'); if (!w) window.location.href = this.calHref(); }
  
  go(page, toBook?) {
    // PORT: the Pathfinder is a separate full-screen route, outside this shell.
    if (page === 'quiz') { this.props.navigate(PAGE_PATH.quiz); return; }
    const changing = page !== this.state.page;
    const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // PORT: keep the URL in step with the page.
    if (changing) { this.routing = PAGE_PATH[page]; this.props.navigate(PAGE_PATH[page]); }
    this.setState({ page }, () => {
      setTimeout(() => this.armAutoPeek(), 400);
      if (changing) { window.scrollTo({ top: 0, behavior: 'instant' }); this.railEls = []; setTimeout(() => this.buildRail(), 120); }
      const el = typeof toBook === 'string' ? document.getElementById(toBook) : (toBook ? this.bookRef.current : null);
      if (!el) return;
      requestAnimationFrame(() => {
        const y = el.getBoundingClientRect().top + window.scrollY - this.topOffset();
        window.scrollTo({ top: y, behavior: smooth ? 'smooth' : 'instant' });
      });
    });
  }
  
  
  renderVals() {
    const s = this.state;
    const ink = 'var(--blackberry)', acc = 'var(--blackberry)';
    const nav = [['home', 'Overview'], ['days', 'The course'], ['price', 'Prices and booking'], ['schools', 'For schools']];
    const navShort = { home: 'Overview', days: 'Course', price: 'Prices', schools: 'Schools' };
    const stages = [
      ['Application', 9], ['Tests', 7], ['Video interview', 5], ['Assessment centre', 1], ['Offer', 1]
    ];
    let prev = 11;
    const funnel = stages.map(([name, n], i) => {
      const ac = name === 'Assessment centre';
      const dots = Array.from({ length: 11 }, (_, k) => {
        if (k < n) return { bg: ink, bd: ink };
        if (ac && k < prev) return { bg: acc, bd: acc };
        return { bg: 'transparent', bd: 'var(--rule)' };
      });
      const row = { num: String(i + 1).padStart(2, '0'), name, n: ac ? '1 of 5' : n, dots,
        note: ac ? 'Most fall here: four of five' : '',
        numColor: ac ? acc : ink, rule: ac ? acc : 'var(--rule)', bg: ac ? 'var(--soft-tint)' : 'transparent', pad: ac ? '16px' : '0' };
      if (ac) row.n = 1;
      prev = n;
      return row;
    });
    const months = ['Sep','Oct','Nov','Dec','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug'];
    const ph = (label, col, row) => ({ label, col, row, fill: 'var(--blackberry)', h: '6px', text: 'var(--blackberry)', weight: 500 });
    const phases = [
      ph('Applications', '1 / 4', 2), ph('Tests', '2 / 4', 3),
      ph('Assessment centres', '5 / 8', 4), ph('Offers', '6 / 10', 5)
    ];
    const blk = (t, label, dur, assessed) => ({ t, label,
      flex: `${dur} 1 ${Math.round(dur * 62)}px`,
      bg: assessed ? ink : 'var(--bone)', fg: assessed ? 'var(--warm-white)' : ink,
      bd: assessed ? '0' : '1px solid var(--rule)', top: assessed ? `4px solid ${acc}` : '1px solid var(--rule)' });
    const days = [
      { name: 'Saturday', blocks: [
        blk('9.30', 'Briefing and Route Map', 1, false), blk('10.30', 'Timed test sitting one', 1, true),
        blk('11.30', 'Marks explained', 0.75, false), blk('12.15', 'Timed test sitting two', 1, true),
        blk('1.15', 'Lunch', 0.5, false), blk('1.45', 'Video interview technique', 1, false),
        blk('2.45', 'Scored video interview', 1, true), blk('3.45', 'Application review', 0.75, false) ] },
      { name: 'Sunday', blocks: [
        blk('9.30', 'Assessment centre briefing', 0.5, false), blk('10.00', 'Group exercise', 1.5, true),
        blk('11.30', 'Written exercise', 1, true), blk('12.30', 'Lunch', 0.5, false),
        blk('1.00', 'Presentation', 1, true), blk('2.00', 'Competency interview', 1, true),
        blk('3.00', 'Feedback and written report', 1.5, false) ] }
    ];
    const outcomes = [
      ['The Route Map', ' within 48 hours.'], ['Two timed test sittings,', ' marks explained.'],
      ['A scored video interview.', ''], ['A full mock assessment centre.', ''],
      ['A written report.', ''], ['Their application reviewed twice.', ''],
      ['The Deadline Line:', ' WhatsApp to the founder, replies within 24 hours, every day.']
    ].map(([title, rest], i) => ({ n: i + 1, title, rest }));
    const places = [['founding', 'Founding', '£595'], ['placement', 'With placement', '£950']]
      .map(([id, label, price]) => ({ id, label, price, checked: s.place === id,
        bd: s.place === id ? ink : 'var(--rule)', bg: s.place === id ? 'var(--warm-white)' : 'transparent',
        pick: () => this.setState({ place: id }) }));
    return {
      offerOpen: !!s.offerOpen, offerSent: !!s.offerDone, offerNotSent: !s.offerDone,
      offerName: s.offer ? s.offer.name : '', offerEmail: s.offer ? s.offer.email : '',
      closeOffer: () => this.dlg({ offerOpen: false }),
      sendOffer: e => {
        e.preventDefault();
        // Both buttons submit this form, so details are always captured; the one pressed decides what happens next.
        const wantsQuiz = false;
        const f = new FormData(e.target);
        const nm = String(f.get('name') || '').trim(), em = String(f.get('email') || '').trim();
        const badN = !nm, badE = !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(em);
        if (badN || badE) { this.setState({ oErr: { n: badN, e: badE } }); const el = e.target.querySelector(badN ? '[name=name]' : '[name=email]'); if (el) el.focus(); return; }
        if (this.state.oErr) this.setState({ oErr: null });
        const offer = { name: String(f.get('name') || '').trim(), email: String(f.get('email') || '').trim(), phone: String(f.get('phone') || '').trim(), at: new Date().toISOString() };
        try { localStorage.setItem('gi_offer', JSON.stringify(offer)); } catch (err) {}
        this.saveLead(wantsQuiz ? 'popup_pathfinder' : 'discovery_call', { name: offer.name, email: offer.email, phone: offer.phone }).catch(() => this.push('lead_failed'));
        if (wantsQuiz) { this.dlg({ offerOpen: false }); this.setState({ offer, quiz: this.quizDefault(), wall: { name: offer.name, email: offer.email } }); this.go('quiz'); }
        else { this.setState({ offer, offerDone: true }); this.push('call_request'); }
      },
      oNameErr: s.oErr && s.oErr.n ? 'true' : 'false', oEmailErr: s.oErr && s.oErr.e ? 'true' : 'false', oHasErr: !!(s.oErr && (s.oErr.n || s.oErr.e)),
      oErrText: s.oErr ? (s.oErr.n && s.oErr.e ? 'Add your first name and email.' : s.oErr.n ? 'Add your first name.' : 'Check your email address.') : '',
      offerQuiz: () => { this.dlg({ offerOpen: false }); this.setState({ quiz: this.quizDefault(), wall: { name: (s.offer && s.offer.name) || '', email: (s.offer && s.offer.email) || '' } }); this.go('quiz'); },
      myPrice: '£595', mySave: 'Save £100', myPriceNote: 'Founding price. Full price £695.',
      railFillRef: this.railFillRef, railFillMRef: this.railFillMRef, railDark: s.railDark ? 'is-dark' : '',
      ...this.quizVals(s),
      railItems: (s.page === 'quiz' ? [] : (s.rail || [])).map((r, i) => { const act = s.railActive || 0; return { label: r.label, num: String(i + 1).padStart(2, '0'), w: Math.max(1, Math.round(r.h / 100)), cls: i === act ? 'is-on' : (i < act ? 'is-past' : ''), cur: i === act ? 'true' : 'false', go: () => this.railGo(i) }; }),
      chatOpen: s.chatOpen, chatClosed: !s.chatOpen && s.page !== 'quiz',
      chatDraft: s.chatDraft, chatLogRef: this.chatLogRef,
      setChatDraft: e => this.setState({ chatDraft: e.target.value }),
      chatSend: e => { e.preventDefault(); this.ask(s.chatDraft); },
      openChat: () => { this.dlg({ chatOpen: true }); this.push('chat_open'); },
      closeChat: () => this.dlg({ chatOpen: false }),
      chatMsgs: s.chatMsgs.map(m => ({ text: m.text, align: m.from === 'me' ? 'flex-end' : 'flex-start', bg: m.from === 'me' ? 'var(--blackberry)' : 'var(--warm-white)', fg: m.from === 'me' ? 'var(--warm-white)' : 'var(--blackberry)', bd: m.from === 'me' ? 'var(--blackberry)' : 'var(--rule)', hasAction: !!m.label, actLabel: m.label || '', act: () => this.runAct(m.act) })),
      chatChips: ['How much is it?', "What's included", 'The guarantee', 'Can I cancel?', "Who it's for", 'Which schemes?', 'Can parents attend?'].map(label => ({ label, ask: () => this.ask(label) })),
      waChatHref: this.wa('Hi, I have a question about DegreeYourWay.'),
      waGuideHref: this.wa("Hi, please send me the free Parent's Guide to degree apprenticeships."),
      guideTap: () => this.push('guide_download'),
      guideLocked: !s.guideLead, guideUnlocked: !!s.guideLead,
      unlockGuide: e => { e.preventDefault(); const f = new FormData(e.target); const lead = { email: String(f.get('email') || '').trim(), phone: String(f.get('phone') || '').trim(), source: 'guide', at: new Date().toISOString() }; try { localStorage.setItem('gi_guide', JSON.stringify(lead)); } catch (err) {} this.saveLead('parents_guide', { email: lead.email, phone: lead.phone }).catch(() => this.push('lead_failed')); this.setState({ guideLead: lead }); this.push('guide_signup'); },
      igHref: this.IG,
      waBookHref: this.wa(this.bookMsg || 'Hi, I would like to reserve a place on DegreeYourWay.'),
      waSchoolHref: this.wa(this.schoolMsg || 'Hi, I would like to book a DegreeYourWay talk for our school.'),
      tlRef: this.tlRef,
      pkRef: this.pkRef, pkCur: String(s.pkIdx || 0), pkScroll: this.carVals(this.pkRef, 'pkIdx', 3, 'Document').scroll, pkDots: this.carVals(this.pkRef, 'pkIdx', 3, 'Document').dots,
      tlScroll: this.carVals(this.tlRef, 'tlIdx', 5, 'Stage').scroll, tlCur: String(s.tlIdx || 0),
      tlDots: [0, 1, 2, 3, 4].map(i => ({ go: () => this.tlGo(i), cls: (s.tlIdx || 0) === i ? 'is-on' : '', cur: (s.tlIdx || 0) === i ? 'step' : 'false', label: 'Stage ' + (i + 1) })),
      stagesTL: [
        { n: 1, name: 'Application', short: 'Their real application, reviewed twice.', tag: 'Foundation', cls: 'gi-tl-s1' },
        { n: 2, name: 'Tests', short: 'Two timed sittings, marked and explained.', tag: 'Foundation', cls: 'gi-tl-s2' },
        { n: 3, name: 'Video interview', short: 'A scored practice interview on camera.', tag: 'On camera', cls: 'gi-tl-s3' },
        { n: 4, name: 'Assessment centre', short: 'A full mock day. Every exercise scored.', tag: 'Full mock day', cls: 'gi-tl-s4' },
        { n: 5, name: 'Final interview', short: 'Practice for the final conversation.', tag: 'Refinement', cls: 'gi-tl-s5' }
      ],
      isHome: s.page === 'home', isDays: s.page === 'days', isPrice: s.page === 'price', isSchools: s.page === 'schools', isTerms: s.page === 'terms', isBooked: s.page === 'booked', goTerms: () => this.go('terms'),
      goTermsLink: e => { if (e && (e.metaKey || e.ctrlKey || e.shiftKey)) return; e && e.preventDefault(); this.go('terms'); },
      // PORT: cookie consent lives in components/Consent.tsx; the footer link reopens it.
      showCookieSettings: !!SITE.gtmId, openCookieSettings: () => window.dispatchEvent(new Event('dyw:cookie-settings')),
      ...(() => { const T = [['A target scheme and deadline plan','So they apply in the right order, with every deadline in view.'],['A test baseline','So they know which marks to win back before the real test.'],['A scored video interview',"So the real recording isn't the first time they hear themselves."],['Mock assessment-centre feedback',"So the real assessment centre isn't their first."],['A reviewed application','So the first line an employer reads sounds like them.'],['A next-step plan','So preparation carries on after the weekend, week by week.']]; const n = s.sample; const o = { sampleOpen: n != null, sampleNum: n != null ? n + 1 : '', sampleTitle: n != null ? T[n][0] : '', sampleBenefit: n != null ? T[n][1] : '', openSample: {}, closeSample: () => this.dlg({ sample: null }), prevSample: () => this.setState(p => ({ sample: (p.sample + 5) % 6 })), nextSample: () => this.setState(p => ({ sample: (p.sample + 1) % 6 })) }; for (let k = 0; k < 6; k++) { o['sample' + k] = n === k; o.openSample['s' + k] = () => { this.dlg({ sample: k, chatOpen: false }); this.push && this.push('sample_open_' + (k + 1)); }; } return o; })(), notSchools: s.page !== 'schools', showHeadCta: s.page !== 'schools' && s.page !== 'home', goSchoolForm: () => this.go('schools', 'school-form'),
      schoolSent: !!s.schoolSent, schoolNotSent: !s.schoolSent, schoolEmail: s.schoolEmail || 'you',
      setSchoolEmail: e => this.setState({ schoolEmail: e.target.value }),
      sendSchool: e => { e.preventDefault(); const f = new FormData(e.target); this.schoolMsg = 'Hi, I would like to book a DegreeYourWay talk.\nSchool: ' + (f.get('school') || '') + '\nName: ' + (f.get('name') || '') + '\nRole: ' + (f.get('role') || '') + '\nEmail: ' + (f.get('email') || '') + '\nPreferred dates: ' + (f.get('dates') || ''); this.saveLead('school_talk', Object.fromEntries(f.entries())).then(r => { if (r && r.handout) this.setState({ handoutHref: r.handout }); }).catch(() => {}); this.openWa(this.schoolMsg); this.setState({ schoolSent: true }); this.push('school_talk_request'); },
      whyStats: [
        { big: '£0', label: 'tuition debt', line: 'Against £47,900 average for the 2023 cohort.', src: 'Commons Library', c: 'var(--blackberry)' },
        { big: '4 years', label: 'earlier', line: 'Earning and qualified while peers are still studying.', src: '', c: 'var(--blackberry)' },
        { big: '−7%', label: 'graduate openings', line: 'Year on year, the lowest since 2020.', src: 'Indeed, August 2026', c: 'var(--blackberry)' },
        { big: '1 in 11', label: 'applications per place', line: 'Per Level 6 place on the government Find an Apprenticeship platform.', src: 'BBC FOI, 2026', c: 'var(--blackberry)' }
      ],
      placementSteps: [
        { n: 1, title: 'Brief agreed', body: 'One page, one question, signed off before day one.' },
        { n: 2, title: '2–3 days in the firm', body: 'Alongside the team, with a named supervisor. Under-18s at our venue or with the owner present.' },
        { n: 3, title: 'Write-up and reference', body: "Two pages and ten minutes to the owner. Scored by us. A reference on the firm's letterhead." }
      ],
      handoutTap: e => { if (!s.handoutHref) { e.preventDefault(); return; } this.push('school_handout_open'); }, handoutHref: s.handoutHref || '#',
      schoolOffers: [
        { title: 'The student talk', meta: '30 min · in school', who: 'Year 12 and 13', pts: ['What degree apprenticeships are and what they pay', 'Which employers hire, and when applications open', 'The five stages, and how to prepare for each'] },
        { title: 'The parent evening', meta: '60 min · in school or online', who: 'Parents of Year 12 and 13', pts: ['How it compares with university, in pounds', 'The application calendar, month by month', 'How to support without taking over'] }
      ],
      schoolSteps: [
        { n: 1, title: 'Send your dates', body: 'Use the form below. It takes a minute.' },
        { n: 2, title: 'We confirm in 24 hours', body: 'A date, a time and what we need from you.' },
        { n: 3, title: 'We deliver', body: 'The talk, plus a one-page student handout sent once your details are in.' }
      ],
      schoolBlocks: [
        { title: 'The talk', body: '30 minutes in school from a degree apprentice: what the schemes are, what they pay and what they test.', rule: 'var(--blackberry)' },
        { title: 'The parent evening', body: '60 minutes, in school or online, for parents of Year 12 and 13. The route, the deadlines, the numbers.', rule: 'var(--blackberry)' },
        { title: 'What it costs the school', body: 'Nothing. Counts toward Gatsby Benchmarks 5 and 6.', rule: 'var(--blackberry)' }
      ],
      goHome: e => { if (e && (e.metaKey || e.ctrlKey || e.shiftKey)) return; e && e.preventDefault(); this.go('home'); }, reserve: () => this.track('cta_click', 'other'),
      navItems: nav.map(([id, label]) => ({ label, short: navShort[id], href: PAGE_PATH[id], go: e => { if (e && (e.metaKey || e.ctrlKey || e.shiftKey)) return; e && e.preventDefault(); this.go(id); }, current: s.page === id ? 'page' : 'false',
        color: s.page === id ? ink : 'var(--muted)', border: s.page === id ? acc : 'transparent' })),
      proofs: [
        { title: 'A guarantee, in writing', body: 'Attend everything, apply to three schemes, no offer within 12 months: the next course is free.' },
        { title: 'A placement and a reference', body: '2–3 days at a small firm on a real brief. Five seats.' },
        { title: 'Run by degree apprentices from Deloitte, Goldman Sachs, Bloomberg and PwC', body: 'They sat these assessments themselves and work in the field now.' }
      ],
      notes: [
        { title: 'The DegreeYourWay Guarantee', body: 'Attend everything, apply to three schemes, no offer within 12 months: the next course is free.' },
        { title: 'The Deadline Line', body: 'WhatsApp to the founder, replies within 24 hours, every day.' },
        { title: '£100 refundable deposit', body: 'Refundable in full until the balance is due.' }
      ],
      funnel, months, phases, days, outcomes, places,
      ...(() => {
        const ph = v => ({ vc: v.startsWith('[') ? 'var(--blackberry)' : 'var(--blackberry)', fs: v.startsWith('[') ? 'italic' : 'normal' });
        const kv = list => list.map(([k, v]) => ({ k, v, ...ph(v) }));
        const faq = list => list.map(([q, a]) => ({ q, a }));
        return {
          faqTop: faq([
            ['Who is it for?', 'Students in Year 12 or 13, or aged 19–23, applying to degree apprenticeships, and the parents helping them.'],
            ['Which schemes does it prepare for?', 'Any scheme with online tests, video interviews and assessment centres: most large employers in finance, tech, engineering and professional services.'],
            ['Does it guarantee an apprenticeship?', 'No. Employers make every hiring decision. We guarantee the preparation, not the outcome.'],
            ["What if my child doesn't know where to apply?", 'Start with the free Pathfinder. In 90 seconds it gives a roadmap with the sector that fits and three schemes.'],
            ['Can parents attend?', 'Yes, for the opening briefing on the first morning. After that, the course is for the students.']
          ]),
          faqBooking: faq([
            ["What's included in the £595?", 'Two days: timed tests, a scored video interview, a full mock assessment centre and two application reviews. Plus a written report, the Deadline Line and the Guarantee.'],
            ['How does the deposit work?', 'A £100 deposit holds the place and is refundable until the balance is due. The £495 balance is due before the course.'],
            ['Can I cancel or move?', 'Cancel before the balance is due and the deposit is refunded in full. After that, the deposit is kept. Moving to a later cohort is free once.'],
            ['What if my child gets no offer?', 'If they attend both days and apply to three schemes, with no offer within 12 months, the next course is free.'],
            ['What happens after I reserve?', "Your details open in WhatsApp. The founder replies with the deposit details and a time for a call about your child's plans."]
          ]),
                    callouts: kv([['1', 'Scored against four competencies, 1 to 4.'], ['2', 'Written notes on every exercise.'], ['3', 'One priority to practise before the real thing.'], ['4', 'The full written report follows within 48 hours.']]).map(r => ({ n: r.k, t: r.v, vc: r.v.includes('[') ? 'var(--blackberry)' : 'var(--blackberry)', fs: 'normal' })),
          feedbackOther: kv([['Tests', 'Marked after each sitting, every wrong answer explained.'], ['Video interview', 'Scored out of 5 per question, played back with notes.'], ['Application', 'Reviewed twice, line by line, with edits on the page.']]),
          reportRows: [['Teamwork', 3, 'Bring others in earlier'], ['Communication', 2, 'Slow down when presenting'], ['Commercial awareness', 3, 'Tie answers to the client'], ['Problem solving', 4, 'Keep doing this']].map(([k, v, p]) => ({ k, p, pips: [1, 2, 3, 4].map(i => i <= v ? 'var(--blackberry)' : 'var(--rule)') })),
          facts4: [['Length', 'Two days'], ['Time', '9.30 to 4.30'], ['Location', 'London'], ['Places', this.seatsFull() ? String(this.SEATS) : this.props.seatsLeft + ' of ' + this.SEATS + ' left']].map(([k, v]) => ({ k, v })),
          feedbackHow: kv([
            ['Tests', 'Marked straight after each sitting. Every wrong answer is explained, and the two sittings are compared.'],
            ['Video interview', 'Recorded, then scored out of 5 per question and played back with notes on structure and timing.'],
            ['Assessment centre', 'An assessor scores each exercise against four competencies, with written notes.'],
            ['Application', 'Reviewed twice, line by line, with edits and comments on the page.'],
            ['Written report', 'Within 48 hours of the weekend.']
          ]),
          whoTeaches: kv([
            ['Teaches', 'Shreyash Singh, Deloitte degree apprentice 2021–25. He runs both days and the mock assessment centre.'],
            ['Assesses', 'Working degree apprentices at other schemes.'],
            ['Afterwards', 'The founder answers questions on the Deadline Line.'],
            ['Group size', 'Ten students. One assessor to five students on Sunday.']
          ]),
          afterWk: [
            ['Within 48 hours', 'The Route Map: which schemes to apply to, in what order, with every deadline.'],
            ['Before each deadline', 'The second review of their application, before they submit.'],
            ['Any time', 'The Deadline Line. WhatsApp to the founder, replies within 24 hours, every day.'],
            ['How long it lasts', 'Until their last application deadline of the season.'],
            ['Before a real assessment centre', 'A 30-minute call to run the format again.']
          ].map(([when, what]) => ({ when, what, ...ph(what) })),
          priceFacts: [['Length', 'Two days, 9.30 to 4.30'], ['Location', 'London'], ['Seats', this.seatsFull() ? String(this.SEATS) : this.props.seatsLeft + ' of ' + this.SEATS + ' left'], ['Deposit today', '£100, refundable']].map(([k, v]) => ({ k, v })),
          inclAll: ['Two-day course', 'The Route Map', 'Two timed test sittings', 'A recorded, scored video interview', 'A full mock assessment centre', 'Two application reviews', 'A personal action plan', 'The Deadline Line after the course', 'The DegreeYourWay Guarantee'],
          logistics: kv([
            ['Venue', 'London'],
            ['Food and breaks', 'Lunch provided both days.']
          ]),
          payment: kv([
            ['Refunds', 'Deposit refundable in full until the balance is due.'],
            ['How to pay', 'Deposit details are sent on WhatsApp when you reserve.'],
            ['Cancelling or moving', 'Cancel before the balance is due and the deposit is refunded in full. After that, the deposit is kept. Moving to a later cohort is free once.']
          ]),
          guarFull: [
            'Attend every module in full.',
            'Submit applications, reviewed by us, to at least three Level 6 or 7 schemes with deadlines within 12 months.',
            'Receive no offer from any scheme applied to in that window.',
            'Make a claim within 13 months of the course.',
            'Get one free place on a later cohort, in person or online, at our choice of date.'
          ].map((text, i) => ({ n: i + 1, text, vc: text.includes('[') ? 'var(--on-dark-label)' : 'var(--warm-white)', fs: 'normal' })),
          fitYes: ['Year 12 or 13, or aged 19–23.', 'Serious about applying to degree apprenticeships.', 'Applying this season, or planning to.', 'Ready to take part fully on both days.', 'Willing to practise and rework their application afterwards.'],
          fitNo: ['Looking for a guaranteed job offer.', 'Not willing to practise or rework applications.', 'Outside the entry criteria of the schemes they want.']
        };
      })(),
      ctaLabel: this.props.ctaLabel ?? 'Book a free call', calHref: this.calHref(), calTap: () => this.push('call_booked_click', 'thanks'),
      cta: Object.fromEntries(['header','hero','coursehero','placement','panel','outcomes','coursepack','pricehero','courseend','assessment','price','final','mobile','promise'].map(k => [k, () => this.track('cta_click', k)])),
      goDays: () => this.go('days'), goPrice: () => this.go('price'),
      goGuarantee: () => this.go('price', 'guarantee'), goFaq: () => { this.dlg({ chatOpen: true }); this.push('chat_open'); },
      guideOpen: s.guideOpen, guideSent: s.guideSent, guideNotSent: !s.guideSent, guideEmail: s.guideEmail || 'you',
      openGuide: e => { e && e.preventDefault(); this.dlg({ guideOpen: true, chatOpen: false }); this.push('guide_open'); },
      closeGuide: () => this.dlg({ guideOpen: false }),
      stop: e => e.stopPropagation(),
      setGuideEmail: e => this.setState({ guideEmail: e.target.value }),
      sendGuide: e => { e.preventDefault(); this.setState({ guideSent: true }); this.push('guide_download'); },
      leaveWith: [
        ['A target scheme and deadline plan', 'The Route Map says which schemes to apply to and when. It arrives within 48 hours.'],
        ['A test baseline', 'Two timed sittings, marked, with every gap explained.'],
        ['A scored video interview', 'Recorded, scored, and played back with notes.'],
        ['Mock assessment-centre feedback', 'Written feedback on every exercise, in a report.'],
        ['A reviewed application', 'Their real application, reviewed twice.'],
        ['A next-step plan', 'What to practise before each deadline. The founder answers questions on WhatsApp within 24 hours, every day.']
      ].map(([title, body], i) => ({ n: i + 1, title, body })),
      stages5: [
        ['Application', 'Motivation, written communication, and fit with the scheme.', 'Their real application reviewed twice, line by line.'],
        ['Tests', 'Numerical, verbal and situational judgement, against the clock.', 'Two timed sittings, marked, with every wrong answer explained.'],
        ['Video interview', 'Recorded answers to competency and motivation questions, with no second take.', 'A scored video interview, played back with notes.'],
        ['Assessment centre', 'Group work, a case study, a presentation and an interview in one day.', 'A full mock assessment centre on Sunday, assessed exercise by exercise.'],
        ['Final interview', 'Motivation, commercial awareness, and the questions they ask back.', 'Competency interview practice and a plan for the final round.']
      ].map(([name, tests, prep], i) => { const ac = name === 'Assessment centre'; const short = ['Their real application, reviewed twice.', 'Two timed sittings, marked and explained.', 'A scored practice interview on camera.', 'A full mock day, every exercise scored.', 'Practice for the last conversation.'][i]; return { n: i + 1, name, tests, prep, short, big: ac ? 'clamp(64px,7vw,104px)' : 'clamp(44px,4.6vw,68px)', nameSize: ac ? 'clamp(32px,3.2vw,44px)' : 'clamp(26px,2.4vw,34px)', line: i === 4 ? 'transparent' : (ac ? acc : 'var(--rule)'), gap: i === 4 ? '0' : (ac ? '64px' : '44px'), boxPad: ac ? '20px 20px 22px' : '16px 0 0', note: ac ? 'Where most applicants fall' : '', cls: ac ? 'gi-step gi-hot' : 'gi-step', dot: ac ? acc : ink, nameColor: ac ? acc : ink, numColor: ac ? acc : 'var(--muted)', rule: ac ? acc : 'var(--rule)', bg: ac ? 'var(--soft-tint)' : 'transparent', pad: ac ? '16px' : '0', pid: 'stg-' + i, expanded: s.openStage === i ? 'true' : 'false', openCls: s.openStage === i ? 'is-open' : '', toggle: () => this.setState(p => ({ openStage: p.openStage === i ? null : i })) }; }),
      acParts: [
        { title: 'Group exercise', body: 'Five or six candidates solve a problem together while assessors watch how each one contributes.' },
        { title: 'Case study', body: 'A pack of information to read, analyse and turn into a recommendation, against the clock.' },
        { title: 'Presentation', body: 'Five to ten minutes presenting their findings, then questions from the assessors.' },
        { title: 'Interview', body: 'A competency and motivation interview, often with a senior manager.' }
      ],
      weekend: [
        ['Saturday morning', 'Tests', 'Briefing and Route Map, the first timed test sitting, marks explained.', false],
        ['Saturday afternoon', 'Video interview and application', 'Second timed sitting, video technique, a scored video interview, application review.', false],
        ['Sunday morning', 'Assessment centre, part one', 'Briefing, the group exercise and the written case study, assessed.', true],
        ['Sunday afternoon', 'Assessment centre, part two', 'Presentation, competency interview, then feedback and the written report.', true]
      ].map(([when, title, body, sun]) => ({ when, title, body, bg: sun ? ink : 'var(--bone)', fg: sun ? 'var(--warm-white)' : ink, top: sun ? acc : 'var(--rule)' })),
      scorecard: [['Teamwork', 3], ['Communication', 2], ['Commercial awareness', 3], ['Problem solving', 4]]
        .map(([k, v]) => ({ k, pips: [1, 2, 3, 4].map(i => i <= v ? ink : 'var(--rule)') })),
      guarSteps: [
        { n: 1, text: 'Attend both days in full.' },
        { n: 2, text: 'Submit a reviewed application to at least three eligible schemes.' },
        { n: 3, text: 'No offer within 12 months? Your next course is free.' },
      ].map((g, i) => ({ ...g, bg: i === 3 ? ink : 'var(--warm-white)', fg: i === 3 ? 'var(--warm-white)' : ink, num: i === 3 ? 'var(--on-dark-label)' : acc })),
      faq: [
        ['Who is this for?', 'Students in Year 12 or 13, or aged 19–23, applying to degree apprenticeships, and the parents helping them.'],
        ['Which apprenticeship schemes does this prepare students for?', 'Any scheme with online tests, video interviews and assessment centres: most large employers in finance, tech, engineering and professional services.'],
        ['Does this guarantee an apprenticeship?', 'No. Employers make the hiring decision. We guarantee the preparation, not the outcome.'],
        ["What if my child doesn't know which schemes to apply for?", "That's what the Route Map is for: a shortlist of schemes and deadlines within 48 hours."],
        ['What age or year group is this for?', 'Students in Year 12 or 13, or aged 19–23. Outside London, there is an online cohort over four evenings.'],
        ['Where does the weekend take place?', 'In London. The venue is confirmed with your booking.'],
        ['Who runs the course?', 'Shreyash Singh (Deloitte degree apprentice), with assessors who are working degree apprentices.'],
        ["What happens if they don't receive an offer?", 'If they attended everything and applied to three schemes, with no offer within 12 months, the next course is free.'],
        ['Can I speak to someone before booking?', 'Yes. Message the founder on WhatsApp on ' + whatsappDisplay(this.WA) + ', or tap "Questions" at the bottom of the screen.'],
        ['What exactly is included in the £595?', 'Two days: timed tests, a scored video interview, a full mock assessment centre and two application reviews. Plus the Route Map, a written report and the Deadline Line.']
      ].map(([q, a]) => ({ q, a, c: 'var(--blackberry-soft)' })),
      showBarPage: s.page === 'home' || s.page === 'days',
      barT: s.pastHero ? 'translateY(0)' : 'translateY(-100%)', barO: s.pastHero ? 1 : 0, barPE: s.pastHero ? 'auto' : 'none', barHidden: s.pastHero ? 'false' : 'true',
      headShadow: s.scrolled ? '0 1px 0 var(--rule), 0 8px 24px -18px rgba(48,32,42,0.35)' : 'none',
      showProof: !!this.props.showProofPreview,
      stackItems: [
        { n: 1, name: 'The Route Map', fixes: 'Which schemes, in what order, with every deadline. Sent within 48 hours.', cls: '', open: () => { this.dlg({ sample: 0, chatOpen: false }); this.push('sample_open_1'); }, label: 'View sample, part 1' },
        { n: 2, name: 'Test Practice', fixes: 'Two timed sittings, every wrong answer explained, before the real tests.', cls: '', open: () => { this.dlg({ sample: 1, chatOpen: false }); this.push('sample_open_2'); }, label: 'View sample, part 2' },
        { n: 3, name: 'The Video Rehearsal', fixes: 'A recorded interview, scored out of 5 per question, played back with notes.', cls: '', open: () => { this.dlg({ sample: 2, chatOpen: false }); this.push('sample_open_3'); }, label: 'View sample, part 3' },
        { n: 4, name: 'The Mock Assessment Centre', fixes: 'All four exercises, scored by working degree apprentices, with a written report.', cls: 'is-key', open: () => { this.dlg({ sample: 3, chatOpen: false }); this.push('sample_open_4'); }, label: 'View sample, part 4' },
        { n: 5, name: 'Application Review', fixes: 'Their real application, reviewed twice, line by line.', cls: '', open: () => { this.dlg({ sample: 4, chatOpen: false }); this.push('sample_open_5'); }, label: 'View sample, part 5' },
        { n: 6, name: 'The Deadline Line', fixes: 'WhatsApp the team 24/7 while they apply. Replies within 24 hours, every day.', cls: 'is-key', open: () => { this.dlg({ sample: 5, chatOpen: false }); this.push('sample_open_6'); }, label: 'View sample, part 6' }
      ],
      dlAsk: [{ q: 'Test next week?' }, { q: 'Video interview tonight?' }, { q: 'Assessment centre on Friday?' }, { q: 'Stuck on a question in the form?' }, { q: 'Offer to accept or decline?' }],
      planSteps: [{"n":1,"title":"Get your roadmap","tag":"Free","was":"£20","hasWas":true,"meta":"90 seconds","body":"Six questions. The Pathfinder matches your child to a sector, checks their grades and picks three schemes.","get":"a roadmap PDF.","cls":"is-first","open":false,"tagC":"var(--gain)"},{"n":2,"title":"Talk it through","tag":"Free","was":"£50","hasWas":true,"meta":"30-minute call","body":"Go through the roadmap with Shreyash: which scheme first, when windows open, and whether the course fits.","get":"a first application and three next steps.","cls":"","open":false,"tagC":"var(--gain)"},{"n":3,"title":"Practise every stage","tag":"£595","was":"","hasWas":false,"meta":"Two days, then support","body":"£100 refundable deposit. Timed tests, a scored video interview, a full mock assessment centre and two application reviews. Then WhatsApp support until their last deadline.","get":"scored feedback on every stage.","cls":"","open":false,"tagC":"var(--blackberry)"}],
      planPromises: ["Steps 1 and 2 are free (worth £70)", "£100 deposit, refundable until the balance is due", "No offer within 12 months? The next course is free"],
      baRows: [
        { a: 'First sight of an assessment centre is the real one', b: 'All four exercises already sat and scored' },
        { a: 'Application written alone, "passionate" in line one', b: 'Reviewed twice, line by line' },
        { a: 'Guessing which schemes, missing early windows', b: 'A Route Map with schemes, order and deadlines' },
        { a: 'Tests seen for the first time on the day', b: 'Two timed sittings, every mistake explained' },
        { a: 'Questions with nobody to ask', b: 'WhatsApp to the founder until the last deadline' }
      ],
      offerFirms: ['Deloitte', 'Goldman Sachs', 'PwC', 'Accenture'],
      creds: [
        { k: 'Route in', v: 'Applied from sixth form at 17' },
        { k: 'On the course', v: 'Teaches both days and runs the mock assessment centre' },
        { k: 'Assessors', v: 'Working degree apprentices at other schemes' }
      ],
      acDay: [
        ['09.00', 'Group exercise', 'Five or six candidates solve one problem while assessors watch each contribution.', 1.3, 'var(--on-dark-label)'],
        ['11.00', 'Case study', 'A pack to read and analyse, turned into a recommendation against the clock.', 1.1, 'var(--on-dark-body)'],
        ['13.30', 'Presentation', 'Five to ten minutes on their findings, then questions.', 0.9, 'var(--on-dark-body)'],
        ['15.00', 'Interview', 'Competency and motivation, often with a senior manager.', 0.9, 'var(--on-dark-body)']
      ].map(([t, title, body, f, bar], i) => ({ n: i + 1, t, title, body, bar, flex: f + ' 1 220px', assessed: ['Contribution, listening, and bringing others in.', 'Analysis, prioritising, and a clear recommendation.', 'Structure, clarity, and handling questions.', 'Evidence for each competency, and motivation for the scheme.'][i] })),
      tt: [
        { day: 'SATURDAY', theme: 'They sit it', rows: [
          ['09.30', 'Briefing and Route Map', 'Target schemes identified'],
          ['10.30', 'Timed test sitting one', 'Baseline score', 'Assessed'],
          ['11.30', 'Marks explained', 'Gaps named'],
          ['12.15', 'Timed test sitting two', 'Second score', 'Assessed'],
          ['13.45', 'Video interview technique', 'Answer structure'],
          ['14.45', 'Scored video interview', 'Scored recording', 'Assessed'],
          ['15.45', 'Application review', 'Marked-up application'] ] },
        { day: 'SUNDAY', theme: 'They are assessed', rows: [
          ['09.30', 'Assessment-centre briefing', 'What assessors score'],
          ['10.00', 'Group exercise', 'Scored', 'Assessed'],
          ['11.30', 'Case study', 'Scored', 'Assessed'],
          ['13.00', 'Presentation', 'Scored', 'Assessed'],
          ['14.00', 'Competency interview', 'Scored', 'Assessed'],
          ['15.00', 'Feedback', 'Written report and action plan'] ] }
      ].map(d => ({ ...d, rows: d.rows.map(([t, a, o, flag]) => ({ t, a, o, flag: flag || '' })) })),
      heroIncl: ['Two timed test sittings, marks explained', 'A scored video interview', 'A full mock assessment centre', 'Their application reviewed twice', 'The DegreeYourWay Guarantee'],
      steps: [{ n: 1, text: 'Pay the £100 refundable deposit' }, { n: 2, text: 'Book a call with us' }, { n: 3, text: 'Attend the two days' }],
      seatLine: this.seatsFull() ? `${this.SEATS} seats.` : `${this.props.seatsLeft} of ${this.SEATS} seats left.`,
      seatsOnly: this.seatsFull() ? (s.seatDrop ? (this.SEATS - 1) + ' seats left' : this.SEATS + ' seats only') : this.props.seatsLeft + ' seats left',
      pingOn: !!s.ping, pingCls: s.ping === 'in' ? 'is-in' : '', pingTotal: this.SEATS,
      pingLeft: this.seatsFull() ? this.SEATS - 1 : Math.max(1, Number(this.props.seatsLeft) - 1),
      pingClose: () => this.hidePing(),
      pingReserve: () => { this.hidePing(); this.push('seat_ping_reserve'); this.go('price', true); },
      seatShort: (this.seatsFull() ? this.SEATS + ' seats' : this.props.seatsLeft + ' of ' + this.SEATS + ' seats left'),
      bookRef: this.bookRef,
      submitted: s.submitted, notSubmitted: !s.submitted,
      parentName: s.parentName.split(' ')[0] || 'we have your details', email: s.email || 'you',
      setParent: e => this.setState({ parentName: e.target.value }),
      setEmail: e => this.setState({ email: e.target.value }),
      submitLabel: 'Send details on WhatsApp',
      submit: e => { e.preventDefault(); const f = new FormData(e.target); const pl = { founding: 'Founding, £595', placement: 'With placement, £950' }[s.place] || s.place; const lines = ['Hi, I would like to reserve a place on DegreeYourWay.']; for (const [k, v] of f.entries()) { if (k === 'place') continue; if (v) lines.push(k.charAt(0).toUpperCase() + k.slice(1) + ': ' + v); } lines.push('Place: ' + pl); this.bookMsg = lines.join('\n'); this.saveLead('booking', Object.fromEntries([...f.entries()].concat([['place', pl]]))).catch(() => this.push('lead_failed')); this.openWa(this.bookMsg); this.setState({ submitted: true }); this.push('booking_whatsapp'); }
    };
  }

  render() {
    return <GetInView v={this.renderVals()} />;
  }
}
