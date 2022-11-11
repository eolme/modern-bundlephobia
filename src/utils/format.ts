import { default as formatBytes } from 'pretty-bytes';

import { EMPTY } from 'src/utils/const';

const bytesOptions = { locale: false } as const;

export const formatSize = (size: number) => formatBytes(size, bytesOptions);

const stripPath = (path: string) => {
  if (path[1] === 'p') {
    // /p/:path
    return path.slice(3);
  }

  if (path[5] === 'b') {
    // /api/badge/:path
    return path.slice(11);
  }

  if (path[5] === 'i') {
    // /api/info/:path
    return path.slice(10);
  }

  if (path[5] === 'o') {
    // /api/og/:path
    return path.slice(8);
  }

  return EMPTY;
};

export const formatPath = (path: string) => decodeURIComponent(unescape(stripPath(path)));
