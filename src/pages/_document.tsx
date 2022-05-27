import type { NextPage } from 'next';

import {
  Head,
  Html,
  Main,
  NextScript
} from 'next/document';

import { EMPTY } from 'src/utils/const';

const Document: NextPage = () => {
  return (
    <Html
      lang="en"
      translate="no"
      x-ms-format-detection="none"
      className="vkui"
      scheme={EMPTY}
      style={{
        'colorScheme': 'auto',

        // @ts-expect-error mistype
        '--vh': '1vh'
      }}
    >
      <Head />
      <body
        className={EMPTY}
        scheme={EMPTY}
      >
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
