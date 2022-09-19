import type { FC } from 'react';
import type { SizeType } from 'src/utils/const';

import { memo } from 'react';

import { useCopy } from 'src/hooks';
import { useStableHandler } from 'ahks';

import { SizeName } from 'src/utils/const';

import { createBadge } from 'src/generate/badge';

import styles from './Badge.module.css';

type BadgeProps = {
  type: SizeType;
  name: string;
  size: number;
};

const BadgeComponent: FC<BadgeProps> = ({ type, name, size }) => {
  const copy = useCopy();

  const handleClick = useStableHandler(() => {
    const url = `${location.origin}/p/${name}`;
    const image = `${location.origin}/api/badge/${type}/${name}`;
    const text = `[![${SizeName[type]} bundle size](${image})](${url})`;

    copy(text, url);
  });

  return (
    <div
      className={styles.badge}
      role="button"
      onClick={handleClick}
      dangerouslySetInnerHTML={{ __html: createBadge(type, size) }}
    />
  );
};

export const Badge = memo(BadgeComponent, (prev, next) => prev.name === next.name && prev.size === next.size);
