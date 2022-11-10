import type { NextApiRequest, NextApiResponse } from 'next';

import { constants, createBrotliCompress } from 'node:zlib';

import { requestLength } from 'src/utils/api';
import { ContentType } from 'src/utils/const';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const length = requestLength(req);

  const brotliStream = createBrotliCompress({
    maxOutputLength: length,
    params: {
      [constants.BROTLI_PARAM_MODE]: constants.BROTLI_MODE_TEXT,
      [constants.BROTLI_PARAM_QUALITY]: constants.BROTLI_MAX_QUALITY,
      [constants.BROTLI_PARAM_DISABLE_LITERAL_CONTEXT_MODELING]: true,
      [constants.BROTLI_PARAM_SIZE_HINT]: length
    }
  });

  let size = 0;

  for await (const chunk of req.pipe(brotliStream)) {
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
