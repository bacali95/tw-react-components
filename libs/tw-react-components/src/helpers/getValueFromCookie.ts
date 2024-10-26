export function getValueFromCookie<T extends string | boolean>(key: string, _default: T): T {
  const transformers: Record<any, (value: any) => any> = {
    string: String,
    boolean: (value) => value === 'true',
  };

  return typeof window !== 'undefined'
    ? transformers[typeof _default](
        (document.cookie
          .split('; ')
          .find((row) => row.startsWith(key))
          ?.split('=')[1] as T) ?? _default,
      )
    : _default;
}
