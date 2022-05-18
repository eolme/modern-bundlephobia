import type { FC } from 'src/types/react';
import type { Appearance } from '@mntm/vkui';

import {
  ConfigProvider,
  AdaptivityProvider,
  Platform,
  WebviewType,
  SizeType,
  ViewHeight,
  ViewWidth,
  AppRoot
} from '@mntm/vkui';

import { useState } from 'react';
import { useTheme } from 'next-themes';
import { useLayoutMount } from 'ahks';

import { hasHover, hasMouse } from '@vkontakte/vkjs';

import styles from './Layout.module.css';

export const Layout: FC = ({ children }) => {
  const { resolvedTheme } = useTheme();

  const appearance = (resolvedTheme || 'light') as Appearance;

  const [mouse, setMouse] = useState(false);

  useLayoutMount(() => {
    setMouse(hasHover && hasMouse);
  });

  return (
    <ConfigProvider
      isWebView={false}
      hasNewTokens={true}
      appearance={appearance}
      platform={Platform.VKCOM}
      transitionMotionEnabled={false}
      webviewType={WebviewType.INTERNAL}
    >
      <AdaptivityProvider
        sizeX={SizeType.COMPACT}
        sizeY={SizeType.REGULAR}
        viewHeight={ViewHeight.MEDIUM}
        viewWidth={ViewWidth.DESKTOP}
        hasMouse={mouse}
        deviceHasHover={mouse}
      >
        <AppRoot
          mode="full"
          noLegacyClasses={true}
          scroll="global"
        >
          <div className={styles.container}>
            {children}
          </div>
        </AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
  );
};
