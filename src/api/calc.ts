import type { NPMSPackage } from 'src/types/npms';
import type { NPMPackage } from 'src/types/npm';

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
  fastBrotli,
  fastGzip
} from 'src/module/compress';

import {
  markdown
} from 'src/module/markdown';

import {
  ModuleError,
  ModuleErrorType
} from 'src/module/error';

import {
  requestBuffer,
  requestContent,
  requestPackage
} from 'src/module/request/server';

import {
  semverFind
} from 'src/module/semver';

import {
  bundleURL,
  homepageURL,
  packageFullURL,
  packageURL
} from 'src/utils/url';

export const loadInfo = async (name: string, version: string) => {
  const info = await requestPackage<NPMSPackage>(packageURL(name));

  const collected = {
    description: '',
    readme: '',
    homepage: ''
  };

  if (info.collected.metadata.description) {
    collected.description = info.collected.metadata.description;
  }

  if (info.collected.metadata.readme) {
    try {
      collected.readme = markdown(info.collected.metadata.readme);
    } catch (ex: unknown) {
      console.error(ex);
    }
  } else {
    const fullInfo = await requestPackage<NPMPackage>(packageFullURL(name));

    if (fullInfo.readme) {
      try {
        collected.readme = markdown(fullInfo.readme);
      } catch (ex: unknown) {
        console.error(ex);
      }
    } else {
      const semver = semverFind(fullInfo.versions, version, (npm) => 'readme' in npm && npm.readme !== '');

      if (semver !== null) {
        try {
          collected.readme = markdown(semver.readme!);
        } catch (ex: unknown) {
          console.error(ex);
        }
      }
    }
  }

  if (!collected.readme) {
    collected.readme = collected.description;
  }

  if (info.collected.metadata.links) {
    collected.homepage =
      info.collected.metadata.links.repository ||
      info.collected.metadata.links.npm;
  }

  if (!collected.homepage) {
    collected.homepage = homepageURL(name);
  }

  return collected;
};

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
  const [gzip, brotli] = await Promise.all([
    fastGzip(info.loaded.buffer),
    fastBrotli(info.loaded.buffer)
  ]);

  // With matched version
  const query = `${info.name}@${info.loaded.version}`;

  return {
    raw: info.query,
    name: info.name,
    query,
    version: info.loaded.version,
    bytes: info.loaded.buffer.byteLength,
    gzip,
    brotli
  } as const;
};

export const calcSizeBytes = async (params: string | string[]) => {
  const info = await calcInfo(params);

  return info.loaded.buffer.byteLength;
};

export const calcSizeGzip = async (params: string | string[]) => {
  const info = await calcInfo(params);

  return fastGzip(info.loaded.buffer);
};

export const calcSizeBrotli = async (params: string | string[]) => {
  const info = await calcInfo(params);

  return fastBrotli(info.loaded.buffer);
};
