import Link from 'next/link';

export default function NotFound() {
  return (
    <main style={{ minHeight: '100vh', background: 'var(--bone)', display: 'flex', alignItems: 'center' }}>
      <div style={{ maxWidth: 560, margin: '0 auto', padding: '0 20px' }}>
        <p style={{ margin: 0, fontSize: 12, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)' }}>
          DegreeYourWay. · Page not found
        </p>
        <h1 style={{ margin: '8px 0 16px', fontFamily: "'Newsreader',serif", fontWeight: 400, fontSize: 44, lineHeight: 1.05, letterSpacing: '-0.02em' }}>
          That page doesn&apos;t exist.
        </h1>
        <p style={{ margin: '0 0 28px', fontSize: 17, lineHeight: 1.55, color: 'var(--blackberry-soft)' }}>
          It may have moved. Everything about the course starts from the overview.
        </p>
        <Link href="/" className="gi-btn">
          Back to the overview
        </Link>
      </div>
    </main>
  );
}
