// Settings the handoff says to set once. Items marked "Needs input" must be fixed before launch
// (see README "Before launch").
export const SITE = {
  // WhatsApp number in international format, no + or spaces (+44 7463 870657).
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP || '447463870657',
  // Instagram link. Currently the Instagram home page; replace with the profile URL when there is one.
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM || 'https://www.instagram.com/',
  // Public address of the site. Only a fallback: the handout builds its QR code from the host it
  // is actually served on, so this matters only for metadata. Set SITE_URL at build time. On
  // Vercel it defaults to the project's production domain (VERCEL_PROJECT_PRODUCTION_URL).
  url:
    process.env.SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL ? 'https://' + process.env.VERCEL_PROJECT_PRODUCTION_URL : 'https://degreeyourway.example'),
  // Booking page for the free 30-minute call (Cal.com, Calendly…). Set it to redirect to /booked
  // after a booking. Empty: "Book a free call" falls back to WhatsApp.
  calLink: process.env.NEXT_PUBLIC_CAL_LINK || '',
  // Google Tag Manager container (GTM-XXXXXXX). Empty: no analytics and no cookie banner.
  gtmId: process.env.NEXT_PUBLIC_GTM_ID || '',
  // The course offer (course and prices pages, prices, seat counts, the guarantee). Off until the
  // offer is settled: the site then explains degree apprenticeships and sends people to the
  // Pathfinder and a free call. Set NEXT_PUBLIC_COURSE_OFFER=on at build time to show it.
  courseOffer: process.env.NEXT_PUBLIC_COURSE_OFFER === 'on',
  // Seats left in the founding cohort (10 = none sold yet).
  seatsLeft: Number(process.env.NEXT_PUBLIC_SEATS_LEFT || 10),
};

// The same number as people write it in the UK, for copy: 07463 870657.
export function whatsappDisplay(n: string = SITE.whatsapp) {
  const local = n.startsWith('44') ? '0' + n.slice(2) : n;
  return local.length === 11 ? local.slice(0, 5) + ' ' + local.slice(5) : local;
}

// The founder's photo for the Pathfinder call cards (e.g. '/assets/shreyash.jpg'). Empty: initials.
export const FOUNDER_PHOTO = '/assets/shreyash.jpg';

// The booking page with the visitor's details filled in (Cal.com and Calendly both read name and
// email from the URL). Empty when no booking page is set; callers fall back to WhatsApp.
export function calUrl(prefill: { name?: string; email?: string; notes?: string } = {}) {
  if (!SITE.calLink) return '';
  try {
    const u = new URL(SITE.calLink);
    if (prefill.name) u.searchParams.set('name', prefill.name);
    if (prefill.email) u.searchParams.set('email', prefill.email);
    if (prefill.notes) u.searchParams.set(/calendly\.com$/.test(u.hostname) ? 'a1' : 'notes', prefill.notes);
    return u.toString();
  } catch {
    return SITE.calLink;
  }
}
