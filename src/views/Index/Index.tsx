import type { NextPage } from 'next';

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
    <div className={styles.container}>
      <Title level="1">Modern Bundlephobia</Title>
      <Subhead className={styles.subhead}>
        find the cost of adding a npm package to your bundle
      </Subhead>
      <Search />
    </div>
  );
};
