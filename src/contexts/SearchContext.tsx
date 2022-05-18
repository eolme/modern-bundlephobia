import type { FC } from 'src/types/react';
import type { NPMSearchOption } from 'src/types/npm';

import { createContext, useState } from 'react';
import { default as useSWR } from 'swr';
import { useRouter } from 'next/router';
import { useCreation } from 'ahks';

import { npm } from 'src/api/npm';
import { label } from 'src/utils/label';
import { fromPath } from 'src/utils/module';

type SearchValue = Readonly<{
  initial: string;
  search: string;
  setSearch: (search: string) => void;
  loading: boolean;
  results: NPMSearchOption[];
}>;

const EMPTY = '';
const NOOP = () => { /* Noop */ };

export const SearchContent = createContext<SearchValue>({
  initial: EMPTY,
  search: EMPTY,
  setSearch: NOOP,
  loading: true,
  results: []
});

export const SearchProvider: FC = ({ children }) => {
  const router = useRouter();
  const initial = useCreation(() => router.isFallback ? fromPath(router.asPath) : EMPTY);
  const [search, setSearch] = useState(initial);
  const { isValidating, data } = useSWR(search, npm);

  const results = Array.isArray(data) ? data.map(label) : [];

  return (
    <SearchContent.Provider value={{
      initial,
      search,
      setSearch,
      loading: isValidating,
      results
    }}>
      {children}
    </SearchContent.Provider>
  )
};
