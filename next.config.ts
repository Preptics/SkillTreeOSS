import type { NextConfig } from 'next'
import { LEGACY_HOSTS, SITE_URL } from './lib/site'

const nextConfig: NextConfig = {
  // Self-contained server bundle for the Docker image (deploy/Dockerfile).
  // Vercel ignores this setting, so the same config works on both.
  output: 'standalone',

  async redirects() {
    // Old hosts answer with a permanent redirect to the same path on the
    // canonical host, so links and search results carry over.
    return LEGACY_HOSTS.filter((host) => !SITE_URL.includes(host)).map((host) => ({
      source: '/:path*',
      has: [{ type: 'host' as const, value: host }],
      destination: `${SITE_URL}/:path*`,
      permanent: true,
    }))
  },
}

export default nextConfig
