// DegreeYourWay emails, one entry per Resend template.
//
// Copy follows docs/DESIGN.md: British spelling, digits, no exclamation marks, no middots or
// em dashes. {{{VAR}}} is filled by Resend when the email is sent; %SITE% and friends are filled
// once by build.mjs from the site settings.
//
// Blocks, rendered to HTML and plain text by build.mjs:
//   { h1 } { h2 } { p } { small }            text; [label](url) makes a link, **x** bold
//   { button: [label, url] }                 oxblood primary button
//   { facts: [[label, value], ...] }         labelled rows between rules
//   { steps: [text, ...] }                   numbered rows (01, 02...)
//   { panel: { title, body, button } }       blackberry card, used for the call
//   { sign: true }                           sign-off from Shreyash

const CALL_PANEL = {
  title: 'Free call, 30 minutes',
  body: 'Talk it through with Shreyash Singh, who got degree apprenticeship offers from Deloitte, Goldman Sachs, PwC and Accenture.',
  button: ['Book a free call', '{{{CALL_URL}}}'],
};

// Variables shared by several templates. CALL_URL falls back to the booking page, or WhatsApp.
const V = {
  NAME: { key: 'NAME', type: 'string', fallback_value: 'there' },
  CALL_URL: { key: 'CALL_URL', type: 'string', fallback_value: '%CALL_FALLBACK%' },
  PARENT_NAME: { key: 'PARENT_NAME', type: 'string', fallback_value: 'there' },
  STUDENT_NAME: { key: 'STUDENT_NAME', type: 'string' },
  PLACE: { key: 'PLACE', type: 'string', fallback_value: 'Founding, £595' },
  BALANCE: { key: 'BALANCE', type: 'string', fallback_value: '£495' },
};

export const TEMPLATES = [
  {
    slug: 'call-requested',
    name: 'Discovery call requested',
    trigger: 'Lead saved with source discovery_call or popup_pathfinder',
    subject: 'Your free call with Shreyash',
    preheader: 'Pick a 30-minute slot that suits you.',
    variables: [V.NAME, V.CALL_URL],
    reason: 'You’re getting this because you asked for a free discovery call on our website.',
    blocks: [
      { h1: 'Pick a time for your free call' },
      { p: 'Hi {{{NAME}}}, thanks for asking for a discovery call.' },
      { p: 'It’s 30 minutes with Shreyash Singh, who got degree apprenticeship offers from Deloitte, Goldman Sachs, PwC and Accenture. You’ll go through where your child is now, which schemes fit, and what each stage of the application will ask of them.' },
      { button: ['Pick a time', '{{{CALL_URL}}}'] },
      { h2: 'Before the call' },
      { steps: [
        'Have your child’s subjects and predicted grades to hand.',
        '[Try the free Pathfinder](%SITE%/pathfinder). It’s 10 to 12 questions and gives you a ranked list of schemes to start from.',
      ] },
      { small: 'Rather use WhatsApp? Message %WA_DISPLAY% and we’ll find a time.' },
      { sign: true },
    ],
  },

  {
    slug: 'call-booked',
    name: 'Discovery call booked',
    trigger: 'Booking tool webhook (Cal.com or Calendly) when a call is booked. Turn off the tool’s own confirmation if you send this.',
    subject: 'Your free call is booked',
    preheader: '{{{CALL_TIME}}}. How to get the most from 30 minutes.',
    variables: [
      V.NAME,
      { key: 'CALL_TIME', type: 'string' },
      { key: 'CALL_LOCATION', type: 'string', fallback_value: 'The link is in your calendar invite' },
      { key: 'RESCHEDULE_URL', type: 'string', fallback_value: '%WA_LINK%' },
    ],
    reason: 'You’re getting this because you booked a free call with DegreeYourWay.',
    blocks: [
      { h1: 'Booked.' },
      { p: 'Hi {{{NAME}}}, your free call is in the diary.' },
      { facts: [
        ['When', '{{{CALL_TIME}}}'],
        ['With', 'Shreyash Singh'],
        ['Length', '30 minutes'],
        ['Where', '{{{CALL_LOCATION}}}'],
      ] },
      { h2: 'Before the call' },
      { steps: [
        'Bring your child’s subjects and predicted grades, or their results if they’ve left school.',
        '[Try the free Pathfinder](%SITE%/pathfinder) first. It’s 10 to 12 questions and gives us a ranked list of schemes to start from.',
        'Write down the one thing you most want answered.',
      ] },
      { p: 'Need to move it? [Pick another time]({{{RESCHEDULE_URL}}}) or message %WA_DISPLAY%.' },
      { sign: true },
    ],
  },

  {
    slug: 'parents-guide',
    name: "Parent's Guide",
    trigger: 'Lead saved with source parents_guide',
    subject: 'Your free Parent’s Guide to degree apprenticeships',
    preheader: 'Who pays, which schemes open when, and what the application really tests.',
    variables: [V.CALL_URL],
    reason: 'You’re getting this because you asked for the Parent’s Guide on our website. We’ll also send the occasional course update. Reply “stop” and we won’t email again.',
    blocks: [
      { h1: 'Your Parent’s Guide' },
      { p: 'Thanks for asking for the guide. It covers the 2026 to 27 season in England: what degree apprenticeships are, who pays, which schemes open when, what the application actually tests, and a month-by-month plan. Every number is sourced.' },
      { button: ['Download the guide', '%GUIDE_URL%'] },
      { h2: 'If you read one thing' },
      { p: 'There’s no single deadline. Each employer opens its own window, some only a few weeks long, and most big employers close early once they have enough applications. Pages 6 to 9 have the dates.' },
      { p: 'The most useful thing you can do this year is make sure each application goes in during the first fortnight of its window. That means being ready before it opens.' },
      { panel: { ...CALL_PANEL, body: 'Want the guide applied to your child? Talk it through with Shreyash Singh, who wrote it. Bring their subjects and predicted grades.' } },
      { sign: true },
    ],
  },

  {
    slug: 'pathfinder-report',
    name: 'Pathfinder results',
    trigger: 'Lead saved with source quiz_roadmap',
    subject: 'Your Pathfinder results',
    preheader: '{{{RESULT}}} Your matches and what to do next.',
    variables: [
      V.NAME,
      { key: 'RESULT', type: 'string' },
      { key: 'ALSO', type: 'string', fallback_value: 'See your full report' },
      { key: 'TOP_MATCHES', type: 'string', fallback_value: 'See your full report' },
      V.CALL_URL,
    ],
    reason: 'You’re getting this because you unlocked your report in the DegreeYourWay Pathfinder.',
    blocks: [
      { label: 'Pathfinder results' },
      { h1: '{{{RESULT}}}' },
      { p: 'Hi {{{NAME}}}, here’s a copy of your results, so you have them somewhere other than the browser.' },
      { facts: [
        ['Also a fit', '{{{ALSO}}}'],
        ['Top matches', '{{{TOP_MATCHES}}}'],
      ] },
      { p: 'Your full report, with the 12-month plan, stage-by-stage tips and the PDF, stays in the browser you used. [Open the Pathfinder](%SITE%/pathfinder) on the same device to see it again.' },
      { panel: { ...CALL_PANEL, title: 'Go through your matches with Shreyash', body: 'A free 30-minute call. You’ll leave knowing which schemes to apply to first and what each stage will ask of you. Shreyash got offers from Deloitte, Goldman Sachs, PwC and Accenture.' } },
      { small: 'Entry bars and dates change. Always check the employer’s page. Employers make every hiring decision.' },
      { sign: true },
    ],
  },

  {
    slug: 'pathfinder-follow-up',
    name: 'Pathfinder follow-up',
    trigger: 'Two days after quiz_roadmap, only if no call has been booked and TOP_MATCH is known',
    subject: 'Which of your matches opens first?',
    preheader: 'The order you apply in matters more than most people think.',
    variables: [V.NAME, { key: 'TOP_MATCH', type: 'string' }, V.CALL_URL],
    reason: 'You’re getting this because you used the DegreeYourWay Pathfinder. Reply “stop” and we won’t email again.',
    blocks: [
      { h1: 'Which of your matches opens first?' },
      { p: 'Hi {{{NAME}}}, top of your Pathfinder list was **{{{TOP_MATCH}}}**.' },
      { p: 'Employers don’t give you one deadline. Each scheme has its own window, some only two or three weeks long, and most big employers close early once they have enough applications. Barclays opened its 2027 banking scheme on 9 September and closed it on the 25th.' },
      { p: 'So the order matters. The best applications go in during the first fortnight of each window, which means being ready before it opens.' },
      { p: 'That’s what the free call is for: 30 minutes putting your matches in order and working out what each stage will ask of you.' },
      { button: ['Book a free call', '{{{CALL_URL}}}'] },
      { small: 'Or just reply to this email with a question. I read every one.' },
      { sign: true },
    ],
  },

  {
    slug: 'place-requested',
    name: 'Place requested',
    trigger: 'Lead saved with source booking (the reserve form)',
    subject: 'Your place request: what happens next',
    preheader: 'We’ll reply on WhatsApp with how to pay the £100 deposit.',
    variables: [V.PARENT_NAME, V.STUDENT_NAME, V.PLACE, V.BALANCE],
    reason: 'You’re getting this because you asked to reserve a place on the DegreeYourWay course.',
    blocks: [
      { h1: 'We’ve got your request' },
      { p: 'Hi {{{PARENT_NAME}}}, thanks for asking to reserve a place for {{{STUDENT_NAME}}}. Here’s what you sent and what happens next.' },
      { facts: [
        ['Place', '{{{PLACE}}}'],
        ['Course', 'Two days of preparation in central London'],
        ['Dates', 'Confirmed to deposit holders first'],
      ] },
      { h2: 'What happens next' },
      { steps: [
        'We reply on WhatsApp within 24 hours with the next steps and how to pay the £100 deposit.',
        'The deposit holds the seat. It’s refundable until the balance is due.',
        'Deposit holders hear the dates first. If they don’t suit you, the deposit is refunded in full.',
        'The balance of {{{BALANCE}}} is due before the course.',
      ] },
      { p: 'Didn’t press send on WhatsApp? Message us on %WA_DISPLAY% and we’ll pick it up from there.' },
      { sign: true },
    ],
  },

  {
    slug: 'deposit-received',
    name: 'Deposit received',
    trigger: 'Sent by hand or by the payment provider’s webhook once the £100 deposit is paid',
    subject: 'Your place is held',
    preheader: 'The deposit is in, and the Deadline Line is open from today.',
    variables: [V.PARENT_NAME, V.STUDENT_NAME, V.PLACE, V.BALANCE],
    reason: 'You’re getting this because you reserved a place on the DegreeYourWay course.',
    blocks: [
      { h1: '{{{STUDENT_NAME}}}’s place is held' },
      { p: 'Hi {{{PARENT_NAME}}}, we’ve received your £100 deposit. Thank you.' },
      { facts: [
        ['Place', '{{{PLACE}}}'],
        ['Deposit', '£100, paid. Refundable until the balance is due.'],
        ['Balance', '{{{BALANCE}}}, due before the course'],
        ['Dates', 'You’ll hear them before anyone else. If they don’t suit you, the deposit is refunded in full.'],
        ['Venue', 'Central London'],
        ['Changes', 'One free move to a later cohort'],
      ] },
      { h2: 'The Deadline Line is open' },
      { p: 'From today until {{{STUDENT_NAME}}}’s last application deadline, they can message our team on WhatsApp at any time on %WA_DISPLAY%. We reply within 24 hours, every day, on applications, tests, interviews and assessment centres.' },
      { button: ['Message the Deadline Line', '%WA_LINK%'] },
      { h2: 'The DegreeYourWay Guarantee' },
      { p: 'If {{{STUDENT_NAME}}} attends every module, applies to at least three Level 6 or 7 schemes with an application we’ve reviewed, and gets no offer within twelve months of the course, they get a free place on a later cohort. [Read the Guarantee in full](%SITE%/terms).' },
      { sign: true },
    ],
  },

  {
    slug: 'school-talk',
    name: 'School talk requested',
    trigger: 'Lead saved with source school_talk. HANDOUT_URL is the site address plus the handout link /api/lead returns.',
    subject: 'Your DegreeYourWay talk request',
    preheader: 'We’ll reply with dates. The student handout is ready now.',
    variables: [
      V.NAME,
      { key: 'SCHOOL', type: 'string', fallback_value: 'your school' },
      { key: 'DATES', type: 'string', fallback_value: 'Not given yet' },
      { key: 'HANDOUT_URL', type: 'string' },
    ],
    reason: 'You’re getting this because you asked for a DegreeYourWay talk on our website.',
    blocks: [
      { h1: 'Thanks for booking a talk' },
      { p: 'Hi {{{NAME}}}, thanks for asking us to speak at {{{SCHOOL}}}. We’ll come back to you with dates.' },
      { facts: [
        ['School', '{{{SCHOOL}}}'],
        ['Preferred dates', '{{{DATES}}}'],
        ['Cost', 'Free'],
      ] },
      { h2: 'The student handout' },
      { p: 'Every talk comes with a printable handout for students. It points them to the free Pathfinder, which matches their grades and interests to degree apprenticeship schemes. You can open and print it now. The link works for 30 days.' },
      { button: ['Open the student handout', '{{{HANDOUT_URL}}}'] },
      { small: 'Questions before then? Message %WA_DISPLAY% or reply to this email.' },
      { sign: true },
    ],
  },
];
