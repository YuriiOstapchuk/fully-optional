import curryLast from './curryLast';
import match from './match';
import { Optional } from './types';

const _bind = <T, R>(value: Optional<T>, f: (value: T) => R) =>
  match(value, {
    some: f,
    none: () => undefined,
  });

export function bind<T, R>(
  value: Optional<T>,
  f: (value: T) => R,
): R | undefined;

export function bind<T, R>(
  f: (value: T) => R,
): (value: Optional<T>) => R | undefined;

export function bind(...args: any) {
  return curryLast(_bind, args);
}

export default bind;
