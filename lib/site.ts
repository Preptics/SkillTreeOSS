/**
 * Who runs SkillTreeOSS, where it lives, and where its code is.
 * Every page, the sitemap, robots.txt and the GitHub bot read these values,
 * so a move (new host, new org) is a one-file change.
 */

export const SITE_NAME = 'SkillTreeOSS'

/** Canonical origin, no trailing slash. Override per environment with NEXT_PUBLIC_APP_URL. */
export const SITE_URL = (process.env.NEXT_PUBLIC_APP_URL || 'https://skilltree.preptics.com').replace(/\/+$/, '')

/** Hosts that used to serve the app and now redirect here (see next.config.ts). */
export const LEGACY_HOSTS = ['skilltreeoss.softexforge.io', 'skilltreeoss.vercel.app'] as const

export const GITHUB_OWNER = 'Preptics'
export const GITHUB_REPO = 'SkillTreeOSS'
export const REPO_URL = `https://github.com/${GITHUB_OWNER}/${GITHUB_REPO}`
export const ISSUES_URL = `${REPO_URL}/issues`
export const DISCUSSIONS_URL = `${REPO_URL}/discussions`
export const LICENSE_URL = `${REPO_URL}/blob/main/LICENCE.md`

/** The company that owns and operates the hosted service. */
export const OPERATOR = {
  legalName: 'Preptics LLC',
  shortName: 'Preptics',
  url: 'https://preptics.com',
  /** For promotional links (footer, About) so Preptics' analytics can count visits from SkillTreeOSS. */
  referralUrl: 'https://preptics.com/?utm_source=skilltree&utm_medium=referral&utm_campaign=oss',
  /** Monitored inbox for privacy, account and legal requests. */
  email: 'support@preptics.com',
  /** Business and mailing address as filed in the Articles of Organization (published on preptics.com/about). */
  address: '1209 Mountain Road Pl NE, Ste R, Albuquerque, NM 87110, USA',
  jurisdiction: 'a New Mexico limited liability company',
  githubUrl: 'https://github.com/Preptics',
  xUrl: 'https://x.com/preptics',
} as const

/** Month the project moved into Preptics LLC's GitHub organisation. */
export const JOINED_PREPTICS = 'October 2026'

/** Shown as "Last updated" on the terms and privacy pages. Bump both together. */
export const LEGAL_UPDATED = '18 November 2026'
