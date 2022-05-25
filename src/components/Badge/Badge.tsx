import type { FC } from 'react';
import type { SizeType } from 'src/utils/const';

import { memo } from 'react';
import { createBadge } from 'src/generate/badge';

type BadgeProps = {
  type: SizeType;
  name: string;
  size: number;
};

const BadgeComponent: FC<BadgeProps> = ({ type, name, size }) => {
  return (
    <a
      href={`/api/badge/${type}/${name}`}
      target="_blank"
      rel="noreferrer"
      dangerouslySetInnerHTML={{ __html: createBadge(type, size) }}
    />
  );
};

export const Badge = memo(BadgeComponent, (prev, next) => prev.name === next.name && prev.size === next.size);
