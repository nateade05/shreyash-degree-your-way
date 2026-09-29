import type { Metadata } from 'next';
import { headers } from 'next/headers';
import Link from 'next/link';
import QRCode from 'qrcode';
import HandoutView from '@/components/HandoutView';
import { verifyHandout } from '@/lib/handoutToken';
import { SITE } from '@/lib/site';
import './handout.css';

export const metadata: Metadata = {
  title: 'DegreeYourWay · Student handout',
  robots: { index: false, follow: false },
};

// The address printed on the handout: the host this page is served from (so it is right on
// workers.dev and on a custom domain), unless SITE_URL is set at runtime.
async function siteOrigin() {
  if (process.env.SITE_URL) return process.env.SITE_URL.replace(/\/+$/, '');
  const h = await headers();
  const host = h.get('x-forwarded-host') || h.get('host');
  if (!host) return SITE.url.replace(/\/+$/, '');
  const proto = h.get('x-forwarded-proto') || (host.startsWith('localhost') ? 'http' : 'https');
  return `${proto}://${host}`;
}

// Gated: only reachable with the signed link shown after a school books a talk.
export default async function HandoutPage({ searchParams }: { searchParams: Promise<{ t?: string }> }) {
  const { t } = await searchParams;
  let ok = false;
  try {
    ok = await verifyHandout(t);
  } catch (err) {
    console.error('[handout] cannot verify links', err);
  }
  if (!ok) {
    return (
      <main className="ho-locked">
        <p className="ho-k">DegreeYourWay. · Student handout</p>
        <h1>This link has expired or isn&apos;t valid.</h1>
        <p>
          The handout is sent to schools once a talk is booked. <Link href="/schools">Book a school talk</Link> to get a new link.
        </p>
      </main>
    );
  }
  const target = (await siteOrigin()) + '/pathfinder';
  const qrSvg = await QRCode.toString(target, { type: 'svg', margin: 0, color: { dark: '#30202A', light: '#FBF9F5' } });
  return (
    <main className="ho-doc">
      <HandoutView v={{ qrSvg, pathfinderLabel: target.replace(/^https?:\/\//, '') }} />
    </main>
  );
}
