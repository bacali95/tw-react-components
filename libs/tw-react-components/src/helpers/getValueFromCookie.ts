export function getValueFromCookie<T extends string | number | boolean>(
  key: string,
  _default: T,
): T {
  const transformers = {
    string: (value?: string) => String(value ?? _default),
    number: (value?: string) => parseInt(value ?? (_default as string)) || _default,
    boolean: (value?: string) => (value ? value === 'true' : _default),
  } as const;

  return typeof window !== 'undefined'
    ? (transformers[typeof _default as 'string' | 'number' | 'boolean'](
        window.document.cookie
          .split('; ')
          .find((row) => row.startsWith(`${key}=`))
          ?.replace(`${key}=`, ''),
      ) as T)
    : _default;
}
