import type { ReactNode } from 'react';
import type { FC } from 'src/types/react';
import type { SnackbarProps } from '@mntm/vkui';

import {
  AdaptivityProvider,
  Snackbar,
  ViewWidth
} from '@mntm/vkui';

import { createContext, useState } from 'react';
import { useHandler } from 'ahks';

import { noop } from '@vkontakte/vkjs';
import { useMedia } from 'src/hooks';

type SnackbarContextProps = Omit<SnackbarProps, 'onClose'>;
type SnackbarContextValue = (props: SnackbarContextProps) => void;

export const SnackbarContext = createContext<SnackbarContextValue>(noop);

export const SnackbarProvider: FC = ({ children }) => {
  const [snackbar, setSnackbar] = useState<ReactNode>(null);
  const media = useMedia('(max-width: 767px)');

  const handleClose = useHandler(() => {
    setSnackbar(null);
  });

  const showSnackbar = useHandler((props: SnackbarContextProps) => {
    setSnackbar(
      <Snackbar
        {...props}
        onClose={handleClose}
      />
    );
  });

  return (
    <SnackbarContext.Provider value={showSnackbar}>
      {children}
      <AdaptivityProvider viewWidth={media ? ViewWidth.MOBILE : ViewWidth.DESKTOP}>
        {snackbar}
      </AdaptivityProvider>
    </SnackbarContext.Provider>
  );
};

