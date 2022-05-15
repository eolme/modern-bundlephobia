import {
  matchModuleLink,
  toModuleName,
  toModuleVersion,
  isValidModuleName,
  isValidModuleVersion,
  toModuleQuery,
  toModuleFullQuery
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

const load = async (name: string) => {
  const entry = await requestModule(`https://esm.sh/${name}?no-check&target=esnext`);

  const deepLink = matchModuleLink(entry);
  if (deepLink === null) {
    throw new ModuleError('ERR_EMPTY_RESPONSE', name, 400);
  }

  return requestModule(deepLink);
};

export const calc = async (params: string | string[]) => {
  const raw = toModuleQuery(params);
  let query = toModuleFullQuery(raw);

  const name = toModuleName(query);

  if (!isValidModuleName(name)) {
    throw new ModuleError('ERR_NAME_INVALID', name, 400);
  }

  const version = toModuleVersion(query);

  if (!isValidModuleVersion(version)) {
    throw new ModuleError('ERR_VERSION_INVALID', version, 400);
  }

  query = `${name}@${version}`;

  const content = await load(query);

  const bytes = Buffer.byteLength(content, 'utf8');

  return {
    raw,
    name,
    query,
    version,
    bytes,
    gzip: gzip(content, bytes),
    brotli: brotli(content, bytes)
  } as const;
};
