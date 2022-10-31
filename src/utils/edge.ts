import type { NextRequest } from 'next/server';

export const param = (req: NextRequest, name: string) =>
  req.nextUrl.searchParams.get(name);

export const paramAll = (req: NextRequest, name: string) =>
  req.nextUrl.searchParams.getAll(name).join('/');

const fresh = (headers: HeadersInit) => Object.assign(headers, {
  'Cache-Control': 'no-store',
  'CDN-Cache-Control': 'no-store'
});

const cached = (headers: HeadersInit) => Object.assign(headers, {
  'Cache-Control': 'max-age=43200, immutable',
  'CDN-Cache-Control': 'max-age=43200, immutable'
});

export const respondJSON = (status: number, json: any) => {
  return new Response(JSON.stringify(json), {
    status,
    headers: fresh({
      'Content-Type': 'application/json'
    })
  });
};

export const respondSVG = (status: number, svg: BodyInit) => {
  return new Response(svg, {
    status,
    headers: cached({
      'Content-Type': 'image/svg+xml'
    })
  });
};

export const respondJPEG = (status: number, jpeg: BodyInit) => {
  return new Response(jpeg, {
    status,
    headers: cached({
      'Content-Type': 'image/jpeg'
    })
  });
};

export const respondNothing = (status: number) => {
  return new Response(null, {
    status,
    headers: fresh({
      'Content-Type': 'application/octet-stream'
    })
  });
};
