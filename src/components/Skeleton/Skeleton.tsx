import type { FC } from 'react';

import { useRender } from 'ahks';

import clsx from 'clsx';
import styles from './Skeleton.module.css';

const SIZE = Array.from({ length: 3 }, (_, index) => index);

type SkeletonProps = {
  mode: 'badge' | 'text' | 'icon';
};

export const Skeleton: FC<SkeletonProps> = ({ mode }) => {
  return useRender(
    SIZE.map((key) => (
      <div
        key={key}
        className={clsx(styles.skeleton, styles[mode])}
      />
    ))
  );
};
