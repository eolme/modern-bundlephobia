import { brotliCompress, constants, gzip as gzipCompress } from 'node:zlib';
import { promisify } from 'node:util';

type Compress = (source: ArrayBuffer) => Promise<number>;

const asyncGzipCompress = promisify(gzipCompress);

export const fastGzip: Compress = async (buffer) => {
  const result = await asyncGzipCompress(buffer, {
    maxOutputLength: buffer.byteLength,
    level: constants.Z_BEST_SPEED,
    strategy: constants.Z_RLE
  });

  return result.byteLength;
};

const asyncBrotliCompress = promisify(brotliCompress);

export const fastBrotli: Compress = async (buffer) => {
  const result = await asyncBrotliCompress(buffer, {
    maxOutputLength: buffer.byteLength,
    params: {
      [constants.BROTLI_PARAM_MODE]: constants.BROTLI_MODE_TEXT,
      [constants.BROTLI_PARAM_QUALITY]: constants.BROTLI_MIN_QUALITY,
      [constants.BROTLI_PARAM_DISABLE_LITERAL_CONTEXT_MODELING]: true,
      [constants.BROTLI_PARAM_SIZE_HINT]: buffer.byteLength
    }
  });

  return result.length;
};
