import type { NextRequest, NextResponse } from 'next/server';

// Fix not implemented integrity
const integrity = Object.getOwnPropertyDescriptor(Request.prototype, 'integrity');

if (!integrity) {
  Object.defineProperty(Request.prototype, 'integrity', {
    get() {
      return this._integrity || '';
    },
    set(value) {
      this._integrity = String(value);
    }
  });
}

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
