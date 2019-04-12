import { match } from '.';

describe('match', () => {
  const someFn = jest.fn((s: string) => s.toUpperCase());
  const noneFn = jest.fn(() => '');

  beforeEach(() => {
    someFn.mockClear();
    noneFn.mockClear();
  });

  it('should apply a some function to a value if it is not empty', () => {
    const str = 'test';

    const result = match(str, {
      some: someFn,
      none: noneFn,
    });

    expect(someFn.mock.calls[0][0]).toBe(str);
    expect(noneFn.mock.calls.length).toBe(0);
    expect(result).toBe(someFn(str));
  });

  it('should apply a none function to a value if it is empty', () => {
    const str = undefined;

    const result = match(str, {
      some: someFn,
      none: noneFn,
    });

    expect(someFn.mock.calls.length).toBe(0);
    expect(noneFn.mock.calls.length).toBe(1);
    expect(result).toBe(noneFn());
  });

  it('can be called data last', () => {
    const str = 'test';

    const result = match({
      some: someFn,
      none: noneFn,
    })(str);

    expect(someFn.mock.calls[0][0]).toBe(str);
    expect(noneFn.mock.calls.length).toBe(0);
    expect(result).toBe(someFn(str));
  });
});
