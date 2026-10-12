import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // While the course offer is hidden (src/lib/site.ts), its pages send visitors to the overview.
  async redirects() {
    if (process.env.NEXT_PUBLIC_COURSE_OFFER === 'on') return [];
    return ['/course', '/prices', '/terms'].map(source => ({ source, destination: '/', permanent: false }));
  },
};

export default nextConfig;

// Lets `next dev` use Cloudflare bindings (KV, vars) through getCloudflareContext().
import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';
initOpenNextCloudflareForDev();
