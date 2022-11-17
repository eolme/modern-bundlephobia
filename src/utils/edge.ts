import type { NextRequest } from 'next/server';

import { ContentType, InternalHeader } from '#/utils/headers';

export const param = (req: NextRequest, name: string) =>
  req.nextUrl.searchParams.get(name);

export const paramAll = (req: NextRequest, name: string) =>
  req.nextUrl.searchParams.getAll(name).join('/');

export const header = (headers: Headers, name: string, fallback: string) => {
  const value = headers.get(name);

  return value === null ? fallback : value;
};

export const internal = (req: NextRequest) => req.headers.has(InternalHeader.NAME);

const ok = (status: number) => status === 200;

const fresh = (headers: HeadersInit) => Object.assign(headers, {
  'Cache-Control': 'no-store',
  'CDN-Cache-Control': 'no-store'
});

const cached = (headers: HeadersInit) => Object.assign(headers, {
  'Cache-Control': 'max-age=43200, immutable',
  'CDN-Cache-Control': 'max-age=43200, immutable'
});

const respond = (status: number, payload: BodyInit | null, type: ContentType) => {
  return new Response(payload, {
    status,
    headers: (ok(status) ? cached : fresh)({
      'Content-Type': type
    })
  });
};

export const respondJSON = (status: number, json: Record<string, unknown>) => respond(status, JSON.stringify(json), ContentType.JSON);

export const respondSVG = (status: number, svg: BodyInit) => respond(status, svg, ContentType.SVG);

export const respondJPEG = (status: number, jpeg: BodyInit) => respond(status, jpeg, ContentType.JPEG);

export const respondInternal = (status: number, body: BodyInit) => respond(status, body, ContentType.INTERNAL);

export const respondNothing = (status: number) => respond(status, null, ContentType.UNKNOWN);
