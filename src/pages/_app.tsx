import type { FC } from 'react';
import type { AppProps } from 'next/app';

import 'src/styles/index.css';

import {
  DefaultSeo
} from 'next-seo';

import {
  SWRConfig
} from 'swr';

import {
  Layout
} from 'src/components';

import {
  SearchProvider
} from 'src/contexts/search';

import {
  default as SEO
} from '../../next-seo.config';

import {
  searchNPM
} from 'src/api/npm';

const App: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <DefaultSeo {...SEO} />
      <SWRConfig
        value={{
          fetcher: searchNPM,
          suspense: false,
          keepPreviousData: true
        }}
      >
        <SearchProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SearchProvider>
      </SWRConfig>
    </>
  );
};

export default App;
