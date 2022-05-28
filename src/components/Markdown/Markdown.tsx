import type { FC } from 'react';

import styles from './Markdown.module.css';

type MarkdownProps = {
  html: string;
};

export const Markdown: FC<MarkdownProps> = ({ html }) => {
  return (
    <article
      className={styles.markdown}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};
