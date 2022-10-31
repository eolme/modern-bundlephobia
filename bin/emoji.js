#!/usr/bin/env node

const path = require('node:path');
const fs = require('node:fs').promises;
const process = require('node:process');
const { fetch } = require('next/dist/compiled/undici');

(async () => {
  const emojis = await (await fetch('https://api.github.com/emojis')).json();

  await fs.writeFile(path.resolve(process.cwd(), './src/assets/emoji/github.json'), JSON.stringify(emojis), { encoding: 'utf8' });
})();
