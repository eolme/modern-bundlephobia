import type { FC } from 'react';
import type { AppProps, AppContext, AppInitialProps } from 'next/app';

import { default as Next } from 'next/app';
import { ThemeProvider } from 'next-themes';
import { SWRConfig } from 'swr';

import {
  Layout
} from 'src/components';

import 'src/styles/index.css';

type NextApp = FC<AppProps> & {
  getInitialProps: (context: AppContext) => Promise<AppInitialProps>; 
};

const App: NextApp = ({ Component, pageProps }) => {
  return (
    <SWRConfig>
      <ThemeProvider
        enableSystem={true}
        enableColorScheme={true}
        attribute="scheme"
      >
        <Layout touch={pageProps.touch}>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </SWRConfig>
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
