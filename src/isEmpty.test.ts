import { isEmpty } from '.';

describe('isEmpty', () => {
  it('should check if value is null or undefined', () => {
    expect(isEmpty(null)).toBe(true);
    expect(isEmpty(undefined)).toBe(true);

    expect(isEmpty(0)).toBe(false);
    expect(isEmpty('')).toBe(false);
    expect(isEmpty([])).toBe(false);
    expect(isEmpty({})).toBe(false);
    expect(isEmpty(false)).toBe(false);
  });
});
