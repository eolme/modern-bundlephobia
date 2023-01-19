import { remark } from 'remark';
import { default as parse } from 'remark-parse';
import { default as github } from 'remark-github';
import { default as gfm } from 'remark-gfm';
import { default as rehype } from 'remark-rehype';
import { default as emoji } from 'remark-emoji';

// @ts-expect-error missing types
import { default as ally } from '@fec/remark-a11y-emoji';
import { default as highlight } from 'rehype-highlight';
import { default as stringify } from 'rehype-stringify';

import { Repository } from './repo';

import { alias } from './highlight';

export const markdown = async (content: string, type: Repository, repo: string) => {
  return new Promise<string>((resolve, reject) => {
    let marked = remark().use(parse);

    switch (type) {
      case Repository.GITHUB:
        marked = marked.use(github, {
          repository: repo
        });
        break;
      default:

        // Not implemented
    }

    marked
      .use(gfm)
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

        resolve(file.value.toString('utf8'));
      });
  });
};
