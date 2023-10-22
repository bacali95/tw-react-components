export type Size = 'small' | 'medium' | 'large';

type NextDepth = {
  '1': never;
  '2': '1';
  '3': '2';
  '4': '3';
  '5': '4';
  '6': '5';
  '7': '6';
  '8': '7';
  '9': '8';
  '10': '9';
};

export type Leaves<T, Depth extends keyof NextDepth = '10'> = Depth extends keyof NextDepth
  ? T extends object
    ? {
        [K in keyof T]: `${Exclude<K, symbol>}${Leaves<T[K], NextDepth[Depth]> extends never
          ? ''
          : `.${Leaves<T[K], NextDepth[Depth]>}`}`;
      }[keyof T]
    : never
  : never;

export type ResolveLeave<T, Leave extends Leaves<T>> = Leave extends ''
  ? T
  : Leave extends `${infer Field}.${infer Rest}`
  ? Field extends keyof T
    ? Rest extends Leaves<T[Field]>
      ? ResolveLeave<T[Field], Rest>
      : never
    : never
  : Leave extends `${infer Field}`
  ? Field extends keyof T
    ? T[Field]
    : never
  : T;
