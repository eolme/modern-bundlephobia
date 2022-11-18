import type { NPMSSearch } from '#/types/npms';

import { ContentType } from '#/utils/headers';

const url = (query: string) => `https://api.npms.io/v2/search/suggestions?size=6&q=${encodeURIComponent(query)}`;
const init: RequestInit = {
  cache: 'force-cache',
  keepalive: true,
  credentials: 'omit',
  headers: {
    accept: ContentType.JSON
  }
};

export const fetcher = async (query: string): Promise<NPMSSearch[]> => {
  return (await fetch(url(query), init)).json();
};
