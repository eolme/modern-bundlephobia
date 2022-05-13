import {
  matchModuleLink,
  toModuleName,
  toModuleVersion,
  isValidModuleName
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

export const calc = async (name: string | string[]) => {
  const who = toModuleVersion(name);
  const as = toModuleName(who);

  if (!isValidModuleName(as)) {
    throw new ModuleError('ERR_NAME_INVALID', as, 400);
  }

  const content = await load(who);

  const bytes = Buffer.byteLength(content);

  return {
    name: as,
    query: who,
    raw: bytes,
    gzip: gzip(content, bytes),
    brotli: brotli(content, bytes)
  } as const;
};
