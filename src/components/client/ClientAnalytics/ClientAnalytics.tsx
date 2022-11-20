'use client';

import type { FC, ReactNode } from 'react';
import type { Provider } from '@mntm/stats';

import { useCreation } from 'ahks';

import { createContext } from 'react';
import { createProviderGA, createProviderYM } from '@mntm/stats';

const NoopProvider: Provider = {
  send: async () => true
};

const GoogleContext = createContext<Provider>(NoopProvider);
const YandexContext = createContext<Provider>(NoopProvider);

type ClientAnalyticsProps = {
  children: ReactNode;
};

export const ClientAnalytics: FC<ClientAnalyticsProps> = ({ children }) => {
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
