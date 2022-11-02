// @ts-expect-error types
import { gzipSync as gzip } from 'fflate/esm/browser';

// @ts-expect-error types
import { default as brotli } from 'brotlijs/compress';

type Compress = (arrayBuffer: ArrayBuffer) => number;

const toBuffer = (arrayBuffer: ArrayBuffer) => new Uint8Array(arrayBuffer, 0, arrayBuffer.byteLength) as Buffer;

export const gzipSize: Compress = (arrayBuffer) => gzip(toBuffer(arrayBuffer), {
  // De-facto default level
  level: 6
}).buffer.byteLength;

export const brotliSize: Compress = (arrayBuffer) => brotli(toBuffer(arrayBuffer), {
  // Hint text
  mode: 1,

  // Reduce window size for memory efficiency
  lgwin: 16,

  // Compression efficiency at quality 3 correlates with level 6
  quality: 3
}).buffer.byteLength;
