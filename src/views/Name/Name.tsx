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
import { formatPagePath } from 'src/utils/format';

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

  const path = formatPagePath(router.asPath);
  const image = `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/og/${path}`;
  const canonical = `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/p/${path}`;

  return (
    <Fragment key="page">
      <NextSeo
        title={pkg?.name}
        description={pkg?.description}
        twitter={{
          cardType: 'summary_large_image'
        }}
        additionalMetaTags={[{
          name: 'image',
          content: image
        }]}
        additionalLinkTags={[{
          rel: 'image_src',
          type: 'image/png',
          href: image
        }, {
          keyOverride: 'canonical',
          rel: 'canonical',
          href: canonical
        }]}
        openGraph={{
          images: [{
            url: image,
            type: 'image/png',
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
