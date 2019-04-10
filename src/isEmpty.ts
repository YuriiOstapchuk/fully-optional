import { None, Optional } from './types';

export const isEmpty = <T>(value: Optional<T>): value is None =>
  value === null || value === undefined;

export default isEmpty;
