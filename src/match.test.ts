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

    expect(someFn).toHaveBeenCalledWith(str);
    expect(noneFn).not.toHaveBeenCalled();
    expect(result).toBe(someFn(str));
  });

  it('should apply a none function to a value if it is empty', () => {
    const str = undefined;

    const result = match(str, {
      some: someFn,
      none: noneFn,
    });

    expect(someFn).not.toHaveBeenCalled();
    expect(noneFn).toHaveBeenCalled();
    expect(result).toBe(noneFn());
  });

  it('can be called data last', () => {
    const str = 'test';

    const result = match({
      some: someFn,
      none: noneFn,
    })(str);

    expect(someFn).toHaveBeenCalledWith(str);
    expect(noneFn).not.toHaveBeenCalled();
    expect(result).toBe(someFn(str));
  });
});
