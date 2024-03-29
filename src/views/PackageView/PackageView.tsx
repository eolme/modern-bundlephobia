import { badge } from '#/utils/path';
import { SizeType } from '#/utils/size';
import { alt } from '#/utils/a11y';

import { info } from './_internal/info';

import * as Icons from '#/assets/icons';

import styles from './PackageView.module.css';

export const PackageView = async (query: string) => {
  const collected = await info(query);

  return (
    <div>
      <section className={styles.badges}>
        <img
          loading="eager"
          height={20}
          src={badge(SizeType.INSTALL, query)}
          alt={alt(collected.name, SizeType.INSTALL)}
        />
        <img
          loading="eager"
          height={20}
          src={badge(SizeType.BROTLI, query)}
          alt={alt(collected.name, SizeType.BROTLI)}
        />
        <img
          loading="eager"
          height={20}
          src={badge(SizeType.GZIP, query)}
          alt={alt(collected.name, SizeType.GZIP)}
        />
      </section>
      <div className={styles.links}>
        <a
          className={styles.link}
          href={`https://npm.im/${collected.name}`}
          target="_blank"
          rel="noopener noreferrer"
          dangerouslySetInnerHTML={{ __html: Icons.npm }}
        />
        {
          collected.repository !== null ?
            (
              <a
                className={styles.link}
                href={collected.repository.pure}
                target="_blank"
                rel="noopener noreferrer"
                dangerouslySetInnerHTML={{ __html: Icons[collected.repository.type] }}
              />
            ) :
            null
        }
        {
          collected.homepage !== null ?
            (
              <a
                className={styles.link}
                href={collected.homepage}
                target="_blank"
                rel="noopener noreferrer"
                dangerouslySetInnerHTML={{ __html: Icons.browser }}
              />
            ) :
            null
        }
      </div>
      <div className={styles.block}>
        <article
          className={styles.markdown}
          dangerouslySetInnerHTML={{ __html: collected.readme }}
        />
      </div>
    </div>
  );
};

