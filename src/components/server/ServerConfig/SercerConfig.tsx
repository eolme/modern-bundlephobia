import type { FC, ReactNode } from 'react';
import type { ConfigProviderContextInterface, WebviewType } from '@mntm/vkui/dist/components/ConfigProvider/ConfigProviderContext';
import type { AdaptivityProps } from '@mntm/vkui/dist/components/AdaptivityProvider/AdaptivityContext';
import type { SizeType, ViewHeight, ViewWidth } from '@mntm/vkui/dist/lib/adaptivity';
import type { AppRootContextInterface } from '@mntm/vkui/dist/components/AppRoot/AppRootContext';

import {
  ConfigProviderContext
} from '@mntm/vkui/dist/components/ConfigProvider/ConfigProviderContext';

import {
  AdaptivityContext
} from '@mntm/vkui/dist/components/AdaptivityProvider/AdaptivityContext';

import {
  AppRootContext
} from '@mntm/vkui/dist/components/AppRoot/AppRootContext';

const ConfigProviderValue: ConfigProviderContextInterface = {
  appearance: 'light',
  hasNewTokens: true,
  platform: 'android',
  isWebView: false,
  webviewType: 'internal' as WebviewType,
  transitionMotionEnabled: false
};

const AdaptivityProviderValue: AdaptivityProps = {
  deviceHasHover: true,
  hasMouse: true,
  sizeX: 'compact' as SizeType,
  sizeY: 'regular' as SizeType,
  viewWidth: 5 as ViewWidth,
  viewHeight: 3 as ViewHeight
};

const AppRootValue: AppRootContextInterface = {
  appRoot: {
    current: null
  },
  portalRoot: null,
  disablePortal: false,
  keyboardInput: false,
  mode: 'full',
  embedded: false
};

type ServerConfigProps = {
  children: ReactNode;
};

export const ServerConfig: FC<ServerConfigProps> = ({ children }) => {
  return (
    <ConfigProviderContext.Provider value={ConfigProviderValue}>
      <AdaptivityContext.Provider value={AdaptivityProviderValue}>
        <AppRootContext.Provider value={AppRootValue}>
          {children}
        </AppRootContext.Provider>
      </AdaptivityContext.Provider>
    </ConfigProviderContext.Provider>
  );
};
