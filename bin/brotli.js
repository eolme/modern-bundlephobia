#!/usr/bin/env node

const fs = require('node:fs').promises;
const swc = require('next/dist/build/swc');

const patches = {
  "(function() { try { return Module || {} } catch(e) { return {} } })()": "try { return Module || {} } catch(e) { return {} }"
};

(async () => {
  await fs.cp('node_modules/brotli', 'packages/brotlijs', { recursive: true, force: true });
  
  const code = await fs.readFile('packages/brotlijs/build/encode.js', { encoding: 'utf8' });

  const patched = code
    .replace(/eval\("([\S\s]+?)"\)/g, (original, evaluate) => {
      if (evaluate in patches) {
        evaluate = patches[evaluate];
      }

      return `(()=>{${evaluate}})()`;
    })
    .replace(/eval\.call\([\S\s]+?\)/g, (original) => {
      return '';
    });
  
  const minified = await swc.transform(patched, {
    sourceMaps: false,
    minify: true,
    jsc: {
      minify: {
        compress: true,
        mangle: false
      },
      parser: {
        syntax: 'ecmascript'
      },
      target: 'es2018',
      loose: true,
      transform: {
        optimizer: {
          globals: {
            vars: {
              // Edge runtime is window-like
              window: 'self',

              // Document is empty
              document: '{}',

              // Alias print to console
              print: 'console.log'
            },
            typeofs: {
              // Edge runtime is not nodejs
              process: 'undefined',
              require: 'undefined',

              // Edge runtime is not normal worker
              importScripts: 'undefined',

              // Edge runtime is window-like
              window: 'object',

              // Console exist
              console: 'function'
            }
          }
        }
      }
    }
  });
  
  await fs.writeFile('packages/brotlijs/build/encode.js', minified.code, { encoding: 'utf8' });
})();
