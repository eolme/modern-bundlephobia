import type { FC } from 'react';

import { images } from '#/utils/images';
import { title } from '#/utils/title';

type ScopeHeadProps = {
  params: {
    scope: string;
  };
};

const ScopeHead: FC<ScopeHeadProps> = ({ params: { scope }}) => {
  const named = title(scope);

  return (
    <>
      <title>{named}</title>
      <meta
        property="og:title"
        content={named}
      />
      {images(scope)}
    </>
  );
};

export { ScopeHead as default };
