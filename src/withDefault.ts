import curryLast from './curryLast';
import { Optional } from './types';
import { withDefaultLazy } from './withDefaultLazy';

const _withDefault = <T, R>(value: Optional<T>, defaultValue: R): T | R =>
  withDefaultLazy(value, () => defaultValue);

export function withDefault<T, R>(value: Optional<T>, defaultValue: R): T | R;

export function withDefault<T, R>(
  defaultValue: R,
): (value: Optional<T>) => T | R;

export function withDefault(...args: any) {
  return curryLast(_withDefault, args);
}
