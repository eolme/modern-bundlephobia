import { useCreation, useRenderEffect } from 'ahks';
import { useState } from 'react';
import { DOM } from 'src/utils/const';

const STUB: Pick<MediaQueryList, 'matches' | 'onchange'> = {
  matches: false,
  onchange: null
};

export const useMedia = (media: string) => {
  const query = useCreation(() => DOM ? matchMedia(media) : STUB);
  const [match, setMatch] = useState(query.matches);

  useRenderEffect(() => {
    query.onchange = (event) => {
      setMatch(event.matches);
    };
  });

  return match;
};
