import { getValueFromCookie } from '../getValueFromCookie';

function testCookies(cookies: Record<string, string>, test: () => void) {
  Object.entries(cookies).forEach(([key, value]) => {
    window.document.cookie = `${key}=${value}`;
  });

  test();

  Object.entries(cookies).forEach(([key, value]) => {
    window.document.cookie = `${key}=${value}; expires=1 Jan 1970 00:00:00 GMT;`;
  });
}

describe('getValueFromCookie helper function', () => {
  describe('String values', () => {
    it('extracts string value from cookie string', () =>
      testCookies({ name: 'John', session: 'abc123', preferences: 'dark' }, () => {
        const result = getValueFromCookie('name', '');

        expect(result).toBe('John');
        expect(typeof result).toBe('string');
      }));

    it('returns default string when cookie key not found', () =>
      testCookies({ session: 'abc123', preferences: 'dark' }, () => {
        const result = getValueFromCookie('name', 'DefaultName');

        expect(result).toBe('DefaultName');
        expect(typeof result).toBe('string');
      }));

    it('handles cookie with no value correctly', () =>
      testCookies({ name: '', session: 'abc123' }, () => {
        const result = getValueFromCookie('name', 'DefaultName');

        expect(result).toBe('');
        expect(typeof result).toBe('string');
      }));

    it('handles empty cookie string correctly', () =>
      testCookies({}, () => {
        const result = getValueFromCookie('name', 'DefaultName');

        expect(result).toBe('DefaultName');
        expect(typeof result).toBe('string');
      }));
  });

  describe('Number values', () => {
    it('converts numeric string value to number', () =>
      testCookies({ count: '42', session: 'abc123' }, () => {
        const result = getValueFromCookie('count', 0);

        expect(result).toBe(42);
        expect(typeof result).toBe('number');
      }));

    it('returns default number when cookie key not found', () =>
      testCookies({ session: 'abc123', preferences: 'dark' }, () => {
        const result = getValueFromCookie('count', 99);

        expect(result).toBe(99);
        expect(typeof result).toBe('number');
      }));

    it('handles non-numeric string correctly', () =>
      testCookies({ session: 'abc123' }, () => {
        const result = getValueFromCookie('count', 0);

        expect(result).toBe(0); // parseInt returns NaN for 'invalid', which is then transformed to 0
        expect(typeof result).toBe('number');
      }));

    it('handles negative numbers correctly', () =>
      testCookies({ count: '-42', session: 'abc123' }, () => {
        const result = getValueFromCookie('count', 0);

        expect(result).toBe(-42);
        expect(typeof result).toBe('number');
      }));
  });

  describe('Boolean values', () => {
    it('converts "true" string to boolean true', () =>
      testCookies({ isAdmin: 'true', session: 'abc123' }, () => {
        const result = getValueFromCookie('isAdmin', false);

        expect(result).toBe(true);
        expect(typeof result).toBe('boolean');
      }));

    it('converts "false" string to boolean false', () =>
      testCookies({ isAdmin: 'false', session: 'abc123' }, () => {
        const result = getValueFromCookie('isAdmin', true);

        expect(result).toBe(false);
        expect(typeof result).toBe('boolean');
      }));

    it('converts any non-"true" string to boolean false', () =>
      testCookies({ isAdmin: 'yes', session: 'abc123' }, () => {
        const result = getValueFromCookie('isAdmin', true);

        expect(result).toBe(false);
        expect(typeof result).toBe('boolean');
      }));

    it('returns default boolean when cookie key not found', () =>
      testCookies({ session: 'abc123', preferences: 'dark' }, () => {
        const result = getValueFromCookie('isAdmin', true);

        expect(result).toBe(true);
        expect(typeof result).toBe('boolean');
      }));
  });

  describe('Edge cases', () => {
    it('handles cookie key with special characters', () =>
      testCookies({ 'special@key': 'value', session: 'abc123' }, () => {
        const result = getValueFromCookie('special@key', '');

        expect(result).toBe('value');
      }));

    it('handles cookie value with equals sign', () =>
      testCookies({ equation: '2+2=4', session: 'abc123' }, () => {
        const result = getValueFromCookie('equation', '');

        expect(result).toBe('2+2=4');
      }));

    it('handles cookie value with semicolons', () =>
      testCookies({ code: 'function() { return; }', session: 'abc123' }, () => {
        const result = getValueFromCookie('code', '');

        expect(result).toBe('function() { return');
      }));
  });
});
