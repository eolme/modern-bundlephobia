import { default as formatBytes } from 'pretty-bytes';

const bytesOptions = { locale: false } as const;

export const formatSize = (size: number) => formatBytes(size, bytesOptions);