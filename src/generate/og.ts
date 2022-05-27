import type { calcSize } from 'src/api/calc';

import { Buffer } from 'node:buffer';

import { GlobalFonts, createCanvas } from '@napi-rs/canvas';

import { once } from 'src/utils/fn';
import { formatSize } from 'src/utils/format';
import { SizeName, SizeType } from 'src/utils/const';

import { default as w400 } from 'src/assets/fonts/NotoSans400.json';
import { default as w600 } from 'src/assets/fonts/NotoSans600.json';

const registerFonts = once(() => {
  GlobalFonts.register(Buffer.from(w400), 'w400');
  GlobalFonts.register(Buffer.from(w600), 'w600');
});

export const generateImage = async (size: Awaited<ReturnType<typeof calcSize>>) => {
  registerFonts();

  const canvas = createCanvas(1074, 480);

  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, 1074, 480);

  ctx.fillStyle = '#000000';

  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';

  ctx.font = 'normal normal 400 normal 72px w400';
  ctx.fillText(size.name, 72, 80 + 8, 1074 - 72);

  ctx.font = 'normal normal 400 normal 56px w400';
  ctx.fillText(SizeName[SizeType.BYTES], 72, 184 + ((72 - 56) * 0.5) + 8);
  ctx.fillText(SizeName[SizeType.BROTLI], 72, 184 + 72 + ((72 - 56) * 0.5) + 8);
  ctx.fillText(SizeName[SizeType.GZIP], 72, 184 + (72 * 2) + ((72 - 56) * 0.5) + 8);

  ctx.font = 'normal normal 600 normal 56px w600';
  ctx.fillText(formatSize(size.bytes), 312, 184 + ((72 - 56) * 0.5) + 8);
  ctx.fillText(formatSize(size.brotli), 312, 184 + 72 + ((72 - 56) * 0.5) + 8);
  ctx.fillText(formatSize(size.gzip), 312, 184 + (72 * 2) + ((72 - 56) * 0.5) + 8);

  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  ctx.save();

  ctx.translate(1074 - (0.5 * 72), 0.5 * 480);
  ctx.rotate(-0.5 * Math.PI);

  ctx.font = 'normal normal 600 normal 40px w600';
  ctx.fillText('modern bundlephobia', 0, 0);

  ctx.restore();

  return canvas.encode('jpeg', 100);
};
