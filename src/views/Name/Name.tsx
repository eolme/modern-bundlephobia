import type { NextPage } from 'next';
import type { calc } from 'src/api/calc';

import {
  NextSeo
} from 'next-seo';

import {
  Search,
  Badge
} from 'src/components';

import {
  SearchContent
} from 'src/contexts';

import { useContext } from 'react';
import { useRouter } from 'next/router';

import { fromPath } from 'src/utils/module';

import styles from './Name.module.css';

type NameProps = {
  size: Awaited<ReturnType<typeof calc>>;
};

export const Name: NextPage<NameProps> = ({ size }) => {
  const router = useRouter();
  const context = useContext(SearchContent);

  const name = router.isFallback ? context.search || fromPath(router.asPath) : size.name;
  const selected = context.results.find((option) => option.value === name);

  if (context.search !== name) {
    context.setSearch(name);
  }

  return (
    <>
      <NextSeo
        title={name}
        description={selected ? selected.npm.package.description : ''}
      />
      <div className={styles.container}>
        <Search value={name} />
        <div className={styles.badges}>
          {
            router.isFallback || !router.isReady ? (
              <>
                loading
              </>
            ) : (
              <>
                <Badge
                  name="minified"
                  size={size.bytes}
                />
                <Badge
                  name="gzip"
                  size={size.gzip}
                />
                <Badge
                  name="brotli"
                  size={size.brotli}
                />
              </>
            )
          }
        </div>
      </div>
    </>
  )
};
