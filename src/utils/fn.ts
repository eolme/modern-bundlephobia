import type { AnyFunction } from '@vkontakte/vkjs';

export const noop: AnyFunction = () => { /* Noop */ };

const wait = Symbol(0);

export const once = <T extends AnyFunction>(fn: T): T => {
  let value: ReturnType<T> | symbol = wait;

  return function(this: any) {
    if (value === wait) {
      value = Reflect.apply(fn, this, arguments);
    }

    return value;
  } as T;
};
