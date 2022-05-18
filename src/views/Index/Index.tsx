import type { NextPage } from 'next';

import {
  Fragment
} from 'react';

import {
  Subhead,
  Title
} from '@mntm/vkui';

import {
  Search
} from 'src/components';

import styles from './Index.module.css';

export const Index: NextPage = () => {
  return (
    <Fragment key="page">
      <Title level="1" className={styles.title}>Modern Bundlephobia</Title>
      <Subhead className={styles.subhead}>
        find the cost of adding a npm package to your bundle
      </Subhead>
      <Search />
    </Fragment>
  );
};
