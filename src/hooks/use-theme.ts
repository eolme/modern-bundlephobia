import type { Appearance, AppearanceScheme } from '@mntm/vkui/dist/helpers/scheme';

import { VOID } from 'src/utils/const';
import { globalContext } from 'src/utils/global';

export const useScheme = (): AppearanceScheme | undefined => {
  if (globalContext.scheme === 'dark') {
    return 'space_gray';
  }

  if (globalContext.scheme === 'light') {
    return 'bright_light';
  }

  return VOID;
};

export const useAppearance = (): Appearance | undefined => {
  return globalContext.scheme || VOID;
};
