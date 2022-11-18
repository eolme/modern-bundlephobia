import { gzipSync as compress } from 'node_modules/fflate/esm/browser';

export const gzip = (buffer: Uint8Array) => compress(buffer).byteLength;
