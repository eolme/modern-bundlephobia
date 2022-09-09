import type { FC } from 'react';

import { memo, useRef } from 'react';
import { useLayoutMount } from 'ahks';

import { idle } from 'src/utils/fn';

import { highlight } from 'src/module/highlight';

import styles from './Markdown.module.css';

type MarkdownProps = {
  html: string;
};

const iterate = Array.prototype.forEach;

const MarkdownComponent: FC<MarkdownProps> = ({ html }) => {
  const ref = useRef<HTMLElement | null>(null);

  useLayoutMount(() => {
    if (ref.current !== null) {
      const codes = ref.current.getElementsByTagName('code');

      iterate.call(codes, (element: HTMLElement) => {
        const lang = element.className.slice(9);

        idle(() => {
          highlight(lang, element.textContent!).then((code) => {
            requestAnimationFrame(() => {
              element.innerHTML = code;
            });
          });
        });
      });
    }
  });

  return (
    <article
      ref={ref}
      className={styles.markdown}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export const Markdown = memo(MarkdownComponent, () => true);
