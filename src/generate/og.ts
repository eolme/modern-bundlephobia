import type { calcSize } from 'src/api/calc';

import { default as path } from 'node:path';
import { promises as fs } from 'node:fs';

import { GlobalFonts, createCanvas } from '@napi-rs/canvas';

import { once } from 'src/utils/fn';
import { formatSize } from 'src/utils/format';
import { SizeName, SizeType } from 'src/utils/const';

const load = once(async () => {
  const [w400, w600] = await Promise.all([
    fs.readFile(path.resolve('./src/assets/fonts/NotoSans400.woff2')),
    fs.readFile(path.resolve('./src/assets/fonts/NotoSans600.woff2'))
  ]);

  GlobalFonts.register(w400, 'w400');
  GlobalFonts.register(w600, 'w600');
});

export const generateImage = async (size: Awaited<ReturnType<typeof calcSize>>) => {
  await load();

  const canvas = createCanvas(1074, 480);

  const ctx = canvas.getContext('2d', {
    alpha: false,
    colorSpace: 'srgb'
  });

  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';

  ctx.font = 'normal normal 400 72px/72px w400';
  ctx.fillText(size.name, 72, 80, 1074 - 72);

  ctx.font = 'normal normal 400 56px/72px w400';
  ctx.fillText(SizeName[SizeType.BYTES], 72, 184);
  ctx.fillText(SizeName[SizeType.BROTLI], 72, 184 + 72);
  ctx.fillText(SizeName[SizeType.GZIP], 72, 184 + (72 * 2));

  ctx.font = 'normal normal 600 56px/72px w600';
  ctx.fillText(formatSize(size.bytes), 312, 184);
  ctx.fillText(formatSize(size.brotli), 312, 184 + 72);
  ctx.fillText(formatSize(size.gzip), 312, 184 + (72 * 2));

  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  ctx.translate(1074 - (0.5 * 72), 0.5 * 480);
  ctx.rotate(-0.5 * Math.PI);

  ctx.font = 'normal normal 600 40px/72px w600';
  ctx.fillText('modern bundlephobia', 0, 0);

  return canvas.encode('png');
};
