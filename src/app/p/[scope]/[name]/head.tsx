import type { FC } from 'react';

import { images } from '#/utils/images';
import { title } from '#/utils/title';

type NameHeadProps = {
  params: {
    scope: string;
    name: string;
  };
};

const NameHead: FC<NameHeadProps> = ({ params: { scope, name }}) => {
  const named = title(scope, name);

  return (
    <>
      <title>{named}</title>
      <meta
        property="og:title"
        content={named}
      />
      {images(scope, name)}
    </>
  );
};

export { NameHead as default };
