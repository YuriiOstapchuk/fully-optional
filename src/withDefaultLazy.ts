import curryLast from './curryLast';
import match from './match';
import { Optional } from './types';

const _withDefaultLazy = <T, R>(
  value: Optional<T>,
  defaultValueFn: () => R,
): T | R =>
  match(value, {
    some: (_) => _,
    none: defaultValueFn,
  });

export function withDefaultLazy<T, R>(
  value: Optional<T>,
  defaultValueFn: () => R,
): T | R;

export function withDefaultLazy<T, R>(
  defaultValueFn: () => R,
): (value: Optional<T>) => T | R;

export function withDefaultLazy(...args: any) {
  return curryLast(_withDefaultLazy, args);
}

export default withDefaultLazy;
