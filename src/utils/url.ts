export const searchURL = (name: string) => `https://api.npms.io/v2/search/suggestions?size=6&q=${encodeURIComponent(name)}`;
export const packageFullURL = (name: string) => `https://registry.npmjs.org/${name}`;
export const packageURL = (name: string) => `https://api.npms.io/v2/package/${encodeURIComponent(name)}`;
export const bundleURL = (query: string) => `https://esm.sh/${query}?pin=v82&target=es2022&bundle&no-check`;
export const homepageURL = (name: string) => `https://npm.im/${name}`;
