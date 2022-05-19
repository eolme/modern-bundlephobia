import {
  matchModuleLink,
  toModuleName,
  toModuleVersion,
  isValidModuleName,
  isValidModuleVersion,
  toModuleQuery,
  toModuleFullQuery,
  fromModuleLink
} from 'src/utils/module';

import {
  gzip,
  brotli
} from 'src/utils/compress';
 
import {
  requestModule
} from 'src/utils/request';

import {
  ModuleError
} from 'src/utils/error';

import { Buffer } from 'node:buffer';

const load = async (name: string, query: string) => {
  const entry = await requestModule(`https://esm.sh/${query}?no-check&target=es2022`);

  const deepLink = matchModuleLink(entry);
  if (deepLink === null) {
    throw new ModuleError('ERR_EMPTY_RESPONSE', query, 400);
  }

  const deep = await requestModule(deepLink);

  return {
    content: deep,
    version: fromModuleLink(name, deepLink)
  };
};

export const calc = async (params: string | string[]) => {
  const raw = toModuleQuery(params);

  // with fallback
  let query = toModuleFullQuery(raw);

  const name = toModuleName(query);

  if (!isValidModuleName(name)) {
    throw new ModuleError('ERR_NAME_INVALID', name, 400);
  }

  const version = toModuleVersion(query);

  if (!isValidModuleVersion(version)) {
    throw new ModuleError('ERR_VERSION_INVALID', version, 400);
  }

  // with valid version or tag
  query = `${name}@${version}`;

  const result = await load(name, query);

  // with matched version
  query = `${name}@${result.version}`;

  const bytes = Buffer.byteLength(result.content, 'utf8');

  return {
    raw,
    name,
    query,
    version: result.version,
    bytes,
    gzip: gzip(result.content, bytes),
    brotli: brotli(result.content, bytes)
  } as const;
};
