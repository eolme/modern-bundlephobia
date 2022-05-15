import type { FC } from 'react';

import { memo } from 'react';
import { createBadge } from 'src/utils/badge';

type BadgeProps = {
  name: string;
  size: number;
};

const BadgeComponent: FC<BadgeProps> = ({ name, size }) => {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: createBadge(name, size) }}
    />
  );
};

export const Badge = memo(BadgeComponent, (prev, next) => prev.size === next.size);
