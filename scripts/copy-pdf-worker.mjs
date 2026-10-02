// Serves pdf.js's worker as a static file for the Pathfinder CV check (run on postinstall).
import fs from 'node:fs';
fs.mkdirSync('public/vendor', { recursive: true });
fs.copyFileSync('node_modules/pdfjs-dist/build/pdf.worker.min.mjs', 'public/vendor/pdf.worker.min.mjs');
console.log('copied pdf.worker.min.mjs to public/vendor');
