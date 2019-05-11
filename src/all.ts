import curryLast from './curryLast';
import { ToOptional } from './types';

const _all = <T, R>(values: Array<T | undefined>, cb: (values: T[]) => R) => {
  const result = values.reduce<T[] | undefined>((acc, v) => {
    if (acc === undefined || v === undefined) {
      return undefined;
    }

    acc.push(v);

    return acc;
  }, []);

  return result && cb(result);
};

export function all<T extends any[], R>(
  values: ToOptional<T>,
  cb: (values: T) => R,
): R | undefined;

export function all<T extends any[], R>(
  cb: (values: T) => R,
): (values: ToOptional<T>) => R | undefined;

export function all(...args: any) {
  return curryLast(_all, args);
}

export default all;
