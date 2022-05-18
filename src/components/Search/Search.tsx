import type { FC, ChangeEvent, MouseEvent } from 'react';
import type { NPMSearch } from 'src/types/npm';

import {
  Input,
  Popper,
  Spinner,
  SimpleCell
} from '@mntm/vkui';

import {
  Icon16Done,
  Icon28SearchStarsOutline
} from '@vkontakte/icons';

import {
  SearchContent
} from 'src/contexts';

import { useContext, useRef, useState, memo } from 'react';
import { useRouter } from 'next/router';
import { useHandler, useStableHandler, useCreation, useRefToCallback } from 'ahks';

import styles from './Search.module.css';

const SearchComponentIcon = (
  <Icon28SearchStarsOutline
    fill="currentColor"
    width={24}
    height={24}
  />
);

const SearchComponentSpinner = (
  <Spinner size="small" />
);

const SearchComponentChecked = (
  <Icon16Done
    fill="currentColor"
    width={16}
    height={16}
  />
)

const EMPTY = '';

const SearchComponent: FC = () => {
  const router = useRouter();
  const context = useContext(SearchContent);

  const targetRef = useRef<HTMLElement>(null);
  const targetRefCallback = useRefToCallback(targetRef);

  const handleChange = useHandler((event: ChangeEvent<HTMLInputElement>) => {
    context.setSearch(event.currentTarget.value);
  });

  const [focused, setFocused] = useState(false);
  const handleFocus = useHandler(() => setFocused(true));
  const handleBlur = useHandler(() => setFocused(false));

  const [selected, setSelected] = useState(EMPTY);
  const handleSelect = useHandler((event: MouseEvent<HTMLElement>) => {
    setSelected(event.currentTarget.getAttribute('data-value')!);
  });

  const nothing = context.results.length === 0;
  const renderResults = context.results.map((option) => (
    <SimpleCell
      key={option.value}
      Component="span"
      className={styles.option}
      tabIndex={0}
      role="option"
      data-value={option.value}
      aria-selected={option.value === selected}
      onClick={handleSelect}
      description={option.npm.package.description}
      after={(
        option.value === selected ? SearchComponentChecked : null
      )}
    >
      <span className={styles.name}>{option.npm.package.name}</span>
      <span className={styles.version}>{option.npm.package.version}</span>
    </SimpleCell>
  ));

  return (
    <>
      <Input
        getRootRef={targetRefCallback}
        placeholder="find package"
        lang="en"
        spellCheck="false"
        autoCorrect="off"
        autoComplete="off"
        autoCapitalize="off"
        autoFocus={true}
        value={context.search}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        after={(
          context.loading ? SearchComponentSpinner : SearchComponentIcon
        )}
        id="search"
        name="search"
        type="search"
        inputMode="search"
        aria-haspopup={focused ? 'listbox' : 'false'}
        aria-controls="listbox"
      />
      {
        focused || true ? (
          <Popper
            targetRef={targetRef}
            id="listbox"
            role="listbox"
          >
            {nothing ? 'nothing found' : renderResults}
          </Popper>
        ) : null
      }
    </>
  );
};

export const Search = memo(SearchComponent, () => true);
