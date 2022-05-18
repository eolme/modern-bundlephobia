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

import { SizeType } from 'src/utils/const';

import styles from './Name.module.css';

type NameProps = {
  size: Awaited<ReturnType<typeof calc>>;
};

export const Name: NextPage<NameProps> = ({ size }) => {
  const router = useRouter();
  const context = useContext(SearchContent);

  const name = router.isFallback ? context.initial : size.name;
  const selected = context.results.find((option) => option.package.name === name);

  return (
    <Fragment key="page">
      <NextSeo
        title={name}
        description={selected ? selected.package.description : ''}
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
                type={SizeType.BYTES}
                size={size.bytes}
              />
              <Badge
                type={SizeType.GZIP}
                size={size.gzip}
              />
              <Badge
                type={SizeType.BROTLI}
                size={size.brotli}
              />
            </>
          )
        }
      </div>
    </Fragment>
  )
};
