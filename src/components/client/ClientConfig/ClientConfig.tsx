'use client';

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

import { useInsertionEffect, useMemo, useState } from 'react';
import { useRenderEffect } from 'ahks';
import { constDeps } from 'ahks/utils';

import { once } from '#/utils/fn';
import { safeDocument, safeWindow } from '#/utils/dom';

const AppearanceLight = 'light';
const AppearanceDark = 'dark';

const mediaAppereance = once(() => safeWindow.matchMedia('(prefers-color-scheme: dark)'));
const mediaAppereanceCurrent = () => mediaAppereance().matches ? AppearanceDark : AppearanceLight;
const mediaAppereanceApply = () => safeDocument.body.classList[mediaAppereanceCurrent() === AppearanceDark ? 'add' : 'remove']('vkui--vkBase--dark');

const mediaMouse = once(() => safeWindow.matchMedia('(pointer: fine)'));
const mediaMouseCurrent = () => mediaMouse().matches;

type ClientConfigProps = {
  root: string;
  portal: string;
  children: ReactNode;
};

export const ClientConfig: FC<ClientConfigProps> = ({ root, portal, children }) => {
  const [appearance, setApperance] = useState(mediaAppereanceCurrent);

  useInsertionEffect(mediaAppereanceApply, [appearance]);

  useRenderEffect(() => {
    mediaAppereance().onchange = () => setApperance(mediaAppereanceCurrent);
  });

  const [mouse, setMouse] = useState(mediaMouseCurrent);

  useRenderEffect(() => {
    mediaMouse().onchange = () => setMouse(mediaMouseCurrent);
  });

  useRenderEffect(() => {
    safeDocument.ondragstart = (event) => {
      event.preventDefault();

      return false;
    };
  });

  const ConfigProviderValue = useMemo<ConfigProviderContextInterface>(() => ({
    locale: 'en',
    appearance,
    platform: 'android',
    isWebView: false,
    webviewType: 'internal' as WebviewType,
    transitionMotionEnabled: false
  }), [appearance]);

  const AdaptivityProviderValue = useMemo<AdaptivityProps>(() => ({
    deviceHasHover: mouse,
    hasMouse: mouse,
    sizeX: 'compact' as SizeType,
    sizeY: 'regular' as SizeType,
    viewWidth: 5 as ViewWidth,
    viewHeight: 3 as ViewHeight
  }), [mouse]);

  const AppRootValue = useMemo<AppRootContextInterface>(() => ({
    appRoot: {
      get current() {
        return safeDocument.getElementById(root) as HTMLDivElement;
      }
    },
    get portalRoot() {
      return safeDocument.getElementById(portal);
    },
    disablePortal: false,
    keyboardInput: false,
    mode: 'full',
    embedded: false
  }), constDeps);

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
