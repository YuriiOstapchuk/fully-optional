import curryLast from './curryLast';
import isEmpty from './isEmpty';
import { Optional } from './types';

const _match = <T, TSome, TNone>(
  value: Optional<T>,
  {
    some,
    none,
  }: {
    some: (value: T) => TSome;
    none: () => TNone;
  },
): TSome | TNone => (isEmpty(value) ? none() : some(value));

export function match<T, TSome, TNone>(
  value: Optional<T>,
  {
    some,
    none,
  }: {
    some: (value: T) => TSome;
    none: () => TNone;
  },
): TSome | TNone;

export function match<T, TSome, TNone>({
  some,
  none,
}: {
  some: (value: T) => TSome;
  none: () => TNone;
}): (value: Optional<T>) => TSome | TNone;

export function match(...args: any) {
  return curryLast(_match, args);
}

export default match;
