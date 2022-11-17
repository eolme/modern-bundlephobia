import type { FC } from 'react';

import { PackageView } from '#/views';
import { merge } from '#/utils/path';

type NamePageProps = {
  params: {
    scope: string;
    name: string;
  };
};

const NamePage: FC<NamePageProps> = ({ params: { scope, name }}) => {
  return (
    <PackageView name={merge(scope, name)} />
  );
};

export { NamePage as default };
