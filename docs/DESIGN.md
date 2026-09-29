# DegreeYourWay — design rules

The single source of truth for how the DegreeYourWay site looks and behaves. Current build: `Get In v10.dc.html`. Anything new must use these values; if a real gap appears, add the value here in the same change.

## Scene

A parent on their phone, evening, reading carefully before spending £595 on their child. Calm, editorial, trustworthy. Nothing flashy, nothing that feels like a sales funnel.

Register: **Brand**, restrained. Dials: variance 5 · motion 2 · density 4.

## Colour

Tokens live once, in `:root` at the top of the page's style block. Every colour on the site reads from a variable.

| Token | Hex | Role |
| --- | --- | --- |
| --bone | #F4EFE6 | Main page and alternating section ground |
| --warm-white | #FBF9F5 | Alternating section ground, form fields, paper |
| --blackberry | #30202A | Headings, ink, dark sections, pricing card, nav CTA, Next buttons |
| --blackberry-soft | #51444A | Body copy; hover for blackberry buttons |
| --oxblood | #823D48 | Accent, used sparingly: "1 gets in.", high-intent Reserve buttons, active nav underline, rail progress, stage 04 details, selected quiz answers |
| --oxblood-hover | #6C303A | Hover for oxblood buttons |
| --muted | #716769 | Secondary text, labels (adjusted from #786E70 to reach 4.5:1 on bone) |
| --rule | #D7CFC6 | Dividers and borders |
| --soft-tint | #EDE3E2 | Occasional tinted panel |
| --input-border | #8F8487 | Form field borders (3:1) |
| On blackberry | --on-dark-body #E4DCD9 · --on-dark-muted #B9AEB2 · --on-dark-label #CDBFC3 · --rule-dark 16% warm white |

Rules
- Roughly 80% bone and warm white, 15% blackberry, 5% oxblood. If a screen looks burgundy, oxblood is overused.
- Light sections alternate bone / warm white automatically down each page. Blackberry is for the pricing card, statement blocks and the closing CTA.
- Oxblood is never a section background or a paragraph colour. Money signals use two extra tokens, only in the "Why this is different" section: --loss #A5352F (brick red) for student debt, --gain #3E6A4F (forest green) for apprentice pay.
- No gradients, no content shadows, no pure black or white.

## Type

- Headings: **Newsreader**, weight 400, tracking −0.02em.
- Body and UI: **Source Sans 3**, weights 400 and 600 only.

| Token | Size | Use |
| --- | --- | --- |
| Hero | clamp(52px, 7.4vw, 112px) · 44px under 420px | Overview headline only |
| Statement | clamp(44px, 6vw, 88px) | Navy statement headings |
| H2 | clamp(32px, 3.6vw, 52px) | Every section heading |
| H2 medium | clamp(34px, 4vw, 58px) | Two promises, guarantee |
| Sub-head | clamp(26px, 2.4vw, 34px) | Stage names, block titles |
| Body L | 18px / 1.6 | Section intros |
| Body | 16–17px / 1.5 | Paragraphs, list rows |
| Small | 14–15px / 1.5 | Notes, captions |
| Label | 12px, 600, uppercase, tracking 0.12em | Section eyebrows, document headers |

Minimum on-screen size: 12px. Buttons: 16px, 600, uppercase, tracking 0.08em.

## Spacing

Scale (px): 4 · 8 · 12 · 16 · 20 · 24 · 28 · 32 · 40 · 48 · 56 · 64 · 72 · 80 · 96. Nothing in between.

- Page gutter: clamp(20px, 5vw, 64px). Max content width 1280px.
- Section padding: clamp(52px, 7vw, 96px) top and bottom. Statement sections may go to clamp(64px, 9vw, 136px).

## Shape

- Radius: 2px on buttons, inputs and chips. 50% for numbered dots. Nothing else is rounded.
- Borders: 1px rules; 2px for emphasis rules (top of a list, accent line).

## Components

**Primary button** — accent fill, paper text, 20px × 32px padding (full-width: 24px × 20px). Hover `#234839`, press scale 0.97. One label site-wide: **“Reserve a place — £100 deposit”**. Form submit buttons name the step (“Send details on WhatsApp”, “Book a talk”).

**Text link** — ink, 600, underline offset 4px, trailing “→” that nudges 3px on hover. Min tap height 44px on phones.

**Document preview** — paper, 1px `#D3CCBD` border, 24px padding, header row with label + “View sample →”. Hover/focus: border goes ink. Opens the sample dialog.

**Dialogs** (sample, guide) — focus moves to the first control on open, Tab is trapped, Esc closes, focus returns to the trigger.

**Chat assistant** — small off-white “Questions” button, bottom-right, 44px tall. No pop-up prompt. Answers come from the site’s own facts; anything else is handed to WhatsApp. Full-width bottom sheet on phones.

**Phone booking bar** — navy, fixed under the header, slides down after the hero on Overview and The course. Shows £595, struck £695 and “Save £100”.

**Price** — founding price £595 shown against a struck-through £695 full price with a “Save £100” label. No course dates anywhere until confirmed.

**Chart** — university debt bar in --loss red, apprentice pay bar in --gain green.

## Motion

- 150–250ms, ease-out, opacity and transform only.
- FAQ open/close, dialog fade-in, confirmation rise, arrow nudge, page fade (160ms).
- No scroll-triggered reveals, parallax, counters or loops.
- `prefers-reduced-motion`: all animation and transitions off.

## Contact routes

- All booking, guide and school requests open WhatsApp with a pre-filled message: `wa.me/44…` (number set once in the logic as `WA`).
- Instagram link set once as `IG`.

## Copy

- Plain, factual, British spelling. Numbers as digits (12 months, £595).
- No exclamation marks, no “seamless / unlock / elevate”.
- Anything unconfirmed is marked `[Needs input: …]` and must be cleared before launch.

## Quiz (page `quiz`, the Pathfinder)

Merged into the site at `/pathfinder` (`src/components/Pathfinder.tsx`). Flow: 0 Intro → 1 Where you are → 2 Qualifications → 3 Subjects → 4 Predicted grades → 5 GCSE Maths and English → 6 Tuesday afternoon → 7 Matching (900ms, text only, `role="status"`) → 8 Result. Scoring, scheme data and copy are unchanged: `SECTORS`, `Q_WEIGHTS`, `quizResult`, `roadmapPdf` in `GetInApp.tsx`. Q3 keeps its labels, shown in four groups (`Q3_GROUPS`). State: `{ step, furthest, year, quals, subjects, other, grades, maths, english, tue }`. GCSEs start unanswered; `quizResult` falls back to grade 4 only if one is missing.

- **Header strip:** a 6-segment progress bar (3px, 4px gap, oxblood `scaleX` fill: done 1, current 0.4, rest 0; 320ms) with "Question N of 6" and "About X seconds left" (15s per remaining question).
- **Answers rail (≥900px):** a 232px sticky column with a 64px gap. Each row is a button to that step, disabled beyond `furthest`, and the current row has `aria-current="step"`. "Tap an answer to change it." appears from question 2. The rail is hidden on the intro and the result; the result drops to one column with 0 gap and uses the full width.
- **Single choice (1, 2, 4, 6):** full-width rows, 56px (64px on Q6), `aria-pressed` inside `role="group"` labelled by the h1. On: oxblood border with an inset ring, bone ground, filled dot. The number key box shows on fine pointers only. Questions 1, 2 and 4 auto-advance after 240ms; Q6 never does.
- **Subjects:** 44px chips in four groups, a live "N picked" count, a ✓ on selected chips, and "Other" opens a 60-character field. Toggling reads current state, so fast taps are kept.
- **GCSE:** two rows of 9 8 7 6 5 4 3 Resit (`repeat(7,1fr) 1.6fr`, 52px cells), no default, and both are needed to continue. The hint reads "Pick one" or "Grade N".
- **Footer:** sticky. Back from step 2, and the key hint on desktop. Next is the site's primary button ("See my result" on Q6). When blocked it has `aria-disabled`, 0.45 opacity, no press scale, and a visible reason linked by `aria-describedby`. On phones the reason sits on top, with Back and Next on one row.
- **Keyboard:** keys 1–9 pick on single-choice screens. Enter runs Next unless focus is on a button, link, summary or input. Keys with modifiers, and typing in fields, are ignored.
- **Result:** "Your best fit", then the sector h1, then a 3-cell standing meter (hidden for "grades not entered"), the body and "Also a fit". Next come "Three schemes to aim for", locked to employer and scheme until the wall is passed. Then the bone email wall (name, email, optional parent email) with validation, focus-on-error, an offline message and "Sending…". After unlocking: the roadmap steps, a closed "Schemes in the other five sectors", the discovery-call card, the closing line, the course link and "Start again". A visitor who already gave details in the pop-up skips the wall, and one `quiz_roadmap` lead is saved when the result loads.
- **Leads and analytics (unchanged):** `saveLead('quiz_roadmap', …)` with name, email, parent_email, phone, result, also, year, quals, subjects, grades, gcse_maths, gcse_english, tuesday. Events: `quiz_start`, `quiz_start_flyout`, `quiz_complete`, `lead_quiz_roadmap`, `roadmap_pdf`, `discovery_call_whatsapp`.
- **Motion:** each step fades in and rises 6px via WAAPI (220ms, `cubic-bezier(0.23,1,0.32,1)`), then focus moves to the new h1 (`tabIndex=-1`, `preventScroll`). Reduced motion skips the animation. Transitions are named only, and hover styles apply only to fine pointers.
- **Oxblood** appears only on selected answers, the progress fill, the standing marker, primary buttons, the rail's current number and the live count. Validation errors keep the site's existing oxblood error style.
- **Entry points:** every "Try the Pathfinder" button, the floating compass button and the footer link. The flyout logic (`qFlyOpts`) starts at question 2 with `furthest: 1`; the v12 design doesn't draw a "Take the quiz" tab.

## Welcome pop-up
Slate ink #27313F ground (a warm, low-chroma blue that sits with bone and blackberry), bone button with slate text, fields #202936, warm-grey labels. Both actions ("Book my discovery call" and "Try the Pathfinder first") submit the same form, so first name and email are always captured through saveLead (sources: discovery_call, popup_pathfinder).

## Buttons (one system, defined once at the end of the page's style block)
- Primary: oxblood fill, warm-white text, 52px tall, 0 28px padding, Source Sans 3 600 15px, uppercase, 0.08em tracking, 2px radius. Every "do this" action: Reserve, Pathfinder, Book my discovery call, Next, Send. Hover #6C303A, press scale 0.97.
- Compact: the same button at 44px / 14px for the header, top price banner and sticky bar.
- Secondary: 44px outline in the ink of its ground (blackberry on light, bone on dark), same type. Used for Free Parent's Guide and the bar's Free Pathfinder.
- Green (--gain) is data only (pay bar, ticks, "Free" labels). Never a button.

## Deadline Line (internal, not shown on the site)
Team replies to up to 4 questions per student per day. Not stated publicly. Public promise: message 24/7, replies within 24 hours every day, until the last application deadline.

## Positioning (Obviously Awesome canvas)
- Competitive alternatives: doing it alone with free online practice tests and YouTube; school careers advice (covers the form, not the assessments); general tutors.
- Unique attributes: all five stages in one place; a full mock assessment centre; assessed by working degree apprentices; their real application reviewed twice; the Deadline Line (24/7 WhatsApp to the team until the last deadline); the DegreeYourWay Guarantee.
- Value themes: they walk into every stage having done it before; they apply to the right schemes in the right order; they never apply alone.
- Best-fit customers: parents of Year 12/13 students (or 19–23s) aiming at Level 6 degree apprenticeships with large employers that use tests, video interviews and assessment centres.
- Market category: degree apprenticeship application coaching (a sub-category of admissions coaching; "this isn't UCAS").
- Trend: graduate hiring down, apprenticeship hiring up; 11 applications per Level 6 place.
- Positioning statement: For parents of students applying to degree apprenticeships, DegreeYourWay is the only preparation that covers all five stages, assessed by people who passed them.
- Headline pattern: name the alternative, then the difference ("Most prep covers one stage. We cover all five.").

## Student handout
`Get In Student Handout.dc.html` — one A4 page (doc-page, size a4) for school talks. Only linked from the For schools thank-you state, i.e. after the school's details are captured via saveLead('school_talk'). Never linked elsewhere. Needs: website address and a QR code image to the Pathfinder.
