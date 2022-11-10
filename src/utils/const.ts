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

export enum Repository {
  GITHUB = 'github',
  GITLAB = 'gitlab',
  BITBUCKET = 'bitbucket',
  UNKNOWN = 'unknown'
}

export enum ContentType {
  JSON = 'application/json',
  JPEG = 'image/jpeg',
  SVG = 'image/svg+xml',
  UNKNOWN = 'application/octet-stream',
  TEXT = 'text/plain',
  INTERNAL = 'text/internal'
}

export const INTERNAL = process.env.NEXT_PUBLIC_INTERNAL!;

export const EMPTY = '';

// eslint-disable-next-line no-void
export const VOID = void 0;

export const NOTHING: any[] = [];

export const DOM = typeof document !== 'undefined';

export const BUILTINS = [
  'assert',
  'async_hooks',
  'buffer',
  'child_process',
  'cluster',
  'console',
  'constants',
  'crypto',
  'dgram',
  'diagnostics_channel',
  'dns',
  'domain',
  'events',
  'fs',
  'http',
  'http2',
  'https',
  'inspector',
  'module',
  'net',
  'os',
  'path',
  'perf_hooks',
  'process',
  'punycode',
  'querystring',
  'readline',
  'repl',
  'stream',
  'string_decoder',
  'timers',
  'tls',
  'trace_events',
  'tty',
  'url',
  'util',
  'v8',
  'vm',
  'wasi',
  'worker_threads',
  'zlib'
].join(',');
