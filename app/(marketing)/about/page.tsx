import Link from 'next/link'
import type { Metadata } from 'next'
import { DISCUSSIONS_URL, JOINED_PREPTICS, LICENSE_URL, OPERATOR, REPO_URL, SITE_NAME, SITE_URL } from '@/lib/site'

const DESCRIPTION =
  `SkillTreeOSS is a free, MIT-licensed project that maps skills into interactive skill trees built on free resources. ` +
  `It has been maintained by ${OPERATOR.legalName} since ${JOINED_PREPTICS}.`

export const metadata: Metadata = {
  title: 'About',
  description: DESCRIPTION,
  alternates: { canonical: '/about' },
  openGraph: { title: `About ${SITE_NAME}`, description: DESCRIPTION, url: '/about', type: 'website', images: ['/og-image.jpg'] },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${OPERATOR.url}/#organization`,
      name: OPERATOR.shortName,
      legalName: OPERATOR.legalName,
      url: OPERATOR.url,
      email: OPERATOR.email,
      sameAs: [OPERATOR.githubUrl, OPERATOR.xUrl],
    },
    {
      '@type': 'SoftwareSourceCode',
      '@id': `${SITE_URL}/#software`,
      name: SITE_NAME,
      description: DESCRIPTION,
      url: SITE_URL,
      codeRepository: REPO_URL,
      license: 'https://opensource.org/license/mit',
      programmingLanguage: ['TypeScript', 'JSON'],
      runtimePlatform: 'Next.js',
      maintainer: { '@id': `${OPERATOR.url}/#organization` },
      publisher: { '@id': `${OPERATOR.url}/#organization` },
    },
  ],
}

const FACTS = [
  {
    icon: 'gavel',
    title: 'Still MIT, still free',
    body: 'The code and every skill tree stay under the MIT License. Learners never pay to use a tree, and anyone can fork the whole project.',
  },
  {
    icon: 'merge',
    title: 'Same open process',
    body: 'New trees and fixes still arrive as public pull requests on GitHub and are reviewed in the open. Your existing forks and pull requests are unaffected.',
  },
  {
    icon: 'dns',
    title: 'A home and a maintainer',
    body: `${OPERATOR.shortName} pays for hosting, reviews contributions and keeps the platform running. The site moved to ${SITE_URL.replace(/^https?:\/\//, '')}; old links redirect.`,
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background-dark flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      <main className="flex-1">
        <div className="relative border-b border-white/5 py-16 overflow-hidden">
          <div className="absolute inset-0 bg-grid-dark opacity-[0.04] pointer-events-none" />
          <div className="relative mx-auto max-w-3xl px-6 lg:px-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-5">
              <span className="material-symbols-outlined text-sm">account_tree</span>
              About
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-5">
              SkillTreeOSS is now part of {OPERATOR.shortName}
            </h1>
            <p className="text-slate-400 text-lg leading-relaxed">
              SkillTreeOSS maps complex skills into interactive, RPG-style skill trees. Every node points to a free
              resource chosen by the community, so self-taught learners can see what to learn next. It has been
              maintained by {OPERATOR.legalName} since {JOINED_PREPTICS}.
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-3xl px-6 lg:px-8 py-14 space-y-14">
          <section>
            <h2 className="text-2xl font-black text-white mb-4">How it started</h2>
            <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
              <p>
                Md Nasim Sheikh started SkillTreeOSS in February 2026 and released it as open source later that month.
                Since then it has gained an in-browser tree builder that turns a drawing into a pull request, and
                outside contributors have added work such as a cybersecurity foundations curriculum.
              </p>
              <p>
                In {JOINED_PREPTICS} the project moved into the GitHub organisation of {OPERATOR.legalName}, the company
                Nasim founded to build{' '}
                <a href={OPERATOR.referralUrl} className="text-primary hover:underline">{OPERATOR.shortName}</a>, a test-prep
                platform whose first track is the Digital SAT. Both projects share one idea: a learner should always
                know where they stand and what to do next.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-black text-white mb-6">What changes, and what does not</h2>
            <div className="grid gap-4">
              {FACTS.map((f) => (
                <div key={f.title} className="flex gap-4 bg-surface-dark rounded-xl border border-white/5 p-5">
                  <div className="shrink-0 w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary text-xl" aria-hidden="true">{f.icon}</span>
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-sm mb-1">{f.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{f.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-black text-white mb-4">Get involved</h2>
            <ul className="space-y-3 text-sm text-slate-300">
              <li className="flex gap-3">
                <span className="material-symbols-outlined text-primary text-base mt-0.5" aria-hidden="true">add_circle</span>
                <span>
                  Draw a tree for a skill you know in the <Link href="/builder" className="text-primary hover:underline">builder</Link>,
                  or review an existing one — see <Link href="/contribute" className="text-primary hover:underline">how to contribute</Link>.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="material-symbols-outlined text-primary text-base mt-0.5" aria-hidden="true">forum</span>
                <span>
                  Ideas and questions go in{' '}
                  <a href={DISCUSSIONS_URL} className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">GitHub Discussions</a>;
                  the code is at{' '}
                  <a href={REPO_URL} className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">{REPO_URL.replace('https://', '')}</a>.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="material-symbols-outlined text-primary text-base mt-0.5" aria-hidden="true">mail</span>
                <span>
                  Anything private (account deletion, security reports, press): email{' '}
                  <a href={`mailto:${OPERATOR.email}`} className="text-primary hover:underline">{OPERATOR.email}</a>.
                </span>
              </li>
            </ul>
          </section>

          <section className="border-t border-white/5 pt-8 text-xs text-slate-500 leading-relaxed space-y-2">
            <p>
              {OPERATOR.legalName} is {OPERATOR.jurisdiction}. Business and mailing address: {OPERATOR.address}.
              The code is released under the{' '}
              <a href={LICENSE_URL} className="hover:text-slate-300 underline" target="_blank" rel="noopener noreferrer">MIT License</a>.
            </p>
            <p>
              Not to be confused with SkillTree at skilltreeplatform.dev, an unrelated open-source training platform.
            </p>
          </section>
        </div>
      </main>
    </div>
  )
}
