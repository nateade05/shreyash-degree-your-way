'use client';
import { useEffect, useState } from 'react';
import { SITE } from '@/lib/site';

// Cookie consent (UPDATE-v12 §8): analytics stays off until the visitor accepts. Only active
// when a Google Tag Manager container is configured; with no analytics there is nothing to ask.
// The footer's "Cookie settings" link reopens it via the dyw:cookie-settings event.
const KEY = 'dyw_consent';

function loadGtm(id: string) {
  if (document.getElementById('gtm-script')) return;
  const w = window as unknown as { dataLayer: unknown[] };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
  const s = document.createElement('script');
  s.id = 'gtm-script';
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtm.js?id=' + encodeURIComponent(id);
  document.head.appendChild(s);
}

export default function Consent() {
  const id = SITE.gtmId;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!id) return;
    let choice: string | null = null;
    try {
      choice = localStorage.getItem(KEY);
    } catch {}
    // Shown after first paint, so it never blocks the page (and isn't in the server HTML).
    const t = choice === 'granted' ? (loadGtm(id), 0) : choice !== 'denied' ? window.setTimeout(() => setOpen(true), 0) : 0;
    const reopen = () => setOpen(true);
    window.addEventListener('dyw:cookie-settings', reopen);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener('dyw:cookie-settings', reopen);
    };
  }, [id]);

  if (!id || !open) return null;

  const choose = (v: 'granted' | 'denied') => {
    try {
      localStorage.setItem(KEY, v);
    } catch {}
    setOpen(false);
    // Turning analytics off after it has loaded needs a reload to unload the scripts.
    if (v === 'granted') loadGtm(id);
    else if (document.getElementById('gtm-script')) window.location.reload();
  };

  return (
    <div role="dialog" aria-label="Cookie settings" className="dyw-consent">
      <p>
        We&apos;d like to use analytics cookies to see which pages and campaigns work. They stay off unless you accept.{' '}
        <a href="/privacy" target="_blank" rel="noopener">
          Privacy policy
        </a>
      </p>
      <div className="dyw-consent-acts">
        <button type="button" className="gi-guidesm" onClick={() => choose('denied')}>
          Reject
        </button>
        <button type="button" className="gi-btn" onClick={() => choose('granted')}>
          Accept analytics
        </button>
      </div>
    </div>
  );
}
