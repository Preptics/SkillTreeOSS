# Security Policy

## Reporting a vulnerability

Please **do not open a public issue** for security problems.

Use either private channel:

1. GitHub's **Report a vulnerability** button under the repository's [Security tab](https://github.com/Preptics/SkillTreeOSS/security/advisories/new), or
2. Email **support@preptics.com** with "SkillTreeOSS security" in the subject.

Include what you found, how to reproduce it, and the impact you expect. We aim to acknowledge reports within 3 business days and to keep you updated until it is fixed. We will credit you in the release notes unless you ask us not to.

## Scope

- The code in this repository.
- The hosted site at https://skilltree.preptics.com and its API routes (`/api/*`).

Out of scope: denial-of-service and volume testing, social engineering, and findings in third-party services (Supabase, GitHub, Cloudflare) that should go to those vendors.

## Supported versions

Only the latest `main` branch, which is what the hosted site runs, receives security fixes.
