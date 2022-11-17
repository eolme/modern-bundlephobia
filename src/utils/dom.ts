import { extend, getDocument, getWindow, ssrDocument } from 'ssr-window';

import { noop } from '#/utils/fn';

extend(ssrDocument.body, {
  classList: {
    add: noop,
    remove: noop
  },
  style: {
    setProperty: noop
  }
});

export const document = getDocument();
export const window = getWindow();
