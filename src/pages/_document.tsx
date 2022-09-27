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
      style={{
        // @ts-expect-error mistype
        '--vh': '1vh'
      }}
    >
      <Head>
        <link
          key="ico"
          rel="icon"
          href="/favicon.ico"
          sizes="any"
        />
        <link
          key="svg"
          rel="icon"
          href="/favicon.svg"
          type="image/svg+xml"
        />
        <link
          rel="manifest"
          href="/manifest.json"
          type="application/manifest+json"
        />
      </Head>
      <body className={EMPTY} draggable={false}>
        <script
          nonce="theme"
          dangerouslySetInnerHTML={{ __html: `if("function"==typeof matchMedia){let e=document.body,c=matchMedia("(prefers-color-scheme: dark)"),a=()=>{e.className=c.matches?"vkui--vkBase--dark":"vkui--vkBase--light",document.documentElement.style.colorScheme=window.scheme=c.matches?"dark":"light"};c.onchange=a,a()}` }}
        />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
