import type { AsyncFC } from '#/types/react';

import { PackageView } from '#/views';

type ScopePageProps = {
  params: {
    scope: string;
  };
};

const ScopePage: AsyncFC<ScopePageProps> = async ({ params: { scope }}) => {
  return (
    PackageView(scope)
  );
};

export { ScopePage as default };
