import type { FC } from 'react';

import { title } from '#/utils/title';

const RootHead: FC = () => {
  return (
    <title>{title()}</title>
  );
};

export { RootHead as default };
