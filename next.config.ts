import type { NextConfig } from 'next';

const nextConfig: NextConfig = {};

export default nextConfig;

// Lets `next dev` use Cloudflare bindings (KV, vars) through getCloudflareContext().
import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';
initOpenNextCloudflareForDev();
