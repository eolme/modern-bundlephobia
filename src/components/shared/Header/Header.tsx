import type { FC } from 'react';

import clsx from 'clsx';
import styles from './Header.module.css';
import stylesTypography from '@vkontakte/vkui/dist/cssm/components/Typography/Typography.module.css';
import stylesTitle from '@vkontakte/vkui/dist/cssm/components/Typography/Title/Title.module.css';
import stylesSubhead from '@vkontakte/vkui/dist/cssm/components/Typography/Subhead/Subhead.module.css';

export const Header: FC = () => {
  return (
    <>
      <h1 className={clsx(styles.title, stylesTypography['Typography--normalize'], stylesTypography['Typography--weight-1'], stylesTitle['Title--level-1'])}>
        Modern Bundlephobia
      </h1>
      <h2 className={clsx(styles.subhead, stylesTypography['Typography--normalize'], stylesTypography['Typography--weight-3'], stylesSubhead.Subhead)}>
        find the cost of adding a npm package to your bundle
      </h2>
    </>
  );
};
