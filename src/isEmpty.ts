import { None, Optional } from './types';

export function isEmpty<T>(value: Optional<T>): value is None {
  return value === null || value === undefined;
}

export default isEmpty;
