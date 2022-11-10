import {
  ModuleError,
  ModuleErrorType
} from 'src/module/error';
import { ContentType, INTERNAL } from 'src/utils/const';

const contentfulOptions: RequestInit = {
  method: 'GET',
  cache: 'no-store',
  referrerPolicy: 'no-referrer',
  headers: {
    'accept': ContentType.JSON,
    'user-agent': 'Mozilla/5.0 (Linux; Android 5.0; SM-G920A) AppleWebKit (KHTML, like Gecko) Chrome Mobile Safari (compatible; Modern BundlePhobia)'
  }
};

const internalOptions: RequestInit = {
  method: 'POST',
  cache: 'no-store',
  keepalive: true,
  headers: {
    'internal': INTERNAL,
    'accept': ContentType.INTERNAL,
    'content-type': ContentType.TEXT
  }
};

export const requestContent = async (url: string) => {
  const response = await fetch(url, contentfulOptions);

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
  const response = await fetch(url, contentfulOptions);

  if (!response.ok) {
    throw new ModuleError(ModuleErrorType.CONNECTION, url, 503);
  }

  const buffer = await response.arrayBuffer();

  if (buffer.byteLength === 0) {
    throw new ModuleError(ModuleErrorType.EMPTY, url, 503);
  }

  return buffer;
};

export const requestPackage = async <T>(url: string) => {
  const response = await fetch(url, contentfulOptions);

  if (!response.ok) {
    throw new ModuleError(ModuleErrorType.CONNECTION, url, 503);
  }

  return response.json() as Promise<T>;
};

export const requestInternal = async (url: string, body: ArrayBuffer) => {
  const response = await fetch(url, Object.assign({ body }, internalOptions));

  if (!response.ok) {
    throw new ModuleError(ModuleErrorType.CONNECTION, url, 503);
  }

  return response.text();
};
