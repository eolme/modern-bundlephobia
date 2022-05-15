import type { FC } from 'src/types/react';
import type { NPMSearchOption } from 'src/types/npm';

import { createContext, useState } from 'react';
import { default as useSWR } from 'swr';

import { npm } from 'src/api/npm';
import { label } from 'src/utils/label';

type SearchValue = Readonly<{
  search: string;
  setSearch: (search: string) => void;
  loading: boolean;
  results: NPMSearchOption[];
}>;

const EMPTY = '';
const NOOP = () => { /* Noop */ };

export const SearchContent = createContext<SearchValue>({
  search: EMPTY,
  setSearch: NOOP,
  loading: true,
  results: []
});

export const SearchProvider: FC = ({ children }) => {
  const [search, setSearch] = useState(EMPTY);
  const { isValidating, data } = useSWR(search, npm);

  const results = Array.isArray(data) ? data.map(label) : [];

  return (
    <SearchContent.Provider value={{
      search,
      setSearch,
      loading: isValidating,
      results
    }}>
      {children}
    </SearchContent.Provider>
  )
};
