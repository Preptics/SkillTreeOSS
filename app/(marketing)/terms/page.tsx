import Link from 'next/link'
import type { Metadata } from 'next'
import { ISSUES_URL, LEGAL_UPDATED, LICENSE_URL, OPERATOR, SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: `The terms for using SkillTreeOSS, an open-source learning platform operated by ${OPERATOR.legalName}.`,
  alternates: { canonical: '/terms' },
}

const host = SITE_URL.replace(/^https?:\/\//, '')

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background-dark flex flex-col">
      <main className="flex-1 mx-auto max-w-3xl px-6 py-16 lg:px-8">
        <div className="mb-10">
          <h1 className="text-4xl font-black text-white mb-2">Terms of Service</h1>
          <p className="text-slate-500 text-sm">Last updated: {LEGAL_UPDATED}</p>
        </div>

        <div className="prose prose-invert prose-slate max-w-none space-y-8 text-slate-300 text-sm leading-relaxed">

          <section>
            <h2 className="text-white font-bold text-xl mb-3">1. Who we are and acceptance of terms</h2>
            <p className="mb-3">
              SkillTreeOSS at {host} (&quot;the platform&quot;) is operated by {OPERATOR.legalName},{' '}
              {OPERATOR.jurisdiction} (&quot;{OPERATOR.shortName}&quot;, &quot;we&quot;, &quot;us&quot;). Our business
              and mailing address is {OPERATOR.address}.
            </p>
            <p>
              By accessing or using the platform, you agree to be bound by these Terms of Service.
              If you do not agree, please do not use the platform.
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold text-xl mb-3">2. Description of Service</h2>
            <p className="mb-3">
              SkillTreeOSS is a free, open-source learning platform that organises curated educational resources
              into interactive skill trees. All content (skill trees, nodes, and linked resources) is community-contributed
              and available under the MIT License.
            </p>
            <p>
              SkillTreeOSS is separate from {OPERATOR.shortName}&apos;s test-prep service at{' '}
              <a href={OPERATOR.url} className="text-primary hover:underline">{OPERATOR.url.replace(/^https?:\/\//, '')}</a>.
              A SkillTreeOSS account is not a {OPERATOR.shortName} account, and the terms of that service do not apply here.
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold text-xl mb-3">3. User Accounts</h2>
            <ul className="list-disc list-inside space-y-2 text-slate-400">
              <li>You must provide accurate information when creating an account.</li>
              <li>You are responsible for maintaining the security of your account credentials.</li>
              <li>You must be at least 13 years old to create an account.</li>
              <li>One account per person. Automated account creation is prohibited.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white font-bold text-xl mb-3">4. Open Source Content</h2>
            <p className="mb-3">
              All skill tree content (JSON data, schemas, and documentation) is licensed under the{' '}
              <a href={LICENSE_URL} className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">MIT License</a>.
              You are free to fork, modify, and redistribute this content with attribution.
              The linked third-party educational resources (YouTube videos, articles, courses) are subject to
              their respective owners&apos; terms and licences.
            </p>
            <p>
              When you submit a skill tree, an edit or a resource suggestion, you confirm you have the right to
              share it and you license it under the MIT License, the same as the rest of the project.
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold text-xl mb-3">5. User Conduct</h2>
            <p>You agree not to:</p>
            <ul className="list-disc list-inside space-y-2 text-slate-400">
              <li>Submit spam, malicious links, or intentionally incorrect resource URLs.</li>
              <li>Attempt to scrape, reverse-engineer, or overload the platform.</li>
              <li>Impersonate other users or organisations.</li>
              <li>Use the platform for any unlawful purpose.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white font-bold text-xl mb-3">6. Disclaimer of Warranties</h2>
            <p>
              The platform is provided &quot;as is&quot; without warranties of any kind. We do not guarantee the accuracy,
              completeness, or quality of any linked third-party resource. SkillTreeOSS is not affiliated with
              YouTube, freeCodeCamp, or any other third-party content provider.
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold text-xl mb-3">7. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, {OPERATOR.legalName} and the SkillTreeOSS contributors shall not
              be liable for any indirect, incidental, or consequential damages arising from your use of the platform.
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold text-xl mb-3">8. Changes to Terms</h2>
            <p>
              We may update these terms from time to time and will change the date at the top of this page when we do.
              Continued use of the platform after changes constitutes acceptance of the updated terms.
              How we handle personal data is described in our{' '}
              <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold text-xl mb-3">9. Contact</h2>
            <p>
              Questions about these terms? Email{' '}
              <a href={`mailto:${OPERATOR.email}`} className="text-primary hover:underline">{OPERATOR.email}</a>{' '}
              or write to {OPERATOR.legalName}, {OPERATOR.address}. Bug reports and feature ideas are welcome as{' '}
              <a href={ISSUES_URL} className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                GitHub issues
              </a>
              .
            </p>
          </section>
        </div>
      </main>
    </div>
  )
}
