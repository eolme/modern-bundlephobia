import type { FC } from 'react';

import { badge } from '#/utils/path';
import { SizeType } from '#/utils/size';

import styles from './PackageView.module.css';

type PackageViewProps = {
  name: string;
};

export const PackageView: FC<PackageViewProps> = ({ name }) => {
  return (
    <div>
      <section className={styles.badges}>
        <img src={badge(SizeType.INSTALL, name)} />
        <img src={badge(SizeType.BROTLI, name)} />
        <img src={badge(SizeType.GZIP, name)} />
      </section>
    </div>
  );
};

