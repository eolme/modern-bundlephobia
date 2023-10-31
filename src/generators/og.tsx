import type { DetailedHTMLProps, HTMLAttributes, ReactElement } from 'react';

import { ImageResponse } from 'next/og';

import { SizeName, SizeType, formatBytes } from '#/utils/size';
import { once } from '#/utils/fn';

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

const fontRegular = once(async () => import(
  /* webpackMode: "lazy-once" */
  '#/assets/fonts/noto-sans-regular'
));

const fontSemibold = once(async () => import(
  /* webpackMode: "lazy-once" */
  '#/assets/fonts/noto-sans-semibold'
));

export const og = async (
  name: string,
  install: string,
  gzip: string,
  brotli: string
) => {
  const [
    { default: NotoSansRegular },
    { default: NotoSansSemiBold }
  ] = await Promise.all([
    fontRegular(),
    fontSemibold()
  ]);

  const long = name.length > 15;

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
          children: name
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
                  children: SizeName[SizeType.INSTALL]
                }),
                jsx('div', {
                  style: {
                    fontWeight: 600
                  },
                  children: formatBytes(install)
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
                  children: formatBytes(brotli)
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
                  children: formatBytes(gzip)
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
        data: NotoSansRegular,
        style: 'normal',
        weight: 400
      }, {
        name: 'noto',
        data: NotoSansSemiBold,
        style: 'normal',
        weight: 600
      }],
      width: 1074,
      height: 480,
      debug: false
    }
  );
};
