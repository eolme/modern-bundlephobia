import type { Package } from './types';

const url = (name: string) => `https://registry.npmjs.org/${name}`;
const init: RequestInit = {
  headers: {
    accept: 'application/vnd.npm.install-v1+json'
  }
};

export const fetcher = async (name: string): Promise<Package> => {
  return (await fetch(url(name), init)).json();
};
