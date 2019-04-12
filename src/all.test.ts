import { pipe } from 'remeda';
import { ToOptional, all } from '.';

type Arr = [string, string, number];

describe('all', () => {
  const arr = ['test', 'test1', 10] as ToOptional<Arr>;
  const fn = jest.fn(([s1, s2, n]: Arr) => `${s1}, ${s2}, ${n}`);

  beforeEach(() => {
    fn.mockClear();
  });

  it('should apply a function to array if all values are not none', () => {
    const result = all(arr, fn);

    expect(fn.mock.calls[0][0]).toEqual(arr);
    expect(result).toEqual(fn(arr as Arr));
  });

  it('should return undefined if any value is none', () => {
    const undefinedArr = ['test1', undefined, 10] as ToOptional<Arr>;

    const result = all(undefinedArr, fn);

    expect(fn.mock.calls.length).toBe(0);
    expect(result).toBe(undefined);
  });

  it('can be called data last', () => {
    const result = pipe(
      arr,
      all(fn),
    );

    expect(fn.mock.calls[0][0]).toEqual(arr);
    expect(result).toEqual(fn(arr as Arr));
  });
});
