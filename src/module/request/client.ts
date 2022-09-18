import {
  ModuleError,
  ModuleErrorType
} from 'src/module/error';

const searchOptions: RequestInit = {
  method: 'GET',
  mode: 'cors',
  cache: 'force-cache',
  credentials: 'omit',
  keepalive: true,
  referrerPolicy: 'no-referrer',
  headers: {
    Accept: 'application/json'
  }
};

export const requestSearch = async (url: string) => {
  const response = await fetch(url, searchOptions);

  if (!response.ok) {
    throw new ModuleError(ModuleErrorType.CONNECTION, url, response.status);
  }

  return response.json();
};
