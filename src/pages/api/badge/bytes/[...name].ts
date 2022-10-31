import type { NextRequest } from 'next/server';

import { ModuleError, ModuleErrorType, getErrorStatus } from 'src/module/error';

import { calcSizeBytes } from 'src/api/calc';
import { createBadge, createErrorBadge } from 'src/generate/badge';
import { SizeType } from 'src/utils/const';

import { paramAll, respondSVG } from 'src/utils/edge';

const handler = async (req: NextRequest) => {
  try {
    const name = paramAll(req, 'name');

    if (name === null || name.length === 0) {
      throw new ModuleError(ModuleErrorType.REQUEST, '<empty>', 400);
    }

    const size = await calcSizeBytes(name);

    return respondSVG(200, createBadge(SizeType.BYTES, size));
  } catch (ex: unknown) {
    console.error(ex);

    return respondSVG(200, createErrorBadge(getErrorStatus(ex)));
  }
};

export const config = {
  runtime: 'experimental-edge'
};

export {
  handler as default
};
