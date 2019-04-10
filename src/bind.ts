import curryLast from './curryLast';
import match from './match';
import { Optional } from './types';

const _bind = <T, R>(value: Optional<T>, f: (value: T) => R): Optional<R> =>
  match(value, {
    some: f,
    none: () => undefined,
  });

export function bind<T, R>(value: Optional<T>, f: (value: T) => R): Optional<R>;

export function bind<T, R>(
  f: (value: T) => R,
): (value: Optional<T>) => Optional<R>;

export function bind(...args: any) {
  return curryLast(_bind, args);
}
