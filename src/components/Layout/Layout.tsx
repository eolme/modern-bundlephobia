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
  AppRoot,
  SplitLayout,
  SplitCol,
  Panel
} from '@mntm/vkui';

import { useTheme } from 'next-themes';

const WIDTH = '100%';

type LayoutProps = {
  touch: boolean;
};

export const Layout: FC<LayoutProps> = ({ children, touch }) => {
  const { resolvedTheme } = useTheme();

  const appearance = (resolvedTheme || 'light') as Appearance;

  return (
    <ConfigProvider
      appearance={appearance}
      isWebView={true}
      platform={Platform.VKCOM}
      hasNewTokens={true}
      transitionMotionEnabled={false}
      webviewType={WebviewType.INTERNAL}
    >
      <AdaptivityProvider
        sizeX={SizeType.COMPACT}
        sizeY={SizeType.REGULAR}
        viewHeight={ViewHeight.MEDIUM}
        viewWidth={ViewWidth.DESKTOP}
        hasMouse={!touch}
        deviceHasHover={!touch}
      >
        <AppRoot
          mode="full"
          noLegacyClasses={true}
          scroll="global"
        >
          <SplitLayout
            modal={null}
            popout={null}
            header={null}
          >
            <SplitCol
              animate={false}
              width={WIDTH}
              minWidth={WIDTH}
              maxWidth={WIDTH}
              spaced={false}
              fixed={false}
            >
              <Panel
                id="layout"
                centered={false}
              >
                {children}
              </Panel>
            </SplitCol>
          </SplitLayout>
        </AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
  );
};
