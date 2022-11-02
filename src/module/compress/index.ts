// @ts-expect-error types
import { gzipSync as gzip } from 'fflate/esm/browser';

// @ts-expect-error types
import { default as brotli } from 'brotlijs/compress';

type Compress = (arrayBuffer: ArrayBuffer) => number;

const toBuffer = (arrayBuffer: ArrayBuffer) => new Uint8Array(arrayBuffer, 0, arrayBuffer.byteLength) as Buffer;

export const gzipSize: Compress = (arrayBuffer) => gzip(toBuffer(arrayBuffer), {
  level: 9
}).buffer.byteLength;

export const brotliSize: Compress = (arrayBuffer) => brotli(toBuffer(arrayBuffer), {
  mode: 1,
  lgwin: 12,
  quality: 10
}).buffer.byteLength;
