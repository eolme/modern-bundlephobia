import type { FC } from 'react';
import type { AppProps } from 'next/app';

import 'src/styles/index.css';

import {
  DefaultSeo
} from 'next-seo';

import {
  ThemeProvider
} from 'next-themes';

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
      <ThemeProvider
        enableSystem={true}
        enableColorScheme={true}
        attribute="scheme"
        defaultTheme="system"
      >
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
      </ThemeProvider>
    </>
  );
};

export default App;
