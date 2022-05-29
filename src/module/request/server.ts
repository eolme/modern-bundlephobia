import type { NPMSPackage } from 'src/types/npms';

import { default as createFetch } from '@vercel/fetch';

import {
  ModuleError,
  ModuleErrorType
} from 'src/module/error';

const nativeFetch: any = Object.assign(fetch, { Headers });
const cachedFetch = createFetch(nativeFetch);

const contentfulOptions = {
  method: 'GET',
  referrerPolicy: 'no-referrer',
  headers: {
    Accept: 'application/javascript'
  }
} as const;

const packageOptions = {} as const;

export const requestContent = async (url: string) => {
  const response = await cachedFetch(url, contentfulOptions);

  if (!response.ok) {
    throw new ModuleError(ModuleErrorType.CONNECTION, url, 503);
  }

  const content = await response.text();

  if (content.length === 0) {
    throw new ModuleError(ModuleErrorType.EMPTY, url, 503);
  }

  return content;
};

export const requestBuffer = async (url: string) => {
  const response = await cachedFetch(url, contentfulOptions);

  if (!response.ok) {
    throw new ModuleError(ModuleErrorType.CONNECTION, url, 503);
  }

  const buffer = await response.arrayBuffer();

  if (buffer.byteLength === 0) {
    throw new ModuleError(ModuleErrorType.EMPTY, url, 503);
  }

  return buffer;
};

export const requestPackage = async (url: string) => {
  const response = await cachedFetch(url, packageOptions);

  if (!response.ok) {
    throw new ModuleError(ModuleErrorType.CONNECTION, url, 503);
  }

  return response.json() as Promise<NPMSPackage>;
};
