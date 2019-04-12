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

export function all<A1, R>(
  values: ToOptional<[A1]>,
  cb: (values: [A1]) => R,
): R | undefined;

export function all<A1, A2, R>(
  values: ToOptional<[A1, A2]>,
  cb: (values: [A1, A2]) => R,
): R | undefined;

export function all<A1, A2, A3, R>(
  values: ToOptional<[A1, A2, A3]>,
  cb: (values: [A1, A2, A3]) => R,
): R | undefined;

export function all<A1, A2, A3, A4, R>(
  values: ToOptional<[A1, A2, A3, A4]>,
  cb: (values: [A1, A2, A3, A4]) => R,
): R | undefined;

export function all<A1, A2, A3, A4, A5, R>(
  values: ToOptional<[A1, A2, A3, A4, A5]>,
  cb: (values: [A1, A2, A3, A4, A5]) => R,
): R | undefined;

export function all<T, R>(
  values: Array<T | undefined>,
  cb: (values: T[]) => R,
): R | undefined;

export function all<A1, R>(
  cb: (values: [A1]) => R,
): (values: ToOptional<[A1]>) => R | undefined;

export function all<A1, A2, R>(
  cb: (values: [A1, A2]) => R,
): (values: ToOptional<[A1, A2]>) => R | undefined;

export function all<A1, A2, A3, R>(
  cb: (values: [A1, A2, A3]) => R,
): (values: ToOptional<[A1, A2, A3]>) => R | undefined;

export function all<A1, A2, A3, A4, R>(
  cb: (values: [A1, A2, A3, A4]) => R,
): (values: ToOptional<[A1, A2, A3, A4]>) => R | undefined;

export function all<A1, A2, A3, A4, A5, R>(
  cb: (values: [A1, A2, A3, A4, A5]) => R,
): (values: ToOptional<[A1, A2, A3, A4, A5]>) => R | undefined;

export function all<T, R>(
  cb: (values: T[]) => R,
): (values: Array<T | undefined>) => R | undefined;

export function all(...args: any) {
  return curryLast(_all, args);
}

export default all;
