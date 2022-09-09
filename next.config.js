const sw = require('next-sw').default;
const analyze = require('@next/bundle-analyzer');

const mainFields = ['modern', 'esm', 'esnext', 'jsnext:main', 'jsnext', 'es2015', 'esm2015', 'fesm2015', 'module', 'esm5', 'fesm5', 'main', 'browser'];
const empty = [];

module.exports = analyze({
  enabled: process.env.ANALYZE === '1'
})(sw({
  entry: 'src/sw/index.ts'
})({
  reactStrictMode: false,
  swcMinify: true,
  experimental: {
    runtime: 'nodejs',
    reactRoot: true,
    serverComponents: false,

    esmExternals: 'loose',
    fullySpecified: false,

    legacyBrowsers: false,
    browsersListForSwc: false,
    disablePostcssPresetEnv: true
  },
  webpack(config) {
    // Force new
    config = Object.assign({}, config);

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
      issuer: {
        not: /\.(css|scss|sass)$/
      },
      dependency: {
        not: ['url']
      }
    });

    return config;
  }
}));
