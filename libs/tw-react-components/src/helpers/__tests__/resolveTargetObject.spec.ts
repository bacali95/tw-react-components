import { resolveTargetObject } from '..';

describe('resolveTargetObject', () => {
  const obj = {
    foo: 'bar',
    nestedObject: {
      foo: 'bar',
      null: null,
      undefined: undefined,
      bigint: 123456789n,
      symbol: Symbol('symbol'),
      function: function () {
        /* do nothing */
      },
      nestedArray: [1, 'two', true, null, undefined],
    },
    nestedArray: [
      {
        nestedAttribute: 'yes',
      },
    ],
  };

  it('should resolve a value from a nested object using a field chain array', () => {
    expect(resolveTargetObject(obj, [])).toStrictEqual(obj);
    expect(resolveTargetObject(obj, ['foo'])).toStrictEqual(obj.foo);
    expect(resolveTargetObject(obj, ['nestedObject'])).toStrictEqual(obj.nestedObject);
    expect(resolveTargetObject(obj, ['nestedObject', 'foo'])).toStrictEqual(obj.nestedObject.foo);
    expect(resolveTargetObject(obj, ['nestedObject', 'symbol'])).toStrictEqual(
      obj.nestedObject.symbol,
    );
    expect(resolveTargetObject(obj, ['nestedObject', 'function'])).toStrictEqual(
      obj.nestedObject.function,
    );
    expect(resolveTargetObject(obj, ['nestedObject', 'nestedArray'])).toStrictEqual(
      obj.nestedObject.nestedArray,
    );
    expect(resolveTargetObject(obj, ['nestedObject', 'nestedArray', '3'])).toStrictEqual(
      obj.nestedObject.nestedArray[3],
    );
    expect(resolveTargetObject(obj, ['nestedArray', '0', 'nestedAttribute'])).toStrictEqual(
      obj.nestedArray[0].nestedAttribute,
    );
  });

  it('should throws when the field chain is broken', () => {
    expect(() => resolveTargetObject(obj, ['nestedObject', 'invalidAttribute', 'foo'])).toThrow(
      'Could not resolve field foo because payload is not an object!',
    );
    expect(() => resolveTargetObject(obj, ['nestedObject', 'nestedArray', 'invalidIndex'])).toThrow(
      'The payload is an array, thus the key should be a number!',
    );
    expect(() => resolveTargetObject(obj, ['nestedObject', 'nestedArray', '6'])).toThrow(
      'Index out of payload boundaries!',
    );
  });
});
