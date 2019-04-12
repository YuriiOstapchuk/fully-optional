import { isNotEmpty } from '.';

describe('isNotEmpty', () => {
  it('should check if value is not null or undefined', () => {
    expect(isNotEmpty(null)).toBe(false);
    expect(isNotEmpty(undefined)).toBe(false);

    expect(isNotEmpty(0)).toBe(true);
    expect(isNotEmpty('')).toBe(true);
    expect(isNotEmpty([])).toBe(true);
    expect(isNotEmpty({})).toBe(true);
    expect(isNotEmpty(false)).toBe(true);
  });
});
