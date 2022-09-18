import * as wasm from 'markdown-wasm';

// eslint-disable-next-line multiline-comment-style
/// TODO
// import { default as emoji } from 'src/assets/emoji/github.json';
// export const markdownEmoji = (content: string) => content.replace(/:(\w+):/g, ($0: string, $1: string) => {
//   if ($1 in emoji) {
//     return `<img src="${emoji[$1 as keyof typeof emoji]}" width="1em" height="1em" alt="${$0}" />`;
//   }
//   return $0;
// });

export const markdown = (content: string) => {
  return wasm.parse(content);
};
