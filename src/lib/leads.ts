// The site's one lead path, shared by the shell (GetInApp.saveLead) and the Pathfinder: adds page
// and campaign data, keeps a local backup, pushes to analytics and POSTs to /api/lead. The promise
// rejects only when the lead didn't reach the server, so forms can show their retry message.
export function saveLead(source: string, fields: Record<string, unknown>, page: string) {
  const q = new URLSearchParams(window.location.search);
  const lead = {
    source, ...fields, page, referrer: document.referrer || '',
    utm_source: q.get('utm_source') || '', utm_medium: q.get('utm_medium') || '', utm_campaign: q.get('utm_campaign') || '',
    at: new Date().toISOString(),
  };
  try {
    const L = JSON.parse(localStorage.getItem('gi_leads') || '[]');
    L.push(lead);
    localStorage.setItem('gi_leads', JSON.stringify(L));
  } catch {}
  const w = window as unknown as { dataLayer?: unknown[] };
  (w.dataLayer = w.dataLayer || []).push({ event: 'lead_' + source, page });
  return fetch('/api/lead', { method: 'POST', keepalive: true, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(lead) })
    .then(r => (r.ok ? r.json().catch(() => ({})) : Promise.reject(new Error('lead ' + r.status))))
    .then(res => ({ ...lead, ...res }));
}

// The visitor's details from the discovery-call pop-up, if they gave them in this browser.
export function knownLead(): { name: string; email: string; phone: string } | null {
  try {
    const o = JSON.parse(localStorage.getItem('gi_offer') || 'null');
    return o && o.email ? { name: o.name || '', email: o.email, phone: o.phone || '' } : null;
  } catch {
    return null;
  }
}
