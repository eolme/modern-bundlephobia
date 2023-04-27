import type { SizeType } from '#/utils/size';

import { default as verdana } from '#/assets/template/verdana.json';
import { default as BadgeTemplate } from '#/assets/template/badge.svg';

import { SizeName, formatBytes } from '#/utils/size';

type Format = {
  label: string;
  message: string;
  color: 'info' | 'critical';
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

const generateBadge = (format: Format) => {
  const leftTextWidth = textWidth(format.label);
  const rightTextWidth = textWidth(format.message);

  const leftWidth = leftTextWidth + 10;
  const rightWidth = rightTextWidth + 10;

  const leftX = leftWidth * 5;
  const rightX = (leftWidth * 10) + (rightWidth * 5);

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

  return (BadgeTemplate as string).trim().replaceAll(/{(\w+)}/g, (_, $1: string) => templates[$1]);
};

export const badge = (type: SizeType, size: string) => {
  return generateBadge({
    label: SizeName[type],
    message: formatBytes(size),
    color: 'info'
  });
};

export const error = (type: SizeType, status: number) => {
  return generateBadge({
    label: SizeName[type],
    message: status.toString(),
    color: 'critical'
  });
};
