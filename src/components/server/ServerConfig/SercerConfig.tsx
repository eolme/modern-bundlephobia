import type { FC, ReactNode } from 'react';
import type { ConfigProviderContextInterface, WebviewType } from '@vkontakte/vkui/dist/components/ConfigProvider/ConfigProviderContext';
import type { AdaptivityProps } from '@vkontakte/vkui/dist/components/AdaptivityProvider/AdaptivityContext';
import type { SizeType, ViewHeight, ViewWidth } from '@vkontakte/vkui/dist/lib/adaptivity';
import type { AppRootContextInterface } from '@vkontakte/vkui/dist/components/AppRoot/AppRootContext';

import {
  ConfigProviderContext
} from '@vkontakte/vkui/dist/components/ConfigProvider/ConfigProviderContext';

import {
  AdaptivityContext
} from '@vkontakte/vkui/dist/components/AdaptivityProvider/AdaptivityContext';

import {
  AppRootContext
} from '@vkontakte/vkui/dist/components/AppRoot/AppRootContext';

const ConfigProviderValue: ConfigProviderContextInterface = {
  locale: 'en',
  appearance: 'light',
  platform: 'android',
  isWebView: false,
  webviewType: 'internal' as WebviewType,
  transitionMotionEnabled: false
};

const AdaptivityProviderValue: AdaptivityProps = {
  hasPointer: true,
  hasHover: true,
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
