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
  typescript: {
    ignoreBuildErrors: true
  },
  reactStrictMode: false,
  swcMinify: true,
  experimental: {
    enableUndici: true,

    esmExternals: 'loose',
    fullySpecified: false,

    legacyBrowsers: false,
    disablePostcssPresetEnv: true
  },
  env: {
    NEXT_PUBLIC_HOST: process.env.NEXT_PUBLIC_VERCEL_URL || 'localhost:3000'
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

    if (options.nextRuntime === 'edge') {
      config.resolve = Object.assign({}, config.resolve);
      config.resolve.alias = Object.assign({}, config.resolve.alias);

      config.resolve.alias['next/app'] = require.resolve('next/dist/esm/pages/_app');
      config.resolve.alias['next/dist/pages/_app'] = require.resolve('next/dist/esm/pages/_app');
    
      config.resolve.alias['next/document'] = require.resolve('next/dist/esm/pages/_document');
      config.resolve.alias['next/dist/pages/_document'] = require.resolve('next/dist/esm/pages/_document');

      config.resolve.alias['next/error'] = require.resolve('next/dist/esm/pages/_error');
      config.resolve.alias['next/dist/pages/_error'] = require.resolve('next/dist/esm/pages/_error');
    }

    return config;
  }
};

module.exports = next;
