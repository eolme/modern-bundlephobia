#!/usr/bin/env node
   
const fs = require('node:fs').promises;
const path = require('node:path');
const glob = require('fast-glob');

// from telegram-tt
const alias = {
  bash: ['bash', 'sh', 'zsh', 'ksh', 'fish', 'shell', 'unix', 'command'],
  c: ['c', 'h'],
  cpp: ['cpp', 'cc', 'c++', 'h++', 'hpp', 'hh', 'hxx', 'cxx'],
  csharp: ['chasp', 'cs', 'c#'],
  css: ['css'],
  erlang: ['erlang', 'erl'],
  elixir: ['elixir', 'ex', 'exs'],
  go: ['go', 'golang'],
  handlebars: ['handlebars', 'hbs', 'html.hbs', 'html.handlebars', 'htmlbars'],
  haskell: ['haskell', 'hs'],
  ini: ['ini', 'toml'],
  java: ['java', 'jsp'],
  javascript: ['javascript', 'js', 'jsx', 'mjs', 'cjs'],
  json: ['json'],
  kotlin: ['kotlin', 'kt', 'kts'],
  lisp: ['lisp'],
  lua: ['lua'],
  makefile: ['makefile', 'mk', 'mak', 'make'],
  markdown: ['markdown', 'md', 'mkdown', 'mkd'],
  matlab: ['matlab'],
  objectivec: ['objectivec', 'mm', 'objc', 'obj-c', 'obj-c++', 'objective-c++'],
  perl: ['perl', 'pl', 'pm'],
  php: ['php'],
  python: ['python', 'py', 'gyp', 'ipython'],
  r: ['r'],
  ruby: ['ruby', 'rb', 'gemspec', 'podspec', 'thor', 'irb'],
  rust: ['rust', 'rs'],
  scss: ['scss'],
  sql: ['sql'],
  swift: ['swift'],
  twig: ['twig', 'craftcms'],
  typescript: ['typescript', 'ts', 'tsx'],
  xml: ['xml', 'html', 'xhtml', 'rss', 'atom', 'xjb', 'xsd', 'xsl', 'plist', 'wsf', 'svg'],
  yaml: ['yaml', 'yml'],
};

const overrides = {
  javascript: 'jsx',
  typescript: 'tsx'
};

/**
 * @param {string} str
 */
const beautify = (str) => str.replaceAll('"', '\'');

/**
 * @param {string} str
 */
const imports = (str) => str.replace(/('.*?')(,|\s)/g, '() => import($1)$2');

/**
 * @param {string} str
 */
const wrap = (str) => str.replace(/:\s(\[[\s\S]*?\])/gm, ': memo(() => queue($1))');

/**
 * @param {string} str
 * @param {RegExp} regex
 */
const regexAll = (str, regex) => {
  return Array.from(str.matchAll(regex)).map((arr) => (arr && arr[1]) || null);
}

/**
 * @param {string} str
 */
const peer = (str) => {
  return regexAll(str, /\w+\.languages\.extend\(['"`](\w+)['"`]/g);
};

/**
 * @param {string} str
 */
const clone = (str) => {
  return regexAll(str, /\w+\.util\.clone\(\w+\.languages\.(\w+)/g);
};

/**
 * @param {string} str
 */
const inherit = (str) => {
  return regexAll(str, /\w+\.languages\.(?!extend|(?:\w+\s*=))(\w+)/g);
};

/**
 * @param {any[]} arr
 */
const unique = (arr) => {
  return Array.from(new Set(arr.filter((item) => !!item)));
};

(async () => {
  const dest = path.resolve(process.cwd(), './src/module/highlight/languages.ts');

  const base = path.resolve(process.cwd(), './node_modules') + '/';
  const components = path.resolve(base, 'prismjs/components');

  const matchName = /prism\-([\w-]+)\./;

  let modules = await glob(components + '/prism-*.min.js');

  const deps = {};
  const raw = {};
  const deep = {};

  const languages = {};

  for (const lang of modules) {
    if (lang.includes('core')) {
      continue;
    }

    const content = await fs.readFile(lang, { encoding: 'utf8' });

    const exec = matchName.exec(lang);
    const name = exec[1];

    deps[name] = [
      ...inherit(content),
      ...clone(content),
      ...peer(content)
    ];

    raw[name] = lang.replace(base, '');
  }

  const lookup = (name) => {
    const inner = [];
    if (name) {
      if (deps[name]) {
        for (const deeper of deps[name]) {
          if (deeper && deeper !== name) {
            inner.push(...lookup(deeper));
          }
        }
      }
      inner.push(name);
    }
    return inner;
  };

  for (const dep in deps) {
    deep[dep] = [];

    for (const inn of deps[dep]) {
      deep[dep].push(...lookup(inn));
    }
  }

  for (const dep in deep) {
    languages[dep] = [];

    for (const deeper of deep[dep]) {
      languages[dep].push(raw[deeper]);
    }

    languages[dep].push(raw[dep]);
  }

  for (const lang in languages) {
    languages[lang] = unique(languages[lang]);
  }

  const aliases = {};

  for (const lang in languages) {
    aliases[lang] = lang;
  }

  for (const override in overrides) {
    aliases[override] = aliases[overrides[override]];
  }

  for (const aliasLang in alias) {
    const entries = alias[aliasLang].concat(aliasLang);

    let aliasTo = '';
  
    for (const entry of entries) {
      if (entry in overrides) {
        aliasTo = overrides[entry];

        break;
      }

      if (entry in languages) {
        aliasTo = entry;

        break;
      }
    }

    if (aliasTo !== '') {
      for (const entry of entries) {
        if (!(entry in aliases)) {
          aliases[entry] = aliasTo;
        }
      }
    }
  }

  const stringifyLanguages = JSON.stringify(languages, null, 2);
  const stringifyAliases = JSON.stringify(aliases, null, 2);

  const validLanguages = wrap(imports(beautify(stringifyLanguages)));
  const validAliases = beautify(stringifyAliases);

  const ts = '// eslint-disable-next-line @typescript-eslint/ban-ts-comment\n// @ts-nocheck\n/* eslint-disable @typescript-eslint/promise-function-async */\n\n';
  const memoize = 'import { default as memo } from \'memoize-one\';\n\n';
  const queue = 'const queue = (arr: Array<() => Promise<any>>) => {\n  let promise = Promise.resolve();\n\n  arr.forEach((chain) => {\n    promise = promise.then(chain);\n  });\n\n  return promise;\n};\n\n';
  const code = 'export const languages: Readonly<Record<string, () => Promise<any>>> = ' + validLanguages + ';\n\n';
  const codeAlias = `export const alias: Readonly<Record<string, string>> = ${validAliases};\n`;

  await fs.writeFile(dest, ts + memoize + queue + code + codeAlias, { encoding: 'utf8' });
})();
