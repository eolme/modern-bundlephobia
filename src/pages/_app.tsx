import type { FC } from 'react';
import type { AppProps } from 'next/app';

import 'src/styles/index.css';

import {
  DefaultSeo
} from 'next-seo';

import {

  // @ts-expect-error modern resolution
  Analytics
} from '@vercel/analytics/dist/react/index';

import {
  SWRConfig
} from 'swr';

import {
  Layout,
  Progress
} from 'src/components';

import {
  SearchProvider
} from 'src/contexts/search';

import {
  SnackbarProvider
} from 'src/contexts/snackbar';

import {
  default as SEO
} from '../../next-seo.config';

import {
  searchNPM
} from 'src/module/api/npm';

const App: FC<AppProps> = ({ Component, router, pageProps }) => {
  return (
    <>
      <Analytics />
      <DefaultSeo {...SEO} />
      <SWRConfig
        value={{
          fetcher: searchNPM,
          suspense: false,
          keepPreviousData: true
        }}
      >
        <SearchProvider router={router}>
          <Layout>
            <Progress />
            <SnackbarProvider>
              <Component {...Object.assign({ router }, pageProps)} />
            </SnackbarProvider>
          </Layout>
        </SearchProvider>
      </SWRConfig>
    </>
  );
};

export default App;
