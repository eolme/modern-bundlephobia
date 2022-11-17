import type { SizeType } from '#/utils/size';

import { ContentType, InternalHeader } from '#/utils/headers';
import { merge } from '#/utils/path';

export const fetchInternal = async (path: string, init: RequestInit) => {
  return fetch(`${process.env.NEXT_PUBLIC_HOST}${path}`, init);
};

export const fetchInternalSize = async (type: SizeType, query: string) => {
  return fetchInternal(merge('/api/internal', type, query), {
    headers: {
      accept: ContentType.INTERNAL,
      [InternalHeader.FLAG]: 'size'
    }
  }).then((response) => {
    if (response.ok) {
      return response.text();
    }

    return '0';
  }, () => {
    return '0';
  });
};
