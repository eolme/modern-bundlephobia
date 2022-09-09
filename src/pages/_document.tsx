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
      <Head />
      <body className={EMPTY}>
        <script
          nonce="theme"
          dangerouslySetInnerHTML={{ __html: `if("function"==typeof matchMedia){let e=document.body,c=matchMedia("(prefers-color-scheme: dark)"),a=()=>{e.className=c.matches?"vkui--vkBase--dark":"vkui--vkBase--light",document.documentElement.style.colorScheme=c.matches?"dark":"light"};c.onchange=a,a()}` }}
        />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
