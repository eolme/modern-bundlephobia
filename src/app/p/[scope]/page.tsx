import type { FC } from 'react';

import { PackageView } from '#/views';

type ScopePageProps = {
  params: {
    scope: string;
  };
};

const ScopePage: FC<ScopePageProps> = ({ params: { scope }}) => {
  return (
    <PackageView name={scope} />
  );
};

export { ScopePage as default };
