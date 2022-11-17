import { gzipSync as compress } from 'fflate/esm/browser';

export const gzip = (buffer: Uint8Array) => compress(buffer).byteLength;
