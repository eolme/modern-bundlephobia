import type { FC } from 'react';
import type { AppProps } from 'next/app';

import 'src/styles/index.css';

import {
  default as Next
} from 'next/app';

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
      <SWRConfig>
        <ThemeProvider
          enableSystem={true}
          enableColorScheme={true}
          attribute="scheme"
          defaultTheme="system"
        >
          <Layout>
            <SearchProvider>
              <Component {...pageProps} />
            </SearchProvider>
          </Layout>
        </ThemeProvider>
      </SWRConfig>
    </>
  );
};

export default App;
