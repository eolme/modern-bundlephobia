import type { FC } from 'react';

import { memo } from 'react';

import styles from './Markdown.module.css';

type MarkdownProps = {
  html: string;
};

const MarkdownComponent: FC<MarkdownProps> = ({ html }) => {
  return (
    <article
      className={styles.markdown}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export const Markdown = memo(MarkdownComponent);
