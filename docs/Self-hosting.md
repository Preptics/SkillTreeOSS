# Self-hosting SkillTreeOSS

The hosted site at https://skilltree.preptics.com runs exactly what is in this repository. You can run your own copy anywhere Node 22 or Docker runs.

## What you need

| Piece | Why | Notes |
|---|---|---|
| A Supabase project | Accounts, progress, ratings, drafts | Run every file in `supabase/migrations/` in order (SQL editor). |
| `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Browser and server Supabase clients | Public by design; inlined into the browser bundle at **build** time. |
| `NEXT_PUBLIC_APP_URL` | Canonical origin for metadata, sitemap, robots | Defaults to `https://skilltree.preptics.com`; set it for your own domain at **build** time. |
| `APP_URL` | GitHub OAuth callback base | Runtime. Must match the OAuth app's callback URL. |
| `GITHUB_BOT_TOKEN` | Anonymous "Submit as PR" from the builder | Runtime. Fine-grained token with Contents and Pull requests write on your fork of the repo only. Optional. |
| `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET` (+ optional `GITHUB_OAUTH_SECRET`) | "Connect GitHub" so users submit from their own account | Runtime. OAuth app callback: `{APP_URL}/api/github/callback`. Optional. |

If you self-host a fork, change `GITHUB_OWNER` / `GITHUB_REPO` in `lib/site.ts` so the bot opens pull requests on your repository, not ours.

## Docker

```bash
docker build \
  --build-arg NEXT_PUBLIC_SUPABASE_URL=https://YOUR-REF.supabase.co \
  --build-arg NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY \
  --build-arg NEXT_PUBLIC_APP_URL=https://your.domain \
  -t skilltree-web .

# app.env holds the runtime-only variables (APP_URL, GITHUB_*), one KEY=value per line
docker run -d --name skilltree --env-file app.env -p 127.0.0.1:3000:3000 skilltree-web
```

Put a TLS-terminating reverse proxy (Caddy, nginx, Cloudflare Tunnel) in front of port 3000. The image has a health check on `/robots.txt`.

## Plain Node

```bash
npm ci
NEXT_PUBLIC_SUPABASE_URL=... NEXT_PUBLIC_SUPABASE_ANON_KEY=... npm run build
node .next/standalone/server.js   # after copying .next/static, public/ and data/ next to it, as the Dockerfile does
```

`npm run start` also works for a quick check.

## Supabase auth settings

In your Supabase project, under Authentication → URL Configuration:

- **Site URL**: your origin, e.g. `https://your.domain`
- **Redirect URLs**: `https://your.domain/auth/callback`

GitHub and Google sign-in providers are configured in Supabase itself; their callback is your Supabase project's `/auth/v1/callback`, not this app.

## Moving hosts

Old hosts listed in `LEGACY_HOSTS` (`lib/site.ts`) answer with a permanent (308) redirect to the same path on `SITE_URL`, through `next.config.ts`. That only works while the old host still serves a build of this app; the alternative is a redirect rule at the old host's DNS or proxy.
