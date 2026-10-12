import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Call booked | DegreeYourWay',
  description: 'Your free 30-minute call is booked.',
  robots: { index: false, follow: true },
};

// Content is rendered by the shared site shell in (site)/layout.tsx.
export default function Page() {
  return null;
}
