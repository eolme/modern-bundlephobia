import type { Metadata } from 'next';
import type { NextRouteParams } from '#/types/next';

import { merge } from '#/utils/path';
import { mergeMetadata, metaImage, metaTitle } from '#/utils/meta';

import { PackageView } from '#/views';

export const runtime = 'edge';

export default async function PackagePage({ params }: NextRouteParams) {
  return (
    PackageView(merge(...params.package))
  );
}

// eslint-disable-next-line func-style
export async function generateMetadata({ params }: NextRouteParams): Promise<Metadata> {
  return mergeMetadata(
    metaTitle(params.package),
    metaImage(params.package)
  );
}
