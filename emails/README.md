# DegreeYourWay emails

Eight Resend templates, one for each point where the site captures someone. They use the site's
own design tokens from `docs/DESIGN.md`. The copy follows the house style: British spelling, no
exclamation marks, no middots or em dashes.

| Template (alias) | When to send | Variables |
|---|---|---|
| `call-requested` | Lead with source `discovery_call` or `popup_pathfinder` | NAME, CALL_URL |
| `call-booked` | Booking tool webhook. Turn off Cal.com's own confirmation if you use it | NAME, CALL_TIME, CALL_LOCATION, RESCHEDULE_URL |
| `parents-guide` | Lead with source `parents_guide` | CALL_URL |
| `pathfinder-report` | Lead with source `quiz_roadmap` | NAME, RESULT, ALSO, TOP_MATCHES, CALL_URL |
| `pathfinder-follow-up` | 2 days after `quiz_roadmap`, only if no call is booked | NAME, TOP_MATCH, CALL_URL |
| `place-requested` | Lead with source `booking` | PARENT_NAME, STUDENT_NAME, PLACE, BALANCE |
| `deposit-received` | Once the £100 deposit is paid | PARENT_NAME, STUDENT_NAME, PLACE, BALANCE |
| `school-talk` | Lead with source `school_talk` | NAME, SCHOOL, DATES, HANDOUT_URL |

`cv_check` gets no email: it follows the Pathfinder report, which already sends one.

## Editing

Copy lives in `templates.mjs`. Rebuild after any change:

```bash
SITE_URL=https://your-live-domain node emails/build.mjs
open emails/dist/index.html        # preview every email with sample values
```

The build fails if a template uses a variable it doesn't declare, or if the copy contains a
middot, em dash or exclamation mark.

## Uploading to Resend

1. Verify the sending domain in Resend.
2. Build with `SITE_URL` set (the push refuses placeholder links), then:
   ```bash
   RESEND_API_KEY=re_… \
   EMAIL_FROM='Shreyash at DegreeYourWay <hello@your-domain>' \
   EMAIL_REPLY_TO=hello@your-domain \
   node emails/push.mjs              # add --dry-run first to check
   ```
   Running it again updates the templates in place (matched by alias).

The reply-to inbox must be read: two emails invite a reply, and the marketing ones say
"Reply stop and we won't email again".

## Sending

Resend fills `{{{VARS}}}` without escaping them, so **HTML-escape every value that came from a
form** before sending:

```ts
const esc = (s: string) => s.replace(/[&<>"']/g, c => `&#${c.charCodeAt(0)};`);
await resend.emails.send({
  from: 'Shreyash at DegreeYourWay <hello@your-domain>',
  to: lead.email,
  template: { id: 'pathfinder-report', variables: { NAME: esc(lead.name), RESULT: esc(lead.result), /* … */ } },
});
```

Where each value comes from:

- **NAME, RESULT, ALSO, TOP_MATCHES**: the lead fields `name`, `result`, `also`, `top_matches`.
  TOP_MATCH is the first item of `top_matches` (split on `; `). Skip the follow-up if it's empty.
- **PARENT_NAME, STUDENT_NAME, PLACE**: the booking lead's `parent`, `student`, `place`.
  BALANCE is £495 for the founding place and £850 for the placement place (£950 less the deposit).
- **CALL_URL**: `calUrl({ name, email })` from `src/lib/site.ts`. It falls back to the booking
  page, or to WhatsApp when there's no booking page.
- **HANDOUT_URL**: the site address plus the `handout` path that `/api/lead` returns for `school_talk`.

## Before going live

- The Parent's Guide PDF still says "Get In" inside it (see the main README).
- `deposit-received` assumes a £100 deposit paid somewhere; wire it to the payment provider
  once one is chosen, or send it by hand.
- The Pathfinder report email says the full report reopens in the same browser. Check this
  still holds if the Pathfinder changes how it saves progress.
