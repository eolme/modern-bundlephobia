#!/usr/bin/env node

const path = require('node:path');
const fs = require('node:fs').promises;
const { Buffer } = require('node:buffer');

(async () => {
  await Promise.all([
    400,
    600
  ].map(async (weight) => {
    const content = await fs.readFile(path.resolve(process.cwd(), `./src/assets/fonts/NotoSans${weight}.woff2`));
    const json = Buffer.from(content).toJSON();

    return fs.writeFile(path.resolve(process.cwd(), `./src/assets/fonts/NotoSans${weight}.json`), JSON.stringify(json.data), { encoding: 'utf8' });
  }));
})();

