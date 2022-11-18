import type { AsyncFC } from '#/types/react';

import { PackageView } from '#/views';
import { merge } from '#/utils/path';

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
