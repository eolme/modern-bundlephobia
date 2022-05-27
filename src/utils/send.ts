import type { NextApiResponse } from 'next';

import { Buffer } from 'node:buffer';

export const sendJSON = (res: NextApiResponse, status: number, json: any) => {
  res.
    status(status).
    json(json);
};

export const sendSVG = (res: NextApiResponse, status: number, svg: string) => {
  res.
    status(status).
    setHeader('Content-Type', 'image/svg+xml').
    setHeader('Content-Length', Buffer.byteLength(svg)).
    setHeader('Cache-Control', 'max-age=43200, immutable').
    send(svg);
};

export const sendJPEG = (res: NextApiResponse, status: number, jpeg: Buffer) => {
  res.
    status(status).
    setHeader('Content-Type', 'image/jpeg').
    setHeader('Content-Length', jpeg.byteLength).
    setHeader('Cache-Control', 'max-age=43200, immutable').
    send(jpeg);
};

export const sendNothing = (res: NextApiResponse, status: number) => {
  res.
    status(status).
    setHeader('Content-Length', '0').
    send(Buffer.allocUnsafe(0));
};
