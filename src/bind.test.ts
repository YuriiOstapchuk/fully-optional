import { pipe } from 'remeda';
import { bind } from '.';

describe('bind', () => {
  const fn = jest.fn((s: string) => s.toUpperCase());
  const str = 'test';

  beforeEach(() => {
    fn.mockClear();
  });

  it('should apply a function if value is not undefined', () => {
    const result = bind(str, fn);

    expect(fn.mock.calls[0][0]).toBe(str);
    expect(result).toBe(fn(str));
  });

  it('should not apply a function if value is undefined and return undefined', () => {
    const result = bind(undefined, fn);

    expect(fn.mock.calls.length).toBe(0);
    expect(result).toBe(undefined);
  });

  it('can be called data last', () => {
    const data: { test?: string } | undefined = { test: str };

    const result = pipe(
      data,
      bind(e => e.test),
      bind(fn),
    );

    expect(fn.mock.calls[0][0]).toBe(str);
    expect(result).toBe(fn(str));
  });
});
