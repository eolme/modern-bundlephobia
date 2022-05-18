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
  SearchProvider
} from 'src/contexts';

import {
  Layout
} from 'src/components';

import {
  default as SEO
} from '../../next-seo.config';

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
      <Layout>
        <SWRConfig value={{
          suspense: false,
          keepPreviousData: true  
        }}>
          <SearchProvider>
            <Component {...pageProps} />
          </SearchProvider>
          </SWRConfig>
        </Layout>
      </ThemeProvider>
    </>
  );
};

export default App;
