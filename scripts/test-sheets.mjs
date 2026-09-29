// Sends one test lead straight to the Google Sheets web app, to check the setup.
//   node scripts/test-sheets.mjs "https://script.google.com/macros/s/…/exec?key=…"
const url = process.argv[2];
if (!url || !url.includes('key=')) {
  console.error('Usage: node scripts/test-sheets.mjs "<web app URL>?key=<KEY>"');
  process.exit(1);
}
const lead = {
  source: 'booking', parent: 'Test Parent', student: 'Test Student', email: 'test@example.com',
  mobile: '+44 7700 900123', place: 'Founding, £595', page: 'price',
  received_at: new Date().toISOString(), id: 'test-' + Date.now(),
};
const r = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(lead) });
const text = await r.text();
console.log(r.status, text.slice(0, 300));
if (!text.includes('"ok":true')) {
  console.error('\nNot accepted. Check the KEY in the URL matches the script property, and that the web app is deployed with access "Anyone".');
  process.exit(1);
}
console.log('\nA "Test Parent" row should now be in the Leads tab.');
