import type { FC, ChangeEvent, MouseEvent, ReactNode } from 'react';

import {
  Input,
  Popper,
  PanelSpinner,
  SimpleCell,
  Headline
} from '@mntm/vkui';

import {
  Icon16Done,
  Icon28SearchStarsOutline
} from '@vkontakte/icons';

import {
  SearchContext
} from 'src/contexts';

import { useContext, useRef, memo } from 'react';
import { useRouter } from 'next/router';
import { useHandler, useStableHandler, useRefToCallback } from 'ahks';

import { default as clsx } from 'clsx';

import styles from './Search.module.css';

const SearchComponentIcon = (
  <Icon28SearchStarsOutline
    role="presentation"
    fill="currentColor"
    width={24}
    height={24}
  />
);

const SearchComponentSpinner = (
  <PanelSpinner
    aria-busy="true"
    aria-live="polite"
    role="presentation"
    size="small"
  />
);

const SearchComponentChecked = (
  <Icon16Done
    role="presentation"
    fill="currentColor"
    width={16}
    height={16}
  />
);

const SearchComponentEmpty = (
  <SimpleCell
    key="nothing"
    Component="span"
    className={styles.option}
    tabIndex={-1}
    role="contentinfo"
    disabled={true}
  >
    <Headline weight="regular">nothing found</Headline>
  </SimpleCell>
);

const EMPTY = '';

const SearchComponent: FC = () => {
  const router = useRouter();
  const context = useContext(SearchContext);

  const targetRef = useRef<HTMLElement>(null);
  const targetRefCallback = useRefToCallback(targetRef);

  const handleChange = useHandler((event: ChangeEvent<HTMLInputElement>) => {
    context.setSearch(event.currentTarget.value);
  });

  const handleSelect = useStableHandler((event: MouseEvent<HTMLElement>) => {
    const selected = +event.currentTarget.dataset.value!;

    if (selected in context.results) {
      const npm = context.results[selected];
      context.setSearch(npm.package.name);
      router.replace('/[...name]', `${npm.package.name}@${npm.package.version}`);
    }
  });

  const nothing = context.results.length === 0;
  const fallback = context.search !== EMPTY && !context.loading && context.results.length === 0;
  const open = !nothing || fallback;

  let render: ReactNode;

  if (!open) {
    render = null;
  } else if (fallback) {
    render = SearchComponentEmpty;
  } else {
    render = context.results.map((option, value) => (
      <SimpleCell
        key={option.package.name}
        Component="span"
        className={styles.option}
        tabIndex={0}
        role="option"
        data-value={value}
        aria-selected={option.package.name === EMPTY}
        onClick={handleSelect}
        description={option.package.description}
        after={(
          option.package.name === EMPTY ? SearchComponentChecked : null
        )}
      >
        <span className={styles.name}>{option.package.name}</span>
        <span className={styles.version}>{option.package.version}</span>
      </SimpleCell>
    ));
  }

  return (
    <label
      ref={targetRefCallback}
      className={styles.label}
    >
      <Input
        className={clsx(styles.input, open && styles.open)}
        placeholder="find package"
        lang="en"
        spellCheck="false"
        autoCorrect="off"
        autoComplete="off"
        autoCapitalize="off"
        value={context.search}
        onChange={handleChange}
        after={(
          context.loading ? SearchComponentSpinner : SearchComponentIcon
        )}
        id="search"
        name="search"
        type="search"
        inputMode="search"
        aria-haspopup={open ? 'listbox' : 'false'}
        aria-controls="listbox"
      />
      {
        open ? (
          <Popper
            targetRef={targetRef}
            id="listbox"
            role="listbox"
            placement="bottom"
            sameWidth={true}
            arrow={false}
            offsetDistance={0}
            offsetSkidding={0}
            className={styles.list}
          >
            {render}
          </Popper>
        ) : null
      }
    </label>
  );
};

export const Search = memo(SearchComponent, () => true);
