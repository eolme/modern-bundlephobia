import {
  ModuleError,
  ModuleErrorType
} from 'src/module/error';

import { ContentType } from 'src/utils/const';

const searchOptions: RequestInit = {
  method: 'GET',
  mode: 'cors',
  cache: 'force-cache',
  credentials: 'omit',
  keepalive: true,
  referrerPolicy: 'no-referrer',
  headers: {
    accept: ContentType.JSON
  }
};

export const requestSearch = async (url: string) => {
  const response = await fetch(url, searchOptions);

  if (!response.ok) {
    throw new ModuleError(ModuleErrorType.CONNECTION, url, response.status);
  }

  return response.json();
};
