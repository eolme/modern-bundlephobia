import { fetch } from 'undici';

import { ModuleError } from './error';

const requestModuleOptions = {
  headers: {
    'Accept': 'application/javascript'
  }
};

export const requestModule = async (url: string) => {
  const response = await fetch(url, requestModuleOptions);

  if (!response.ok) {
    throw new ModuleError('ERR_CONNECTION_REFUSED', url, 400);
  }

  const content = await response.text();

  if (content.length === 0) {
    throw new ModuleError('ERR_EMPTY_RESPONSE', url, 400);
  }

  return content;
};
