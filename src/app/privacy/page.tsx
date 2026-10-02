import type { Metadata } from 'next';
import Link from 'next/link';
import { whatsappDisplay } from '@/lib/site';
import './privacy.css';

export const metadata: Metadata = {
  title: 'Privacy policy · DegreeYourWay',
  description: 'How DegreeYourWay collects, uses and protects personal information, including information about students under 18.',
};

// Details still to confirm before launch render highlighted, so they can't be missed.
function Todo({ children }: { children: React.ReactNode }) {
  return <mark className="pv-todo">[Needs input: {children}]</mark>;
}

const COLLECT: [string, string, string, string][] = [
  ['Book a free discovery call (pop-up)', 'First name, email, mobile (optional)', 'To arrange and hold the call', 'Consent'],
  [
    'Use the Pathfinder',
    "Year group, qualifications, subjects, predicted grades, GCSE Maths and English grades, work experience, activities outside lessons, application stages done before, the kind of employer you prefer, your biggest worry about applying (and anything you write about it), your first name, email and (optional) a parent's email",
    'To produce your report, send it to you, and follow up about the course',
    'Consent',
  ],
  [
    'Check your CV in the Pathfinder',
    'The text of the CV you choose (read on your own device; the file itself is not uploaded), or your answers to four short questions, and the strengths and gaps we find',
    'To show you the gaps before you apply and to support your applications',
    'Consent',
  ],
  ["Ask for the Parent's Guide", 'Email, mobile', 'To send the guide and follow up', 'Consent'],
  [
    'Reserve a place',
    "Parent's name, email, mobile, student's name, year group, where they are in their applications, place chosen",
    'To take the booking, run the course and contact you about it',
    'Contract',
  ],
  [
    'Book a school talk',
    'School, your name, role, email, preferred dates',
    'To arrange the talk and send the student handout',
    "Legitimate interests (responding to a school's request)",
  ],
  [
    'Message us on WhatsApp',
    'Your number, name on WhatsApp, the messages',
    'To answer your questions and give Deadline Line support',
    'Contract (course students) or legitimate interests',
  ],
  [
    'Use the site',
    'Page visited, referring site, campaign tags in the link (utm), the time',
    'To understand which pages and campaigns work',
    'Legitimate interests (basic logs)',
  ],
];

export default function PrivacyPage() {
  const wa = whatsappDisplay();
  return (
    <div className="pv">
      <header className="pv-head">
        <Link href="/" className="pv-logo" aria-label="DegreeYourWay, home">
          DegreeYourWay.
        </Link>
      </header>

      <main className="pv-main">
        <p className="pv-k">DegreeYourWay. · Legal</p>
        <h1>Privacy policy</h1>
        <p className="pv-date">Last updated: 29 September 2026</p>

        <h2>Who we are</h2>
        <p>
          DegreeYourWay is run by <strong>DegreeYourWay Ltd</strong>, company number <Todo>company number</Todo>, registered at{' '}
          <Todo>registered address</Todo>. We are the data controller for the personal information described here.
        </p>
        <p>
          Contact: <Todo>privacy email address</Todo> or WhatsApp <strong>{wa}</strong>.
          <br />
          ICO registration number: <Todo>ICO number</Todo>.
        </p>

        <h2>What we collect, and why</h2>
        <div className="pv-tablewrap">
          <table className="pv-table">
            <thead>
              <tr>
                <th scope="col">When you…</th>
                <th scope="col">We collect</th>
                <th scope="col">Why</th>
                <th scope="col">Lawful basis</th>
              </tr>
            </thead>
            <tbody>
              {COLLECT.map(([when, what, why, basis]) => (
                <tr key={when}>
                  <th scope="row" data-label="When you…">{when}</th>
                  <td data-label="We collect">{what}</td>
                  <td data-label="Why">{why}</td>
                  <td data-label="Lawful basis">{basis}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          We don&apos;t ask for more than we need. Predicted and GCSE grades are used only to give you a result and to advise you;
          they aren&apos;t shared with employers.
        </p>

        <h2>Children</h2>
        <p>
          The course and the Pathfinder are for students aged 16 to 23, and are mostly bought by parents. We don&apos;t knowingly
          collect data from anyone under 13. Where a student under 18 gives us their details, we ask for a parent&apos;s email so a
          parent can be kept informed, and we write to students in plain language. A parent can ask us at any time to see or
          delete information about their child.
        </p>

        <h2>Who we share it with</h2>
        <p>
          We don&apos;t sell your data. We share it only with services that help us run DegreeYourWay, under contracts that require them
          to protect it:
        </p>
        <ul>
          <li>
            <strong>Website hosting:</strong> Cloudflare, Inc.
          </li>
          <li>
            <strong>Form and lead storage, and email:</strong> Google (Google Workspace: Sheets and Gmail)
          </li>
          <li>
            <strong>WhatsApp:</strong> WhatsApp (Meta Platforms Ireland Ltd), when you choose to message us
          </li>
          <li>
            <strong>Payments:</strong> <Todo>how deposits are paid, e.g. bank transfer or Stripe</Todo>, when you pay a deposit or
            balance
          </li>
          <li>
            <strong>Course assessors:</strong> our assessors see the student&apos;s name and course work so they can score it
          </li>
        </ul>
        <p>
          Some of these providers store data outside the UK (for example in the US). Where they do, we rely on the UK&apos;s
          adequacy regulations or the International Data Transfer Agreement to keep your data protected to UK standards.
        </p>

        <h2>How long we keep it</h2>
        <ul>
          <li>
            Discovery call, Pathfinder and Parent&apos;s Guide details: <strong>24 months</strong> from your last contact with us,
            then deleted.
          </li>
          <li>
            Bookings and course records: <strong>6 years</strong> after the course, for tax and legal reasons.
          </li>
          <li>
            School talk requests: <strong>24 months</strong> from the talk.
          </li>
          <li>
            WhatsApp messages: until the student&apos;s last application deadline, plus <strong>12 months</strong>.
          </li>
        </ul>

        <h2>Your rights</h2>
        <p>You can ask us to:</p>
        <ul>
          <li>see the information we hold about you</li>
          <li>correct it</li>
          <li>delete it</li>
          <li>stop or limit how we use it</li>
          <li>give it to you in a portable format</li>
          <li>stop sending you marketing (every email has an unsubscribe link, or just reply &quot;stop&quot;)</li>
        </ul>
        <p>
          Where we rely on consent, you can withdraw it at any time. Email <Todo>privacy email address</Todo> or message us on
          WhatsApp on {wa} and we&apos;ll reply within one month. There&apos;s no charge.
        </p>

        <h2>Cookies and similar storage</h2>
        <p>
          We use <strong>essential storage</strong>, which doesn&apos;t need consent: remembering that you&apos;ve closed the
          pop-up or seat notice this visit (<code>sessionStorage</code>), and keeping a copy of forms you&apos;ve sent on your own
          device so they aren&apos;t lost if the connection drops (<code>localStorage</code>).
        </p>
        <p>
          <strong>Analytics cookies</strong> are used only if you accept them in the cookie banner. They stay off until you do,
          and you can change your choice at any time from the &quot;Cookie settings&quot; link in the footer.
        </p>

        <h2>Security</h2>
        <p>
          Forms are sent over an encrypted connection (HTTPS). Access to lead data is limited to the DegreeYourWay team. If there&apos;s a
          data breach that puts you at risk, we&apos;ll tell you and the ICO as the law requires.
        </p>

        <h2>Complaints</h2>
        <p>
          If you&apos;re unhappy with how we&apos;ve handled your data, please contact us first. You can also complain to the
          Information Commissioner&apos;s Office:{' '}
          <a href="https://ico.org.uk/make-a-complaint/" target="_blank" rel="noopener">
            ico.org.uk/make-a-complaint
          </a>{' '}
          or 0303 123 1113.
        </p>

        <h2>Changes</h2>
        <p>
          If we change this policy we&apos;ll update the date at the top. If a change affects how we use data you&apos;ve already
          given us, we&apos;ll tell you first.
        </p>
      </main>

      <footer className="pv-foot">
        <span>© DegreeYourWay Ltd</span>
        <Link href="/">Back to the site</Link>
      </footer>
    </div>
  );
}
