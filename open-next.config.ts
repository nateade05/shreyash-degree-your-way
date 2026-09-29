import { defineCloudflareConfig } from '@opennextjs/cloudflare';

// Every page is static or rendered per request; no ISR, so no R2 incremental cache is needed.
export default defineCloudflareConfig({});
