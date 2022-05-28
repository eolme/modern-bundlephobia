import type { NextPage } from 'next';

import {
  Head,
  Html,
  Main,
  NextScript
} from 'next/document';

import {
  Theme
} from 'src/components';

import { EMPTY } from 'src/utils/const';

const Document: NextPage = () => {
  return (
    <Html
      lang="en"
      translate="no"
      x-ms-format-detection="none"
      className="vkui"
      style={{
        // @ts-expect-error mistype
        '--vh': '1vh'
      }}
    >
      <Head />
      <body
        className={EMPTY}
        scheme={EMPTY}
      >
        <Theme />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
