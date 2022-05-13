import type { FC as FunctionalComponent, PropsWithChildren } from 'react';

export type FC<P = Record<never, never>> = FunctionalComponent<PropsWithChildren<P>>;
