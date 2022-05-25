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
      className="vkui"
      scheme={EMPTY}
      style={{ colorScheme: 'normal' }}
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
