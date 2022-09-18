export enum SizeType {
  BYTES = 'bytes',
  GZIP = 'gz',
  BROTLI = 'br'
}

export const SizeName = {
  [SizeType.BYTES]: 'minified',
  [SizeType.GZIP]: 'gzip',
  [SizeType.BROTLI]: 'brotli'
} as const;

export const EMPTY = '';

// eslint-disable-next-line no-void
export const VOID = void 0;

export const NOTHING: any[] = [];

export const DOM = typeof document !== 'undefined';
