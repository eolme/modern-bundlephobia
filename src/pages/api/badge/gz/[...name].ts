import type { NextApiRequest, NextApiResponse } from 'next';

import { calc } from 'src/api/calc';

import { sendSVG } from 'src/utils/send';
import { createBadge, createErrorBadge } from 'src/utils/badge';
import { SizeType } from 'src/utils/const';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const size = await calc(req.query.name);
    sendSVG(res, 200, createBadge(SizeType.GZIP, size.gzip));
  } catch (ex) {
    console.error(ex);
    sendSVG(res, 400, createErrorBadge(400));
  }
};

export {
  handler as default
};
