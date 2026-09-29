// Settings the handoff says to set once. Items marked "Needs input" must be fixed before launch
// (see README "Before launch").
export const SITE = {
  // WhatsApp number in international format, no + or spaces (+44 7463 870657).
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP || '447463870657',
  // Instagram link. Currently the Instagram home page; replace with the profile URL when there is one.
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM || 'https://www.instagram.com/',
  // Public address of the site. Only a fallback: the handout builds its QR code from the host it
  // is actually served on, so this matters only for metadata. Set SITE_URL at build time.
  url: process.env.SITE_URL || 'https://degreeyourway.example',
  // Booking page for the free 30-minute call (Cal.com, Calendly…). Set it to redirect to /booked
  // after a booking. Empty: "Book a free call" falls back to WhatsApp.
  calLink: process.env.NEXT_PUBLIC_CAL_LINK || '',
  // Google Tag Manager container (GTM-XXXXXXX). Empty: no analytics and no cookie banner.
  gtmId: process.env.NEXT_PUBLIC_GTM_ID || '',
  // Seats left in the founding cohort (10 = none sold yet).
  seatsLeft: Number(process.env.NEXT_PUBLIC_SEATS_LEFT || 10),
};

// The same number as people write it in the UK, for copy: 07463 870657.
export function whatsappDisplay(n: string = SITE.whatsapp) {
  const local = n.startsWith('44') ? '0' + n.slice(2) : n;
  return local.length === 11 ? local.slice(0, 5) + ' ' + local.slice(5) : local;
}
