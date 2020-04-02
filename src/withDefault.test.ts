import { pipe } from 'fp-ts/lib/pipeable';
import { withDefault } from '.';

describe('withDefault', () => {
  const str = 'test';
  const defaultValue = 'default';

  it('should return default value on null', () => {
    const result = withDefault(undefined, defaultValue);

    expect(result).toBe(defaultValue);
  });

  it('should return the value when not it is null', () => {
    const result = withDefault(str, defaultValue);

    expect(result).toBe(str);
  });

  it('can be called data last', () => {
    const result = pipe(undefined, withDefault(defaultValue));

    expect(result).toBe(defaultValue);
  });
});
