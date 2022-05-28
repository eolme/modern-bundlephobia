export const searchURL = (name: string) => `https://registry.npmjs.org/-/v1/search?size=6&quality=0.0&maintenance=0.0&popularity=1.0&text=${name}`;
export const packageURL = (name: string) => `https://registry.npmjs.org/${name}`;
export const bundleURL = (query: string) => `https://esm.sh/${query}?pin=v82&target=es2022&bundle&no-check`;
export const homepageURL = (name: string) => `https://npm.im/${name}`;
