import type { NextApiRequest, NextApiResponse } from 'next';

import { ModuleError, ModuleErrorType, getErrorStatus } from 'src/module/error';

import { calcInfo, calcSize } from 'src/api/calc';

import { sendNothing, sendPNG } from 'src/utils/send';
import { generateImage } from 'src/generate/og';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (!req.query.name) {
      throw new ModuleError(ModuleErrorType.REQUEST, req.query.name, 400);
    }

    const info = await calcInfo(req.query.name);
    const size = await calcSize(info);
    const image = await generateImage(size);

    sendPNG(res, 200, image);
  } catch (ex: unknown) {
    console.error(ex);

    sendNothing(res, getErrorStatus(ex));
  }
};

export {
  handler as default
};
