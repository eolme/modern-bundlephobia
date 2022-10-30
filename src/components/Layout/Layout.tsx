import type { FC } from 'src/types/react';

import {
  AdaptivityProvider,
  AppRoot,
  ConfigProvider,
  Platform,
  SizeType,
  Subhead,
  Title,
  ViewHeight,
  ViewWidth, WebviewType
} from '@mntm/vkui';

import {
  Search
} from 'src/components';

import { useState } from 'react';
import { useLayoutMount } from 'ahks';
import { useAppearance } from 'src/hooks';

import { hasHover, hasMouse } from '@vkontakte/vkjs';

import styles from './Layout.module.css';

export const Layout: FC = ({ children }) => {
  const [mouse, setMouse] = useState(false);

  const appearance = useAppearance();

  useLayoutMount(() => {
    setMouse(hasHover && hasMouse);

    document.documentElement.style.setProperty('--vh', `${0.01 * window.innerHeight}px`);
  });

  return (
    <ConfigProvider
      isWebView={false}
      hasNewTokens={true}
      appearance={appearance}
      platform={Platform.ANDROID}
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
          scroll="global"
        >
          <main className={styles.container}>
            <Title
              Component="h1"
              level="1"
              className={styles.title}
            >
              Modern Bundlephobia
            </Title>
            <Subhead
              Component="h2"
              weight="3"
              className={styles.subhead}
            >
              find the cost of adding a npm package to your bundle
            </Subhead>
            <Search />
            {children}
          </main>
        </AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
  );
};
