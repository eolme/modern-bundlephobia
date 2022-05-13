import { Gzip, BrotliCompress, constants } from 'fast-zlib';

export const gzip = (content: string, size: number): number => {
  return new Gzip({
    level: constants.Z_BEST_SPEED,
    strategy: constants.Z_RLE,
    maxOutputLength: size
  }).process(content).byteLength;
};

export const brotli = (content: string, size: number): number => {
  return new BrotliCompress({
    params: {
      [constants.BROTLI_PARAM_MODE]: constants.BROTLI_MODE_TEXT,
      [constants.BROTLI_PARAM_QUALITY]: constants.BROTLI_MIN_QUALITY,
      [constants.BROTLI_PARAM_DISABLE_LITERAL_CONTEXT_MODELING]: true,
      [constants.BROTLI_PARAM_SIZE_HINT]: size
    }
  }).process(content).byteLength;
};
