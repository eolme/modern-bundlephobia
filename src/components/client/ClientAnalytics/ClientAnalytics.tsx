'use client';

import type { FC, ReactNode } from 'react';
import type { Provider } from '@mntm/stats';

import { useCreation, useRenderEffect } from 'ahks';

import { createContext } from 'react';
import {
  createProviderGA,
  createProviderYM,
  launchParams
} from '@mntm/stats';

import { user } from './_internal/user';

const NoopProvider: Provider = {
  send: async () => true
};

const GoogleContext = createContext<Provider>(NoopProvider);
const YandexContext = createContext<Provider>(NoopProvider);

type ClientAnalyticsProps = {
  children: ReactNode;
};

export const ClientAnalytics: FC<ClientAnalyticsProps> = ({ children }) => {
  useRenderEffect(() => {
    launchParams.vk_user_id = user();
  });

  const google = useCreation(() => createProviderGA('G-H9YV7M87YG'));
  const yandex = useCreation(() => createProviderYM(91289383, { trackLinks: true }));

  return (
    <GoogleContext.Provider value={google}>
      <YandexContext.Provider value={yandex}>
        {children}
      </YandexContext.Provider>
    </GoogleContext.Provider>
  );
};
