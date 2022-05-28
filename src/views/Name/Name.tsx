import type { NextPage } from 'next';
import type { AnyFunction } from '@vkontakte/vkjs';
import type { calcSize, loadInfo } from 'src/api/calc';

import {
  Badge,
  Markdown
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
        title={path}
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
          type: 'image/jpeg',
          href: image
        }, {
          keyOverride: 'canonical',
          rel: 'canonical',
          href: canonical
        }]}
        openGraph={{
          images: [{
            url: image,
            type: 'image/jpeg',
            width: 1074,
            height: 480
          }]
        }}
      />
      <div>
        {
          hasSize ?
            (
              <section className={styles.badges}>
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
              </section>
            ) :
            (
              <div />
            )
        }
      </div>
      <div className={styles.block}>
        {
          hasPkg ?
            (
              <Markdown html={pkg.readme} />
            ) :
            (
              <div />
            )
        }
      </div>
    </Fragment>
  );
};
