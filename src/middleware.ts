import type { NextRequest, NextResponse } from 'next/server';

Object.defineProperty(Request.prototype, 'integrity', {
  ...Object.getOwnPropertyDescriptor(Request.prototype, 'integrity'),
  get() {
    return this._patchedIntegrity || '';
  },
  set(value) {
    this._patchedIntegrity = String(value);
  }
});

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
