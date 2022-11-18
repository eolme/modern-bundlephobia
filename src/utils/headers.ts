export enum InternalHeader {
  FLAG = 'internal-flag',
  NAME = 'internal-name',
  VERSION = 'internal-version',
  QUERY = 'internal-query',
  SIZE = 'internal-size',
  THEME = 'internal-theme'
}

export enum ContentType {
  JSON = 'application/json',
  NPM = 'application/vnd.npm.install-v1+json',
  JS = 'application/javascript',
  JPEG = 'image/jpeg',
  SVG = 'image/svg+xml',
  UNKNOWN = 'application/octet-stream',
  TEXT = 'text/plain',
  INTERNAL = 'text/internal'
}

export enum SecHeader {
  SCHEME = 'sec-ch-prefers-color-scheme'
}

export enum VercelHeader {
  TIMEZONE = 'x-vercel-ip-timezone',
  COUNTRY = 'x-vercel-ip-country',
  CITY = 'x-vercel-ip-city'
}
