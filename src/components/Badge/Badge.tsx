import type { FC } from 'react';
import type { SizeType } from 'src/utils/const';

import { memo } from 'react';
import { createBadge } from 'src/utils/badge';

type BadgeProps = {
  type: SizeType;
  size: number;
};

const BadgeComponent: FC<BadgeProps> = ({ type, size }) => {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: createBadge(type, size) }}
    />
  );
};

export const Badge = memo(BadgeComponent, (prev, next) => prev.size === next.size);
