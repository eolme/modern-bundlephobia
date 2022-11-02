import {
  deepEntry,
  fullQueryToName,
  fullQueryToVersion,
  isValidName,
  isValidVersion,
  linkToVersion,
  paramsToQuery,
  queryToFullQuery
} from 'src/module/bundle';

import {
  brotliSize,
  gzipSize
} from 'src/module/compress';

import {
  ModuleError,
  ModuleErrorType
} from 'src/module/error';

import {
  requestBuffer,
  requestContent
} from 'src/module/request/server';

import {
  bundleURL
} from 'src/utils/url';

const load = async (name: string, query: string) => {
  const content = await requestContent(bundleURL(query));

  const deepLink = deepEntry(content);

  if (deepLink === null) {
    throw new ModuleError(ModuleErrorType.EMPTY, query, 422);
  }

  const version = linkToVersion(name, deepLink);

  if (!isValidVersion(version)) {
    throw new ModuleError(ModuleErrorType.VERSION, version, 422);
  }

  const buffer = await requestBuffer(deepLink);

  return {
    buffer,
    version
  } as const;
};

export const calcInfo = async (params: string | string[]) => {
  const query = paramsToQuery(params);
  const fullQuery = queryToFullQuery(query);

  const name = fullQueryToName(fullQuery);

  if (!isValidName(name)) {
    throw new ModuleError(ModuleErrorType.NAME, name, 422);
  }

  const version = fullQueryToVersion(fullQuery);

  if (!isValidVersion(version)) {
    throw new ModuleError(ModuleErrorType.VERSION, version, 422);
  }

  const loaded = await load(name, fullQuery);

  return {
    name,
    version,
    query: fullQuery,
    loaded
  } as const;
};

export const calcSize = async (info: Awaited<ReturnType<typeof calcInfo>>) => {
  // With matched version
  const query = `${info.name}@${info.loaded.version}`;

  return {
    raw: info.query,
    name: info.name,
    query,
    version: info.loaded.version,
    bytes: info.loaded.buffer.byteLength,
    gzip: gzipSize(info.loaded.buffer),
    brotli: brotliSize(info.loaded.buffer)
  } as const;
};

export const calcSizeBytes = async (params: string | string[]) => {
  const info = await calcInfo(params);

  return info.loaded.buffer.byteLength;
};

export const calcSizeGzip = async (params: string | string[]) => {
  const info = await calcInfo(params);

  return gzipSize(info.loaded.buffer);
};

export const calcSizeBrotli = async (params: string | string[]) => {
  const info = await calcInfo(params);

  return brotliSize(info.loaded.buffer);
};
