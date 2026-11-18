import Link from 'next/link'
import type { Metadata } from 'next'
import { LEGAL_UPDATED, OPERATOR, SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: `What SkillTreeOSS collects, why, where it is stored, and how to delete it. Operated by ${OPERATOR.legalName}.`,
  alternates: { canonical: '/privacy' },
}

const host = SITE_URL.replace(/^https?:\/\//, '')
const mail = (
  <a href={`mailto:${OPERATOR.email}`} className="text-primary hover:underline">{OPERATOR.email}</a>
)

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background-dark flex flex-col">
      <main className="flex-1 mx-auto max-w-3xl px-6 py-16 lg:px-8">
        <div className="mb-10">
          <h1 className="text-4xl font-black text-white mb-2">Privacy Policy</h1>
          <p className="text-slate-500 text-sm">Last updated: {LEGAL_UPDATED}</p>
        </div>

        <div className="space-y-8 text-slate-300 text-sm leading-relaxed">

          <section>
            <h2 className="text-white font-bold text-xl mb-3">1. Who is responsible for your data</h2>
            <p>
              SkillTreeOSS at {host} is operated by {OPERATOR.legalName}, {OPERATOR.jurisdiction}, at{' '}
              {OPERATOR.address}. {OPERATOR.legalName} decides how personal data collected through the platform
              is used and is responsible for it. SkillTreeOSS keeps its own accounts and database, separate from{' '}
              {OPERATOR.shortName}&apos;s test-prep service at{' '}
              <a href={OPERATOR.url} className="text-primary hover:underline">{OPERATOR.url.replace(/^https?:\/\//, '')}</a>,
              and we do not combine the two.
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold text-xl mb-3">2. What We Collect</h2>
            <p className="mb-3">When you use SkillTreeOSS, we collect only what is necessary to provide the service:</p>
            <ul className="list-disc list-inside space-y-2 text-slate-400">
              <li><strong className="text-slate-300">Account data</strong> — email address, display name, and OAuth profile picture (if you sign in with GitHub or Google).</li>
              <li><strong className="text-slate-300">Progress data</strong> — which skill tree nodes you have marked as completed.</li>
              <li><strong className="text-slate-300">Feedback</strong> — your star ratings of trees, your upvotes or downvotes on resources, and resource suggestions you send.</li>
              <li><strong className="text-slate-300">Builder drafts</strong> — skill trees you save or submit from the builder while signed in.</li>
              <li>
                <strong className="text-slate-300">GitHub connection (optional)</strong> — if you connect GitHub to submit trees from your
                own account, we store your GitHub username and an access token. We use the token only to fork the repository and open the
                pull requests you ask for. You can disconnect GitHub at any time from the account menu.
              </li>
              <li><strong className="text-slate-300">Technical data</strong> — our hosting and network providers process your IP address and request details to deliver pages and block abuse.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white font-bold text-xl mb-3">3. What We Do NOT Collect</h2>
            <ul className="list-disc list-inside space-y-2 text-slate-400">
              <li>We do not collect payment information. The platform is free.</li>
              <li>We do not sell, rent, or share your data with third parties for advertising.</li>
              <li>We do not use tracking pixels, third-party analytics, or fingerprinting.</li>
              <li>We do not store passwords — authentication is handled by Supabase using OAuth or hashed credentials.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white font-bold text-xl mb-3">4. How We Use Your Data</h2>
            <ul className="list-disc list-inside space-y-2 text-slate-400">
              <li>To display your learning progress across sessions and devices.</li>
              <li>To aggregate anonymous resource quality signals (ratings and votes) to surface the best content.</li>
              <li>To open pull requests for the trees you submit.</li>
              <li>To send transactional emails (e.g. email confirmation) — no marketing emails.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white font-bold text-xl mb-3">5. Data Storage</h2>
            <p>
              Your data is stored in Supabase (PostgreSQL) with Row-Level Security enabled, on Amazon Web Services
              servers in Tokyo, Japan. Only you can read and write your own progress and feedback rows.
              If you use the platform from elsewhere, your data is transferred to Japan to provide the service.
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold text-xl mb-3">6. Third-Party Services</h2>
            <ul className="list-disc list-inside space-y-2 text-slate-400">
              <li><strong className="text-slate-300">Supabase</strong> — authentication and database. <a href="https://supabase.com/privacy" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Supabase Privacy Policy</a>.</li>
              <li><strong className="text-slate-300">GitHub</strong> — sign-in (if you choose it), the optional GitHub connection, and the public repository where submitted trees become pull requests. <a href="https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">GitHub Privacy Statement</a>.</li>
              <li><strong className="text-slate-300">Google OAuth</strong> — if you choose to sign in with Google. <a href="https://policies.google.com/privacy" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Google Privacy Policy</a>.</li>
              <li><strong className="text-slate-300">Hosting and network</strong> — our web host and Cloudflare carry requests to the site and protect it from abuse. <a href="https://www.cloudflare.com/privacypolicy/" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Cloudflare Privacy Policy</a>.</li>
            </ul>
            <p className="mt-3 text-slate-400">
              Pull requests are public. A tree you submit, and the GitHub username it is submitted under (or our bot account
              for anonymous submissions), become part of the public repository history.
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold text-xl mb-3">7. Your Rights</h2>
            <p className="mb-3">You can at any time:</p>
            <ul className="list-disc list-inside space-y-2 text-slate-400">
              <li><strong className="text-slate-300">Access</strong> your data via your Dashboard.</li>
              <li><strong className="text-slate-300">Delete</strong> your account and all associated data by emailing {mail} from the address on your account. We will process the request within 30 days.</li>
              <li><strong className="text-slate-300">Export</strong> your progress data by emailing {mail}.</li>
            </ul>
            <p className="mt-3 text-slate-400">
              Please do not post personal data or deletion requests in public GitHub issues.
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold text-xl mb-3">8. Cookies</h2>
            <p>
              We use only strictly necessary first-party cookies to keep you signed in (the Supabase session).
              No third-party tracking cookies.
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold text-xl mb-3">9. Changes and contact</h2>
            <p>
              We will change the date at the top of this page when we update this policy. Privacy questions or data
              requests: email {mail} or write to {OPERATOR.legalName}, {OPERATOR.address}. See also our{' '}
              <Link href="/terms" className="text-primary hover:underline">Terms of Service</Link>.
            </p>
          </section>
        </div>
      </main>
    </div>
  )
}
