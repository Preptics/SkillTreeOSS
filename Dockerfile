# syntax=docker/dockerfile:1.7
# SkillTreeOSS as a self-contained Node server (Next.js standalone output).
#
#   docker build \
#     --build-arg NEXT_PUBLIC_SUPABASE_URL=https://xyz.supabase.co \
#     --build-arg NEXT_PUBLIC_SUPABASE_ANON_KEY=... \
#     -t skilltree-web .
#   docker run --env-file app.env -p 3000:3000 skilltree-web
#
# NEXT_PUBLIC_* values are inlined into the browser bundle, so they are build
# arguments; they are public by design (the anon key is protected by RLS).
# Server-only secrets (GITHUB_BOT_TOKEN, GITHUB_CLIENT_SECRET, ...) are passed
# at run time only and never enter an image layer. See docs/Self-hosting.md.

FROM node:22-bookworm-slim AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

FROM node:22-bookworm-slim AS build
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
ARG NEXT_PUBLIC_SUPABASE_URL
ARG NEXT_PUBLIC_SUPABASE_ANON_KEY
# Leave empty to use the default canonical origin in lib/site.ts.
ARG NEXT_PUBLIC_APP_URL=""
ENV NEXT_PUBLIC_SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL \
    NEXT_PUBLIC_SUPABASE_ANON_KEY=$NEXT_PUBLIC_SUPABASE_ANON_KEY \
    NEXT_PUBLIC_APP_URL=$NEXT_PUBLIC_APP_URL
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN test -n "$NEXT_PUBLIC_SUPABASE_URL" && test -n "$NEXT_PUBLIC_SUPABASE_ANON_KEY" \
    || (echo "NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY build args are required" && exit 1)
RUN npm run build

FROM node:22-bookworm-slim
WORKDIR /app
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 PORT=3000 HOSTNAME=0.0.0.0
COPY --from=build --chown=node:node /app/.next/standalone ./
COPY --from=build --chown=node:node /app/.next/static ./.next/static
COPY --from=build --chown=node:node /app/public ./public
# Tree JSON is read from disk at request time (tree pages, sitemap).
COPY --from=build --chown=node:node /app/data ./data
USER node
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:3000/robots.txt').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"
CMD ["node", "server.js"]
