import type { AsyncFC } from '#/types/react';

import { merge } from '#/utils/path';

import { PackageView } from '#/views';

type ScopePageProps = {
  params: {
    scope: string;
  };
};

const ScopePage: AsyncFC<ScopePageProps> = async ({ params: { scope }}) => {
  return (
    PackageView(merge(scope))
  );
};

export { ScopePage as default };
