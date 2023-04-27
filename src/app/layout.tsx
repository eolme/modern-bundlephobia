import type { ReactNode } from 'react';

import {
  Header
} from '#/components/shared';

import {
  ClientAnalytics,
  ClientConfig,
  ClientSearch
} from '#/components/client';

import { useId } from 'react';

import { theme } from '#/edge/theme';

import clsx from 'clsx';
import './styles';

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  const rootId = useId();
  const portalId = useId();

  /* eslint-disable react/no-unknown-property */
  return (
    <html
      lang="en"
      translate="no"
      x-ms-format-detection="none"
      className="vkui"
    >
      <head>
        <meta
          name="viewport"
          content="initial-scale=1,width=device-width,height=device-height,viewport-fit=cover,shrink-to-fit=no"
        />
        <meta
          name="format-detection"
          content="telephone=no,date=no,address=no,email=no,url=no"
        />
        <link
          key="ico"
          rel="icon"
          href="/favicon.ico"
          sizes="any"
        />
        <link
          key="svg"
          rel="icon"
          href="/favicon.svg"
          type="image/svg+xml"
        />
        <link
          rel="manifest"
          href="/manifest.json"
          type="application/manifest+json"
        />
        <link
          rel="preconnect"
          crossOrigin="anonymous"
          href="https://registry.npmjs.org/"
        />
        <meta
          key="theme-color"
          name="theme-color"
          content="#fff"
        />
        <meta
          key="theme-color-dark"
          name="theme-color"
          media="(prefers-color-scheme: dark)"
          content="#19191a"
        />
        <meta
          key="theme-color-light"
          name="theme-color"
          media="(prefers-color-scheme: light)"
          content="#fff"
        />
        <meta
          name="robots"
          content="index,follow"
        />
        <meta
          name="google-site-verification"
          content="itqdo-vvKJY1uI42uVTu3hD4Zdgs2f2yJc19gsK2nv8"
        />
        <meta
          name="yandex-verification"
          content="ad5c40447db2df86"
        />
      </head>
      <body
        className={clsx('vkui--vkBase--light', theme() === 'dark' && 'vkui--vkBase--dark')}
        draggable={false}
      >
        <ClientConfig
          root={rootId}
          portal={portalId}
        >
          <ClientAnalytics>
            <main id={rootId} className="vkui__root">
              <Header />
              <ClientSearch />
              {children}
            </main>
            <span
              id={portalId}
              className="vkui__portal-root"
            />
          </ClientAnalytics>
        </ClientConfig>
        <script
          defer={true}
          src={process.env.NEXT_PUBLIC_ANALYTICS}
        />
      </body>
    </html>
  );
}
