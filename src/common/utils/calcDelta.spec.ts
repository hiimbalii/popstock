///calc delta
/// * NaN/error/falsy
/// * regular numbers
/// * 0, -, +

import calculateDelta from './calcDelta';

describe('calculateDelta()', () => {
  it('should return 0 if the original price is 0', () => {
    expect(calculateDelta(0, 12)).toBe(0);
  });
  it('should return -100 if the new price is 0', () => {
    expect(calculateDelta(3, 0)).toBe(-100);
  });
  it('should return negative delta if old price is higher than new', () => {
    expect(calculateDelta(100, 55)).toBeLessThan(0);
  });
  it('should return positive delta if new price is higher than old', () => {
    expect(calculateDelta(67, 88)).toBeGreaterThan(0);
  });
  it('should be correct and should return the percentage as an integer', () => {
    expect(calculateDelta(100, 50)).toBe(-50);
  });
  it('should round to 0 digits', () => {
    expect(calculateDelta(3, 1, 0)).toBe(-67);
  });
  it('should round to 2 digits by default', () => {
    expect(calculateDelta(3, 1)).toBe(-66.67);
  });
  it('should round to arbitrary number of digits', () => {
    expect(calculateDelta(3, 2, 5)).toBe(-33.33333);
    expect(calculateDelta(3, 2, 3)).toBe(-33.333);
    expect(calculateDelta(3, 2, 1)).toBe(-33.3);
  });
});
