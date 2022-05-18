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
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
