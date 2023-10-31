import type { Node } from 'unist';
import type { Root, VFile } from 'remark-github/lib';

import { default as github } from 'remark-github';
import { visit } from 'unist-util-visit';

import { Repository } from './repo';

type Options = {
  type: Repository;
  pure: string;
};

type LinkNode = Node & {
  url?: string;
};

const resolve = (url: string, base: string) => {
  const length = url.length;

  if (
    length === 0 ||
    url[0] === '#'
  ) {
    return url;
  }

  if (url[0] === '.') {
    if (length < 3) {
      return base;
    }

    if (url[2] === '#') {
      return url.slice(2);
    }

    const blob = `${base}${base[base.length - 1] === '/' ? './' : '/'}blob/HEAD/`;

    return new URL(url, blob).href;
  }

  return new URL(url, base).href;
};

export const links = (options: Options) => (tree: Node, file: VFile) => {
  if (options.pure.length === 0) {
    return;
  }

  if (options.type === Repository.GITHUB) {
    const plugin = github({
      repository: options.pure
    });

    plugin(tree as Root, file);
  }

  visit(tree, { type: 'link' }, (node) => {
    const linkNode = node as LinkNode;

    if (typeof linkNode.url === 'string') {
      try {
        linkNode.url = resolve(linkNode.url, options.pure);
      } catch {
        // Ignore
      }
    } else {
      linkNode.url = '#';
    }
  });
};
