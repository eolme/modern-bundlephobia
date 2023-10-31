import type { Repository } from './repo';

import { remark } from 'remark';
import { default as parse } from 'remark-parse';
import { default as gfm } from 'remark-gfm';
import { default as rehype } from 'remark-rehype';
import { default as emoji } from 'remark-emoji';

// @ts-expect-error missing types
import { default as ally } from '@fec/remark-a11y-emoji';
import { default as highlight } from 'rehype-highlight';
import { default as stringify } from 'rehype-stringify';

import { alias } from './highlight';
import { links } from './links';

export const markdown = async (content: string, type: Repository, pure: string) => {
  return new Promise<string>((resolve, reject) => {
    remark()
      .use(parse)
      .use(gfm)
      .use(links, {
        type,
        pure
      })
      .use(emoji)
      .use(ally)
      .use(rehype)
      .use(highlight, {
        aliases: alias
      })
      .use(stringify)
      .process(content, (error, file) => {
        if (error || !file) {
          reject(error);

          return;
        }

        resolve(
          typeof file.value === 'string' ?
            file.value :
            Buffer.from(file.value).toString('utf8')
        );
      });
  });
};
