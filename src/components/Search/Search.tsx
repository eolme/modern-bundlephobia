import type { FC, ChangeEvent } from 'react';

import {
  CustomSelect,
  CustomSelectOption
} from '@mntm/vkui';

import {
  Icon28SearchStarsOutline
} from '@vkontakte/icons';

import {
  SearchContent
} from 'src/contexts';

import { useContext } from 'react';
import { useRouter } from 'next/router';
import { useHandler, useStableHandler } from 'ahks';

import styles from './Search.module.css';

const EMPTY = '';

type SearchProps = {
  value?: string;
};

export const Search: FC<SearchProps> = ({ value = EMPTY }) => {
  const router = useRouter();
  const context = useContext(SearchContent);

  const handleInput = useHandler((event: ChangeEvent<Element>) => {
    const input = event.target as HTMLInputElement;

    context.setSearch(input.value);
  });

  const handleChange = useStableHandler((event: ChangeEvent<HTMLSelectElement>) => {
    const select = event.target;

    const selected = context.results.find((option) => option.value === select.value);

    if (selected) {
      router.replace('/[...name]', `/${selected.npm.package.name}@${selected.npm.package.version}`, {
        shallow: true
      });
    }
  });

  return (
    <CustomSelect
      className={styles.search}
      placeholder="find package"
      emptyText="nothing found"
      searchable={true}
      fetching={context.loading}
      options={context.results}
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
      icon={(
        <Icon28SearchStarsOutline
          fill="currenColor"
          width={24}
          height={24}
        />
      )}
    />
  );
};
