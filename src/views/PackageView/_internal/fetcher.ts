import type { Package } from './types';

import { ContentType } from '#/utils/headers';

const url = (name: string) => `https://registry.npmjs.org/${name}`;
const init: RequestInit = {
  headers: {
    accept: ContentType.JSON
  }
};

export const fetcher = async (name: string): Promise<Package> => {
  return (await fetch(url(name), init)).json();
};
