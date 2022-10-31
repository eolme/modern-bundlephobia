#!/usr/bin/env node

const fs = require('node:fs').promises;

(async () => {
  const wasm = await fs.readFile('wasm/compress/pkg/compress_bg.wasm');
  const contents = Array.from(new Uint8Array(wasm.buffer));

  const prelude = `export const source = ${JSON.stringify(contents)};`;

  await fs.writeFile('packages/compress/source.js', prelude, { encoding: 'utf8' });

  const init = await fs.readFile('wasm/compress/pkg/compress_bg.js', { encoding: 'utf8' });
  const pure = init.replace(`import * as wasm from './compress_bg.wasm';`, '');

  const code = `
import { source } from './source.js';

const wasmSource = new Uint8Array(source, 0, source.length);
const wasmModule = new WebAssembly.Module(wasmSource);
const wasmInstance = new WebAssembly.Instance(wasmModule, {});
const wasm = wasmInstance.exports;

${pure}
`;
  
  await fs.writeFile('packages/compress/index.js', code, { encoding: 'utf8' });

  await fs.copyFile('wasm/compress/pkg/compress.d.ts', 'packages/compress/index.d.ts');
})();
