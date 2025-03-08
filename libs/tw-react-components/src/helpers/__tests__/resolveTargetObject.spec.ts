import { resolveTargetObject } from '../resolveTargetObject';

describe('resolveTargetObject helper function', () => {
  describe('Simple object property access', () => {
    it('resolves top-level properties', () => {
      const obj = { name: 'John', age: 30 };

      expect(resolveTargetObject(obj, ['name'], null)).toBe('John');
      expect(resolveTargetObject(obj, ['age'], null)).toBe(30);
    });

    it('resolves nested properties', () => {
      const obj = {
        user: {
          name: 'John',
          address: {
            city: 'New York',
            zip: '10001',
          },
        },
      };

      expect(resolveTargetObject(obj, ['user', 'name'], null)).toBe('John');
      expect(resolveTargetObject(obj, ['user', 'address', 'city'], null)).toBe('New York');
      expect(resolveTargetObject(obj, ['user', 'address', 'zip'], null)).toBe('10001');
    });

    it('returns the whole object with empty field chain', () => {
      const obj = { name: 'John', age: 30 };

      expect(resolveTargetObject(obj, [], null)).toEqual(obj);
    });
  });

  describe('Array access', () => {
    it('resolves array elements by index', () => {
      const arr = ['apple', 'banana', 'cherry'];

      expect(resolveTargetObject(arr, ['0'], null)).toBe('apple');
      expect(resolveTargetObject(arr, ['1'], null)).toBe('banana');
      expect(resolveTargetObject(arr, ['2'], null)).toBe('cherry');
    });

    it('resolves nested array elements', () => {
      const obj = {
        fruits: ['apple', 'banana', 'cherry'],
        nested: [
          { id: 1, name: 'Item 1' },
          { id: 2, name: 'Item 2' },
        ],
      };

      expect(resolveTargetObject(obj, ['fruits', '0'], null)).toBe('apple');
      expect(resolveTargetObject(obj, ['nested', '1', 'name'], null)).toBe('Item 2');
    });

    it('handles deeply nested arrays', () => {
      const obj = {
        data: [
          [
            [1, 2, 3],
            [4, 5, 6],
          ],
          [[7, 8, 9]],
        ],
      };

      expect(resolveTargetObject(obj, ['data', '0', '0', '1'], null)).toBe(2);
      expect(resolveTargetObject(obj, ['data', '1', '0', '2'], null)).toBe(9);
    });

    it('throws error if using non-numeric key with array', () => {
      const arr = ['apple', 'banana', 'cherry'];

      expect(() => resolveTargetObject(arr, ['name'], null)).toThrow(
        'The payload is an array, thus the key should be a number!',
      );
    });

    it('throws error if index is out of bounds', () => {
      const arr = ['apple', 'banana', 'cherry'];

      expect(() => resolveTargetObject(arr, ['3'], null)).toThrow(
        'Index out of payload boundaries!',
      );

      expect(() => resolveTargetObject(arr, ['-1'], null)).toThrow(
        'Index out of payload boundaries!',
      );
    });
  });

  describe('Default values', () => {
    it('returns default value when property does not exist', () => {
      const obj = { name: 'John', age: 30 };
      const defaultValue = 'Not found';

      expect(resolveTargetObject(obj, ['email'], defaultValue)).toBe(defaultValue);
      expect(resolveTargetObject(obj, ['address', 'city'], defaultValue)).toBe(defaultValue);
    });

    it('returns default value when accessing property on non-object', () => {
      expect(resolveTargetObject('not an object', ['property'], 'default')).toBe('default');
      expect(resolveTargetObject(123, ['property'], 'default')).toBe('default');
      expect(resolveTargetObject(true, ['property'], 'default')).toBe('default');
    });
  });

  describe('Null and undefined handling', () => {
    it('returns null when payload is null and fieldChain is empty', () => {
      expect(resolveTargetObject(null, [], 'default')).toBe(null);
    });

    it('returns default value when payload is null and fieldChain is not empty', () => {
      expect(resolveTargetObject(null, ['property'], 'default')).toBe('default');
    });

    it('returns default value when property value is undefined', () => {
      const obj = { name: undefined };

      expect(resolveTargetObject(obj, ['name'], 'default')).toBe('default');
    });
  });

  describe('Error handling', () => {
    it('throws error if field is invalid on non-object payload without default', () => {
      expect(() => resolveTargetObject('string', ['length'])).toThrow(
        'Could not resolve field length because payload is not an object!',
      );
    });

    it('does not throw error if field is invalid on non-object payload with default', () => {
      expect(resolveTargetObject('string', ['property'], 'default')).toBe('default');
    });
  });

  describe('Edge cases', () => {
    it('handles objects with numeric keys', () => {
      const obj = { '0': 'zero', '1': 'one' };

      expect(resolveTargetObject(obj, ['0'], null)).toBe('zero');
      expect(resolveTargetObject(obj, ['1'], null)).toBe('one');
    });

    it('handles empty objects', () => {
      expect(resolveTargetObject({}, ['property'], 'default')).toBe('default');
    });

    it('handles circular references', () => {
      const obj: any = { name: 'circular' };
      obj.self = obj;

      expect(resolveTargetObject(obj, ['name'], null)).toBe('circular');
      expect(resolveTargetObject(obj, ['self', 'name'], null)).toBe('circular');
    });
  });
});
