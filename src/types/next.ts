import type { AnyFunction } from "ahks/lib/types";
import type { FC } from "react";

export type NextRouteParams = {
	params: Promise<{
		package: string[];
	}>;
};

export type NextPage<
	T = Record<string, unknown>,
	C extends AnyFunction = FC<T>,
> = (...params: Parameters<C>) => ReturnType<C> | Promise<ReturnType<C>>;
