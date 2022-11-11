import { remark } from 'remark';
import { default as parse } from 'remark-parse';
import { default as github } from 'remark-github';

// @ts-expect-error missing typesx
import { default as gitlab } from 'remark-gitlab';
import { default as gfm } from 'remark-gfm';
import { default as rehype } from 'remark-rehype';
import { default as emoji } from 'remark-emoji';

// @ts-expect-error missing typesx
import { default as ally } from '@fec/remark-a11y-emoji';
import { default as highlight } from 'rehype-highlight';
import { default as stringify } from 'rehype-stringify';

import { Repository } from 'src/utils/const';
import { alias } from 'src/module/markdown/highlight';

export const markdown = async (content: string, type: Repository, repo: string) => {
  return new Promise<string>((resolve, reject) => {
    let marked = remark().use(parse);

    switch (type) {
      case Repository.GITHUB:
        marked = marked.use(github, {
          repository: repo
        });
        break;
      case Repository.GITLAB:
        marked = marked.use(gitlab, {
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
