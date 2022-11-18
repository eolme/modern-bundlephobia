import type { Package } from './types';

import { ModuleErrorType, fail } from '#/utils/errors';
import { ContentType } from '#/utils/headers';

const url = (name: string) => `https://registry.npmjs.org/${name}`;
const init: RequestInit = {
  headers: {
    accept: ContentType.NPM
  }
};

export const fetcher = async (name: string): Promise<Package> => {
  const response = await fetch(url(name), init);

  if (!response.ok) {
    fail(ModuleErrorType.NAME, name, 422);
  }

  return response.json();
};
