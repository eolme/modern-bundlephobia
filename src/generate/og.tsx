import type { DetailedHTMLProps, HTMLAttributes, ReactElement } from 'react';
import type { calcSize } from 'src/module/api/calc';

import { formatSize } from 'src/utils/format';
import { SizeName, SizeType } from 'src/utils/const';

import { ImageResponse } from '@vercel/og';
import { once } from 'src/utils/fn';

const fontLoader = (url: URL) => once(async () => (await fetch(url)).arrayBuffer());

const NotoSansRegular = fontLoader(new URL('../assets/fonts/noto-sans-regular.ttf', import.meta.url));
const NotoSansSemiBold = fontLoader(new URL('../assets/fonts/noto-sans-semibold.ttf', import.meta.url));

const px = (value: number) => `${value}px`;

const jsx = (type: string, props: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>) => ({
  type,
  props: Object.assign(props, {
    style: Object.assign({
      display: 'flex',
      flexDirection: 'column',
      flexShrink: 0,
      flexGrow: 0
    }, props.style)
  })
}) as ReactElement<any, any>;

export const generateImageResponse = async (size: Awaited<ReturnType<typeof calcSize>>) => {
  const [regular, semibold] = await Promise.all([
    NotoSansRegular(),
    NotoSansSemiBold()
  ]);

  const long = size.name.length > 15;

  return new ImageResponse(
    jsx('div', {
      style: {
        width: px(1074),
        height: px(480),
        padding: px(72),
        color: '#000',
        background: '#fff',
        fontSize: px(56),
        fontFamily: 'noto',
        lineHeight: px(72)
      },
      children: [
        jsx('div', {
          style: {
            position: 'absolute',
            top: px(240 - 36),
            right: px(36 - 240),
            transform: 'rotate(-90deg)',
            width: px(480),
            height: px(72),
            fontSize: px(40),
            fontWeight: 600,
            textAlign: 'center',
            justifyContent: 'center',
            alignItems: 'center'
          },
          children: 'modern bundlephobia'
        }),
        jsx('div', {
          style: {
            height: px(72),
            fontSize: long ? px(48) : px(72),
            lineHeight: long ? px(48) : px(72),
            width: px(1074 - (72 * 3))
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
                flexDirection: 'row',
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
                flexDirection: 'row',
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
                flexDirection: 'row',
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
      fonts: [{
        name: 'noto',
        data: regular,
        style: 'normal',
        weight: 400
      }, {
        name: 'noto',
        data: semibold,
        style: 'normal',
        weight: 600
      }],
      width: 1074,
      height: 480,
      debug: false
    }
  );
};
