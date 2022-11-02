#!/usr/bin/env node

const fs = require('node:fs').promises;
const swc = require('next/dist/build/swc');

const patches = {
  "(function() { try { return Module || {} } catch(e) { return {} } })()": "{}"
};

(async () => {
  await fs.cp('node_modules/brotli', 'packages/brotlijs', { recursive: true, force: true });
  
  const code = await fs.readFile('packages/brotlijs/build/encode.js', { encoding: 'utf8' });

  let patched = code
    // Eval is forbidden
    .replace(/eval\("([\S\s]+?)"\)/g, (original, evaluate) => {
      if (evaluate in patches) {
        evaluate = patches[evaluate];
      }

      return `(()=>{${evaluate}})()`;
    })
    // Dead code
    .replace(/eval\.call\([\S\s]+?\)/g, (original) => {
      return '';
    })
    // Use polyfill for fs
    .replace('require("fs")', '__fs')
    // Use polyfill for path
    .replace('require("path")', '__path')
    // Asm is invalid (wtf?)
    .replace('"use asm";', '');
  
  const polyfillAssert = `var assert=/*#__PURE__*/()=>{};`;
  const polyfillFs = `var __fs={readFileSync:()=>''};`;
  const polyfillPath = `var __path={normalize:(__str)=>__str,resolve:(__str)=>__str};`;

  const prepolyfilled = `${polyfillAssert}${polyfillFs}${polyfillPath}${patched}`;
  
  const compiled = await swc.transform(prepolyfilled, {
    sourceMaps: false,
    isModule: false,
    module: {
      type: 'commonjs',
      strict: false,
      strictMode: false,
      lazy: true,
      noInterop: true,
      ignoreDynamic: true
    },
    jsc: {
      parser: {
        syntax: 'ecmascript'
      },
      target: 'es2018',
      loose: true,
      transform: {
        optimizer: {
          globals: {
            vars: {
              // Alias print to console
              print: 'console.log',

              // Awkward detect
              document: '{}'
            },
            typeofs: {
              // Edge runtime is not nodejs but we need API
              process: 'object',
              require: 'function',
              module: 'object',

              // ...but something is not true
              gc: 'undefined',

              // Edge runtime is not window
              window: 'undefined',
              document: 'undefined',

              // Edge runtime is not normal worker
              importScripts: 'undefined',

              // Console exist
              console: 'function'
            }
          }
        }
      }
    }
  });

  const polyfillProcess = `var process={argv:[]};`;

  let minified = `${polyfillProcess}${compiled.code};`

  for (let i = 4; i--;) {
    minified = await swc.minify(minified, {
      ecma: 2018,
      compress: {
        arrows: true,
        unsafe_arrows: true,

        comparisons: true,
        conditionals: true,
        if_return: true,
        dead_code: true,
        unsafe_comps: true,

        inline: 3,
        passes: 4,

        unsafe_math: true,
        keep_infinity: true,

        sequences: 0,

        drop_console: true,
        pure_funcs: [
          'assert',
          'console.log',
          'console.warn',
          'console.error',
          'process.stdout.write',
          'process.stdout.once',
          'process.stdout.on',
          'process.stderr.write',
          'process.stderr.once',
          'process.stderr.on',
          'process.on',
          'process.once',
          'process.exit'
        ]
      },
      mangle: false,
      toplevel: true,
      module: true,
      inlineSourcesContent: true
    });
    minified = minified.code || minified;
  }
  
  await fs.writeFile('packages/brotlijs/build/encode.js', minified, { encoding: 'utf8' });
})();
