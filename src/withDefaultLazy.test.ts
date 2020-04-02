import { pipe } from 'fp-ts/lib/pipeable';
import { withDefaultLazy } from '.';

describe('withDefaultLazy', () => {
  const defaultValueFn = jest.fn(() => 'empty');
  const str = 'test';

  beforeEach(() => {
    defaultValueFn.mockClear();
  });

  it('should calculate lazy value on null', () => {
    const result = withDefaultLazy(undefined, defaultValueFn);

    expect(defaultValueFn).toHaveBeenCalled();
    expect(result).toBe(defaultValueFn());
  });

  it('should return the value when it not null', () => {
    const result = withDefaultLazy(str, defaultValueFn);

    expect(defaultValueFn).not.toHaveBeenCalled();
    expect(result).toBe(str);
  });

  it('can be called data last', () => {
    const result = pipe(
      undefined,
      withDefaultLazy(() => 'lazy'),
    );

    expect(result).toBe('lazy');
  });
});
