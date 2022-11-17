import { headers } from 'next/headers';

import { night } from './_internal/night';
import { timezone } from './_internal/timezone';

import { SecHeader, VercelHeader } from '#/utils/headers';
import { header } from '#/utils/edge';

export const theme = () => {
  const requested = headers();

  const scheme = header(requested, SecHeader.SCHEME, 'no-preference');

  if (scheme !== 'no-preference') {
    return scheme;
  }

  const possible = header(requested, VercelHeader.TIMEZONE, '');
  const city = header(requested, VercelHeader.CITY, '');
  const country = header(requested, VercelHeader.COUNTRY, '');

  const dark = night(timezone(possible, city, country));

  return dark ? 'dark' : 'light';
};
