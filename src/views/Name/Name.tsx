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

import { useContext, Fragment } from 'react';
import { useRouter } from 'next/router';

import styles from './Name.module.css';

type NameProps = {
  size: Awaited<ReturnType<typeof calc>>;
};

export const Name: NextPage<NameProps> = ({ size }) => {
  const router = useRouter();
  const context = useContext(SearchContent);

  const name = router.isFallback ? context.initial : size.name;
  const selected = context.results.find((option) => option.value === name);

  return (
    <Fragment key="page">
      <NextSeo
        title={name}
        description={selected ? selected.npm.package.description : ''}
      />
      <Search />
      <div className={styles.badges}>
        {
          router.isFallback ? (
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
    </Fragment>
  )
};
