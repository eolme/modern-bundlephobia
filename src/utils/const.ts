export enum SizeType {
  BYTES = 'bytes',
  GZIP = 'gz',
  BROTLI = 'br'
}

export const SizeName = {
  [SizeType.BYTES]: 'minified',
  [SizeType.GZIP]: 'gzip',
  [SizeType.BROTLI]: 'brotli'
} as const ;
