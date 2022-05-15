import type { FC } from 'react';
import type { AppProps, AppContext, AppInitialProps } from 'next/app';

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

type NextApp = FC<AppProps> & {
  getInitialProps: (context: AppContext) => Promise<AppInitialProps>; 
};

const App: NextApp = ({ Component, pageProps }) => {
  return (
    <>
      <DefaultSeo {...SEO} />
      <SWRConfig>
        <ThemeProvider
          enableSystem={true}
          enableColorScheme={true}
          attribute="scheme"
        >
          <Layout touch={pageProps.touch}>
            <SearchProvider>
              <Component {...pageProps} />
            </SearchProvider>
          </Layout>
        </ThemeProvider>
      </SWRConfig>
    </>
  );
};

App.getInitialProps = async (context) => {
  const props = await Next.getInitialProps(context);

  let touch = false;

  if (context.ctx.req) {
    const Detect = (await import('mobile-detect')).default;

    const user = context.ctx.req.headers['user-agent'] || '';
    const instance = Reflect.construct(Detect, [user]);

    touch = instance.phone() !== null;
  } else {
    const utils = await import('@vkontakte/vkjs');

    touch = utils.hasMouse;
  }

  Object.assign(props.pageProps, {
    touch
  });

  return props;
};

export default App;
