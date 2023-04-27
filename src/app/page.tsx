import type { Metadata } from 'next';
import { metaTitle } from '#/utils/meta';

export const runtime = 'edge';

// eslint-disable-next-line func-style
export default function RootPage() {
  return null;
}

// eslint-disable-next-line func-style
export async function generateMetadata(): Promise<Metadata> {
  return metaTitle();
}
