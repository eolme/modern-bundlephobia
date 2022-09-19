import {
  SnackbarContext
} from 'src/contexts/snackbar';

import { useContext } from 'react';
import { useHandler } from 'ahks';

import { default as copy } from 'copy-to-clipboard';

export const useCopy = () => {
  const showSnackbar = useContext(SnackbarContext);

  return useHandler((text: string, url: string) => {
    copy(text);

    showSnackbar({
      children: 'Copied to clipboard',
      action: typeof navigator.share === 'function' ? 'Share' : null,
      onActionClick() {
        navigator.share({
          url
        });
      }
    });
  });
};
