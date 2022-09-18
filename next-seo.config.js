/** @type {import('next-seo').DefaultSeoProps} */
const seo = {
  titleTemplate: 'Modern Bundlephobia | %s',
  defaultTitle: 'Modern Bundlephobia',
  additionalMetaTags: [{
    name: 'viewport',
    content: 'initial-scale=1,width=device-width,height=device-height,viewport-fit=cover,shrink-to-fit=no'
  }, {
    name: 'format-detection',
    content: 'telephone=no,date=no,address=no,email=no,url=no'
  }, {
    name: 'apple-mobile-web-app-title',
    content: 'Modern Bundlephobia'
  }, {
    name: 'application-name',
    content: 'Modern Bundlephobia'
  }, {
    keyOverride: 'theme-color',
    name: 'theme-color',
    content: '#fff'
  }, {
    keyOverride: 'theme-color-dark',
    name: 'theme-color',
    media: '(prefers-color-scheme: dark)',
    content: '#19191a'
  }, {
    keyOverride: 'theme-color-light',
    name: 'theme-color',
    media: '(prefers-color-scheme: light)',
    content: '#fff'
  }],
  additionalLinkTags: [{
    rel: 'preconnect',
    href: 'https://registry.npmjs.org/',
    crossOrigin: 'anonymous'
  }, {
    rel: 'search',
    type: 'application/opensearchdescription+xml',
    href: '/open-search-description.xml',
    title: 'Modern Bundlephobia'
  }, {
    keyOverride: 'canonical',
    rel: 'canonical',
    href: `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  }]
};

module.exports = seo;
module.exports.default = seo;
