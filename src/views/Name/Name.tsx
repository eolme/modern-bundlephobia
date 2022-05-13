import type { NextPage } from 'next';
import type { calc } from 'src/api/calc';

import { Search } from 'src/components';

import styles from './Name.module.css';

type NameProps = {
  size: Awaited<ReturnType<typeof calc>>;
};

export const Name: NextPage<NameProps> = ({ size }) => {
  return (
    <div className={styles.container}>
      <Search value={size.name} />
    </div>
  )
};
