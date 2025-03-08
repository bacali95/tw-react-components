import { generalComparator } from '../generalComparator';

describe('generalComparator helper function', () => {
  describe('Array comparison', () => {
    it('returns positive value when first array is longer', () => {
      const result = generalComparator([1, 2, 3], [1, 2]);
      expect(result).toBe(1);
    });

    it('returns negative value when first array is shorter', () => {
      const result = generalComparator([1], [1, 2, 3, 4]);
      expect(result).toBe(-3);
    });

    it('returns zero when arrays are the same length', () => {
      const result = generalComparator([1, 2], [3, 4]);
      expect(result).toBe(0);
    });

    it('handles empty arrays correctly', () => {
      const result = generalComparator([], []);
      expect(result).toBe(0);
    });

    it('handles arrays with different types of elements', () => {
      const result = generalComparator([1, '2', true], [1, 2]);
      expect(result).toBe(1);
    });
  });

  describe('Number comparison', () => {
    it('returns positive value when first number is greater', () => {
      const result = generalComparator(10, 5);
      expect(result).toBe(5);
    });

    it('returns negative value when first number is smaller', () => {
      const result = generalComparator(5, 10);
      expect(result).toBe(-5);
    });

    it('returns zero when numbers are equal', () => {
      const result = generalComparator(10, 10);
      expect(result).toBe(0);
    });

    it('handles floating point numbers correctly', () => {
      const result = generalComparator(10.5, 10.2);
      expect(result).toBeCloseTo(0.3);
    });

    it('handles negative numbers correctly', () => {
      const result = generalComparator(-5, -10);
      expect(result).toBe(5);
    });

    it('handles zero correctly', () => {
      const result = generalComparator(0, 0);
      expect(result).toBe(0);
    });
  });

  describe('String comparison', () => {
    it('returns positive value when first string comes after alphabetically', () => {
      const result = generalComparator('banana', 'apple');
      expect(result).toBeGreaterThan(0);
    });

    it('returns negative value when first string comes before alphabetically', () => {
      const result = generalComparator('apple', 'banana');
      expect(result).toBeLessThan(0);
    });

    it('returns zero when strings are equal', () => {
      const result = generalComparator('apple', 'apple');
      expect(result).toBe(0);
    });

    it('handles empty strings correctly', () => {
      const result = generalComparator('', '');
      expect(result).toBe(0);
    });

    it('handles case sensitivity according to locale', () => {
      // This may vary depending on locale settings
      const result = generalComparator('a', 'A');
      // We're just checking that it returns a number, not the specific value
      expect(typeof result).toBe('number');
    });

    it('handles strings with special characters', () => {
      const result = generalComparator('café', 'cafe');
      // May vary by locale, but should return a numeric result
      expect(typeof result).toBe('number');
    });
  });

  describe('Other types and edge cases', () => {
    it('returns zero when comparing objects', () => {
      const result = generalComparator({ a: 1 }, { b: 2 });
      expect(result).toBe(0);
    });

    it('returns zero when comparing booleans', () => {
      const result = generalComparator(true, false);
      expect(result).toBe(0);
    });

    it('returns zero when comparing null values', () => {
      const result = generalComparator(null, null);
      expect(result).toBe(0);
    });

    it('returns zero when comparing undefined values', () => {
      const result = generalComparator(undefined, undefined);
      expect(result).toBe(0);
    });

    it('returns zero when comparing different types', () => {
      const result1 = generalComparator('string', 123);
      expect(result1).toBe(0);

      const result2 = generalComparator([], {});
      expect(result2).toBe(0);

      const result3 = generalComparator(null, []);
      expect(result3).toBe(0);
    });
  });
});
