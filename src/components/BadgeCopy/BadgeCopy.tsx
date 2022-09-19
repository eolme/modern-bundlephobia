import type { FC } from 'react';

import { Icon20CopyOutline as IconCopy } from '@vkontakte/icons';

import { useCopy } from 'src/hooks';
import { useHandler, useStableHandler } from 'ahks';

import { SizeName, SizeType } from 'src/utils/const';

import styles from './BadgeCopy.module.css';

type BadgeCopyProps = {
  name: string;
};

export const BadgeCopy: FC<BadgeCopyProps> = ({ name }) => {
  const copy = useCopy();

  const role = useHandler((el: HTMLDivElement) => {
    el.setAttribute('role', 'button');
  });

  const handleClick = useStableHandler(() => {
    const url = `${location.origin}/p/${name}`;

    const text = [
      SizeType.BYTES,
      SizeType.GZIP,
      SizeType.BROTLI
    ].map((type) => {
      const image = `${location.origin}/api/badge/${type}/${name}`;

      return `[![${SizeName[type]} bundle size](${image})](${url})`;
    }).join(' ');

    copy(text, url);
  });

  return (
    <IconCopy
      getRootRef={role}
      className={styles.copy}
      onClick={handleClick}
      aria-label="Copy"
      width={20}
      height={20}
      fill="var(--vkui--color_text_primary)"
    />
  );
};
