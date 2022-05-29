import type { ChangeEvent, MouseEvent } from 'react';
import type { AnyFunction } from '@vkontakte/vkjs';
import type { FC } from 'src/types/react';
import type { NPMSSearch } from 'src/types/npms';

import { createContext, useRef, useState } from 'react';
import { useCreation, useHandler, useStableHandler } from 'ahks';
import { useRouter } from 'next/router';
import { default as useSWR } from 'swr';

import { noop } from '@vkontakte/vkjs';
import { DOM, EMPTY, NOTHING, VOID } from 'src/utils/const';
import { pathToName } from 'src/module/bundle';

type SearchContextValue = {
  search: string;
  selected: NPMSSearch | undefined;
  results: NPMSSearch[];

  handleChange: AnyFunction;
  handleSelect: AnyFunction;

  content: boolean;
  loading: boolean;
  fallback: boolean;
};

export const SearchContext = createContext<SearchContextValue>({
  search: EMPTY,
  selected: VOID,
  results: NOTHING,

  handleChange: noop,
  handleSelect: noop,

  content: false,
  loading: false,
  fallback: false
});

export const SearchProvider: FC = ({ children }) => {
  const router = useRouter();

  const defaultValue = useCreation(() => pathToName(router.asPath));
  const [search, setSearch] = useState(defaultValue);
  const [selected, setSelected] = useState<NPMSSearch | undefined>(VOID);
  const { isValidating, data } = useSWR<NPMSSearch[]>(() => DOM ? search : null);

  const loading = isValidating || router.isFallback;
  const content = typeof data !== 'undefined';
  const fallback = content && data.length === 0;
  const results: NPMSSearch[] = content ? data : NOTHING;

  const defaultFound = useRef(false);

  if (!defaultFound.current && defaultValue !== EMPTY) {
    const defaultResult = results.find((result) => result.package.name === defaultValue);

    if (defaultResult) {
      defaultFound.current = true;
      setSelected(defaultResult);
    }
  }

  const handleChange = useHandler((event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.currentTarget.value);
  });

  const handleSelect = useStableHandler((event: MouseEvent<HTMLElement>) => {
    const value = +event.currentTarget.dataset.value!;

    if (value in results) {
      const npm = results[value];

      setSearch(npm.package.name);
      setSelected(npm);

      router.replace('/p/[...name]', `/p/${npm.package.name}@${npm.package.version}`);
    }
  });

  /* eslint-disable react/jsx-no-constructed-context-values */
  return (
    <SearchContext.Provider
      value={{
        search,
        selected,
        results,

        handleChange,
        handleSelect,

        content,
        loading,
        fallback
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
