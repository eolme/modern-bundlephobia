const sw = require('next-sw').default;

const mainFields = ['modern', 'esmodule', 'esm', 'esnext', 'jsnext:main', 'jsnext', 'es2015', 'esm2015', 'fesm2015', 'module', 'esm5', 'fesm5', 'main', 'browser'];
const empty = [];

module.exports = sw({
  entry: 'src/sw/index.ts'
})({
  typescript: {
    ignoreBuildErrors: true
  },
  reactStrictMode: false,
  swcMinify: true,
  experimental: {
    runtime: 'experimental-edge',

    esmExternals: 'loose',
    fullySpecified: false,

    legacyBrowsers: false,
    disablePostcssPresetEnv: true
  },
  webpack(config, options) {
    // Force new
    config = Object.assign({}, config);

    // Force esm
    config.resolve.mainFields = mainFields;
    config.resolve.aliasFields = mainFields;

    // Disable condition resolve
    config.resolve.importsFields = empty;
    config.resolve.exportsFields = empty;
    config.resolve.conditionNames = empty;

    // Hack resolution
    config.resolve.extensions =
      config.resolve.extensions.flatMap((ext) =>
        /\.m?(t|j)sx?/.test(ext) ? [
          `.modern${ext}`,
          `.module${ext}`,
          ext
        ] : ext
      );
    
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
});
