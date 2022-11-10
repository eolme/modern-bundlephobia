import type { NextPage } from 'next';
import type { NextRouter } from 'next/router';
import type { AnyFunction } from '@vkontakte/vkjs';
import type { calcSize } from 'src/module/api/calc';
import type { loadInfo } from 'src/module/api/info';

import {
  Badge,
  BadgeCopy,
  Markdown,
  Skeleton
} from 'src/components';

import { NextSeo } from 'next-seo';

import { Fragment } from 'react';

import { SizeType } from 'src/utils/const';
import { formatPath } from 'src/utils/format';
import { ICON } from 'src/utils/icons';
import { npmURL, selfURL } from 'src/utils/url';
import { pathToName } from 'src/module/bundle';

import styles from './Name.module.css';

type NamePropsValue<T extends AnyFunction> = Awaited<ReturnType<T>> | undefined;

type NameProps = {
  router: NextRouter;

  pkg: NamePropsValue<typeof loadInfo>;
  size: NamePropsValue<typeof calcSize>;
};

export const Name: NextPage<NameProps> = ({ router, pkg, size }) => {
  const ready =
    router.isReady &&
    typeof pkg !== 'undefined' &&
    typeof size !== 'undefined';

  const path = router.isFallback ? '' : formatPath(router.asPath);
  const name = router.isFallback ? '' : pathToName(router.asPath);

  const image = selfURL(`/api/og/${path}`);
  const canonical = selfURL(`/p/${path}`);

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
          ready ?
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
                <BadgeCopy name={name} />
              </>
            ) :
            (
              <Skeleton mode="badge" />
            )
        }
      </section>
      <div className={styles.links}>
        {
          ready ?
            (
              <>
                <a
                  className={styles.link}
                  href={npmURL(name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  dangerouslySetInnerHTML={{ __html: ICON.npm }}
                />
                {
                  pkg.repository !== null ?
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
                  pkg.homepage !== null ?
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
              </>
            ) :
            null
        }
      </div>
      <div className={styles.block}>
        {
          ready ?
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
