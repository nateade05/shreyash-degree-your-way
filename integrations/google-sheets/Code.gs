/**
 * DegreeYourWay — lead inbox for Google Sheets.
 *
 * Receives every form submission from the website (POST /api/lead forwards it here) and adds it
 * as a row. Setup: see integrations/google-sheets/README.md.
 *
 * Script properties (Project Settings → Script properties):
 *   KEY           required. A long random string; the website must send it as ?key=… in the URL.
 *   NOTIFY_EMAIL  optional. Emails this address when a booking, call request or school talk comes in.
 */

var SHEET_NAME = 'Leads';

// Columns shown first, in this order. Any other field the site sends gets its own column
// at the end automatically, so nothing is ever dropped.
var COLUMNS = [
  ['received_at', 'Received'],
  ['source', 'Form'],
  ['name', 'First name'],
  ['parent', "Parent's name"],
  ['student', "Student's name"],
  ['email', 'Email'],
  ['phone', 'Phone'],
  ['mobile', 'Mobile'],
  ['parent_email', "Parent's email"],
  ['school', 'School'],
  ['role', 'Role'],
  ['dates', 'Preferred dates'],
  ['year', 'Year'],
  ['stage', 'Stage'],
  ['place', 'Place'],
  ['result', 'Pathfinder result'],
  ['also', 'Also a fit'],
  ['quals', 'Qualifications'],
  ['subjects', 'Subjects'],
  ['grades', 'Predicted grades'],
  ['gcse_maths', 'GCSE Maths'],
  ['gcse_english', 'GCSE English'],
  ['tuesday', 'Tuesday afternoon'],
  ['experience', 'Work experience'],
  ['extras', 'Outside lessons'],
  ['tests_done', 'Done before'],
  ['firm_size', 'Employer type'],
  ['worry', 'Biggest worry'],
  ['worry_note', 'Worry (their words)'],
  ['top_matches', 'Top matches'],
  ['cv_source', 'CV check: from'],
  ['cv_file', 'CV file'],
  ['cv_gaps', 'CV gaps'],
  ['cv_strengths', 'CV strengths'],
  ['cv_text', 'CV text'],
  ['page', 'Page'],
  ['utm_source', 'utm_source'],
  ['utm_medium', 'utm_medium'],
  ['utm_campaign', 'utm_campaign'],
  ['referrer', 'Referrer'],
  ['at', 'Sent (browser time)'],
  ['id', 'Lead id'],
];

var SOURCE_LABELS = {
  discovery_call: 'Discovery call',
  popup_pathfinder: 'Pop-up → Pathfinder',
  parents_guide: "Parent's Guide",
  quiz_roadmap: 'Pathfinder roadmap',
  booking: 'Booking',
  school_talk: 'School talk',
  cv_check: 'Pathfinder CV check',
};

// Forms that deserve an email the moment they arrive.
var NOTIFY_SOURCES = { booking: true, discovery_call: true, school_talk: true };

function doPost(e) {
  var props = PropertiesService.getScriptProperties();
  var key = props.getProperty('KEY');
  if (!key || !e || !e.parameter || e.parameter.key !== key) return json_({ ok: false, error: 'unauthorised' });

  var lead;
  try {
    lead = JSON.parse(e.postData.contents);
  } catch (err) {
    return json_({ ok: false, error: 'bad_json' });
  }
  if (!lead || typeof lead !== 'object' || !lead.source) return json_({ ok: false, error: 'bad_lead' });

  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    var sheet = sheet_();
    if (lead.id && isDuplicate_(sheet, lead.id)) return json_({ ok: true, duplicate: true });
    appendLead_(sheet, lead);
  } finally {
    lock.releaseLock();
  }

  var notify = props.getProperty('NOTIFY_EMAIL');
  if (notify && NOTIFY_SOURCES[lead.source]) {
    try {
      notify_(notify, lead);
    } catch (err) {
      console.error('notify failed', err);
    }
  }
  return json_({ ok: true });
}

// Visiting the web app URL in a browser shows this, which is a quick way to check it's live.
function doGet() {
  return json_({ ok: true, service: 'DegreeYourWay lead inbox' });
}

function appendLead_(sheet, lead) {
  var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  var keys = headers.map(keyForHeader_);

  // New fields get a new column rather than being lost.
  Object.keys(lead).forEach(function (k) {
    if (keys.indexOf(k) === -1) {
      keys.push(k);
      sheet.getRange(1, keys.length).setValue(labelFor_(k)).setFontWeight('bold');
    }
  });

  var row = keys.map(function (k) {
    var v = lead[k];
    if (v === undefined || v === null) return '';
    if (k === 'source') return SOURCE_LABELS[v] || v;
    if (k === 'received_at' || k === 'at') {
      var d = new Date(v);
      return isNaN(d.getTime()) ? safe_(String(v)) : d;
    }
    return safe_(String(v));
  });
  sheet.appendRow(row);
}

// A cell starting with = + - @ would run as a formula; keep it as text. Phone numbers stay as-is.
function safe_(v) {
  if (/^[=+\-@]/.test(v) && !/^\+[\d\s]+$/.test(v)) return "'" + v;
  return v;
}

function isDuplicate_(sheet, id) {
  var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0].map(keyForHeader_);
  var col = headers.indexOf('id') + 1;
  var last = sheet.getLastRow();
  if (!col || last < 2) return false;
  var start = Math.max(2, last - 200); // retries arrive within seconds; the recent rows are enough
  var ids = sheet.getRange(start, col, last - start + 1, 1).getValues();
  for (var i = 0; i < ids.length; i++) if (ids[i][0] === id) return true;
  return false;
}

function sheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME, 0);
    formatSheet_(sheet);
  } else if (sheet.getLastColumn() === 0) {
    formatSheet_(sheet);
  }
  return sheet;
}

function formatSheet_(sheet) {
  var labels = COLUMNS.map(function (c) { return c[1]; });
  sheet.getRange(1, 1, 1, labels.length).setValues([labels])
    .setFontWeight('bold').setBackground('#30202A').setFontColor('#FBF9F5');
  sheet.setFrozenRows(1);
  sheet.setFrozenColumns(2);
  sheet.getRange('A:A').setNumberFormat('dd mmm yyyy, hh:mm');
  sheet.setColumnWidth(1, 150);
  sheet.setColumnWidth(2, 150);
}

function keyForHeader_(label) {
  for (var i = 0; i < COLUMNS.length; i++) if (COLUMNS[i][1] === label) return COLUMNS[i][0];
  return label;
}

function labelFor_(key) {
  for (var i = 0; i < COLUMNS.length; i++) if (COLUMNS[i][0] === key) return COLUMNS[i][1];
  return key;
}

function notify_(to, lead) {
  var label = SOURCE_LABELS[lead.source] || lead.source;
  var who = lead.school || lead.parent || lead.name || lead.email || 'someone';
  var lines = Object.keys(lead)
    .filter(function (k) { return lead[k] !== '' && lead[k] != null; })
    .map(function (k) { return labelFor_(k) + ': ' + lead[k]; });
  MailApp.sendEmail({
    to: to,
    subject: 'DegreeYourWay: new ' + label.toLowerCase() + ' from ' + who,
    body: lines.join('\n') + '\n\nAll leads: ' + SpreadsheetApp.getActiveSpreadsheet().getUrl(),
  });
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

/**
 * Run once from the editor (select "setup" and press Run). It creates the Leads tab, writes a
 * random KEY if there isn't one, and logs the key so you can copy it into the website's secret.
 */
function setup() {
  sheet_();
  // Remove the empty default tab so Leads is the only one.
  var blank = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Sheet1');
  if (blank && blank.getLastRow() === 0 && blank.getLastColumn() === 0) SpreadsheetApp.getActiveSpreadsheet().deleteSheet(blank);
  var props = PropertiesService.getScriptProperties();
  var key = props.getProperty('KEY');
  if (!key) {
    key = Utilities.getUuid().replace(/-/g, '') + Utilities.getUuid().replace(/-/g, '');
    props.setProperty('KEY', key);
  }
  console.log('KEY = ' + key);
  console.log('Next: Deploy → New deployment → Web app (Execute as: Me, Who has access: Anyone).');
}

/** Run from the editor to add a test row and check everything works. */
function testLead() {
  var key = PropertiesService.getScriptProperties().getProperty('KEY');
  var res = doPost({
    parameter: { key: key },
    postData: {
      contents: JSON.stringify({
        source: 'booking', parent: 'Test Parent', student: 'Test Student', email: 'test@example.com',
        mobile: '+44 7700 900123', place: 'Founding, £595', page: 'price',
        received_at: new Date().toISOString(), id: 'test-' + Date.now(),
      }),
    },
  });
  console.log(res.getContent());
}
