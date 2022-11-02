export const searchURL = (name: string) => `https://api.npms.io/v2/search/suggestions?size=6&q=${encodeURIComponent(name)}`;
export const packageFullURL = (name: string) => `https://registry.npmjs.org/${name}`;
export const packageURL = (name: string) => `https://api.npms.io/v2/package/${encodeURIComponent(name)}`;
export const bundleURL = (query: string) => `https://esm.sh/${query}?pin=v96&target=node&bundle&no-dts&ignore-annotations`;
export const npmURL = (name: string) => `https://npm.im/${name}`;
export const selfURL = (path: string) => `${process.env.NEXT_PUBLIC_HOST}${path}`;
