import type { Metadata } from 'next';
import type { NextPage } from '#/types/next';

import { metaTitle } from '#/utils/meta';

const RootPage: NextPage = () => null;

export const runtime = 'edge';

// eslint-disable-next-line func-style
export async function generateMetadata(): Promise<Metadata> {
  return metaTitle();
}

export { RootPage as default };
