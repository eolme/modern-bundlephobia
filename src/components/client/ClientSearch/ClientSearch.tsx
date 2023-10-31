'use client';

import type { ChangeEvent, FC, MouseEvent, ReactNode, TouchEvent } from 'react';
import type { Placement } from '@floating-ui/react-dom';
import type { SearchObject } from '#/types/npm';

import { Headline } from '@vkontakte/vkui/dist/cssm/components/Typography/Headline/Headline';
import { Input } from '@vkontakte/vkui/dist/cssm/components/Input/Input';
import { PanelSpinner } from '@vkontakte/vkui/dist/cssm/components/PanelSpinner/PanelSpinner';
import { Popper } from '@vkontakte/vkui/dist/cssm/components/Popper/Popper';
import { SimpleCell } from '@vkontakte/vkui/dist/cssm/components/SimpleCell/SimpleCell';

// @ts-expect-error missing types
import { Icon16Done } from '@vkontakte/icons/dist/es6/16/done_16';

// @ts-expect-error missing types
import { Icon28SearchStarsOutline } from '@vkontakte/icons/dist/es6/28/search_stars_outline_28';

import { usePathname, useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { useHandler, useStableHandler } from 'ahks';
import { default as useSWR } from 'swr';

import { name } from '#/utils/path';
import { title } from '#/utils/title';
import { safeDocument } from '#/utils/dom';

import { fetcher } from './_internal/fetcher';

import clsx from 'clsx';
import styles from './ClientSearch.module.css';

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
    height={24}
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
    <Headline weight="2">nothing found</Headline>
  </SimpleCell>
);

export const ClientSearch: FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  const value = pathname === null ? '' : name(pathname);

  const [search, setSearch] = useState(value);

  const handleSearch = useHandler((event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.currentTarget.value);
  });

  const { data: current, error, isValidating } = useSWR(() => search, {
    keepPreviousData: true,
    fetcher
  });

  const data: SearchObject[] = typeof current === 'undefined' ? [] : current;

  const [focus, setFocus] = useState(false);
  const open = focus && search.length > 0;

  const handleFocus = useHandler(() => setFocus(true));
  const handleBlur = useHandler(() => setFocus(false));

  const [selected, setSelected] = useState(value);

  const handleSelect = useStableHandler((event: MouseEvent<HTMLElement> | TouchEvent<HTMLElement>) => {
    const optionName = event.currentTarget.dataset.name || search;

    setSearch(optionName);
    setSelected(optionName);

    const select = data.find((option) => option.package.name === optionName)!;

    const query = `${select.package.name}@${select.package.version}`;

    // TODO: remove when fixed
    safeDocument.title = title(query);
    router.replace(`/p/${query}`);
  });

  const targetRef = useRef<HTMLLabelElement | null>(null);

  let render: ReactNode;

  if (!open) {
    render = null;
  } else if (
    (search.length > 0 && data.length === 0) || error
  ) {
    render = SearchComponentEmpty;
  } else {
    render = data.map((option) => (
      <SimpleCell
        key={option.package.name}
        Component="span"
        className={styles.option}
        tabIndex={0}
        role="option"
        data-name={option.package.name}
        aria-selected={selected === option.package.name}
        stopPropagation={false}
        onTouchEndCapture={handleSelect}
        onMouseDownCapture={handleSelect}
        subtitle={option.package.description}
        after={(
          selected === option.package.name ? SearchComponentChecked : null
        )}
      >
        <span className={styles.name}>{option.package.name}</span>
        <span className={styles.version}>{option.package.version}</span>
      </SimpleCell>
    ));
  }

  const [placement, setPlacement] = useState<Placement>('bottom');
  const handlePlacement = useHandler((update: { placement?: Placement }) => {
    if (typeof update.placement === 'string') {
      setPlacement(update.placement);
    }
  });

  return (
    <label
      ref={targetRef}
      className={styles.label}
    >
      <Input
        className={clsx(styles.input, open && placement)}
        placeholder="find package"
        lang="en"
        spellCheck="false"
        autoCorrect="off"
        autoComplete="off"
        autoCapitalize="off"
        value={search}
        onChange={handleSearch}
        onFocus={handleFocus}
        onBlur={handleBlur}
        after={(
          isValidating ? SearchComponentSpinner : SearchComponentIcon
        )}
        id="search"
        name="search"
        type="search"
        inputMode="search"
        enterKeyHint="search"
        accessKey="f"
        role="combobox"
        aria-label="Search"
        aria-haspopup={open ? 'listbox' : 'false'}
        aria-controls={open ? 'listbox' : 'search'}
      />
      {
        open ?
          (
            <Popper
              targetRef={targetRef}
              forcePortal={true}
              id="listbox"
              role="listbox"
              placement={placement}
              onPlacementChange={handlePlacement}
              sameWidth={true}
              arrow={false}
              offsetDistance={0}
              offsetSkidding={0}
              className={clsx(styles.list, placement)}
            >
              {render}
            </Popper>
          ) :
          null
      }
    </label>
  );
};
