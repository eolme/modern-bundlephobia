import type { Search, SearchObject } from '#/types/npm';

import { ContentType } from '#/utils/headers';

const url = (query: string) => `https://registry.npmjs.org/-/v1/search?size=6&popularity=1.0&text=${encodeURIComponent(query)}`;
const init: RequestInit = {
  cache: 'force-cache',
  keepalive: true,
  credentials: 'omit',
  headers: {
    accept: ContentType.JSON
  }
};

export const fetcher = async (query: string): Promise<SearchObject[]> => {
  return (await fetch(url(query), init)).json().then((search: Search) => search.objects);
};
