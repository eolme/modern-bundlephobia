import type { NextRequest } from 'next/server';

import { InternalHeader } from '#/utils/headers';
import { SizeType } from '#/utils/size';
import { fetchInternalSize } from '#/utils/internal';
import { getErrorStatus } from '#/utils/errors';
import { respondSVG } from '#/utils/edge';

import { badge, error } from '#/generators/badge';

const handler = async (req: NextRequest) => {
  try {
    const query = req.headers.get(InternalHeader.QUERY)!;

    const size = await fetchInternalSize(SizeType.BROTLI, query);

    return respondSVG(200, badge(SizeType.BROTLI, size));
  } catch (ex: unknown) {
    console.error(ex);

    return respondSVG(200, error(SizeType.BROTLI, getErrorStatus(ex)));
  }
};

export {
  handler as default
};
