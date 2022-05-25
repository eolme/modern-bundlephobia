const path = require('path');
const alias = require('module-alias');
const sw = require('next-sw').default;
const analyze = require('@next/bundle-analyzer');

const stub = (name) => path.resolve(__dirname, 'src/stub', name);
const npm = (name) => path.resolve(__dirname, 'node_modules', name);
const stubModules = {
  '@vkontakte/vk-bridge': stub('bridge'),
  'mitt': stub('mitt'),
  'semver': stub('semver'),
  'use-sync-external-store/shim': npm('use-sync-external-store'),
  'use-sync-external-store': npm('use-sync-external-store')
};

alias.addAliases(stubModules);

const mainFields = ['modern', 'esm', 'esnext', 'jsnext:main', 'jsnext', 'es2015', 'esm2015', 'fesm2015', 'module', 'esm5', 'fesm5', 'main', 'browser'];
const empty = [];

console.log('top');
console.dir(process.env);

module.exports = analyze({
  enabled: process.env.ANALYZE === '1'
})(sw({
  serviceWorker: {
    entry: 'src/sw/index.ts'
  },
  reactStrictMode: false,
  experimental: {
    runtime: 'nodejs',
    reactRoot: true,
    serverComponents: false,

    esmExternals: 'loose',
    fullySpecified: false,

    legacyBrowsers: false
  },
  webpack(config) {
    // Force new
    config = Object.assign({}, config);

    config.resolve.alias = Object.assign({}, config.resolve.alias || {}, stubModules);

    // Force esm
    config.resolve.mainFields = mainFields;
    config.resolve.aliasFields = mainFields;

    // Disable condition resolve
    config.resolve.importsFields = empty;
    config.resolve.exportsFields = empty;
    config.resolve.conditionNames = empty;

    config.module.rules.unshift({
      test: /\.svg$/,
      type: 'asset/source',
      dependency: {
        not: ['url']
      }
    });

    console.log('webpack');
    console.dir(process.env);

    return config;
  }
}));
