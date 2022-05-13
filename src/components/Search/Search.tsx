import type { FC, ChangeEvent } from 'react';

import {
  CustomSelect,
  CustomSelectOption,
  Text,
  Subhead
} from '@vkontakte/vkui';

import { useState } from 'react';
import { default as useSWR } from 'swr';
import { useRouter } from 'next/router';

import { npm } from 'src/api/npm';
import { label } from 'src/utils/label';

import styles from './Search.module.css';

const EMPTY = '';

type SearchProps = {
  value?: string;
};

export const Search: FC<SearchProps> = ({ value = EMPTY }) => {
  const router = useRouter();
  const [search, setSearch] = useState(value);
  const { isValidating, data } = useSWR(search, npm);

  const options = data ? data.map(label) : [];

  const handleInput = (event: ChangeEvent<Element>) => {
    const input = event.target as HTMLInputElement;

    setSearch(input.value);
  };

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const select = event.target;

    const selected = options.find((option) => option.value === select.value);

    if (selected) {
      router.replace('/[...name]', `/${selected.npm.package.name}@${selected.npm.package.version}`, {
        shallow: true
      });
    }
  };

  return (
    <CustomSelect
      className={styles.search}
      placeholder="find package"
      emptyText="nothing found"
      searchable={true}
      fetching={isValidating}
      options={options}
      onInputChange={handleInput}
      onChange={handleChange}
      defaultValue={value}
      renderOption={(props) => (
        <CustomSelectOption
          {...props}
          key={props.option!.value}
          description={props.option!.npm.package.description}
        >
          <div className={styles.option}>
            <span className={styles.name}>{props.option!.npm.package.name}</span>
            <span className={styles.version}>{props.option!.npm.package.version}</span>
          </div>
        </CustomSelectOption>
      )}
    />
  );
};
