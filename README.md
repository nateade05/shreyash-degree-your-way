# DegreeYourWay website

The DegreeYourWay site (degree apprenticeship application coaching), built from the Claude Design
handoff `design_handoff_get_in_website`. The design used the working name "Get In"; the brand is
now DegreeYourWay. It uses Next.js (App Router) and TypeScript, and deploys to
**Cloudflare Workers** through [OpenNext](https://opennext.js.org/cloudflare).

| Route | Page |
|---|---|
| `/` | Overview |
| `/course` | The course |
| `/prices` | Prices and booking |
| `/schools` | For schools |
| `/pathfinder` | Pathfinder: full screen, 10 to 12 questions (by path), then a report with matches, a 12-month plan, stage tips and a CV check |
| `/terms` | Terms and the DegreeYourWay Guarantee |
| `/booked` | "Booked." confirmation; point the booking tool's redirect here |
| `/privacy` | Privacy policy |
| `/handout?t=…` | Student handout. Gated: only opens with the signed link shown after a school books a talk. The link is valid for 30 days. |
| `POST /api/lead` | Every form goes here through `saveLead()` |

## How the port is organised

- `src/components/GetInView.tsx` holds the prototype's markup, generated from the design file by
  `scripts/dc-to-jsx.mjs`. Copy, inline styles and structure are unchanged.
- `src/components/GetInApp.tsx` holds the prototype's logic class, ported almost verbatim: quiz
  scoring (`SECTORS`, `Q_WEIGHTS`, `quizResult`), chat KB, `saveLead`, pop-up timing and
  carousels. Production changes are marked `PORT:`.
- `src/app/globals.css` is the prototype's `<style>` block.
- `src/app/(site)/layout.tsx` keeps one app instance mounted across the five routes, so pop-ups,
  quiz answers and chat survive navigation.
- `scripts/port.sh` regenerates both views from the design (currently `Get In v12.dc.html`, per
  `UPDATE-v12.md`); `scripts/port-edits.mjs` then applies the production edits.

## Working on this together

1. Install [Node.js](https://nodejs.org) 20 or newer, then clone the repo and install:
   ```bash
   git clone https://github.com/sshreyashsingh-crypto/degreeyourway.git
   cd degreeyourway
   npm install
   npm run dev            # http://localhost:3000
   ```
2. Work on a branch and open a pull request, so changes are reviewed before they reach `main`:
   ```bash
   git checkout -b my-change
   # edit, then
   git add -A && git commit -m "Describe the change"
   git push -u origin my-change
   ```
3. Before pushing, check it builds cleanly: `npm run lint` and `npx tsc --noEmit`.
4. Only someone with access to the Cloudflare account runs `npm run deploy`. Secrets
   (`HANDOUT_SECRET`, `LEAD_WEBHOOK_URL`) live in Cloudflare, never in the repo.

Most of the page markup is generated from the design files (see "How the port is organised").
Edit `GetInView.tsx` and the Pathfinder views directly for small copy fixes. For a new design
handoff, re-run `scripts/port.sh`.

## Develop

```bash
npm install
npm run dev            # http://localhost:3000
npm run preview        # production build running in the Cloudflare runtime (workerd)
```

Copy `.dev.vars.example` to `.dev.vars` for `npm run preview`.

## The free-call flow

Every primary button says **Book a free call**. The first click opens the discovery-call pop-up,
which saves the lead. The thank-you step then links to the booking page. Once someone has given
their details, the buttons open the booking page directly. Set the booking page in
`NEXT_PUBLIC_CAL_LINK` (Cal.com or Calendly), and make that tool redirect to `/booked` after a
booking. If it isn't set, the buttons fall back to WhatsApp.

## Analytics and cookies

Set `NEXT_PUBLIC_GTM_ID` to a Google Tag Manager container. The site then shows a cookie banner,
and GTM only loads after the visitor accepts. A "Cookie settings" link appears in the footer.
Without it there's no analytics and no banner. Events such as `lead_*`, `call_booked_click`,
`quiz_complete` and `roadmap_pdf` are pushed to `dataLayer`.

## Deploy to Vercel (current)

Vercel deploys from GitHub automatically: every push to `main` goes live, and every pull request
gets its own preview link. One-time setup:

1. Sign in at [vercel.com](https://vercel.com) with the GitHub account that owns this repo.
2. **Add New → Project**, import `degreeyourway`. Vercel detects Next.js; leave the build
   settings as they are.
3. Before clicking **Deploy**, open **Environment Variables** and add:
   - `LEAD_WEBHOOK_URL`: where leads go (see "Where leads go"). **Required**: on Vercel there is
     no KV backup, so without it leads are lost.
   - `HANDOUT_SECRET`: any long random string (`openssl rand -hex 32`). Without it, schools
     don't get the handout link.
   - Optional: any `NEXT_PUBLIC_*` value from `.env.example`. These are baked in at build time,
     so redeploy after changing them.
4. Deploy. The site is live at `https://<project>.vercel.app`. A custom domain can be added later
   under **Settings → Domains**.

On Vercel, the Cloudflare-only parts (the `LEADS` KV backup and the `LEAD_LIMITER` rate limit)
are skipped; everything else works the same.

## Deploy to Cloudflare

```bash
npx wrangler login
npx wrangler secret put HANDOUT_SECRET     # any long random string
npx wrangler secret put LEAD_WEBHOOK_URL   # where leads go (see below)
npm run deploy
```

The site goes live at `https://degreeyourway.<your-subdomain>.workers.dev`. To use your own
domain, go to Cloudflare dashboard → Workers → degreeyourway → Settings → Domains & Routes.

Settings such as the WhatsApp number and seat count have defaults in `src/lib/site.ts`, so no
env file is needed. To override them, use `.env.production` (see `.env.example`). They are baked
in at build time, so setting them as Cloudflare variables has no effect. The handout's printed
address and QR code use whichever domain it's served from, so they're right on workers.dev and on
a custom domain.

### Where leads go

`/api/lead` only accepts JSON from the site itself (it checks the `Origin` header). It requires
each form's fields and a valid email, and allows 10 submissions a minute per IP address (the
`LEAD_LIMITER` binding). Values that a spreadsheet would run as formulas are stored as text.
It then:

1. POSTs it as JSON to `LEAD_WEBHOOK_URL`. The ready-made option is the Google Sheets inbox in
   [`integrations/google-sheets`](integrations/google-sheets/README.md). Zapier, Make, or a
   HubSpot or Airtable webhook also work.
2. Keeps a copy in Cloudflare KV (the `LEADS` binding in `wrangler.jsonc`). List them with
   `npx wrangler kv key list --binding LEADS --remote`.

**If neither is set, leads are not stored anywhere.** The logs only record the source and an id,
never personal details. Set at least one before launch.

Lead sources: `discovery_call`, `popup_pathfinder`, `parents_guide`, `quiz_roadmap`, `cv_check`,
`booking`, `school_talk`.

## Before launch (from the handoff)

1. ~~WhatsApp number~~ Done: +44 7463 870657, set in `src/lib/site.ts` (override with
   `NEXT_PUBLIC_WHATSAPP`). Copy that shows the number reads it from the same place.
2. **Instagram:** set to `https://www.instagram.com/` for now (`src/lib/site.ts`). The design never shows an Instagram link, so it has no visible effect until one is added.
3. **BBC source link** points to a section page, not the FOI article (`GetInView.tsx`).
4. **Seat alert** claims a live reservation. Connect it to real bookings or reword it (UK CPRs).
   The seat count comes from `NEXT_PUBLIC_SEATS_LEFT`.
5. **Legal:** the privacy policy is at `/privacy` (`src/app/privacy/page.tsx`). Its highlighted
   `[Needs input]` items are the legal form or company number, address, privacy email, ICO
   number and payment provider. Have it checked by a solicitor. Booking terms are still needed.
6. **Analytics:** events are pushed to `window.dataLayer`. Add GA4 or the Meta pixel through GTM.
7. Confirm permission to use each employer logo.
8. **Parent's Guide PDF** (`public/assets/get-in-parents-guide-2026-27.pdf`) still says "Get In" inside it (4 times).
   Re-export it as DegreeYourWay from the original document and replace the file.
