import type { NextRequest } from 'next/server';

import { ModuleError, ModuleErrorType, getErrorStatus } from 'src/module/error';

import { calcInfo, calcSize } from 'src/module/api/calc';
import { generateImageResponse } from 'src/generate/og';

import { paramAll, respondNothing } from 'src/utils/edge';

const handler = async (req: NextRequest) => {
  try {
    const name = paramAll(req, 'name');

    if (name === null || name.length === 0) {
      throw new ModuleError(ModuleErrorType.REQUEST, '<empty>', 400);
    }

    const info = await calcInfo(name);
    const size = await calcSize(info);

    return generateImageResponse(size);
  } catch (ex: unknown) {
    console.error(ex);

    return respondNothing(getErrorStatus(ex));
  }
};

export const config = {
  runtime: 'experimental-edge'
};

export {
  handler as default
};
