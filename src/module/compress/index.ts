import { brotli, gzip } from 'compress';

type Compress = (buffer: ArrayBuffer) => Promise<number>;

const toArray = (buffer: ArrayBuffer) => new Uint8Array(buffer, 0, buffer.byteLength);

export const fastGzip: Compress = async (buffer) => gzip(toArray(buffer));

export const fastBrotli: Compress = async (buffer) => brotli(toArray(buffer));
