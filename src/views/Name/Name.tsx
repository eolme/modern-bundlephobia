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
  SearchContext
} from 'src/contexts';

import { useContext, Fragment } from 'react';
import { useRouter } from 'next/router';

import { SizeType } from 'src/utils/const';

import styles from './Name.module.css';

type NameProps = {
  size: Awaited<ReturnType<typeof calc>>;
};

export const Name: NextPage<NameProps> = ({ size }) => {
  const router = useRouter();
  const context = useContext(SearchContext);

  const name = router.isFallback ? context.search : size.name;
  const selected = context.results.find((option) => option.package.name === name);

  return (
    <Fragment key="page">
      <NextSeo
        title={name}
        description={selected ? selected.package.description : ''}
      />
      <Search />
      {
        router.isFallback || !router.isReady ? (
          'loading'
        ) : (
          <Fragment key="info">
            <div className={styles.description}>
              {
                selected ? (
                  selected.package.description
                ) : (
                  'loading'
                )
              }
            </div>
            <div className={styles.badges}>
              <Badge
                type={SizeType.BYTES}
                name={size.name}
                size={size.bytes}
              />
              <Badge
                type={SizeType.GZIP}
                name={size.name}
                size={size.gzip}
              />
              <Badge
                type={SizeType.BROTLI}
                name={size.name}
                size={size.brotli}
              />
              </div>
          </Fragment>
        )
      }
    </Fragment>
  )
};
