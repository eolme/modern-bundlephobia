import type { FC } from 'react';
import type { AnyFunction } from 'ahks/lib/types';

export type NextRouteParams = {
  params: {
    package: string[];
  };
};

export type NextPage<T = Record<string, unknown>, C extends AnyFunction = FC<T>> = (...params: Parameters<C>) => ReturnType<C> | Promise<ReturnType<C>>;
