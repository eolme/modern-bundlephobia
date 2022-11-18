const analyze = require('@next/bundle-analyzer');

const mainFields = [
  'modern',
  'esmodule',
  'esm',
  'esnext',
  'jsnext:main',
  'jsnext',
  'es2015',
  'esm2015',
  'fesm2015',
  'module',
  'esm5',
  'fesm5',
  'main',
  'browser'
];

const empty = [];

/**
 * @type {import('next').NextConfig}
 */
const next = {
  reactStrictMode: false,
  swcMinify: true,
  experimental: {
    runtime: 'experimental-edge',
    appDir: true,
    enableUndici: true,

    esmExternals: 'loose',
    fullySpecified: false,

    legacyBrowsers: false,
    disablePostcssPresetEnv: true,

    serverComponentsExternalPackages: [
      '@mntm/vkui'
    ]
  },
  async headers() {
    return [{
      source: '/:path*',
      headers: [{
        key: 'Accept-CH',
        value: 'Sec-CH-Prefers-Color-Scheme'
      }, {
        key: 'Vary',
        value: 'Sec-CH-Prefers-Color-Scheme'
      }, {
        key: 'Critical-CH',
        value: 'Sec-CH-Prefers-Color-Scheme'
      }]
    }];
  },
  env: {
    NEXT_PUBLIC_HOST:
      process.env.NEXT_PUBLIC_VERCEL_URL ?
        `https://${process.env.NEXT_PUBLIC_VERCEL_URL}` :
        'http://localhost:3000',
    NEXT_PUBLIC_ANALYTICS:
      process.env.NODE_ENV === 'production' ?
        '/_vercel/insights/script.js' :
        'https://cdn.vercel-insights.com/v1/script.debug.js'
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
        /\.m?(t|j)sx?/.test(ext) ?
          [
            `.modern${ext}`,
            `.esm${ext}`,
            `.module${ext}`,
            ext
          ] :
          ext);

    // Load svg as string
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

    if (options.isServer) {
      config.resolve = Object.assign({}, config.resolve);
      config.resolve.alias = Object.assign({}, config.resolve.alias);

      config.resolve.alias.react = require.resolve('react-server');
    }

    return config;
  }
};

module.exports = analyze({
  enabled: false
})(next);
