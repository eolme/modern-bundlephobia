import { makeBadge } from 'badge-maker';
import { default as bytes } from 'pretty-bytes';

export const createBadge = (name: string, size: number) => {
  return makeBadge({
    label: name,
    message: bytes(size, {
      locale: false
    }),
    color: 'success'
  });
};

export const createErrorBadge = (status: number) => {
  return makeBadge({
    label: 'fail',
    message: status.toString(),
    color: 'critical'
  });
};
