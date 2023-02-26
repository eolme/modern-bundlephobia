import { SizeType } from '#/utils/size';

const ALT_SIZE_TYPE = {
  [SizeType.INSTALL]: 'install',
  [SizeType.GZIP]: 'gzipped',
  [SizeType.BROTLI]: 'brotlied'
};

export const alt = (name: string, type: SizeType) => `${name} | ${ALT_SIZE_TYPE[type]}`;
