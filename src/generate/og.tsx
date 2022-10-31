import type { calcSize } from 'src/api/calc';

import { formatSize } from 'src/utils/format';
import { SizeName, SizeType } from 'src/utils/const';

import { ImageResponse } from '@vercel/og';
import type { DetailedHTMLProps, HTMLAttributes, ReactElement } from 'react';

const px = (value: number) => `${value}px`;

const jsx = (type: string, props: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>) => ({
  type,
  props
}) as ReactElement<any, any>;

export const generateImageResponse = (size: Awaited<ReturnType<typeof calcSize>>) => {
  return new ImageResponse(
    jsx('div', {
      style: {
        width: px(1074),
        height: px(480),
        padding: px(72),
        color: '#000',
        background: '#fff',
        fontSize: px(56),
        lineHeight: px(72)
      },
      children: [
        jsx('div', {
          style: {
            position: 'absolute',
            transform: 'rotate(90deg)',
            transformOrigin: `${580 - 72}px 0`,
            width: px(580),
            height: px(72),
            fontSize: px(40)
          },
          children: 'modern bundlephobia'
        }),
        jsx('div', {
          style: {
            height: px(72),
            fontSize: px(72)
          },
          children: size.name
        }),
        jsx('div', {
          style: {
            marginTop: px(40),
            height: px((72 + 8) * 3),
            width: px(312)
          },
          children: [
            jsx('div', {
              style: {
                marginTop: px(8),
                height: px(72)
              },
              children: [
                jsx('div', {
                  style: {
                    width: px(240)
                  },
                  children: SizeName[SizeType.BYTES]
                }),
                jsx('div', {
                  style: {
                    fontWeight: 600
                  },
                  children: formatSize(size.bytes)
                })
              ]
            }),
            jsx('div', {
              style: {
                marginTop: px(8),
                height: px(72)
              },
              children: [
                jsx('div', {
                  style: {
                    width: px(240)
                  },
                  children: SizeName[SizeType.BROTLI]
                }),
                jsx('div', {
                  style: {
                    fontWeight: 600
                  },
                  children: formatSize(size.brotli)
                })
              ]
            }),
            jsx('div', {
              style: {
                marginTop: px(8),
                height: px(72)
              },
              children: [
                jsx('div', {
                  style: {
                    width: px(240)
                  },
                  children: SizeName[SizeType.GZIP]
                }),
                jsx('div', {
                  style: {
                    fontWeight: 600
                  },
                  children: formatSize(size.gzip)
                })
              ]
            })
          ]
        })
      ]
    }),
    {
      emoji: 'noto',
      width: 1074,
      height: 480,
      debug: true
    }
  );
};
