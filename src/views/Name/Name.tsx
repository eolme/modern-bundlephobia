import type { NextPage } from 'next';
import type { AnyFunction } from '@vkontakte/vkjs';
import type { calcSize, loadInfo } from 'src/api/calc';

import {
  Text
} from '@mntm/vkui';

import {
  Badge
} from 'src/components';

import { NextSeo } from 'next-seo';

import { Fragment } from 'react';
import { useRouter } from 'next/router';

import { SizeType } from 'src/utils/const';

import styles from './Name.module.css';

type NamePropsValue<T extends AnyFunction> = Awaited<ReturnType<T>> | undefined;

type NameProps = {
  pkg: NamePropsValue<typeof loadInfo>;
  size: NamePropsValue<typeof calcSize>;
};

export const Name: NextPage<NameProps> = ({ pkg, size }) => {
  const router = useRouter();

  const hasPkg = router.isReady && typeof pkg !== 'undefined';
  const hasSize = router.isReady && typeof size !== 'undefined';

  return (
    <Fragment key="page">
      <NextSeo
        title={pkg?.name}
        description={pkg?.description}
        openGraph={{
          images: [{
            url: `/api/og/${size?.query}`,
            alt: pkg?.name,
            width: 1074,
            height: 480
          }]
        }}
      />
      <div className={styles.badges}>
        {
          hasSize ?
            (
              <>
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
              </>
            ) :
            (
              <span />
            )
        }
      </div>
      <p className={styles.description}>
        {
          hasPkg ?
            (
              <Text weight="regular">
                {pkg.description}
              </Text>
            ) :
            (
              <span />
            )
        }
      </p>
    </Fragment>
  );
};
