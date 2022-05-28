import * as wasm from 'markdown-wasm';

export const markdown = (content: string) => {
  return wasm.parse(content);
};
