/**
 * Simple Node script using Jimp to remove near-white background from
 * public/sierra-tel-logo.png and write public/sierra-tel-logo-transparent.png
 *
 * Usage:
 *   npm install jimp
 *   node scripts/make-logo-transparent.js
 *
 * The script sets fully-white (and near-white) pixels to transparent.
 */

const Jimp = require('jimp');
const path = require('path');

const infile = path.join(__dirname, '..', 'public', 'sierra-tel-logo.png');
const out = path.join(__dirname, '..', 'public', 'sierra-tel-logo-transparent.png');

const THRESHOLD = 240; // 0-255: pixels above this for all channels will be made transparent

Jimp.read(infile)
  .then((image) => {
    image.rgba(true);
    const w = image.bitmap.width;
    const h = image.bitmap.height;

    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const idx = (w * y + x) << 2;
        const r = image.bitmap.data[idx + 0];
        const g = image.bitmap.data[idx + 1];
        const b = image.bitmap.data[idx + 2];
        const a = image.bitmap.data[idx + 3];

        if (r >= THRESHOLD && g >= THRESHOLD && b >= THRESHOLD) {
          // set alpha to 0 (transparent)
          image.bitmap.data[idx + 3] = 0;
        } else if (a === 0) {
          // keep transparent
        } else {
          // leave as-is
        }
      }
    }

    return image.writeAsync(out);
  })
  .then(() => {
    console.log('Wrote', out);
  })
  .catch((err) => {
    console.error('Error processing logo:', err);
    process.exit(1);
  });
