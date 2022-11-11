import type { NextRequest } from 'next/server';
import type { NPMSearchPackage } from 'src/types/npm';

import { NextResponse } from 'next/server';

import { partsToFullQuery, queryToPackagePath } from 'src/module/bundle';
import { requestPackage } from 'src/module/request/server';
import { packageFullURL } from 'src/utils/url';
import { formatPath } from 'src/utils/format';
import { internal } from 'src/utils/api';

const handler = async (req: NextRequest) => {
  if (internal(req)) {
    return;
  }

  const query = formatPath(req.nextUrl.pathname);

  if (query.length === 0) {
    return;
  }

  return requestPackage<NPMSearchPackage>(packageFullURL(queryToPackagePath(query))).then((pkg) => {
    const full = partsToFullQuery(pkg.name, pkg.version);

    if (query !== full) {
      return NextResponse.redirect(req.url.replace(query, full));
    }
  }, (ex) => {
    console.error(ex);

    return NextResponse.redirect(new URL('/', req.url));
  });
};

export { handler as default };

export const config = {
  runtime: 'experimental-edge',
  matcher: '/(p|api)/:path*'
};
