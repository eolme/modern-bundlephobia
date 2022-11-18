import type { FC } from 'react';
import type { AnyFunction } from 'ahks/lib/types';

export type AsyncFC<T = Record<string, unknown>, C extends AnyFunction = FC<T>> = (...params: Parameters<C>) => Promise<ReturnType<C>>;
