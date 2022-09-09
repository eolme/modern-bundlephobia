import {
  alias,
  languages
} from './languages';

// @ts-expect-error types
import { languages as loaded, highlight as prism } from 'prismjs/components/prism-core';

export const highlight = async (lang: string, body: string) => {
  if (lang in alias) {
    const syntax = alias[lang];

    const load = languages[syntax];

    await load();

    if (syntax in loaded) {
      return prism(body, loaded[syntax]);
    }
  }

  return body;
};

