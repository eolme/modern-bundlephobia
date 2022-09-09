import type { FC } from 'react';

import { useRouter } from 'next/router';
import { useEffect } from 'react';

import * as progress from 'nprogress';

export const Progress: FC = () => {
  const router = useRouter();

  useEffect(() => {
    progress.configure({});

    let timer = 0;

    const start = () => {
      progress.set(0);
      progress.start();
    };

    const done = () => {
      window.clearTimeout(timer);

      timer = window.setTimeout(() => {
        progress.done(true);
      }, 200);
    };

    router.events.on('routeChangeStart', start);
    router.events.on('routeChangeError', done);
    router.events.on('routeChangeComplete', done);

    router.events.on('hashChangeStart', start);
    router.events.on('hashChangeComplete', done);

    return () => {
      router.events.off('routeChangeStart', start);
      router.events.off('routeChangeError', done);
      router.events.off('routeChangeComplete', done);

      router.events.off('hashChangeStart', start);
      router.events.off('hashChangeComplete', done);
    };
  }, []);

  return null;
};
