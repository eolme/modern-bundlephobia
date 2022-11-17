export const merge = (...parts: string[]) => parts.join('/');

export const strip = (path: string) => {
  if (path[1] === 'p') {
    // /p/:path
    return path.slice(3);
  }

  if (path[5] === 'i') {
    // /api/internal/(br|gz)/:path
    return path.slice(17);
  }

  if (path[5] === 'b') {
    // /api/badge/(br|gz|in)/:path
    return path.slice(14);
  }

  if (path[5] === 'o') {
    // /api/og/:path
    return path.slice(8);
  }

  return '';
};

export const name = (path: string) => {
  const last = path.lastIndexOf('@');

  return strip(last <= 0 ? path : path.slice(0, last));
};

export const format = (path: string) => decodeURIComponent(unescape(strip(path)));

export const og = (...parts: string[]) => `${process.env.NEXT_PUBLIC_HOST}/api/og/${merge(...parts)}`;

export const badge = (...parts: string[]) => `${process.env.NEXT_PUBLIC_HOST}/api/badge/${merge(...parts)}`;
