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

  // Subjects by qualification type: 'a' A-level, 'btec' BTEC, 't' T-level.
  const SUBJECTS = {
    a: [
      ['Maths and sciences', ['Maths', 'Further Maths', 'Physics', 'Chemistry', 'Biology', 'Computer Science']],
      ['Business and money', ['Economics', 'Business', 'Accounting']],
      ['Humanities and languages', ['English', 'History', 'Politics', 'Law', 'Psychology', 'Sociology', 'Geography', 'A language']],
      ['Creative and technical', ['Design and Technology', 'Art or Design', 'Other']]
    ],
    btec: [['BTECs', ['Business (BTEC)', 'IT (BTEC)', 'Engineering (BTEC)', 'Applied Science (BTEC)', 'Health and Social Care (BTEC)', 'Sport (BTEC)', 'Other BTEC']]],
    t: [['T-levels', ['Digital (T-level)', 'Engineering (T-level)', 'Finance or Accounting (T-level)', 'Legal Services (T-level)', 'Health or Science (T-level)', 'Management and Administration (T-level)', 'Other T-level']]]
  };
  const KIND_OF = {};
  Object.keys(SUBJECTS).forEach(k => SUBJECTS[k].forEach(([, list]) => list.forEach(s => { KIND_OF[s] = k; })));
  const groupsFor = quals => quals === 'BTEC' ? SUBJECTS.btec : quals === 'T-level' ? SUBJECTS.t : quals === 'A mix' ? SUBJECTS.a.concat(SUBJECTS.btec) : SUBJECTS.a;
  // Grades and UCAS tariff points per A-level-sized unit. A T-level is three units (D* = 168 in all).
  const SCALES = {
    a: { grades: ['A*', 'A', 'B', 'C', 'D', 'E'], names: ['A*', 'A', 'B', 'C', 'D', 'E'], pts: [56, 48, 40, 32, 24, 16] },
    btec: { grades: ['D*', 'D', 'M', 'P'], names: ['Distinction*', 'Distinction', 'Merit', 'Pass'], pts: [56, 48, 32, 16] },
    t: { grades: ['D*', 'D', 'M', 'P'], names: ['Distinction*', 'Distinction', 'Merit', 'Pass'], pts: [56, 48, 40, 32] }
  };
  // A BTEC's size, in A-levels. For a Diploma or Extended Diploma the student picks their most common grade.
  const BTEC_SIZES = [[1, 'Ext. Certificate'], [2, 'Diploma'], [3, 'Ext. Diploma']];

  const left = p => p.stage === 'Left school';
  const NO_IDEA = 'Honestly, no idea yet';
  // Things a 17-year-old has actually done or would choose, each pointing at the sectors it suggests.
  const LIKES = [
    { label: 'I end up sorting out the money or the plan', why: 'you sort out the money and the plan', w: { 'Accountancy and consulting': 3, 'Finance and banking': 2 } },
    { label: 'I follow business, money or markets news', why: 'you follow business and the markets', w: { 'Finance and banking': 4, 'Accountancy and consulting': 1 } },
    { label: 'I take things apart, fix them or build things', why: 'you like building and fixing things', w: { 'Engineering': 4 } },
    { label: "I've made a website, game, app or mod", why: "you've already made things with code", w: { 'Technology': 4 } },
    { label: 'I like puzzles, logic problems or maths challenges', why: 'you like logic problems', w: { 'Technology': 2, 'Engineering': 1, 'Finance and banking': 1, 'Accountancy and consulting': 1 } },
    { label: 'I win arguments, or like writing essays that persuade', why: 'you like making a case', w: { 'Law': 4 } },
    { label: 'I follow court cases, crime or politics', why: 'you follow how rules and justice work', w: { 'Law': 3, 'Health and public service': 1 } },
    { label: "People come to me when something's wrong", why: 'people come to you for help', w: { 'Health and public service': 4 } },
    { label: "I'd like a job where I keep people safe", why: 'you want to keep people safe', w: { 'Health and public service': 4 } },
    { label: 'I like organising people and running things', why: 'you like organising and running things', w: { 'Accountancy and consulting': 3, 'Finance and banking': 1 } },
    { label: 'I care about energy, transport or the environment', why: 'you care about energy, transport and the environment', w: { 'Engineering': 3, 'Health and public service': 1 } },
    { label: 'I like drawing, designing or making things look good', why: 'you like design', w: { 'Engineering': 2, 'Technology': 2 } },
    { label: NO_IDEA, why: '', w: {} }
  ];

  const Q = {
    stage: ['Year 12', 'Year 13', 'Left school'],
    now: ['Working full-time', 'Working part-time', 'At college', 'Started university and left', 'Taking a gap year', 'Something else'],
    age: ['18', '19', '20', '21', '22', '23 or over'],
    quals: ['A-levels', 'BTEC', 'T-level', 'A mix'],
    gcse: ['9', '8', '7', '6', '5', '4', '3 or below'],
    exp: ['Part-time job', 'Full-time job', 'Work experience week', 'Insight day or virtual programme', 'Internship', 'My own project or business', 'None yet'],
    extras: ['Sports team', 'Captain, prefect or head student', 'Ran a club or society', 'Volunteering', 'Music, drama or art', 'Competitions (debate, maths, enterprise)', 'Coding or making things', 'None yet'],
    tests: ['Online tests (numerical, verbal, logic)', 'Situational judgement test', 'Video interview', 'Assessment centre', 'Had an offer', 'None yet'],
    likes: LIKES.map(l => l.label),
    size: ['Well-known firms', 'Smaller or local firms', 'No preference'],
    worry: ['My grades', 'No experience', 'Online tests', 'Interviews', 'Picking the right sector', 'My parents are unsure', 'Something else']
  };
  const LABELS = { 'Left school': "I've left school" };
  const SUBS = { 'Well-known firms': 'Big intakes, very competitive, often in London.', 'Smaller or local firms': 'Fewer applicants, often nearer home.' };

  // Questions in order. part: 0 About you, 1 What you've done, 2 What you want. `when` hides a
  // question for other paths; title, help and opts may depend on the answers so far.
  const QUESTIONS = [
    { id: 'stage', part: 0, kind: 'single', opts: Q.stage, title: 'Where are you now?', short: 'Where you are' },
    { id: 'now', part: 0, kind: 'single', opts: Q.now, when: left, title: 'What are you doing now?', short: 'Doing now' },
    { id: 'age', part: 0, kind: 'single', opts: Q.age, when: left, title: 'How old are you?', help: 'A few schemes have an upper age limit.', short: 'Age' },
    { id: 'quals', part: 0, kind: 'single', opts: Q.quals, title: p => left(p) ? 'What did you take after GCSEs?' : 'What are you taking?', short: 'Qualifications' },
    { id: 'subjects', part: 0, kind: 'subjects', title: p => left(p) ? 'Which subjects did you take?' : 'Which subjects are you taking?', help: 'Tap all that apply.', short: 'Subjects' },
    { id: 'grades', part: 0, kind: 'grades', title: p => left(p) ? 'What did you get?' : 'What are your predicted grades?', help: 'One tap for each subject.', short: 'Grades' },
    { id: 'gcse', part: 0, kind: 'gcse', title: 'Your GCSE Maths and English.', help: 'Several schemes check these automatically before anyone reads your application.', short: 'GCSE Maths and English' },
    { id: 'exp', part: 1, kind: 'multi', none: 'None yet', opts: p => (left(p) ? Q.exp : Q.exp.filter(x => x !== 'Full-time job')).filter(x => x !== 'None yet').concat(Q.extras), title: 'What have you done so far?', help: p => left(p) ? 'Pick everything that applies, including the job you have now.' : 'Pick everything that applies, in or out of school. A Saturday job counts.', short: 'Done so far' },
    { id: 'tests', part: 1, kind: 'multi', none: 'None yet', opts: Q.tests, title: 'Which of these have you done before?', help: 'In any application, for any employer.', short: 'Done before' },
    { id: 'likes', part: 2, kind: 'multi', none: NO_IDEA, max: 2, opts: Q.likes, title: 'Which of these sound like you?', help: "Pick up to two. If none of them fit, pick the last one.", short: 'Sounds like you' },
    { id: 'size', part: 2, kind: 'single', opts: Q.size, title: 'What kind of employer would you prefer?', short: 'Employer type' },
    { id: 'worry', part: 2, kind: 'single', opts: Q.worry, title: 'What worries you most about applying?', help: 'Your report answers this directly.', short: 'Biggest worry', note: true }
  ];
  const PARTS = ['About you', "What you've done", 'What you want'];
  const resolve = (v, p) => typeof v === 'function' ? v(p) : v;
  const questionsFor = p => QUESTIONS.filter(q => !q.when || q.when(p)).map(q => ({ ...q, title: resolve(q.title, p), help: resolve(q.help, p), opts: resolve(q.opts, p) }));

  // The usual entry bar per sector: UCAS points from the best three A-level-sized grades, and the
  // lower of GCSE Maths and English.
  const SECTORS = {
    'Finance and banking': { ucas: 120, gcse: 6 },
    'Accountancy and consulting': { ucas: 112, gcse: 5 },
    'Technology': { ucas: 120, gcse: 4 },
    'Engineering': { ucas: 112, gcse: 4 },
    'Law': { ucas: 136, gcse: 6 },
    'Health and public service': { ucas: 64, gcse: 4 }
  };

  // ucas: points needed (best three A-level-sized grades). Where the employer gives no number, an
  // estimate from the bar text. open: [first month, last month] of the window if known (1-12).
  // Options: needs (any one subject), subjMin (one of these subjects at this A-level grade),
  // minUnits (how many A-level-sized qualifications), maxAge, noBar (no minimum grades published).
  const S = (id, sector, emp, scheme, bar, ucas, gcse, win, o) => Object.assign({ id, sector, emp, scheme, bar, ucas, gcse, win, size: 'big', needs: null, open: null, stages: ['form', 'tests', 'video', 'centre'] }, o || {});
  const SCHEMES = [
    S('barclays', 'Finance and banking', 'Barclays', 'Business Banking, Level 6', 'BBB, GCSE Maths 6', 120, 6, '2027 intake closed 25 September 2026; usually opens in early September', { open: [9, 9] }),
    S('lloyds', 'Finance and banking', 'Lloyds', 'Apprenticeships', 'GCSE Maths and English 4', 0, 4, 'opens 3 November', { open: [11, 1] }),
    S('jpm-fs', 'Finance and banking', 'JPMorgan', 'Technology and Financial Services', 'BBB with Maths or Computing', 120, 4, 'not yet published', { needs: ['Maths', 'Further Maths', 'Computer Science', 'IT (BTEC)', 'Digital (T-level)'] }),
    S('gs-ficc', 'Finance and banking', 'Goldman Sachs', 'FICC and Equities degree apprenticeship (Applied Finance, Queen Mary)', 'Queen Mary entry requirements', 128, 5, '2027 intake opens autumn 2026', { open: [10, 1] }),
    S('deloitte', 'Accountancy and consulting', 'Deloitte', 'BrightStart', '104 UCAS points', 104, 4, 'not yet published, closes early'),
    S('kpmg', 'Accountancy and consulting', 'KPMG', 'Audit, Tax, Consulting, Technology', '120 UCAS points, GCSE Maths and English 5', 120, 5, 'final-stage days from 17 November', { open: [10, 11] }),
    S('ey', 'Accountancy and consulting', 'EY', 'Assurance, Consulting, Tax', 'three A-levels, GCSE Maths and English 4', 48, 4, 'not yet published', { minUnits: 3 }),
    S('pwc-fs', 'Accountancy and consulting', 'PwC', 'Flying Start Accounting (sponsored degree, not an apprenticeship)', 'AAB at Reading; varies by university', 136, 6, 'apply through UCAS; PwC results mid-March to early April', { open: [10, 1] }),
    S('amazon', 'Technology', 'Amazon', 'Software Development Engineer, Level 6', 'ABB with Maths or Computer Science', 128, 4, 'opens February', { open: [2, 3], needs: ['Maths', 'Further Maths', 'Computer Science'] }),
    S('jpm-tech', 'Technology', 'JPMorgan', 'Technology, Level 6', 'BBB with Maths or Computing', 120, 4, 'not yet published', { needs: ['Maths', 'Further Maths', 'Computer Science', 'IT (BTEC)', 'Digital (T-level)'] }),
    S('capgemini', 'Technology', 'Capgemini', 'Digital and Technology Solutions', 'three A-levels at C, seven GCSEs at 4', 96, 4, 'not yet published', { minUnits: 3 }),
    S('ibm', 'Technology', 'IBM', 'Digital and Technology Solutions, Level 6', '120 UCAS points (BBB), GCSE Maths and English 4', 120, 4, 'last cycle open for one week in February', { open: [2, 2] }),
    S('gs-eng', 'Technology', 'Goldman Sachs', 'Engineering degree apprenticeship (Queen Mary or Warwick)', 'university entry requirements', 128, 5, '2027 intake opens autumn 2026', { open: [10, 1] }),
    S('bae', 'Engineering', 'BAE Systems', 'Degree apprenticeships', '96 UCAS points, five GCSEs including Maths and English', 96, 4, 'opens January, six weeks', { open: [1, 2] }),
    S('jlr', 'Engineering', 'JLR', 'Level 6 Engineering', 'A-level Maths at B plus a STEM subject', 0, 4, 'not yet published', { needs: ['Maths', 'Further Maths'], subjMin: { subj: ['Maths', 'Further Maths'], min: 'B' }, minUnits: 2 }),
    S('networkrail', 'Engineering', 'Network Rail', 'Level 6 Engineering', 'BBC with Maths and a science, or DMM BTEC', 112, 4, 'not yet published', { needs: ['Maths', 'Further Maths', 'Engineering (BTEC)', 'Engineering (T-level)'] }),
    S('rr', 'Engineering', 'Rolls-Royce', 'Degree apprenticeships (engineering, digital, business)', 'A-levels or equivalent; some schemes ask for AAB', 128, 4, 'offers usually March to April', { needs: ['Maths', 'Further Maths', 'Physics', 'Engineering (BTEC)', 'Engineering (T-level)'] }),
    S('slaughter', 'Law', 'Slaughter and May', 'Solicitor apprenticeship', 'AAB, seven GCSEs at 6', 136, 6, '12 October to 6 January', { open: [10, 1] }),
    S('aos', 'Law', 'A&O Shearman', 'Solicitor apprenticeship', 'AAB, seven GCSEs at 6', 136, 6, '1 December to 17 February', { open: [12, 2] }),
    S('weightmans', 'Law', 'Weightmans', 'Solicitor apprenticeship', '120 UCAS points, five GCSEs at 4, aged 16 to 21', 120, 4, '28 September to 22 October', { open: [9, 10], size: 'mid', maxAge: 21 }),
    S('nhs', 'Health and public service', 'NHS', 'Registered Nurse Degree Apprenticeship', 'Level 3 plus Maths and English', 48, 4, 'trust by trust, all year', { size: 'mid' }),
    S('police', 'Health and public service', 'Police', 'Police Constable Degree Apprenticeship', 'two A-levels or Level 3, GCSE English 4', 32, 4, 'rolling', { size: 'mid', minUnits: 2 }),
    S('civil', 'Health and public service', 'Civil Service', 'Apprenticeships, Levels 2 to 7', '16 and over', 0, 4, 'advertised through the year'),
    // Added 12 October 2026, each checked against the employer's posting or a live listing for the
    // 2027 intake. Where no points are published, ucas is an estimate from the bar text (marked "est.").
    S('hsbc', 'Finance and banking', 'HSBC UK', 'Commercial or Retail Banking degree apprenticeship (BSc, University of Exeter)', 'BCC, five GCSEs including Maths and English at 4', 104, 4, 'listed on Find an Apprenticeship; November 2027 start'),
    S('natwest', 'Finance and banking', 'NatWest', 'Financial Services Professional degree apprenticeship (Level 6)', '80 UCAS points', 80, 0, '2027 dates not yet published; closes once the cohort is full'),
    S('barclays-tech', 'Technology', 'Barclays', 'Technology Developer degree apprenticeship (Digital and Technology Solutions)', 'BBB, GCSE Maths and English 4', 120, 4, '2027 intake closed 25 September 2026; usually opens in early September', { open: [9, 9] }),
    S('accenture', 'Technology', 'Accenture', 'Technology degree apprenticeship (software, data, cyber)', '104 UCAS points, five GCSEs including Maths and English at 4', 104, 4, 'Newcastle April 2027 intake closed 15 July 2026; check for other intakes'),
    S('intel', 'Technology', 'MI5, MI6 and GCHQ', 'Software Engineering degree apprenticeship (London or Manchester)', '96 UCAS points, GCSE Maths and English 4, British citizens only', 96, 4, 'opens 16 October 2026', { open: [10, 10] }),
    S('thales-sw', 'Technology', 'Thales', 'Software Engineering degree apprenticeship (Digital and Technology Solutions)', 'A-level Maths plus another STEM subject', 96 /* est. */, 0, 'closes 17 February 2027', { open: [10, 2], needs: ['Maths', 'Further Maths'], minUnits: 2 }),
    S('thales-sys', 'Engineering', 'Thales', 'Systems Engineering degree apprenticeship (Level 6)', 'A-level Maths plus another STEM subject', 96 /* est. */, 0, 'closes 17 February 2027', { open: [10, 2], needs: ['Maths', 'Further Maths'], minUnits: 2 }),
    S('airbus', 'Engineering', 'Airbus', 'Engineering degree apprenticeships (Broughton, Filton, Portsmouth)', '112 UCAS points with A-level Maths at B and Physics or Chemistry at C, or a Distinction Engineering BTEC; GCSE Maths and English 4', 112, 4, 'closes 26 October 2026', { open: [9, 10], needs: ['Maths', 'Further Maths', 'Engineering (BTEC)', 'Engineering (T-level)'], subjMin: { subj: ['Maths', 'Further Maths'], min: 'B' } }),
    S('nationalgrid', 'Engineering', 'National Grid', 'Degree apprenticeships (engineering and business, Level 6)', 'a Level 3 qualification (A-levels, BTEC or equivalent)', 48 /* est. */, 0, 'register interest; 2027 dates not yet published'),
    S('arup', 'Engineering', 'Arup', 'Level 6 engineering degree apprenticeships (several UK offices)', '112 UCAS points, or A-level Maths plus a science', 112, 0, 'dates not yet published', { needs: ['Maths', 'Further Maths', 'Physics', 'Engineering (BTEC)', 'Engineering (T-level)'] }),
    S('bbc', 'Engineering', 'BBC', 'Broadcast and Media Systems Engineer degree apprenticeship', '112 UCAS points with A-level Maths or an Engineering BTEC, GCSE Maths and English 4', 112, 4, 'dates not yet published', { needs: ['Maths', 'Further Maths', 'Engineering (BTEC)', 'Engineering (T-level)'] }),
    S('bdo', 'Accountancy and consulting', 'BDO', 'School leaver apprenticeship: Advisory or Tax (ACA, CTA or ATT; not a degree)', 'three A-levels at A* to C, GCSE Maths and English 4', 96, 4, 'Tax closes 15 November 2026; starts 20 September 2027', { open: [9, 11], minUnits: 3, size: 'mid' }),
    S('rsm', 'Accountancy and consulting', 'RSM UK', 'School leaver programme: audit, tax or consulting (professional qualification, not a degree)', '112 UCAS points from three A-levels', 112, 0, 'opened 1 September 2026; closing date not published', { open: [9, 11], minUnits: 3, size: 'mid' }),
    S('gt', 'Accountancy and consulting', 'Grant Thornton', 'Audit school leaver programme (AAT then ACA; not a degree)', 'flexible: grades are weighed alongside your strengths', 0, 0, '2027 dates not yet published', { size: 'mid', noBar: true }),
    S('saffery', 'Accountancy and consulting', 'Saffery', 'School leaver trainee: accounts, audit or tax (ACA, ATT or CTA; not a degree)', '120 UCAS points, GCSE Maths and English 6', 120, 6, 'opened 15 September 2026; closing date not published', { open: [9, 11], size: 'mid' }),
    S('burges', 'Law', 'Burges Salmon', 'Solicitor apprenticeship, Bristol', 'BBB or 120 UCAS points, GCSE Maths and English 6', 120, 6, 'closes 9 November 2026', { open: [9, 11], size: 'mid' }),
    S('mishcon', 'Law', 'Mishcon de Reya', 'Solicitor apprenticeship, London', 'about BBB and six GCSEs at 4 (flexible)', 120, 4, '28 September to 27 November 2026', { open: [9, 11] }),
    S('pinsent', 'Law', 'Pinsent Masons', 'Solicitor apprenticeship (Birmingham, Leeds, London, Manchester)', 'ABB or 128 UCAS points, seven GCSEs at 5 including Maths and English', 128, 5, 'opens autumn 2026; closing dates vary by office'),
    S('mayer', 'Law', 'Mayer Brown', 'Solicitor apprenticeship, London', 'no minimum grades published', 120 /* est. */, 0, '1 September 2026 to 14 February 2027', { open: [9, 2], noBar: true }),
    S('freshfields', 'Law', 'Freshfields', 'Solicitor apprenticeship, London', 'AAB, seven GCSEs at 6 including Maths and English', 136, 6, 'reopens autumn 2026'),
    S('dla', 'Law', 'DLA Piper', 'Solicitor apprenticeship (London, Leeds)', 'three A-levels at C, five GCSEs at 4 including Maths and English', 96, 4, '2027 dates not yet published; August 2027 start', { minUnits: 3 })
  ];

  // How strongly each subject or activity points at each sector. The "sound like you" answers are in LIKES.
  const W = {
    'Maths': { 'Finance and banking': 1, 'Accountancy and consulting': 1, 'Engineering': 1, 'Technology': 0.5 },
    'Further Maths': { 'Engineering': 1, 'Finance and banking': 1, 'Technology': 1 },
    'Physics': { 'Engineering': 2 }, 'Chemistry': { 'Engineering': 1, 'Health and public service': 1 }, 'Biology': { 'Health and public service': 2 },
    'Computer Science': { 'Technology': 3 }, 'Economics': { 'Finance and banking': 2, 'Accountancy and consulting': 1 }, 'Business': { 'Accountancy and consulting': 2, 'Finance and banking': 1 },
    'Accounting': { 'Accountancy and consulting': 3 }, 'English': { 'Law': 1 }, 'History': { 'Law': 2 }, 'Politics': { 'Law': 2, 'Health and public service': 0.5 }, 'Law': { 'Law': 3 },
    'Psychology': { 'Health and public service': 2, 'Law': 0.5 }, 'Sociology': { 'Health and public service': 2 }, 'Geography': { 'Engineering': 0.5, 'Health and public service': 0.5 },
    'Design and Technology': { 'Engineering': 2 }, 'Art or Design': { 'Technology': 1 }, 'A language': { 'Law': 1, 'Accountancy and consulting': 0.5 },
    'Business (BTEC)': { 'Accountancy and consulting': 2, 'Finance and banking': 1 }, 'IT (BTEC)': { 'Technology': 3 }, 'Engineering (BTEC)': { 'Engineering': 3 },
    'Applied Science (BTEC)': { 'Health and public service': 1, 'Engineering': 1 }, 'Health and Social Care (BTEC)': { 'Health and public service': 3 }, 'Sport (BTEC)': { 'Health and public service': 1 },
    'Digital (T-level)': { 'Technology': 3 }, 'Engineering (T-level)': { 'Engineering': 3 }, 'Finance or Accounting (T-level)': { 'Accountancy and consulting': 3, 'Finance and banking': 2 },
    'Legal Services (T-level)': { 'Law': 3 }, 'Health or Science (T-level)': { 'Health and public service': 3 }, 'Management and Administration (T-level)': { 'Accountancy and consulting': 2, 'Health and public service': 0.5 },
    'Coding or making things': { 'Technology': 1, 'Engineering': 1 }, 'Competitions (debate, maths, enterprise)': { 'Law': 0.5, 'Finance and banking': 0.5 }, 'Volunteering': { 'Health and public service': 0.5 }
  };

  const blank = () => ({ stage: null, now: null, age: null, quals: null, subjects: [], other: '', grades: {}, sizes: {}, noPred: false, maths: null, english: null, resit: false, exp: [], extras: [], tests: [], likes: [], size: null, worry: null, worryNote: '' });

  const answered = (p, id) => {
    if (id === 'gcse') return p.maths != null && p.english != null;
    if (id === 'subjects') return p.subjects.length > 0;
    if (id === 'grades') return p.noPred || (p.subjects.length > 0 && p.subjects.every(s => p.grades[s]));
    const v = p[id];
    return Array.isArray(v) ? v.length > 0 : v != null && v !== '';
  };
  const real = a => (a || []).filter(x => x !== 'None yet');
  // "What have you done so far?" holds both work experience and outside-lessons answers.
  const doneOf = p => real([...(p.exp || []), ...(p.extras || [])]);
  const extrasOf = p => doneOf(p).filter(x => Q.extras.includes(x));
  const workOf = p => doneOf(p).filter(x => Q.exp.includes(x));
  const listText = l => l.length <= 1 ? (l[0] || '') : l.slice(0, -1).join(', ') + ' and ' + l[l.length - 1];
  const gnum = i => i == null ? null : Q.gcse[i] === '3 or below' ? 3 : Number(Q.gcse[i]);
  const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const inWindow = (m, o) => o && (o[0] <= o[1] ? m >= o[0] && m <= o[1] : m >= o[0] || m <= o[1]);

  // ---- Grades
  const kindOf = s => KIND_OF[s] || 'a';
  const sizeOf = (p, s) => kindOf(s) === 't' ? 3 : kindOf(s) === 'btec' ? (p.sizes[s] || (p.quals === 'BTEC' ? 3 : 1)) : 1;
  const graded = p => !p.noPred && p.subjects.some(s => p.grades[s]);
  const gradeRank = (p, s) => p.grades[s] ? SCALES[kindOf(s)].grades.indexOf(p.grades[s]) : -1;
  // Every A-level-sized unit's points, best first.
  function units(p) {
    const u = [];
    p.subjects.forEach(s => { const r = gradeRank(p, s); if (r < 0) return; for (let i = 0; i < sizeOf(p, s); i++) u.push(SCALES[kindOf(s)].pts[r]); });
    return u.sort((a, b) => b - a);
  }
  const ucasOf = p => graded(p) ? units(p).slice(0, 3).reduce((a, b) => a + b, 0) : null;
  const subjName = (p, s) => s === 'Other' && p.other.trim() ? p.other.trim() : s;
  const gradesText = p => p.noPred ? 'No predictions yet' : p.subjects.map(s => subjName(p, s) + ' ' + (p.grades[s] || '?') + (kindOf(s) === 'btec' ? ' (' + BTEC_SIZES[sizeOf(p, s) - 1][1] + ')' : '')).join(', ');
  // A strong grade makes a subject count for more when picking the sector; a weak one for less.
  const strength = (p, s) => { const r = p.noPred ? -1 : gradeRank(p, s); return r < 0 ? 1 : r <= 1 ? 1.5 : (kindOf(s) === 'a' ? r >= 4 : r >= 3) ? 0.75 : 1; };

  const likesOf = p => (p.likes || []).filter(x => x !== NO_IDEA).map(l => LIKES.find(x => x.label === l)).filter(Boolean);
  const unsure = p => (p.likes || []).includes(NO_IDEA);

  function sectorScores(p) {
    const sc = {}; Object.keys(SECTORS).forEach(k => sc[k] = 0);
    const add = (w, f) => Object.keys(w || {}).forEach(k => sc[k] += w[k] * f);
    likesOf(p).forEach(l => add(l.w, 2));
    p.subjects.forEach(s => add(W[s], strength(p, s)));
    extrasOf(p).forEach(e => add(W[e], 1));
    return sc;
  }

  function expLevel(p) {
    const n = doneOf(p).length;
    return n === 0 ? 'none' : n <= 2 ? 'some' : 'strong';
  }

  const gapFor = short => short <= 0 ? 0 : short <= 24 ? 1 : 2; // 24 points is about three grade steps
  const gcseShortOf = (p, bar) => p.maths != null && p.english != null && Math.min(gnum(p.maths), gnum(p.english)) < bar;

  function fitOf(p, s) {
    const known = graded(p);
    let gap = 0;
    if (known) {
      gap += gapFor(s.ucas - ucasOf(p));
      if (s.minUnits && units(p).length < s.minUnits) gap += 1;
      if (s.subjMin) {
        const r = Math.min(...s.subjMin.subj.map(x => p.subjects.includes(x) && gradeRank(p, x) >= 0 ? gradeRank(p, x) : 99));
        if (r !== 99 && r > SCALES.a.grades.indexOf(s.subjMin.min)) gap += 1;
      }
    }
    const gcseShort = gcseShortOf(p, s.gcse);
    if (gcseShort) gap += 1;
    const hasNeed = !s.needs || s.needs.some(n => p.subjects.includes(n));
    if (!hasNeed && p.subjects.length) gap += 1;
    const age = p.age === '23 or over' ? 23 : Number(p.age);
    const tooOld = !!(s.maxAge && left(p) && p.age && age > s.maxAge);
    return { gap, known, gcseShort, hasNeed, tooOld };
  }

  function standingOf(p, sector) {
    if (!graded(p)) return 'grades not entered';
    let gap = gapFor(SECTORS[sector].ucas - ucasOf(p));
    if (gcseShortOf(p, SECTORS[sector].gcse)) gap += 1;
    return gap <= 0 ? 'on the bar' : gap === 1 ? 'a few grades short' : 'not there yet';
  }

  function matches(p, n) {
    const sc = sectorScores(p);
    const max = Math.max(1, ...Object.values(sc));
    const order = Object.keys(sc).sort((a, b) => sc[b] - sc[a]);
    const m = new Date().getMonth() + 1;
    const sizeWant = p.size === 'Well-known firms' ? 'big' : p.size === 'Smaller or local firms' ? 'mid' : null;
    // Unsure students get matches spread across their top sectors rather than one.
    const pull = unsure(p) ? 2 : 4;
    const yours = left(p) ? 'Your results meet it.' : 'Your predicted grades meet it.';
    return SCHEMES.map(s => {
      const f = fitOf(p, s);
      if (f.tooOld) return null;
      const total = (sc[s.sector] / max) * pull - Math.max(0, f.gap) * 1.1 + (f.gap <= 0 ? 0.6 : 0) + (sizeWant && s.size === sizeWant ? 0.4 : 0) + (inWindow(m, s.open) ? 0.2 : 0);
      const reasons = [];
      const like = likesOf(p).find(l => (l.w[s.sector] || 0) >= 2);
      if (like) reasons.push('Fits what you told us: ' + like.why + '.');
      else if (s.sector === order[0]) reasons.push('In your best-fit sector, going on your subjects' + (extrasOf(p).length ? ' and what you do outside lessons.' : '.'));
      else if (s.sector === order[1]) reasons.push('In your second-best sector, ' + s.sector.toLowerCase() + '.');
      const asks = s.noBar ? 'No minimum grades published.' : 'Asks for ' + s.bar + '.';
      if (f.known) reasons.push(f.gap <= 0 ? (s.noBar ? asks : asks + ' ' + yours) : f.gap === 1 ? asks + ' You\'re about one step short' + (f.gcseShort ? ' on GCSEs' + (p.resit ? ', which your resit could fix' : '') : '') + '.' : asks + ' A stretch on ' + (left(p) ? 'your results.' : 'current predictions.'));
      if (s.needs && f.hasNeed) reasons.push('Wants ' + s.needs.filter(x => p.subjects.includes(x))[0] + ', which you ' + (left(p) ? 'took.' : 'take.'));
      if (s.needs && !f.hasNeed && p.subjects.length) reasons.push('Usually wants ' + listText(s.needs.slice(0, 2)) + '. You haven\'t listed either.');
      if (inWindow(m, s.open)) reasons.push('Window open now: ' + s.win + '.');
      const fit = !f.known ? 'Check grades' : f.gap <= 0 ? 'Strong fit' : f.gap === 1 ? 'Reach' : 'Stretch';
      return { ...s, total, gap: f.gap, fit, reasons: reasons.slice(0, 3), unverified: false };
    }).filter(Boolean).sort((a, b) => b.total - a.total).slice(0, n || 5);
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
    const y12 = p.stage === 'Year 12', lft = left(p);
    const now = new Date();
    const thin = expLevel(p) === 'none';
    const noTests = !real(p.tests).length;
    const testsLine = noTests ? 'Start online test practice: 20 minutes, three times a week.' : 'Keep online test practice going once a week.';
    const Y13 = {
      9: ['Pick your first five schemes from your matches and note each window.', 'Write your six stories (see Application form below).'],
      10: ['Pick your first five schemes from your matches and note each window.', 'Write your six stories (see Application form below).'],
      11: ['Send your first two applications. Early ones get read before windows fill.', testsLine],
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
    // Left school: results are in, so there are no exams to plan around, and rolling schemes take
    // applications all year.
    const LEFT = {
      9: ['Pick your first five schemes from your matches and note each window.', 'Write your six stories, using what you\'ve done since school as well as school itself.'],
      10: ['Pick your first five schemes from your matches and note each window.', 'Write your six stories, using what you\'ve done since school as well as school itself.'],
      11: ['Send your first two applications. Early ones get read before windows fill.', testsLine],
      12: ['Record yourself answering five video-interview questions and watch it back.', 'Read business news for ten minutes a day. Keep three stories about your sector.'],
      1: ['Second wave of applications.', 'Ask a manager or teacher now if they\'ll be your referee.'],
      2: ['Practise a group task with friends: one case, 20 minutes, one person timing.', 'Chase any application you haven\'t heard back on in four weeks.'],
      3: ['Assessment centres. Prepare two questions for each firm.', 'Debrief after each one: what went well, what to change next time.'],
      4: ['Offers arrive. Compare salary, location, the degree and what apprentices say on RateMyApprenticeship.', 'No offer yet? Rolling schemes recruit all year, so keep applying.'],
      5: ['Keep applying to rolling schemes. NHS trusts, the police and the Civil Service advertise through the year.'],
      6: ['Reply to every offer in writing. Decline the ones you won\'t take politely; you may apply to them again later.'],
      7: ['Accept one offer in writing.', 'If you\'re working, check your notice period and hand it in with time to spare.'],
      8: ['Ask your employer what to read or set up before you start.'],
    };
    const base = y12 ? Y12 : lft ? LEFT : Y13;
    const out = [];
    for (let i = 0; i < 12; i++) {
      const d = new Date(now.getFullYear(), now.getMonth() + i, 1);
      const m = d.getMonth() + 1;
      // Year 13 and school leavers start in September; it's only "apply" season if that's this month.
      const items = !y12 && m === 9 && i > 0 ? ['Start your apprenticeship.'] : [...(base[m] || [])];
      if (!y12) ms.forEach(s => { if (s.open && s.open[0] === m) items.push('Apply: ' + s.emp + ', ' + s.scheme.split(' (')[0] + ' (' + s.win + ').'); if (i === 0 && inWindow(m, s.open) && s.open[0] !== m) items.push('Open now: ' + s.emp + ' (' + s.win + ').'); });
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
    const yours = left(p) ? 'your results' : 'your predicted grades';
    // Say which part is short, A-level grades or GCSEs, rather than one label for both.
    const bar = SECTORS[sector];
    const low = [['Maths', p.maths], ['English', p.english]].filter(([, i]) => i != null && gnum(i) < bar.gcse).map(([n]) => n);
    const gcseBit = low.length ? 'GCSE ' + listText(low) + (low.length > 1 ? ' are' : ' is') + ' below the ' + bar.gcse + ' most ' + sector.toLowerCase() + ' schemes ask for' + (p.resit ? ', which your resit could fix' : '') : '';
    const ucasGap = graded(p) ? gapFor(bar.ucas - ucasOf(p)) : -1;
    const gradeLine = ucasGap < 0 ? 'you haven\'t got predictions yet, so the grade check is open' + (gcseBit ? '. ' + gcseBit.charAt(0).toUpperCase() + gcseBit.slice(1) : '')
      : ucasGap === 0 ? yours + ' meet the usual bar' + (gcseBit ? ', but ' + gcseBit : '')
      : (ucasGap === 1 ? yours + ' are a few grades below the usual bar' : 'the usual bar is above ' + yours + ' right now') + (gcseBit ? ', and ' + gcseBit : '');
    // The nearest application window among the matches, shown before the unlock form.
    const mNow = new Date().getMonth() + 1;
    const openNow = ms.find(x => inWindow(mNow, x.open));
    const upcoming = ms.filter(x => x.open).sort((a, b) => ((a.open[0] - mNow + 12) % 12) - ((b.open[0] - mNow + 12) % 12))[0];
    const deadline = p.stage === 'Year 12'
      ? (upcoming ? 'You apply next autumn. ' + upcoming.emp + ' opens in ' + MONTHS[upcoming.open[0] - 1] + ', and several schemes close early.' : '')
      : openNow ? openNow.emp + (/s$/.test(openNow.emp) ? '\'' : '\'s') + ' window is open now: ' + openNow.win + '.' : upcoming ? upcoming.emp + ' opens in ' + MONTHS[upcoming.open[0] - 1] + '.' : '';
    const nowLine = { 'Started university and left': 'Starting a degree doesn\'t usually rule you out. Have a short, honest answer ready for why this route suits you better. ', 'Taking a gap year': 'Use the gap year for something you can talk about: a job, a project or a course. ' }[left(p) && p.now] || '';
    const expLine = { none: 'You haven\'t listed work experience or roles yet. That\'s the gap most applicants have and the quickest to close: one insight day and one role you can talk about, before your first application.', some: 'You have something to talk about already. The job now is turning it into answers that say what you did and what changed because of it.', strong: 'You\'ve done more than most applicants. Use it in every answer, with numbers.' }[ex];
    const testLine = tests.length ? 'You\'ve sat ' + listText(tests.filter(t => t !== 'Had an offer').map(t => t.split(' (')[0].toLowerCase())) + ' before, so the format won\'t be new.' : 'You haven\'t sat an online test or video interview yet. That\'s where most applications end, so practise before the real one.';
    const notSure = unsure(p);
    const opener = notSure
      ? 'You said you don\'t know yet, which is normal. Going on your subjects' + (extrasOf(p).length ? ' and what you do outside lessons' : '') + ', ' + sector.toLowerCase() + ', and ' + also.toLowerCase() + ', are the closest fits. For ' + sector.toLowerCase() + ', ' + gradeLine + '. '
      : sector + ' is your best fit and ' + gradeLine + '. ';
    return {
      sector, also, standing, unsure: notSure, standingIdx: { 'not there yet': 0, 'a few grades short': 1, 'on the bar': 2 }[standing] ?? -1,
      headline: notSure ? 'Two to start with: ' + sector + ' and ' + also.toLowerCase() + '.' : 'Your best fit: ' + sector + '.',
      readShort: opener.trim(), read: opener + nowLine + expLine + ' ' + testLine, deadline,
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
      'Stage: ' + (p.stage || '?') + (left(p) ? ' (now: ' + (p.now || '?') + ', age ' + (p.age || '?') + ')' : ''), 'Qualifications: ' + (p.quals || '?'),
      (left(p) ? 'Results: ' : 'Predicted grades: ') + (gradesText(p) || '?') + (ucasOf(p) != null ? ' (about ' + ucasOf(p) + ' UCAS points)' : ''),
      'GCSE Maths: ' + (Q.gcse[p.maths] || '?') + ', English: ' + (Q.gcse[p.english] || '?') + (p.resit ? ' (resitting)' : ''),
      'Work experience: ' + (workOf(p).join(', ') || 'none'), 'Outside lessons: ' + (extrasOf(p).join(', ') || 'none'), 'Done before: ' + (p.tests.join(', ') || 'none'),
      'Sounds like them: ' + ((p.likes || []).join('; ') || '?'), 'Employer preference: ' + (p.size || '?'), 'Biggest worry: ' + (p.worry || '?') + (p.worryNote ? ': "' + p.worryNote + '"' : '')
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
      year: p.stage, now: p.now || '', age: p.age || '', quals: p.quals, subjects: p.subjects.map(s => subjName(p, s)).join(', '),
      grades: gradesText(p), ucas: ucasOf(p) == null ? '' : String(ucasOf(p)),
      gcse_maths: Q.gcse[p.maths], gcse_english: Q.gcse[p.english], gcse_resit: p.resit ? 'Yes' : '', likes: (p.likes || []).join('; '),
      experience: workOf(p).join(', ') || (p.exp.includes('None yet') ? 'None yet' : ''), extras: extrasOf(p).join(', '), tests_done: p.tests.join(', '), firm_size: p.size, worry: p.worry, worry_note: p.worryNote,
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
      '<div class="k">DegreeYourWay Pathfinder' + (name ? ', prepared for ' + esc(name) : '') + '</div><div class="bar"></div>' +
      '<h1>' + esc(rep.headline) + '</h1><p>' + esc(rep.read) + '</p><p><span class="k">Also a fit</span>&nbsp; ' + esc(rep.also) + '</p>' +
      '<h2>Your matches, ranked</h2><table>' + rows + '</table>' +
      '<h2>Your 12 months</h2><ul>' + plan + '</ul>' +
      '<h2>Stage by stage</h2><ul>' + prep + '</ul>' +
      (rep.worry ? '<h2>' + esc(rep.worry.q) + '</h2><p>' + esc(rep.worry.body) + '</p>' : '') +
      '<h2>If it doesn\'t go to plan</h2><ul>' + back + '</ul>' +
      '<div class="call"><h2>Free discovery call, 30 minutes</h2><p>Talk this report through with Shreyash Singh, who got four offers from major firms and chose Deloitte. WhatsApp: 07463 870657.' + (SITE.courseOffer ? ' The DegreeYourWay course prepares you for every stage above.' : '') + '</p></div>' +
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

  const DEMO = { stage: 'Year 13', now: null, age: null, quals: 'A-levels', subjects: ['Maths', 'Economics', 'Business'], other: '', grades: { Maths: 'A', Economics: 'B', Business: 'B' }, sizes: {}, noPred: false, maths: 1, english: 3, resit: false, exp: ['Part-time job', 'Sports team', 'Volunteering'], extras: [], tests: ['None yet'], likes: ['I follow business, money or markets news'], size: 'Well-known firms', worry: 'Online tests', worryNote: '' };

  return { Q, QUESTIONS, questionsFor, LABELS, SUBS, groupsFor, KIND_OF, SCALES, BTEC_SIZES, sizeOf, ucasOf, left, PARTS, SECTORS, SCHEMES, CHECKED, blank, answered, report, matches, aiEnhance, askAdvisor, leadFields, wa, pdf, storeLead, push, listText, DEMO, COURSE, NO_CV_QS, readCvFile, ruleGaps, cvGaps };
})();

export default PF;
