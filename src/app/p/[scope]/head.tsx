import type { FC } from 'react';

import { title } from '#/utils/title';
import { og } from '#/utils/path';

type ScopeHeadProps = {
  params: {
    scope: string;
  };
};

const ScopeHead: FC<ScopeHeadProps> = ({ params: { scope }}) => {
  const named = title(scope);
  const image = og(scope);

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

export { ScopeHead as default };
