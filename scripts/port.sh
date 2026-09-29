#!/bin/sh
# Regenerates the two view components from the design handoff, then applies the production
# edits (real routes, asset paths, signed handout link, QR code, consent lines). Only needed if
# the design changes. Current reference: Get In v12.dc.html (UPDATE-v12.md).
set -e
D="${1:-$HOME/Downloads/dyw-src/design_handoff_get_in_website/design}"
cd "$(dirname "$0")/.."
node scripts/dc-to-jsx.mjs "$D/Get In v12.dc.html" 526 1598 GetInView src/components/GetInView.tsx
node scripts/dc-to-jsx.mjs "$D/Get In Student Handout.dc.html" 18 120 HandoutView src/components/HandoutView.tsx
node scripts/port-edits.mjs
