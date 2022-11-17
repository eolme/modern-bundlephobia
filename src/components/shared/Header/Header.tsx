import type { FC } from 'react';

import clsx from 'clsx';
import styles from './Header.module.css';

export const Header: FC = () => {
  return (
    <>
      <h1 className={clsx(styles.title, 'vkuiTitle', 'vkuiTitle--level-1', 'Title--weight-1')}>
        Modern Bundlephobia
      </h1>
      <h2 className={clsx(styles.subhead, 'vkuiSubhead', 'vkuiSubhead--weight-3')}>
        find the cost of adding a npm package to your bundle
      </h2>
    </>
  );
};
