const path = require('path');
const alias = require('module-alias');
const sw = require('next-sw').default;

const stub = (name) => path.resolve('src/stub', name + '.js');
const stubModules = {
  '@vkontakte/vk-bridge': stub('bridge'),
  'mitt': stub('mitt')
};

alias.addAliases(stubModules);

const mainFields = [
  // Non-standard esm
  'modern',
  'esm',
  'esnext',

  // Previous de-facto standard
  'jsnext:main',
  'jsnext',

  // These are generally shipped as a higher ES language level than `module`
  'es2015',
  'esm2015',
  'fesm2015',

  // Current leading de-facto standard
  'module',

  // Lower ES level
  'esm5',
  'fesm5',

  // Standard
  'main',
  'browser'
];

module.exports = sw({
  serviceWorker: {
    entry: 'src/sw/index.ts'
  },
  reactStrictMode: false,
  experimental: {
    runtime: 'nodejs',
    reactRoot: true,
    serverComponents: false,

    esmExternals: 'loose',
    fullySpecified: false
  },
  webpack(config, context) {
    config.resolve.alias = Object.assign(stubModules, config.resolve.alias);
    config.resolve.mainFields = mainFields;

    if (!context.isServer) {
      const fallback = config.resolve.fallback = config.resolve.fallback || {};
      fallback.fs = require.resolve('suman-browser-polyfills/modules/fs');
    }

    return config;
  }
});
