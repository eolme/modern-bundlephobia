import type { ReactNode } from 'react';
import type { FC } from 'src/types/react';
import type { SnackbarProps } from '@mntm/vkui';

import {
  Snackbar
} from '@mntm/vkui';

import { createContext, useState } from 'react';
import { useHandler } from 'ahks';

import { noop } from '@vkontakte/vkjs';

type SnackbarContextProps = Omit<SnackbarProps, 'onClose'>;
type SnackbarContextValue = (props: SnackbarContextProps) => void;

export const SnackbarContext = createContext<SnackbarContextValue>(noop);

export const SnackbarProvider: FC = ({ children }) => {
  const [snackbar, setSnackbar] = useState<ReactNode>(null);

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
      {snackbar}
    </SnackbarContext.Provider>
  );
};

