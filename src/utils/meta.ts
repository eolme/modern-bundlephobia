import type { Metadata } from 'next';

import { deepmerge } from '@fastify/deepmerge';

import { og } from '#/utils/path';
import { ContentType } from '#/utils/headers';
import { title } from '#/utils/title';

export const metaTitle = (params: string[] = []): Metadata => {
  const _title = title(...params);

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_HOST!),
    title: _title,
    twitter: {
      title: _title
    },
    openGraph: {
      title: _title
    }
  };
};

export const metaImage = (params: string[] = []): Metadata => {
  const _image = og(...params);

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_HOST!),
    twitter: {
      card: 'summary_large_image',
      images: {
        url: _image,
        type: ContentType.PNG,
        width: 1074,
        height: 480
      }
    },
    openGraph: {
      type: 'website',
      images: {
        url: _image,
        type: ContentType.PNG,
        width: 1074,
        height: 480
      }
    },
    other: {
      image: _image
    }
  };
};

export const mergeMetadata = deepmerge({
  all: false,
  symbols: false
});
