import type { FC, ReactNode } from 'react';

import {
  Header
} from '#/components/shared';

import {
  ServerConfig
} from '#/components/server';

import {
  ClientConfig,
  ClientSearch
} from '#/components/client';

import { useId } from 'react';

import { theme } from '#/edge/theme';

import clsx from 'clsx';
import './styles.ts';

type RootLayoutProps = {
  children: ReactNode;
};

const RootLayout: FC<RootLayoutProps> = ({ children }) => {
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
        <meta charSet="utf-8" />
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
          href="https://api.npms.io/"
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
      </head>
      <body
        className={clsx('vkui--vkBase--light', theme() === 'dark' && 'vkui--vkBase--dark')}
        draggable={false}
      >
        <ServerConfig>
          <ClientConfig
            root={rootId}
            portal={portalId}
          >
            <main id={rootId} className="vkui__root">
              <Header />
              <ClientSearch />
              {children}
            </main>
            <span
              id={portalId}
              className="vkui__portal-root"
            />
          </ClientConfig>
        </ServerConfig>
        <script
          defer={true}
          src={process.env.NEXT_PUBLIC_ANALYTICS}
        />
      </body>
    </html>
  );
};

export { RootLayout as default };