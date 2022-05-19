import type { SizeType } from 'src/utils/const';

import { SizeName } from './const';

import { default as bytes } from 'pretty-bytes';

import { default as verdana } from './verdana.json';
import { default as BadgeTemplate } from 'src/assets/badge.svg';

type Format = {
  label: string;
  message: string;
  color: 'info' | 'critical'
};

const color = {
  info: '#007ec6',
  critical: '#e05d44'
} as const;

const textWidth = (text: string) => {
  let total = 0;
  text.split('').forEach((letter) => {
    total += 1 + (verdana[letter.charCodeAt(0)] || 0);
  });
  return total;
};

const makeBadge = (format: Format) => {
  const leftTextWidth = textWidth(format.label);
  const rightTextWidth = textWidth(format.message);

  const leftWidth = leftTextWidth + 10;
  const rightWidth = rightTextWidth + 10;

  const leftX = leftWidth * 5;
  const rightX = leftWidth * 10 + rightWidth * 5;

  const width = leftWidth + rightWidth;

  const templates: Record<string, any> = {
    l: format.label,
    r: format.message,
    w: width,
    wl: leftWidth,
    wr: rightWidth,
    xl: leftX,
    xr: rightX,
    ll: leftTextWidth * 10,
    lr: rightTextWidth * 10,
    c: color[format.color]
  };

  return (BadgeTemplate as string).trim().replace(/{(\w+)}/g, (_, $1: string) => templates[$1]);
};

export const createBadge = (type: SizeType, size: number) => {
  return makeBadge({
    label: SizeName[type],
    message: bytes(size, {
      locale: false
    }),
    color: 'info'
  });
};

export const createErrorBadge = (status: number) => {
  return makeBadge({
    label: 'fail',
    message: status.toString(),
    color: 'critical'
  });
};
