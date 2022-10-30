import type { Appearance } from '@mntm/vkui';

import { VOID } from 'src/utils/const';
import { globalContext } from 'src/utils/global';

export const useAppearance = (): Appearance | undefined => {
  return globalContext.scheme || VOID;
};
