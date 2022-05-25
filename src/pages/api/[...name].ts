import type { NextApiRequest, NextApiResponse } from 'next';

import { ModuleError, ModuleErrorType, getErrorStatus } from 'src/module/error';

import { calcInfo, calcSize } from 'src/api/calc';

import { sendJSON } from 'src/utils/send';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (!req.query.name) {
      throw new ModuleError(ModuleErrorType.REQUEST, req.query.name, 400);
    }

    const info = await calcInfo(req.query.name);
    const size = await calcSize(info);

    sendJSON(res, 200, size);
  } catch (ex: unknown) {
    console.error(ex);

    sendJSON(res, getErrorStatus(ex), Object.assign({}, ex));
  }
};

export {
  handler as default
};
