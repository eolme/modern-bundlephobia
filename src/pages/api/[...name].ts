import type { NextApiRequest, NextApiResponse } from 'next';

import { calc } from 'src/api/calc';

import { sendJSON } from 'src/utils/send';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const size = await calc(req.query.name);
    sendJSON(res, 200, size);
  } catch (ex) {
    console.error(ex);
    sendJSON(res, 400, Object(ex));
  }
};

export {
  handler as default
};
