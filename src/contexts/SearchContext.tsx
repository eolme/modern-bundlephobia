import type { FC } from 'src/types/react';
import type { NPMSearch } from 'src/types/npm';

import { createContext, useState } from 'react';
import { default as useSWR } from 'swr';
import { useRouter } from 'next/router';

import { npm } from 'src/api/npm';
import { fromPath } from 'src/utils/module';

type SearchValue = Readonly<{
  search: string;
  setSearch: (search: string) => void;
  loading: boolean;
  results: NPMSearch[];
}>;

const EMPTY = '';
const NOOP = () => { /* Noop */ };

export const SearchContext = createContext<SearchValue>({
  search: EMPTY,
  setSearch: NOOP,
  loading: true,
  results: []
});

export const SearchProvider: FC = ({ children }) => {
  const router = useRouter();
  const [search, setSearch] = useState(() => router.isFallback ? fromPath(router.asPath) : EMPTY);
  const { isLoading, data } = useSWR(search, npm);

  const results = Array.isArray(data) ? data : [];

  return (
    <SearchContext.Provider value={{
      search,
      setSearch,
      loading: isLoading,
      results
    }}>
      {children}
    </SearchContext.Provider>
  )
};
