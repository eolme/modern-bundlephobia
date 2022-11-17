import type { FC } from 'react';

import { title } from '#/utils/title';
import { og } from '#/utils/path';

type NameHeadProps = {
  params: {
    scope: string;
    name: string;
  };
};

const NameHead: FC<NameHeadProps> = ({ params: { scope, name }}) => {
  const named = title(scope, name);
  const image = og(scope, name);

  return (
    <>
      <title>{named}</title>
      <meta
        property="og:title"
        content={named}
      />
      <meta
        property="og:image"
        content={image}
      />
      <meta
        name="image"
        content={image}
      />
      <link
        rel="image_src"
        type="image/jpeg"
        href={image}
      />
      <meta
        property="og:image:type"
        content="image/jpeg"
      />
      <meta
        property="og:image:width"
        content="1074"
      />
      <meta
        property="og:image:height"
        content="480"
      />
    </>
  );
};

export { NameHead as default };
