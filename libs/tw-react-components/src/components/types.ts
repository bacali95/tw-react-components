export type Size = 'small' | 'medium';

export type Color =
  | 'primary'
  | 'secondary'
  | 'slate'
  | 'gray'
  | 'zinc'
  | 'neutral'
  | 'stone'
  | 'red'
  | 'orange'
  | 'amber'
  | 'yellow'
  | 'lime'
  | 'green'
  | 'emerald'
  | 'teal'
  | 'cyan'
  | 'sky'
  | 'blue'
  | 'indigo'
  | 'violet'
  | 'fuchsia'
  | 'purple'
  | 'pink'
  | 'rose';

type Primitive = string | number | boolean | bigint | symbol | undefined | null | Date;

type Prev = [never, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

export type Paths<T, D extends number = 10> = D extends 0
  ? never
  : T extends Primitive
    ? never
    : T extends readonly (infer U)[]
      ? `${number}` | (Paths<U, Prev[D]> extends infer P extends string ? `${number}.${P}` : never)
      : T extends object
        ? {
            [K in Extract<keyof T, string>]: T[K] extends Primitive
              ? K
              : Paths<T[K], Prev[D]> extends infer P extends string
                ? K | `${K}.${P}`
                : K;
          }[Extract<keyof T, string>]
        : never;

export type ResolvePath<T, Path extends Paths<T>> = Path extends ''
  ? T
  : Path extends `${infer Field}.${infer Rest}`
    ? T extends ReadonlyArray<infer R>
      ? Rest extends Paths<R>
        ? ResolvePath<R, Rest>
        : never
      : Field extends keyof T
        ? Rest extends Paths<T[Field]>
          ? ResolvePath<T[Field], Rest>
          : never
        : never
    : Path extends number
      ? T extends ReadonlyArray<infer R>
        ? R
        : never
      : Path extends `${infer Field}`
        ? T extends ReadonlyArray<infer R>
          ? R
          : Field extends keyof T
            ? T[Field]
            : never
        : T;

type TrimDot<T> = T extends `${infer Head}.` ? TrimDot<Head> : T;

export type ExcludeIndex<T> = TrimDot<
  T extends `${infer Head}.${infer Tail}`
    ? Head extends `${number}`
      ? ExcludeIndex<Tail>
      : `${Head}.${ExcludeIndex<Tail>}`
    : T extends `${number}`
      ? ''
      : T
>;
