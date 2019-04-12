import { pipe } from 'remeda';
import { withDefaultLazy } from '.';

describe('withDefaultLazy', () => {
  const defaultValueFn = jest.fn(() => 'empty');
  const str = 'test';

  beforeEach(() => {
    defaultValueFn.mockClear();
  });

  it('should calculate lazy value on null', () => {
    const result = withDefaultLazy(undefined, defaultValueFn);

    expect(defaultValueFn.mock.calls.length).toBe(1);
    expect(result).toBe(defaultValueFn());
  });

  it('should return the value when it not null', () => {
    const result = withDefaultLazy(str, defaultValueFn);

    expect(defaultValueFn.mock.calls.length).toBe(0);
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
