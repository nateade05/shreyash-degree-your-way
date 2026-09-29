'use client';
import { usePathname, useRouter } from 'next/navigation';
import GetInApp from './GetInApp';
import { pageFromPath } from '@/lib/pages';
import { SITE } from '@/lib/site';

// Keeps one GetInApp mounted across the five routes (so overlays, quiz answers and chat survive
// navigation, as they did in the prototype) and feeds it the current route.
export default function Shell() {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <>
      {/* A snap point at the very top: the design snaps sections under the sticky header, and on
          phones the first load snapped ~16px down (header height not known yet), hiding the top
          of the price banner. With this the nearest snap point on load is the top of the page. */}
      <span aria-hidden="true" className="gi-snaptop" />
      <GetInApp
        startPage={pageFromPath(pathname)}
        navigate={path => router.push(path, { scroll: false })}
        seatsLeft={SITE.seatsLeft}
        ctaLabel="Book a free call"
        calLink={SITE.calLink}
        leadEndpoint="/api/lead"
        previewOffer={false}
        previewPing={false}
        showProofPreview={false}
      />
    </>
  );
}
