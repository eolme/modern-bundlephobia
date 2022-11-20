import type { NextRequest } from 'next/server';

import { InternalHeader } from '#/utils/headers';
import { SizeType } from '#/utils/size';
import { getErrorStatus } from '#/utils/errors';
import { respondSVG } from '#/utils/edge';

import { badge, error } from '#/generators/badge';

const handler = async (req: NextRequest) => {
  try {
    const size = req.headers.get(InternalHeader.SIZE)!;

    return respondSVG(200, badge(SizeType.INSTALL, size));
  } catch (ex: unknown) {
    console.error(ex);

    return respondSVG(200, error(SizeType.INSTALL, getErrorStatus(ex)));
  }
};

export {
  handler as default
};
