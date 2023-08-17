/* eslint-disable @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires */
const analyze = require('@next/bundle-analyzer');

/**
 * @type {import('next').NextConfig}
 */
const next = {
  reactStrictMode: process.env.NODE_ENV === 'production',
  swcMinify: true,
  
  productionBrowserSourceMaps: true,

  experimental: {
    appDir: true,
    appDocumentPreloading: true,
    typedRoutes: true,
    serverActions: true,
    
    optimisticClientCache: true,

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
  webpack(config) {
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

    return config;
  }
};

module.exports = analyze({
  enabled: process.env.ANALYZE === '1'
})(next);
