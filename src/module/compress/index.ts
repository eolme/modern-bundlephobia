import { SizeType } from 'src/utils/const';
import { selfURL } from 'src/utils/url';
import { requestInternal } from 'src/module/request/server';

const requestSize = async (buffer: ArrayBuffer, type: SizeType) => {
  return requestInternal(selfURL(`/api/_internal/size/${type}`), buffer).then((size) => {
    return Number.parseInt(size, 10) || 0;
  }, () => 0);
};

export const gzipSize = async (buffer: ArrayBuffer) => requestSize(buffer, SizeType.GZIP);

export const brotliSize = async (buffer: ArrayBuffer) => requestSize(buffer, SizeType.BROTLI);
