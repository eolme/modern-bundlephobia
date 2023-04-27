import type { Metadata } from 'next';
import type { NextPage, NextRouteParams } from '#/types/next';

import { merge } from '#/utils/path';
import { mergeMetadata, metaImage, metaTitle } from '#/utils/meta';

import { PackageView } from '#/views';

const PackagePage: NextPage<NextRouteParams> = async ({ params }) => {
  return (
    PackageView(merge(...params.package))
  );
};

export const runtime = 'edge';

// eslint-disable-next-line func-style
export async function generateMetadata({ params }: NextRouteParams): Promise<Metadata> {
  return mergeMetadata(
    metaTitle(params.package),
    metaImage(params.package)
  );
}

export { PackagePage as default };
