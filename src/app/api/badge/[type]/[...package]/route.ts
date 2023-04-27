import type { NextRequest } from 'next/server';

import { SizeName, SizeType } from '#/utils/size';
import { InternalHeader } from '#/utils/headers';
import { fetchInternalSize } from '#/utils/internal';
import { getErrorStatus } from '#/utils/errors';
import { respondNothing, respondSVG } from '#/utils/edge';

import { badge, error } from '#/generators/badge';

export const runtime = 'edge';

type NextRouteParams = {
  params: {
    type: string;
    package: string[];
  };
};

// eslint-disable-next-line func-style
export async function GET(req: NextRequest, { params }: NextRouteParams) {
  if (params.type in SizeName) {
    const type = params.type as SizeType;

    try {
      let size: string;

      if (type === SizeType.INSTALL) {
        size = req.headers.get(InternalHeader.SIZE)!;
      } else {
        size = await fetchInternalSize(type, req.headers.get(InternalHeader.QUERY)!);
      }

      return respondSVG(200, badge(type, size));
    } catch (ex: unknown) {
      console.error(ex);

      return respondSVG(200, error(type, getErrorStatus(ex)));
    }
  }

  return respondNothing(404);
}
