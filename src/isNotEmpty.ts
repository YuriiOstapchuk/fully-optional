import isEmpty from './isEmpty';
import { Optional } from './types';

export function isNotEmpty<T>(value: Optional<T>): value is T {
  return !isEmpty(value);
}

export default isNotEmpty;
