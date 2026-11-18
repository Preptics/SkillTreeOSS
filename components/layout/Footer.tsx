import Link from 'next/link'
import { DISCUSSIONS_URL, LICENSE_URL, OPERATOR, REPO_URL } from '@/lib/site'

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-bg-landing pt-12 pb-8">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="grid gap-8 md:grid-cols-4 lg:grid-cols-5">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-6 w-6 items-center justify-center rounded bg-primary/20 text-primary">
                <span className="material-symbols-outlined text-sm">account_tree</span>
              </div>
              <span className="text-lg font-bold text-white">SkillTreeOSS</span>
            </div>
            <p className="text-sm text-slate-400 max-w-xs mb-6 leading-relaxed">
              An open-source initiative to map human knowledge into gamified skill trees.
              Built with the community, maintained by{' '}
              <a href={OPERATOR.referralUrl} className="text-slate-300 hover:text-primary transition-colors">
                {OPERATOR.shortName}
              </a>
              .
            </p>
            <div className="flex gap-4">
              <a
                href={REPO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors"
                aria-label="SkillTreeOSS on GitHub"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  />
                </svg>
              </a>
              <a
                href={OPERATOR.xUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors"
                aria-label="Preptics on X"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Platform */}
          <div>
            <h5 className="mb-4 font-bold text-white">Platform</h5>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/explore" className="hover:text-primary transition-colors">Browse Trees</Link></li>
              <li><Link href="/builder" className="hover:text-primary transition-colors">Tree Builder</Link></li>
              <li><Link href="/roadmap" className="hover:text-primary transition-colors">Roadmap</Link></li>
              <li><Link href="/leaderboard" className="hover:text-primary transition-colors">Leaderboard</Link></li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h5 className="mb-4 font-bold text-white">Community</h5>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/contribute" className="hover:text-primary transition-colors">Contribute</Link></li>
              <li>
                <a href={DISCUSSIONS_URL} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  Discussions
                </a>
              </li>
              <li>
                <a href={REPO_URL} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  Source code
                </a>
              </li>
              <li><Link href="/about" className="hover:text-primary transition-colors">About</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h5 className="mb-4 font-bold text-white">Legal</h5>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              <li>
                <a href={LICENSE_URL} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  MIT License
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} {OPERATOR.legalName} and SkillTreeOSS contributors. Code under the MIT License.
          </p>
          <a
            href={OPERATOR.referralUrl}
            className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-300 transition-colors"
          >
            <span className="material-symbols-outlined text-sm" aria-hidden="true">school</span>
            A {OPERATOR.shortName} open-source project
          </a>
        </div>
      </div>
    </footer>
  )
}
