import type { NextApiRequest, NextApiResponse } from 'next';

import { ModuleError, ModuleErrorType, getErrorStatus } from 'src/module/error';

import { calcSizeGzip } from 'src/api/calc';

import { sendSVG } from 'src/utils/send';
import { createBadge, createErrorBadge } from 'src/generate/badge';
import { SizeType } from 'src/utils/const';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (!req.query.name) {
      throw new ModuleError(ModuleErrorType.REQUEST, req.query.name, 400);
    }

    const size = await calcSizeGzip(req.query.name);

    sendSVG(res, 200, createBadge(SizeType.GZIP, size));
  } catch (ex: unknown) {
    console.error(ex);

    sendSVG(res, 200, createErrorBadge(getErrorStatus(ex)));
  }
};

export {
  handler as default
};
