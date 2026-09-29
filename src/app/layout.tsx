import type { Metadata, Viewport } from 'next';
import './globals.css';
import { SITE } from '@/lib/site';
import Consent from '@/components/Consent';

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: 'DegreeYourWay · Degree apprenticeship application coaching for all five stages',
  description:
    'Two days in London that prepare your child for every stage of a degree apprenticeship application: tests, video interview, a full mock assessment centre and their real application. Assessed by working degree apprentices.',
};

export const viewport: Viewport = { width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;1,6..72,400&family=Source+Sans+3:wght@400;500;600&display=swap"
        />
      </head>
      <body>
        {children}
        <Consent />
      </body>
    </html>
  );
}
