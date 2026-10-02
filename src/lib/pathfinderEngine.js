/* eslint-disable */
// @ts-nocheck -- verbatim port of the design's untyped engine.
// Pathfinder engine: data, scoring, rule-based report, AI enhancement, PDF, lead fields.
// Shared by Pathfinder Wizard / Chat / Report. Scheme data checked 1 October 2026.
// Ported from the design file pathfinder-engine.js; production changes are marked PORT:.
// PORT: an ES module instead of `window.PF`. The site runs without AI (window.claude is absent),
// so aiEnhance / askAdvisor throw and callers fall back to the rule-based report, as designed.
import { SITE } from './site';

const PF = (function () {
  const CHECKED = '1 October 2026';
  const WA = SITE.whatsapp; // PORT: the site's single WhatsApp setting

  const Q = {
    stage: ['Year 12', 'Year 13', 'Left school, aged 19 to 23', 'Other'],
    quals: ['A-levels', 'BTEC', 'T-level', 'A mix', 'Not sure'],
    groups: [
      ['Maths and sciences', ['Maths', 'Further Maths', 'Physics', 'Chemistry', 'Biology', 'Computer Science']],
      ['Business and money', ['Economics', 'Business', 'Accounting']],
      ['Humanities and languages', ['English', 'History', 'Politics', 'Law', 'Psychology', 'Sociology', 'Geography', 'A language']],
      ['Applied, technical and creative', ['Design and Technology', 'Engineering (BTEC)', 'IT (BTEC)', 'Applied Science', 'Health and Social Care', 'Art or Design', 'Other']]
    ],
    grades: ['Mostly A* and A', 'Mostly A and B', 'Mostly B and C', 'Mostly C and D', 'D or below', "Don't know yet"],
    gcse: ['9', '8', '7', '6', '5', '4', '3', 'Resit'],
    tue: ['Work out why a business is losing money', 'Build or fix something that has to work', 'Write code that other people use', 'Argue a case and win it', 'Look after someone who needs help', 'Wear a uniform and keep people safe'],
    exp: ['Part-time job', 'Work experience week', 'Insight day or virtual programme', 'Internship', 'My own project or business', 'None yet'],
    extras: ['Sports team', 'Captain, prefect or head student', 'Ran a club or society', 'Volunteering', 'Music, drama or art', 'Competitions (debate, maths, enterprise)', 'Coding or making things', 'None yet'],
    tests: ['Online tests (numerical, verbal, logic)', 'Situational judgement test', 'Video interview', 'Assessment centre', 'Had an offer', 'None yet'],
    size: ['Big names', 'Smaller or regional firms', "Don't mind"],
    worry: ['My grades', 'No experience', 'Online tests', 'Interviews', 'Picking the right sector', 'My parents are unsure', 'Something else']
  };

  // Questions in order. part: 0 About you, 1 What you've done, 2 What you want.
  const QUESTIONS = [
    { id: 'stage', part: 0, kind: 'single', opts: Q.stage, title: 'Where are you now?', short: 'Where you are' },
    { id: 'quals', part: 0, kind: 'single', opts: Q.quals, title: 'What are you taking?', short: 'Qualifications' },
    { id: 'subjects', part: 0, kind: 'subjects', title: 'Pick your subjects.', help: "Tap everything you're taking.", short: 'Subjects' },
    { id: 'grades', part: 0, kind: 'single', opts: Q.grades, title: 'What grades are you predicted?', help: 'Or the BTEC equivalent. D* is an A*, D is an A, M is a C.', short: 'Predicted grades' },
    { id: 'gcse', part: 0, kind: 'gcse', title: 'GCSE Maths and English?', help: "Several schemes filter on these before anyone reads your application. Use your predicted grade if you haven't sat them yet.", short: 'GCSE Maths and English' },
    { id: 'exp', part: 1, kind: 'multi', opts: Q.exp, title: "What work experience have you done?", help: 'Pick all that apply. A Saturday job counts.', short: 'Work experience' },
    { id: 'extras', part: 1, kind: 'multi', opts: Q.extras, title: 'What do you do outside lessons?', help: 'Pick all that apply.', short: 'Outside lessons' },
    { id: 'tests', part: 1, kind: 'multi', opts: Q.tests, title: 'Which of these have you done before?', help: 'In any application, for any employer.', short: 'Done before' },
    { id: 'tue', part: 2, kind: 'single', opts: Q.tue, title: 'Which would you rather do on a Tuesday afternoon?', short: 'Tuesday afternoon' },
    { id: 'size', part: 2, kind: 'single', opts: Q.size, title: 'What kind of employer?', short: 'Employer type' },
    { id: 'worry', part: 2, kind: 'single', opts: Q.worry, title: 'What worries you most about applying?', help: 'Your report answers this directly.', short: 'Biggest worry', note: true }
  ];
  const PARTS = ['About you', "What you've done", 'What you want'];

  const SECTORS = {
    'Finance and banking': { band: 1, gcse: 6 },
    'Accountancy and consulting': { band: 2, gcse: 5 },
    'Technology': { band: 1, gcse: 4 },
    'Engineering': { band: 2, gcse: 4 },
    'Law': { band: 0, gcse: 6 },
    'Health and public service': { band: 3, gcse: 4 }
  };

  // band: weakest Q.grades index that meets the bar. open: [first month, last month] of the window if known (1-12).
  const S = (id, sector, emp, scheme, bar, band, gcse, win, o) => Object.assign({ id, sector, emp, scheme, bar, band, gcse, win, size: 'big', needs: null, open: null, stages: ['form', 'tests', 'video', 'centre'] }, o || {});
  const SCHEMES = [
    S('barclays', 'Finance and banking', 'Barclays', 'Business Banking, Level 6', 'BBB, GCSE Maths 6', 2, 6, 'opens September', { open: [9, 11] }),
    S('lloyds', 'Finance and banking', 'Lloyds', 'Apprenticeships', 'GCSE Maths and English 4', 3, 4, 'opens 3 November', { open: [11, 1] }),
    S('jpm-fs', 'Finance and banking', 'JPMorgan', 'Technology and Financial Services', 'BBB with Maths or Computing', 2, 4, 'not yet published', { needs: ['Maths', 'Further Maths', 'Computer Science', 'IT (BTEC)'] }),
    S('gs-ficc', 'Finance and banking', 'Goldman Sachs', 'FICC and Equities degree apprenticeship (Applied Finance, Queen Mary)', 'Queen Mary entry requirements', 1, 5, '2027 intake opens autumn 2026', { open: [10, 1] }),
    S('deloitte', 'Accountancy and consulting', 'Deloitte', 'BrightStart', '104 UCAS points', 2, 4, 'not yet published, closes early'),
    S('kpmg', 'Accountancy and consulting', 'KPMG', 'Audit, Tax, Consulting, Technology', '120 UCAS points, GCSE Maths and English 5', 2, 5, 'final-stage days from 17 November', { open: [10, 11] }),
    S('ey', 'Accountancy and consulting', 'EY', 'Assurance, Consulting, Tax', 'three A-levels, GCSE Maths and English 4', 3, 4, 'not yet published'),
    S('pwc-fs', 'Accountancy and consulting', 'PwC', 'Flying Start Accounting (sponsored degree, not an apprenticeship)', 'AAB at Reading; varies by university', 1, 6, 'apply through UCAS; PwC results mid-March to early April', { open: [10, 1] }),
    S('amazon', 'Technology', 'Amazon', 'Software Development Engineer, Level 6', 'ABB with Maths or Computer Science', 1, 4, 'opens February', { open: [2, 3], needs: ['Maths', 'Further Maths', 'Computer Science'] }),
    S('jpm-tech', 'Technology', 'JPMorgan', 'Technology, Level 6', 'BBB with Maths or Computing', 2, 4, 'not yet published', { needs: ['Maths', 'Further Maths', 'Computer Science', 'IT (BTEC)'] }),
    S('capgemini', 'Technology', 'Capgemini', 'Digital and Technology Solutions', 'three A-levels at C, seven GCSEs at 4', 3, 4, 'not yet published'),
    S('ibm', 'Technology', 'IBM', 'Digital and Technology Solutions, Level 6', '120 UCAS points (BBB), GCSE Maths and English 4', 2, 4, 'last cycle open for one week in February', { open: [2, 2] }),
    S('gs-eng', 'Technology', 'Goldman Sachs', 'Engineering degree apprenticeship (Queen Mary or Warwick)', 'university entry requirements', 1, 5, '2027 intake opens autumn 2026', { open: [10, 1] }),
    S('bae', 'Engineering', 'BAE Systems', 'Degree apprenticeships', '96 UCAS points, five GCSEs including Maths and English', 3, 4, 'opens January, six weeks', { open: [1, 2] }),
    S('jlr', 'Engineering', 'JLR', 'Level 6 Engineering', 'A-level Maths at B plus a STEM subject', 2, 4, 'not yet published', { needs: ['Maths', 'Further Maths'] }),
    S('networkrail', 'Engineering', 'Network Rail', 'Level 6 Engineering', 'BBC with Maths and a science, or DMM BTEC', 2, 4, 'not yet published', { needs: ['Maths', 'Further Maths', 'Engineering (BTEC)'] }),
    S('rr', 'Engineering', 'Rolls-Royce', 'Degree apprenticeships (engineering, digital, business)', 'A-levels or equivalent; some schemes ask for AAB', 1, 4, 'offers usually March to April', { needs: ['Maths', 'Further Maths', 'Physics', 'Engineering (BTEC)'] }),
    S('slaughter', 'Law', 'Slaughter and May', 'Solicitor apprenticeship', 'AAB, seven GCSEs at 6', 1, 6, '12 October to 6 January', { open: [10, 1] }),
    S('aos', 'Law', 'A&O Shearman', 'Solicitor apprenticeship', 'AAB, seven GCSEs at 6', 1, 6, '1 December to 17 February', { open: [12, 2] }),
    S('weightmans', 'Law', 'Weightmans', 'Solicitor apprenticeship', '120 UCAS points, five GCSEs at 4, aged 16 to 21', 2, 4, '28 September to 22 October', { open: [9, 10], size: 'mid' }),
    S('nhs', 'Health and public service', 'NHS', 'Registered Nurse Degree Apprenticeship', 'Level 3 plus Maths and English', 3, 4, 'trust by trust, all year', { size: 'mid' }),
    S('police', 'Health and public service', 'Police', 'Police Constable Degree Apprenticeship', 'two A-levels or Level 3, GCSE English 4', 4, 4, 'rolling', { size: 'mid' }),
    S('civil', 'Health and public service', 'Civil Service', 'Apprenticeships, Levels 2 to 7', '16 and over', 4, 4, 'advertised through the year')
  ];

  const W = {
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
    'IT (BTEC)': { 'Technology': 3 }, 'Art or Design': { 'Technology': 1 }, 'A language': { 'Law': 1, 'Accountancy and consulting': 0.5 },
    'Coding or making things': { 'Technology': 1, 'Engineering': 1 }, 'Competitions (debate, maths, enterprise)': { 'Law': 0.5, 'Finance and banking': 0.5 }, 'Volunteering': { 'Health and public service': 0.5 }
  };

  const blank = () => ({ stage: null, quals: null, subjects: [], other: '', grades: null, maths: null, english: null, exp: [], extras: [], tests: [], tue: null, size: null, worry: null, worryNote: '' });

  const answered = (p, id) => {
    if (id === 'gcse') return p.maths != null && p.english != null;
    const v = p[id];
    return Array.isArray(v) ? v.length > 0 : v != null && v !== '';
  };
  const real = a => (a || []).filter(x => x !== 'None yet');
  const listText = l => l.length <= 1 ? (l[0] || '') : l.slice(0, -1).join(', ') + ' and ' + l[l.length - 1];
  const gnum = i => i == null ? null : Q.gcse[i] === 'Resit' ? 3 : Number(Q.gcse[i]);
  const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const inWindow = (m, o) => o && (o[0] <= o[1] ? m >= o[0] && m <= o[1] : m >= o[0] || m <= o[1]);

  function sectorScores(p) {
    const sc = {}; Object.keys(SECTORS).forEach(k => sc[k] = 0);
    [p.tue, p.tue, ...p.subjects, ...p.extras].forEach(a => { const w = W[a] || {}; Object.keys(w).forEach(k => sc[k] += w[k]); });
    return sc;
  }

  function expLevel(p) {
    const n = real(p.exp).length + real(p.extras).length;
    return n === 0 ? 'none' : n <= 2 ? 'some' : 'strong';
  }

  function fitOf(p, s) {
    const band = Q.grades.indexOf(p.grades);
    const known = band >= 0 && band <= 4;
    const g = Math.min(gnum(p.maths) ?? 9, gnum(p.english) ?? 9);
    let gap = known ? band - s.band : 0;
    const gcseShort = (p.maths != null && p.english != null) && g < s.gcse;
    if (gcseShort) gap += 1;
    const hasNeed = !s.needs || s.needs.some(n => p.subjects.includes(n));
    if (!hasNeed && p.subjects.length) gap += 1;
    return { gap, known, gcseShort, hasNeed };
  }

  function standingOf(p, sector) {
    const band = Q.grades.indexOf(p.grades);
    if (band < 0 || band === 5) return 'grades not entered';
    let gap = band - SECTORS[sector].band;
    const g = Math.min(gnum(p.maths) ?? 4, gnum(p.english) ?? 4);
    if (g < SECTORS[sector].gcse) gap += 1;
    return gap <= 0 ? 'on the bar' : gap === 1 ? 'a few grades short' : 'not there yet';
  }

  function matches(p, n) {
    const sc = sectorScores(p);
    const max = Math.max(1, ...Object.values(sc));
    const order = Object.keys(sc).sort((a, b) => sc[b] - sc[a]);
    const m = new Date().getMonth() + 1;
    const sizeWant = p.size === 'Big names' ? 'big' : p.size === 'Smaller or regional firms' ? 'mid' : null;
    return SCHEMES.map(s => {
      const f = fitOf(p, s);
      const total = (sc[s.sector] / max) * 4 - Math.max(0, f.gap) * 1.1 + (f.gap <= 0 ? 0.6 : 0) + (sizeWant && s.size === sizeWant ? 0.4 : 0) + (inWindow(m, s.open) ? 0.2 : 0);
      const reasons = [];
      if (s.sector === order[0] && p.tue) reasons.push('Fits what you said you\'d enjoy: ' + p.tue.charAt(0).toLowerCase() + p.tue.slice(1) + '.');
      else if (s.sector === order[1]) reasons.push('In your second-best sector, ' + s.sector.toLowerCase() + '.');
      if (f.known) reasons.push(f.gap <= 0 ? 'Asks for ' + s.bar + '. Your predictions meet it.' : f.gap === 1 ? 'Asks for ' + s.bar + '. You\'re about one step short' + (f.gcseShort ? ' on GCSEs' : '') + '.' : 'Asks for ' + s.bar + '. A stretch on current predictions.');
      if (s.needs && f.hasNeed) reasons.push('Wants ' + s.needs.filter(x => p.subjects.includes(x))[0] + ', which you take.');
      if (s.needs && !f.hasNeed && p.subjects.length) reasons.push('Usually wants ' + listText(s.needs.slice(0, 2)) + '. You haven\'t listed either.');
      if (inWindow(m, s.open)) reasons.push('Window open now: ' + s.win + '.');
      const fit = !f.known ? 'Check grades' : f.gap <= 0 ? 'Strong fit' : f.gap === 1 ? 'Reach' : 'Stretch';
      return { ...s, total, gap: f.gap, fit, reasons: reasons.slice(0, 3), unverified: false };
    }).sort((a, b) => b.total - a.total).slice(0, n || 5);
  }

  const WORRY = {
    'My grades': 'Grades get you past the first filter. They don\'t get you the offer. Apply first to the schemes in your list where you already meet the bar, then add one or two reaches. KPMG and Accenture both say to apply if you\'re slightly short and have a reason; several others filter automatically, so check before you spend an evening on a form. If your predictions are the problem, ask each teacher what one thing would move you up a grade and do it before predictions are sent.',
    'No experience': 'Most applicants at 17 don\'t have much, and employers know it. What they look for is something you did on purpose: a Saturday job, a club you kept going, a project you finished. A one-day insight event or a free virtual work experience programme counts and takes a weekend. Do one before your first application so you have something to say about the sector as well as school.',
    'Online tests': 'Online tests end more applications than anything else, and they\'re the most trainable part of the process. Practise timed, 20 minutes at a time, three times a week for three weeks before your first real one. Do the employer\'s own practice test when they send it, because formats differ. Sit the real one somewhere quiet, with paper and a calculator.',
    'Interviews': 'Interviews are a skill, and the only way to get better is to hear yourself. Record answers to five common questions on your phone and watch them back: why this sector, why this firm, a time you worked in a team, a time something went wrong, something you\'re proud of. Use situation, task, action, result, and spend most of the time on what you did.',
    'Picking the right sector': 'You don\'t need to be certain yet. Apply to two sectors: your best fit and your second. The assessment process tells you a lot about a firm, and most people work out what they like while doing it. What hurts is spreading across five sectors with generic answers.',
    'My parents are unsure': 'A degree apprenticeship ends in the same bachelor\'s degree, with tuition paid and a salary from the first day, so there\'s no student loan for fees. The trade-off is less of the student lifestyle and a job from 18. Send them the PDF of this report; it lists the schemes, the dates and what you\'re doing each month, which is usually what parents want to see.',
    'Something else': 'Bring it to the free discovery call. It\'s 30 minutes and you can ask anything about your applications.'
  };

  function prepOf(p) {
    const done = t => p.tests.includes(t);
    return [
      { key: 'form', stage: 'Application form', status: done('Had an offer') ? 'Done before' : 'Everyone starts here', tips: ['Write six stories first: working in a team, leading something, a problem you solved, a mistake, why this sector, why this firm. Adapt them for each form.', 'Name something specific about the firm: a client, a deal, a product. Generic answers are the easiest to reject.', 'Get one adult who isn\'t family to read it before you send.'] },
      { key: 'tests', stage: 'Online tests', status: done('Online tests (numerical, verbal, logic)') || done('Situational judgement test') ? 'Done before' : 'New to you', tips: ['Practise timed: 20 minutes, three times a week, for three weeks before your first application.', 'Do the employer\'s own practice test. Formats differ between firms.', 'For situational judgement tests, pick the answer that fits the firm\'s published values.'] },
      { key: 'video', stage: 'Video interview', status: done('Video interview') ? 'Done before' : 'New to you', tips: ['Record yourself answering five common questions and watch it back once.', 'Look at the camera, not your face on screen.', 'Situation, task, action, result. Spend most of the time on the action.'] },
      { key: 'centre', stage: 'Assessment centre', status: done('Assessment centre') ? 'Done before' : 'New to you', tips: ['In the group task, keep time and bring quieter people in. Assessors notice who makes the group better.', 'Read business news for ten minutes a day for two weeks before, and have three stories about your sector ready.', 'Prepare two questions you actually want answered.'] }
    ];
  }

  function backupsOf(p, sector, standing) {
    const sl = sector.toLowerCase();
    const list = [
      { title: 'Level 4 and 5 higher apprenticeships', body: 'Lower entry bar, often two A-levels or any Level 3. Several employers in ' + sl + ' let you move up to degree level once you\'re in.' },
      { title: 'School leaver programmes', body: 'Full-time roles with a professional qualification instead of a degree. PwC, for example, runs entry-level programmes that don\'t need a degree.' },
      { title: 'Sponsored degrees', body: 'University with paid placements and a firm behind you. PwC Flying Start is one, applied for through UCAS alongside your other choices.' },
      { title: 'University with a placement year', body: 'Keeps the door open, since many employers that take degree apprentices also hire placement students and graduates.' },
      { title: 'Apply again next cycle', body: 'A year of work plus better grades or a finished qualification makes a stronger second application. Several schemes, including Rolls-Royce, have no upper age limit.' }
    ];
    if (standing === 'on the bar') return [list[2], list[3], list[0]];
    if (standing === 'not there yet') return [list[0], list[1], list[4]];
    return [list[0], list[2], list[4]];
  }

  function planOf(p, ms) {
    const y12 = p.stage === 'Year 12';
    const now = new Date();
    const thin = expLevel(p) === 'none';
    const noTests = !real(p.tests).length;
    const Y13 = {
      9: ['Pick your first five schemes from your matches and note each window.', 'Write your six stories (see Application form below).'],
      10: ['Pick your first five schemes from your matches and note each window.', 'Write your six stories (see Application form below).'],
      11: ['Send your first two applications. Early ones get read before windows fill.', noTests ? 'Start online test practice: 20 minutes, three times a week.' : 'Keep online test practice going once a week.'],
      12: ['Record yourself answering five video-interview questions and watch it back.', 'Read business news for ten minutes a day. Keep three stories about your sector.'],
      1: ['Second wave of applications.', 'Keep one evening a week for applications so revision doesn\'t stop.'],
      2: ['Practise a group task with friends: one case, 20 minutes, one person timing.', 'Chase any application you haven\'t heard back on in four weeks.'],
      3: ['Assessment centres. Prepare two questions for each firm.', 'Debrief after each one: what went well, what to change next time.'],
      4: ['Offers arrive. Compare salary, location, the degree and what apprentices say on RateMyApprenticeship.', 'No offer yet? Apply to the rolling schemes and your backup routes now.'],
      5: ['Exams. Most offers depend on your grades, so these matter more than any application now.'],
      6: ['Exams.', 'Reply to every offer in writing. Decline the ones you won\'t take politely; you may apply to them again later.'],
      7: ['Accept one offer in writing.', 'Ask your employer what to read or set up before you start.'],
      8: ['Results day. If you miss a condition, phone the employer that day; some still take you.'],
    };
    const Y12 = {
      10: ['Choose two sectors to test: your best fit and your second.', thin ? 'Sign up for one free virtual work experience programme in your best-fit sector.' : 'Write down what you did in each role so far, with one number for each.'],
      11: ['Apply for spring insight days at two firms from your matches.'],
      12: ['Take on one role you can talk about: a club, a team, a tutoring slot or a Saturday job.'],
      1: ['Start a small project with a result you can measure.'],
      2: ['Apply for summer work experience now. Places go early.'],
      3: ['Do one online practice test a week so the format is familiar.'],
      4: ['Ask each teacher what one change would move your prediction up a grade.'],
      5: ['End-of-year exams. These usually set your predicted grades.'],
      6: ['Write your six stories while the year is fresh.'],
      7: ['Work experience or a summer job.'],
      8: ['Draft your application answers and get someone to read them.'],
      9: ['Windows open. Apply in the first week to schemes that close early.']
    };
    const base = y12 ? Y12 : Y13;
    const out = [];
    for (let i = 0; i < 12; i++) {
      const d = new Date(now.getFullYear(), now.getMonth() + i, 1);
      const m = d.getMonth() + 1;
      const items = [...(base[m] || (m === 9 && !y12 ? ['Start your apprenticeship.'] : []))];
      if (!y12) ms.forEach(s => { if (s.open && s.open[0] === m && !(i === 0 && false)) items.push('Apply: ' + s.emp + ', ' + s.scheme.split(' (')[0] + ' (' + s.win + ').'); if (i === 0 && inWindow(m, s.open) && s.open[0] !== m) items.push('Open now: ' + s.emp + ' (' + s.win + ').'); });
      if (y12 && m === 9) ms.slice(0, 3).forEach(s => items.push('Watch for: ' + s.emp + ', ' + s.win + '.'));
      if (items.length) out.push({ label: MONTHS[m - 1] + ' ' + d.getFullYear(), items, now: i === 0 });
    }
    return out;
  }

  function report(p) {
    const sc = sectorScores(p);
    const order = Object.keys(sc).sort((a, b) => sc[b] - sc[a]);
    const sector = order[0], also = order[1];
    const standing = standingOf(p, sector);
    const ms = matches(p, 5);
    const ex = expLevel(p);
    const tests = real(p.tests);
    const sl = sector.toLowerCase();
    const gradeLine = {
      'on the bar': 'your predicted grades meet the usual bar',
      'a few grades short': 'your predictions are about one step below the usual bar',
      'not there yet': 'the usual bar is above your predictions right now',
      'grades not entered': 'you haven\'t got predictions yet, so the grade check is open'
    }[standing];
    const expLine = { none: 'You haven\'t listed work experience or roles yet. That\'s the gap most applicants have and the quickest to close: one insight day and one role you can talk about, before your first application.', some: 'You have something to talk about already. The job now is turning it into answers that say what you did and what changed because of it.', strong: 'You\'ve done more than most applicants. Use it in every answer, with numbers.' }[ex];
    const testLine = tests.length ? 'You\'ve sat ' + listText(tests.filter(t => t !== 'Had an offer').map(t => t.split(' (')[0].toLowerCase())) + ' before, so the format won\'t be new.' : 'You haven\'t sat an online test or video interview yet. That\'s where most applications end, so practise before the real one.';
    return {
      sector, also, standing, standingIdx: { 'not there yet': 0, 'a few grades short': 1, 'on the bar': 2 }[standing] ?? -1,
      headline: sector + ', and you\'re ' + standing + '.',
      read: sector + ' is your best fit and ' + gradeLine + '. ' + expLine + ' ' + testLine,
      matches: ms,
      plan: planOf(p, ms),
      prep: prepOf(p),
      worry: p.worry ? { q: p.worry === 'Something else' && p.worryNote ? p.worryNote : p.worry, body: WORRY[p.worry] || WORRY['Something else'] } : null,
      backups: backupsOf(p, sector, standing),
      source: 'rules', checked: CHECKED
    };
  }

  function profileText(p) {
    return [
      'Stage: ' + (p.stage || '?'), 'Qualifications: ' + (p.quals || '?'), 'Subjects: ' + (p.subjects.join(', ') || '?') + (p.other ? ' (other: ' + p.other + ')' : ''),
      'Predicted grades: ' + (p.grades || '?'), 'GCSE Maths: ' + (Q.gcse[p.maths] || '?') + ', English: ' + (Q.gcse[p.english] || '?'),
      'Work experience: ' + (p.exp.join(', ') || 'none'), 'Outside lessons: ' + (p.extras.join(', ') || 'none'), 'Done before: ' + (p.tests.join(', ') || 'none'),
      'Would enjoy: ' + (p.tue || '?'), 'Employer preference: ' + (p.size || '?'), 'Biggest worry: ' + (p.worry || '?') + (p.worryNote ? ' — "' + p.worryNote + '"' : '')
    ].join('\n');
  }

  const STYLE = 'Write in plain British English for a 17-year-old. Neutral, direct, specific. Short sentences mixed with longer ones. Use contractions. No em dashes. Never use: delve, dive into, underscore, harness, navigate, leverage, foster, robust, comprehensive, seamless, journey, unlock, empower, pivotal, crucial, landscape, realm, "not just X but Y", "it\'s important to note". No exclamation marks. No praise or encouragement filler. Every sentence must be advice they can act on or a fact about their situation.';

  const clean = s => String(s).replace(/\s*[—–]\s*/g, ', ').replace(/,\s*,/g, ',').trim();
  async function aiEnhance(p, rep) {
    if (!window.claude || !window.claude.complete) throw new Error('no ai');
    const schemeList = rep.matches.map(s => s.id + ': ' + s.emp + ', ' + s.scheme + ' | bar: ' + s.bar + ' | window: ' + s.win + ' | fit: ' + s.fit).join('\n');
    const months = rep.plan.map(x => x.label).join(', ');
    const prompt = 'Student profile:\n' + profileText(p) + '\n\nBest-fit sector: ' + rep.sector + ' (standing: ' + rep.standing + '). Second: ' + rep.also + '.\n\nTheir top matched schemes (verified data, checked ' + CHECKED + '):\n' + schemeList +
      '\n\nReturn ONLY a JSON object with these keys:\n' +
      '"read": 3 or 4 sentences: an honest assessment of their chances and the single most useful thing to do first, referring to their actual answers.\n' +
      '"reasons": object keyed by scheme id above, each an array of 2 short reasons (max 18 words each) why that scheme fits or what to watch for, specific to this student.\n' +
      '"worry": 3 to 5 sentences answering their biggest worry directly' + (p.worryNote ? ' (they wrote: "' + p.worryNote + '")' : '') + '.\n' +
      '"plan": array of exactly ' + rep.plan.length + ' objects {"label","items"} for these months in order: ' + months + '. items: 1 to 3 concrete actions, max 22 words each. Use the scheme windows above in the right months. ' + (p.stage === 'Year 12' ? 'They apply next cycle; this year is for experience and grades.' : 'They apply this cycle for a September start.') + '\n' +
      '"prep": object with keys form, tests, video, centre; each an array of 2 tips tailored to what they have and have not done before.\n' +
      '"extra": array of 0 to 2 other UK degree apprenticeship schemes NOT in the list above that suit this student' + (p.size === 'Smaller or regional firms' ? ' (prefer smaller or regional employers)' : '') + ', each {"emp","scheme","sector","why"}. Only name real schemes you are confident exist. Do not give dates or grades for these.\n' +
      'Do not invent dates or entry requirements for listed schemes; use only the data above.';
    const call = window.claude.complete({ system: STYLE, max_tokens: 3200, messages: [{ role: 'user', content: prompt }] });
    const text = await Promise.race([call, new Promise((_, rej) => setTimeout(() => rej(new Error('timeout')), 30000))]);
    const j = JSON.parse(String(text).slice(String(text).indexOf('{'), String(text).lastIndexOf('}') + 1));
    const out = { ...rep, source: 'ai' };
    if (typeof j.read === 'string' && j.read.length > 40) out.read = clean(j.read);
    if (j.reasons && typeof j.reasons === 'object') out.matches = rep.matches.map(s => Array.isArray(j.reasons[s.id]) && j.reasons[s.id].length ? { ...s, reasons: j.reasons[s.id].slice(0, 3).map(clean) } : s);
    if (typeof j.worry === 'string' && out.worry) out.worry = { ...out.worry, body: clean(j.worry) };
    if (Array.isArray(j.plan) && j.plan.length === rep.plan.length) out.plan = rep.plan.map((m, i) => Array.isArray(j.plan[i].items) && j.plan[i].items.length ? { ...m, items: j.plan[i].items.slice(0, 3).map(clean) } : m);
    if (j.prep && typeof j.prep === 'object') out.prep = rep.prep.map(s => Array.isArray(j.prep[s.key]) && j.prep[s.key].length ? { ...s, tips: j.prep[s.key].slice(0, 3).map(clean) } : s);
    if (Array.isArray(j.extra)) out.matches = out.matches.concat(j.extra.slice(0, 2).filter(x => x && x.emp && x.scheme).map((x, i) => ({ id: 'ai-' + i, emp: String(x.emp), scheme: String(x.scheme), sector: String(x.sector || ''), bar: '', win: '', fit: 'Unverified', reasons: [String(x.why || '')], unverified: true })));
    return out;
  }

  // Free-text questions in chat: short answer, then the chat re-asks.
  async function askAdvisor(p, question) {
    if (!window.claude || !window.claude.complete) throw new Error('no ai');
    const call = window.claude.complete({ system: STYLE + ' You are the DegreeYourWay Pathfinder, answering a student mid-questionnaire about UK degree apprenticeships. Answer in at most 3 sentences. If you are unsure of a fact, say to check the employer\'s page. Never give dates or grade requirements for specific schemes.', max_tokens: 300, messages: [{ role: 'user', content: 'What I\'ve told you so far:\n' + profileText(p) + '\n\nMy question: ' + question }] });
    return clean(await Promise.race([call, new Promise((_, rej) => setTimeout(() => rej(new Error('timeout')), 15000))]));
  }

  function leadFields(p, rep) {
    return {
      result: rep.headline, also: rep.also, advice_source: rep.source,
      year: p.stage, quals: p.quals, subjects: p.subjects.join(', ') + (p.other ? ' (' + p.other + ')' : ''), grades: p.grades,
      gcse_maths: Q.gcse[p.maths], gcse_english: Q.gcse[p.english], tuesday: p.tue,
      experience: p.exp.join(', '), extras: p.extras.join(', '), tests_done: p.tests.join(', '), firm_size: p.size, worry: p.worry, worry_note: p.worryNote,
      top_matches: rep.matches.filter(m => !m.unverified).map(m => m.emp + ' ' + m.scheme.split(' (')[0]).join('; ')
    };
  }

  function wa(text) { return 'https://wa.me/' + WA + '?text=' + encodeURIComponent(text); }

  function pdf(rep, name) {
    const esc = t => String(t == null ? '' : t).replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[c]);
    const rows = rep.matches.map((s, i) => '<tr><td class="n">0' + (i + 1) + '</td><td><b>' + esc(s.emp) + '</b><br>' + esc(s.scheme) + (s.unverified ? '<br><i>Suggested, not checked by us. Check the employer\'s page.</i>' : '') + '</td><td>' + esc(s.bar) + (s.win ? '<br>' + esc(s.win) : '') + '</td><td><b>' + esc(s.fit) + '</b><br>' + s.reasons.map(esc).join('<br>') + '</td></tr>').join('');
    const plan = rep.plan.map(m => '<li><span>' + esc(m.label) + '</span><div>' + m.items.map(esc).join('<br>') + '</div></li>').join('');
    const prep = rep.prep.map(s => '<li><span>' + esc(s.stage) + '<br><i>' + esc(s.status) + '</i></span><div>' + s.tips.map(esc).join('<br>') + '</div></li>').join('');
    const back = rep.backups.map(b => '<li><span>' + esc(b.title) + '</span><div>' + esc(b.body) + '</div></li>').join('');
    const SC = 'scr' + 'ipt';
    const doc = '<!doctype html><html><head><meta charset="utf-8"><title>DegreeYourWay Pathfinder report</title>' +
      '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Newsreader:opsz,wght@6..72,400&family=Source+Sans+3:wght@400;600&display=swap">' +
      '<style>@page{size:A4;margin:16mm}body{font-family:"Source Sans 3",sans-serif;color:#30202A;margin:0;font-size:10.5pt;line-height:1.5}h1,h2{font-family:Newsreader,serif;font-weight:400;margin:0}h1{font-size:26pt;line-height:1.05}h2{font-size:15pt;margin:20pt 0 6pt;break-after:avoid}.k{font-size:8pt;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:#716769}.bar{height:3pt;background:#823D48;width:40pt;margin:10pt 0 12pt}p{margin:6pt 0;color:#51444A}table{width:100%;border-collapse:collapse}td{padding:6pt 8pt 6pt 0;border-top:.6pt solid #D7CFC6;vertical-align:top;font-size:9.5pt}td.n{color:#716769;font-weight:600;width:18pt}i{color:#716769}ul{list-style:none;padding:0;margin:0}li{display:flex;gap:12pt;padding:6pt 0;border-top:.6pt solid #D7CFC6;break-inside:avoid}li span{font-weight:600;min-width:90pt;max-width:90pt}.call{margin-top:20pt;background:#30202A;color:#F4EFE6;padding:14pt 16pt;break-inside:avoid}.call h2{margin:0 0 4pt;color:#F4EFE6}.call p{color:#E4DCD9;margin:0}.foot{margin-top:14pt;font-size:8pt;color:#716769}</style></head><body>' +
      '<div class="k">DegreeYourWay Pathfinder' + (name ? ' · Prepared for ' + esc(name) : '') + '</div><div class="bar"></div>' +
      '<h1>' + esc(rep.headline) + '</h1><p>' + esc(rep.read) + '</p><p><span class="k">Also a fit</span>&nbsp; ' + esc(rep.also) + '</p>' +
      '<h2>Your matches, ranked</h2><table>' + rows + '</table>' +
      '<h2>Your 12 months</h2><ul>' + plan + '</ul>' +
      '<h2>Stage by stage</h2><ul>' + prep + '</ul>' +
      (rep.worry ? '<h2>' + esc(rep.worry.q) + '</h2><p>' + esc(rep.worry.body) + '</p>' : '') +
      '<h2>If it doesn\'t go to plan</h2><ul>' + back + '</ul>' +
      '<div class="call"><h2>Free discovery call, 30 minutes</h2><p>Talk this report through with Shreyash Singh, who got offers from Deloitte, Goldman Sachs, PwC and Accenture. WhatsApp: 07463 870657. The DegreeYourWay course prepares you for every stage above.</p></div>' +
      '<div class="foot">Entry bars and dates checked ' + CHECKED + '. Always check the employer\'s page. Employers make every hiring decision.</div>' +
      '<' + SC + '>document.fonts.ready.then(function(){setTimeout(function(){window.print()},300)})</' + SC + '></body></html>';
    const w = window.open('', '_blank');
    if (w && w.document) { w.document.open(); w.document.write(doc); w.document.close(); }
    else { const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([doc], { type: 'text/html' })); a.download = 'DegreeYourWay Pathfinder report.html'; a.click(); }
  }

  // Lead store shared by both directions. Each DC's saveLead(source, fields) calls this.
  function storeLead(source, fields, endpoint) {
    const q = new URLSearchParams(window.location.search);
    const lead = { source, ...fields, page: 'quiz', referrer: document.referrer || '', utm_source: q.get('utm_source') || '', utm_medium: q.get('utm_medium') || '', utm_campaign: q.get('utm_campaign') || '', at: new Date().toISOString() };
    try { const L = JSON.parse(localStorage.getItem('gi_leads') || '[]'); L.push(lead); localStorage.setItem('gi_leads', JSON.stringify(L)); } catch (e) {}
    (window.dataLayer = window.dataLayer || []).push({ event: 'lead_' + source, page: 'quiz' });
    if (!endpoint) return Promise.resolve(lead);
    return fetch(endpoint, { method: 'POST', mode: 'no-cors', keepalive: true, headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify(lead) }).then(() => lead);
  }
  const push = event => (window.dataLayer = window.dataLayer || []).push({ event, page: 'quiz' });

  // ---------- CV gap check ----------
  const COURSE = {
    price: '£595', full: '£695', deposit: '£100', seats: 10,
    parts: {
      evidence: { part: 'Two application reviews + the Deadline Line', what: 'We rewrite your answers with you, then you can WhatsApp us until your last application closes.' },
      application: { part: 'Two application reviews', what: 'Your real forms, reviewed line by line before you send them.' },
      tests: { part: 'Timed online tests', what: 'Full tests in the formats employers use, scored, with the mistakes explained.' },
      video: { part: 'Scored video interview', what: 'A recorded mock, scored the way employers score it.' },
      centre: { part: 'Full mock assessment centre', what: 'Group task, case study and interview, run the way employers run them.' }
    },
    guarantee: [
      'Your £100 deposit is refundable until the balance is due.',
      'After the course we re-review your CV for free.',
      'Attend everything, apply to three schemes, and if there\'s no offer within 12 months, the next course is free.'
    ]
  };
  const NO_CV_QS = [
    { id: 'team', label: 'Your best example of working in a team', ph: 'e.g. Saturday shifts at a café, five of us covering the till and the floor' },
    { id: 'led', label: 'Something you led, started or organised', ph: 'e.g. ran the Year 9 maths club for a term, 12 students' },
    { id: 'wrong', label: 'A time something went wrong, and what you did', ph: 'e.g. our enterprise stall lost money in week one, so we…' },
    { id: 'why', label: 'Why this sector?', ph: 'One or two sentences in your own words' }
  ];

  async function readCvFile(file) {
    const name = (file.name || '').toLowerCase();
    if (file.size > 8 * 1024 * 1024) throw new Error('too big');
    if (name.endsWith('.txt')) return { text: await file.text() };
    if (name.endsWith('.pdf')) {
      // PORT: without AI the design could not read PDFs, so the check ran on an empty CV. Read the
      // text in the browser with pdf.js instead; nothing leaves the device until the visitor sends it.
      const pdfjs = await import('pdfjs-dist');
      pdfjs.GlobalWorkerOptions.workerSrc = '/vendor/pdf.worker.min.mjs';
      const doc = await pdfjs.getDocument({ data: new Uint8Array(await file.arrayBuffer()) }).promise;
      const pages = [];
      for (let i = 1; i <= Math.min(doc.numPages, 10); i++) {
        const c = await (await doc.getPage(i)).getTextContent();
        pages.push(c.items.map(it => ('str' in it ? it.str : '') + (it.hasEOL ? '\n' : ' ')).join(''));
      }
      const text = pages.join('\n').replace(/[ \t]+/g, ' ').replace(/\n{3,}/g, '\n\n').trim();
      if (!text) throw new Error('pdf no text');
      return { text };
    }
    if (name.endsWith('.docx')) {
      const buf = new Uint8Array(await file.arrayBuffer());
      const dv = new DataView(buf.buffer);
      let eocd = -1; for (let i = buf.length - 22; i >= 0; i--) if (dv.getUint32(i, true) === 0x06054b50) { eocd = i; break; }
      if (eocd < 0) throw new Error('bad docx');
      let off = dv.getUint32(eocd + 16, true); const n = dv.getUint16(eocd + 10, true);
      for (let k = 0; k < n; k++) {
        const method = dv.getUint16(off + 10, true), csize = dv.getUint32(off + 20, true), fl = dv.getUint16(off + 28, true), el = dv.getUint16(off + 30, true), cl = dv.getUint16(off + 32, true), lho = dv.getUint32(off + 42, true);
        const fname = new TextDecoder().decode(buf.subarray(off + 46, off + 46 + fl));
        if (fname === 'word/document.xml') {
          const lfl = dv.getUint16(lho + 26, true), lel = dv.getUint16(lho + 28, true);
          const data = buf.subarray(lho + 30 + lfl + lel, lho + 30 + lfl + lel + csize);
          let xml;
          if (method === 0) xml = new TextDecoder().decode(data);
          else xml = await new Response(new Blob([data]).stream().pipeThrough(new DecompressionStream('deflate-raw'))).text();
          return { text: xml.replace(/<\/w:p>/g, '\n').replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/\n{3,}/g, '\n\n').trim() };
        }
        off += 46 + fl + el + cl;
      }
      throw new Error('bad docx');
    }
    throw new Error('type');
  }

  const SECTOR_WORDS = {
    'Finance and banking': ['bank', 'finance', 'invest', 'market', 'trading', 'money', 'economics'],
    'Accountancy and consulting': ['account', 'audit', 'tax', 'consult', 'business', 'budget', 'finance'],
    'Technology': ['code', 'coding', 'python', 'java', 'software', 'website', 'app', 'computer', 'program'],
    'Engineering': ['engineer', 'build', 'design', 'cad', 'robot', 'physics', 'mechanic', 'electronic'],
    'Law': ['law', 'legal', 'debate', 'argue', 'court', 'mock trial', 'solicitor'],
    'Health and public service': ['care', 'volunteer', 'health', 'nhs', 'help', 'community', 'patient']
  };

  function ruleGaps(p, rep, text) {
    const t = (text || '').toLowerCase();
    const words = t.split(/\s+/).filter(Boolean).length;
    const has = arr => arr.some(w => t.includes(w));
    const nums = (t.replace(/\b(19|20)\d{2}\b/g, '').match(/\d+%?/g) || []).length;
    const lead = has(['led', 'lead', 'captain', 'founded', 'organised', 'organized', 'ran ', 'started', 'president', 'head ', 'prefect', 'chair']);
    const work = has(['shift', 'job', 'worked', 'retail', 'waiter', 'waitress', 'cashier', 'assistant', 'internship', 'work experience', 'placement']);
    const sector = has(SECTOR_WORDS[rep.sector] || []);
    const done = x => p.tests.includes(x);
    const strengths = [], gaps = [];
    if (work) strengths.push('Paid or real work experience you can talk about.');
    if (lead) strengths.push('Evidence you\'ve led or started something.');
    if (nums >= 2) strengths.push('Uses numbers to show results.');
    if (sector) strengths.push('Something that links you to ' + rep.sector.toLowerCase() + '.');
    if (words < 120) gaps.push({ area: 'application', title: 'Not enough on the page yet', detail: 'Under 120 words of content. Application forms ask for examples, and right now there aren\'t enough to draw on.' });
    if (nums < 2) gaps.push({ area: 'evidence', title: 'No results with numbers', detail: 'Say what changed because of you: how many people, how much money, how long. Assessors score evidence, not duties.' });
    if (!lead) gaps.push({ area: 'evidence', title: 'Nothing you\'ve led', detail: 'Most schemes score leadership. A club, a shift you ran, a project you started all count if you describe what you did.' });
    if (!sector) gaps.push({ area: 'application', title: 'Nothing links you to ' + rep.sector.toLowerCase(), detail: 'Your top match will ask why this sector. Add one thing you\'ve done, read or built that shows the interest is real.' });
    if (!done('Online tests (numerical, verbal, logic)')) gaps.push({ area: 'tests', title: 'Online tests not practised', detail: 'You haven\'t sat one yet. They\'re where most applications end, before anyone reads your CV.' });
    if (!done('Video interview')) gaps.push({ area: 'video', title: 'No video interview practice', detail: 'Usually the second filter. Thirty seconds to think, two minutes to answer, no second take.' });
    if (!done('Assessment centre')) gaps.push({ area: 'centre', title: 'No assessment centre experience', detail: 'The final stage for most schemes, and the hardest to practise on your own.' });
    if (!strengths.length) strengths.push('You\'ve started early, which is the one thing you can\'t make up later.');
    return { strengths: strengths.slice(0, 3), gaps: gaps.slice(0, 5), source: 'rules' };
  }

  async function cvGaps(p, rep, input) {
    const text = input.text || '';
    const base = ruleGaps(p, rep, text);
    if (!window.claude || !window.claude.complete) return base;
    const top = rep.matches.filter(m => !m.unverified).slice(0, 3).map(m => m.emp + ', ' + m.scheme + ' (bar: ' + m.bar + ')').join('; ');
    const prompt = 'Student profile:\n' + profileText(p) + '\nBest-fit sector: ' + rep.sector + '. Top matches: ' + top + '.\n\n' +
      (input.pdf ? 'Their CV is attached as a PDF.' : (input.fromQs ? 'They have no CV. Their answers:\n' : 'Their CV:\n') + text.slice(0, 9000)) +
      '\n\nCompare their CV with what these schemes screen for. Return ONLY JSON: {"strengths": [2 or 3 short specific strengths, max 16 words each, quoting their own examples], "gaps": [3 to 5 objects {"area": one of "evidence","application","tests","video","centre", "title": max 7 words, "detail": one or two sentences, specific to their CV}]}. Include a tests, video or centre gap only if their profile says they have not done it. Be direct. Do not invent anything not in the CV.';
    const content = input.pdf ? [{ type: 'document', source: { type: 'base64', media_type: 'application/pdf', data: input.pdf } }, { type: 'text', text: prompt }] : prompt;
    const call = window.claude.complete({ system: STYLE, max_tokens: 1400, messages: [{ role: 'user', content }] });
    const out = await Promise.race([call, new Promise((_, rej) => setTimeout(() => rej(new Error('timeout')), 30000))]);
    const j = JSON.parse(String(out).slice(String(out).indexOf('{'), String(out).lastIndexOf('}') + 1));
    const gaps = (j.gaps || []).filter(g => g && COURSE.parts[g.area] && g.title).slice(0, 5).map(g => ({ area: g.area, title: String(g.title), detail: String(g.detail || '') }));
    if (!gaps.length) return base;
    return { strengths: (j.strengths || []).slice(0, 3).map(clean), gaps: gaps.map(g => ({ ...g, title: clean(g.title), detail: clean(g.detail) })), source: 'ai' };
  }

  const DEMO = { stage: 'Year 13', quals: 'A-levels', subjects: ['Maths', 'Economics', 'Business'], other: '', grades: 'Mostly A and B', maths: 1, english: 3, exp: ['Part-time job'], extras: ['Sports team', 'Volunteering'], tests: ['None yet'], tue: 'Work out why a business is losing money', size: 'Big names', worry: 'Online tests', worryNote: '' };

  return { Q, QUESTIONS, PARTS, SECTORS, SCHEMES, CHECKED, blank, answered, report, matches, aiEnhance, askAdvisor, leadFields, wa, pdf, storeLead, push, listText, DEMO, COURSE, NO_CV_QS, readCvFile, ruleGaps, cvGaps };
})();

export default PF;
