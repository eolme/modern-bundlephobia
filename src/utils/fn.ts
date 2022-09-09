import type { AnyFunction } from 'ahks/lib/types';

export const once = <T extends AnyFunction>(fn: T) => {
  let result: ReturnType<T>;
  let called = false;

  return function(this: unknown) {
    if (!called) {
      called = true;
      result = Reflect.apply(fn, this, arguments);
    }

    return result;
  } as T;
};

export const idle = (fn: () => void) => {
  if (typeof requestIdleCallback === 'function') {
    requestIdleCallback(fn, { timeout: 300 });
  } else {
    setTimeout(fn, 300);
  }
};
