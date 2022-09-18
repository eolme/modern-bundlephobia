import type { FC } from 'react';
import type { SizeType } from 'src/utils/const';

import {
  SnackbarContext
} from 'src/contexts/snackbar';

import { memo, useContext } from 'react';
import { useStableHandler } from 'ahks';

import { createBadge } from 'src/generate/badge';

import { default as copy } from 'copy-to-clipboard';

import styles from './Badge.module.css';

type BadgeProps = {
  type: SizeType;
  name: string;
  size: number;
};

const BadgeComponent: FC<BadgeProps> = ({ type, name, size }) => {
  const showSnackbar = useContext(SnackbarContext);

  const handleClick = useStableHandler(() => {
    const url = `${location.origin}/p/${name}`;
    const image = `${location.origin}/api/badge/${type}/${name}`;

    copy(`[![${type} bundle size](${image})](${url})`, {
      onCopy() {
        showSnackbar({
          children: 'Copied to clipboard',
          action: typeof navigator.share === 'function' ? 'Share' : null,
          onActionClick() {
            navigator.share({
              url
            });
          }
        });
      }
    });
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
