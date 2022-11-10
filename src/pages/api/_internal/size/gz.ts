import type { NextApiRequest, NextApiResponse } from 'next';

import { constants, createGzip } from 'node:zlib';

import { requestLength } from 'src/utils/api';
import { ContentType } from 'src/utils/const';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const length = requestLength(req);

  const gzipStream = createGzip({
    maxOutputLength: length,
    level: constants.Z_BEST_COMPRESSION,
    strategy: constants.Z_RLE
  });

  let size = 0;

  for await (const chunk of req.pipe(gzipStream)) {
    size += chunk.byteLength;
  }

  res.setHeader('content-type', ContentType.INTERNAL);
  res.end(String(size));
};

export const config = {
  runtime: 'nodejs',
  api: {
    bodyParser: false
  }
};

export { handler as default };
