# Google Sheets lead inbox

Every form on the site (discovery call, Pathfinder, Parent's Guide, booking, school talk) goes
to `/api/lead`, which forwards it to this Google Sheet. One row per lead, newest at the bottom.
You can also get an email for each booking, call request and school talk.

Setup takes about 5 minutes.

## 1. Create the sheet and add the script

1. Go to [sheets.new](https://sheets.new) and name the sheet **DegreeYourWay leads**.
2. **Extensions → Apps Script.**
3. Delete what's in `Code.gs`, paste in everything from [`Code.gs`](Code.gs), and press **Save**.

## 2. Run the setup once

1. In the toolbar's function menu choose **setup**, then press **Run**.
2. Google asks for permission. Choose your account, then **Advanced → Go to (unsafe) → Allow**.
   The warning appears because this is your own unverified script. It only gets access to
   this sheet and to sending email as you.
3. The log at the bottom shows `KEY = …`. **Copy that key.** Your sheet now has a Leads tab
   with the column headings.

For email alerts: open **Project Settings (gear) → Script properties → Add property**, and set
`NOTIFY_EMAIL` to your address. You'll get an email for every booking, call request, school talk
and Pathfinder report unlock.

## 3. Publish it as a web app

1. **Deploy → New deployment.** Next to "Select type", pick **Web app**.
2. **Execute as: Me.** **Who has access: Anyone.**
   "Anyone" is needed so the website can reach it. The key stops anyone else adding rows.
3. Press **Deploy** and copy the **Web app URL** (it ends in `/exec`).

## 4. Connect the website

Put the key on the end of the URL:

```
https://script.google.com/macros/s/AKfy…/exec?key=YOUR_KEY
```

Check it works (a "Test Parent" row appears in the sheet):

```bash
node scripts/test-sheets.mjs "https://script.google.com/macros/s/AKfy…/exec?key=YOUR_KEY"
```

Give it to the live site (paste the whole URL when asked):

```bash
npx wrangler secret put LEAD_WEBHOOK_URL
```

For local testing, put `LEAD_WEBHOOK_URL=…` in `.dev.vars` (for `npm run preview`) or in
`.env.local` (for `npm run dev`).

## How it behaves

- **Columns:** the main fields come first (received, form, names, email, phone, school…), then
  Pathfinder answers, then page and campaign (utm) details. Any new field the site sends later
  gets its own column automatically, so nothing is dropped.
- **Duplicates:** each lead has an id, so a retried submission isn't added twice.
- **Formulas:** text that would run as a formula (starting with `=`, `+`, `-` or `@`) is stored
  as plain text. Phone numbers like `+44…` are kept as they are.
- **Wrong or missing key:** the script replies `{"ok":false}` and writes nothing. The website
  then reports the lead as failed.

## If you change the script later

**Deploy → Manage deployments → edit (pencil) → Version: New version → Deploy.** The URL stays
the same. Creating a *new* deployment would give a new URL, which you'd then need to update in
`LEAD_WEBHOOK_URL`.
