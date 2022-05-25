import type { FC, ReactNode } from 'react';

import {
  Headline,
  Input,
  PanelSpinner,
  Popper,
  SimpleCell
} from '@mntm/vkui';

import {
  Icon16Done,
  Icon28SearchStarsOutline
} from '@vkontakte/icons';

import { SearchContext } from 'src/contexts/search';

import { memo, useContext, useRef, useState } from 'react';
import { useHandler, useRefToCallback } from 'ahks';

import { VOID } from 'src/utils/const';

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
    aria-label="loading"
    aria-busy="true"
    aria-live="polite"
    role="status"
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

const SearchComponent: FC = () => {
  const context = useContext(SearchContext);

  console.log(context.loading);

  const [focus, setFocus] = useState(false);
  const handleFocus = useHandler(() => setFocus(true));
  const handleBlur = useHandler(() => setFocus(false));

  const open = context.content && focus;

  const targetRef = useRef<HTMLElement>(null);
  const targetRefCallback = useRefToCallback(targetRef);

  let render: ReactNode;

  if (!open) {
    render = null;
  } else if (context.fallback) {
    render = SearchComponentEmpty;
  } else {
    const isSelected =
      typeof context.selected === 'undefined' ?
        () => false :
        (name: string) => context.selected!.package.name === name;

    render = context.results.map((option, value) => (
      <SimpleCell
        key={option.package.name}
        Component="span"
        className={styles.option}
        tabIndex={0}
        role="option"
        data-value={value}
        aria-selected={isSelected(option.package.name)}
        stopPropagation={false}
        onTouchEndCapture={context.handleSelect}
        onMouseDownCapture={context.handleSelect}
        description={option.package.description}
        after={(
          isSelected(option.package.name) ? SearchComponentChecked : null
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
        onChange={context.handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        after={(
          context.loading ? SearchComponentSpinner : SearchComponentIcon
        )}
        id="search"
        name="search"
        type="search"
        inputMode="search"
        aria-haspopup={open ? 'listbox' : 'false'}
        aria-controls={open ? 'listbox' : VOID}
      />
      {
        open ?
          (
            <Popper
              targetRef={targetRef}
              forcePortal={true}
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
          ) :
          null
      }
    </label>
  );
};

export const Search = memo(SearchComponent, () => true);
