import type { NextApiResponse } from 'next';

export const sendJSON = (res: NextApiResponse, status: number, json: any) => {
  res.status(status).json(json);
};

export const sendSVG = (res: NextApiResponse, status: number, svg: string) => {
  res.status(status).setHeader('Content-Type', 'image/svg+xml').send(svg);
};
