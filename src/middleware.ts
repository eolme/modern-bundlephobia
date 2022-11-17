import type { NextRequest, NextResponse } from 'next/server';

import {
  middlewareNPM
} from '#/middlewares';

const middleware = async (req: NextRequest): Promise<NextResponse> => {
  return middlewareNPM(req);
};

export {
  middleware,
  middleware as default
};

export const config = {
  matcher: '/api/:path*'
};
