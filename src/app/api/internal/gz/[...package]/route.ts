import type { NextRequest } from 'next/server';

import { InternalHeader } from '#/utils/headers';
import { fetchScript } from '#/utils/esmsh';
import { respondInternal } from '#/utils/edge';

import { gzip } from '#/compressors/gzip';

export const runtime = 'edge';

// eslint-disable-next-line func-style
export async function GET(req: NextRequest) {
  const buffer = await fetchScript(req.headers.get(InternalHeader.QUERY)!);
  const content = new Uint8Array(buffer);
  const size = gzip(content);

  return respondInternal(200, String(size));
}
