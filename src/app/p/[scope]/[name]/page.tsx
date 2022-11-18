import type { AsyncFC } from '#/types/react';

import { merge } from '#/utils/path';

import { PackageView } from '#/views';

type NamePageProps = {
  params: {
    scope: string;
    name: string;
  };
};

const NamePage: AsyncFC<NamePageProps> = async ({ params: { scope, name }}) => {
  return (
    PackageView(merge(scope, name))
  );
};

export { NamePage as default };
