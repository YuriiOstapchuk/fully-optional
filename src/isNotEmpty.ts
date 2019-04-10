import isEmpty from './isEmpty';
import { Optional } from './types';

export const isNotEmpty = <T>(value: Optional<T>): value is T =>
  !isEmpty(value);

export default isNotEmpty;
