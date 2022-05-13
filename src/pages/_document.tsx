import type { NextPage } from 'next';

import {
  Html,
  Head,
  Main,
  NextScript
} from 'next/document';

const Document: NextPage = () => {
  return (
    <Html className="vkui">
      <Head />
      <body className="vkui__root">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
