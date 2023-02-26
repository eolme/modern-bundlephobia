/* eslint-disable @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires */
const analyze = require('@next/bundle-analyzer');

const classicFields = [
  'modern',
  'esnext',
  'jsnext:main',
  'jsnext',
  'module',
  'main',
  'browser'
];

/**
 * @type {import('next').NextConfig}
 */
const next = {
  reactStrictMode: false,
  swcMinify: true,
  experimental: {
    runtime: 'edge',
    appDir: true,

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
      source: '/',
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
    }, {
      source: '/p/:path*',
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

    if (!options.isServer) {
      // Force esm
      config.resolve.mainFields = classicFields;
      config.resolve.aliasFields = classicFields;

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
    }

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
      config.resolve.alias['react-server'] = require.resolve('react-sever');
    }

    return config;
  }
};

module.exports = analyze({
  enabled: process.env.ANALYZE === '1'
})(next);
