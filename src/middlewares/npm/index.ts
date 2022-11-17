import type { NextRequest } from 'next/server';

import { NextResponse } from 'next/server';

import { format } from '#/utils/path';
import { merge, parts, redirect } from '#/utils/query';
import { InternalHeader } from '#/utils/headers';

import { fetcher } from './_internal/fetcher';

export const middlewareNPM = async (req: NextRequest): Promise<NextResponse> => {
  try {
    const path = format(req.nextUrl.pathname);

    const record = parts(path);

    const pkg = await fetcher(record.name);

    if (record.version in pkg['dist-tags']) {
      const url = redirect(req.url, record.version, pkg['dist-tags'][record.version]);

      return NextResponse.redirect(url, {
        url,
        status: 302
      });
    }

    if (record.version in pkg.versions) {
      const version = pkg.versions[record.version];

      const headers = new Headers({
        [InternalHeader.FLAG]: 'npm',
        [InternalHeader.NAME]: pkg.name,
        [InternalHeader.VERSION]: record.version,
        [InternalHeader.QUERY]: merge(pkg.name, record.version),
        [InternalHeader.SIZE]: String(version.dist.unpackedSize)
      });

      return NextResponse.next({
        request: {
          headers
        }
      });
    }

    return new NextResponse(null, {
      status: 422
    });
  } catch (ex: unknown) {
    console.error(ex);

    return new NextResponse(null, {
      status: 422
    });
  }
};
