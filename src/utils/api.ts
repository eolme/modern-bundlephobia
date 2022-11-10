import type { NextApiRequest } from 'next';
import type { NextRequest } from 'next/server';

import { INTERNAL } from 'src/utils/const';

export const requestLength = (req: NextApiRequest) => Number.parseInt(req.headers['content-length']!, 10);

export const internal = (req: NextRequest) => req.headers.get('internal') === INTERNAL;
