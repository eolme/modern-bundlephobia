import type { NextPage } from 'next';
import type { AnyFunction } from '@vkontakte/vkjs';
import type { calcSize } from 'src/api/calc';
import type { loadInfo } from 'src/api/info';

import {
  Badge,
  BadgeCopy,
  Markdown,
  Skeleton
} from 'src/components';

import { NextSeo } from 'next-seo';

import { Fragment } from 'react';
import { useRouter } from 'next/router';

import { SizeType } from 'src/utils/const';
import { formatPagePath } from 'src/utils/format';
import { ICON } from 'src/utils/icons';
import { npmURL } from 'src/utils/url';
import { pathToName } from 'src/module/bundle';

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
  const name = pathToName(router.asPath);

  const image = `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/og/${path}`;
  const canonical = `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/p/${path}`;

  return (
    <Fragment key="page">
      <NextSeo
        title={name}
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
      <section className={styles.badges}>
        {
          hasSize ?
            (
              <>
                <Badge
                  type={SizeType.BYTES}
                  name={name}
                  size={size.bytes}
                />
                <Badge
                  type={SizeType.GZIP}
                  name={name}
                  size={size.gzip}
                />
                <Badge
                  type={SizeType.BROTLI}
                  name={name}
                  size={size.brotli}
                />
              </>
            ) :
            (
              <Skeleton mode="badge" />
            )
        }
        <BadgeCopy name={name} />
      </section>
      <div className={styles.links}>
        <a
          className={styles.link}
          href={npmURL(name)}
          target="_blank"
          rel="noopener noreferrer"
          dangerouslySetInnerHTML={{ __html: ICON.npm }}
        />
        {
          hasPkg && pkg.repository !== null ?
            (
              <a
                className={styles.link}
                href={pkg.repository.link}
                target="_blank"
                rel="noopener noreferrer"
                dangerouslySetInnerHTML={{ __html: ICON[pkg.repository.type] }}
              />
            ) :
            null
        }
        {
          hasPkg && pkg.homepage !== null ?
            (
              <a
                className={styles.link}
                href={pkg.homepage}
                target="_blank"
                rel="noopener noreferrer"
                dangerouslySetInnerHTML={{ __html: ICON.browser }}
              />
            ) :
            null
        }
      </div>
      <div className={styles.block}>
        {
          hasPkg ?
            (
              <Markdown
                key={path}
                html={pkg.readme}
              />
            ) :
            (
              <Skeleton mode="text" />
            )
        }
      </div>
    </Fragment>
  );
};
