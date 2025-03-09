import { isEmpty } from '../isEmpty';

describe('isEmpty helper function', () => {
  describe('Array handling', () => {
    it('returns true for empty arrays', () => {
      expect(isEmpty([])).toBe(true);
    });

    it('returns false for non-empty arrays', () => {
      expect(isEmpty([1, 2, 3])).toBe(false);
      expect(isEmpty([''])).toBe(false);
      expect(isEmpty([null])).toBe(false);
      expect(isEmpty([undefined])).toBe(false);
    });
  });

  describe('Null and undefined handling', () => {
    it('returns true for null values', () => {
      expect(isEmpty(null)).toBe(true);
    });

    it('returns true for undefined values', () => {
      expect(isEmpty(undefined)).toBe(true);
    });
  });

  describe('String handling', () => {
    it('returns true for empty strings', () => {
      expect(isEmpty('')).toBe(true);
    });

    it('returns false for non-empty strings', () => {
      expect(isEmpty('hello')).toBe(false);
      expect(isEmpty(' ')).toBe(false); // Space is not considered empty
      expect(isEmpty('\n')).toBe(false); // Newline is not considered empty
      expect(isEmpty('0')).toBe(false); // '0' is not considered empty
    });
  });

  describe('Other types', () => {
    it('returns false for numbers', () => {
      expect(isEmpty(0)).toBe(false);
      expect(isEmpty(42)).toBe(false);
      expect(isEmpty(-1)).toBe(false);
      expect(isEmpty(NaN)).toBe(false);
      expect(isEmpty(Infinity)).toBe(false);
    });

    it('returns false for booleans', () => {
      expect(isEmpty(true)).toBe(false);
      expect(isEmpty(false)).toBe(false);
    });

    it('returns false for objects', () => {
      expect(isEmpty({})).toBe(false);
      expect(isEmpty({ key: 'value' })).toBe(false);
    });

    it('returns false for functions', () => {
      expect(isEmpty(() => void 0)).toBe(false);
      expect(
        isEmpty(function () {
          // empty
        }),
      ).toBe(false);
    });

    it('returns false for dates', () => {
      expect(isEmpty(new Date())).toBe(false);
    });

    it('returns false for regular expressions', () => {
      expect(isEmpty(/test/)).toBe(false);
      expect(isEmpty(new RegExp('test'))).toBe(false);
    });
  });

  describe('Edge cases', () => {
    it('handles nested empty arrays correctly', () => {
      expect(isEmpty([[], []])).toBe(false); // Outer array is not empty
    });

    it('handles arrays with only empty values correctly', () => {
      expect(isEmpty([null, undefined, ''])).toBe(false); // Array itself is not empty
    });
  });
});
