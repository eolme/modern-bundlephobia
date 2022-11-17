import { default as bytes } from 'pretty-bytes';

export const formatBytes = (value: string) => bytes(Number(value), {
  locale: 'en',
  maximumFractionDigits: 2,
  minimumFractionDigits: 2
});

export enum SizeType {
  INSTALL = 'in',
  GZIP = 'gz',
  BROTLI = 'br'
}

export const SizeName = {
  [SizeType.INSTALL]: 'install',
  [SizeType.GZIP]: 'gzip',
  [SizeType.BROTLI]: 'brotli'
} as const;
