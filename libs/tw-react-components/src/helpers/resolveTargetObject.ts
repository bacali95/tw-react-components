export function resolveTargetObject(payload: any, fieldChain: string[], defaultValue?: any): any {
  if (!fieldChain.length) {
    return payload || defaultValue;
  }

  if (!payload && defaultValue) {
    return defaultValue;
  }

  if (typeof payload !== 'object' || !payload) {
    throw new Error(`Could not resolve field ${fieldChain[0]} because payload is not an object!`);
  }

  const [key, ...rest] = fieldChain;

  if (Array.isArray(payload)) {
    if (Number.isNaN(+key)) {
      throw new Error('The payload is an array, thus the key should be a number!');
    }

    const index = +key;

    if (index < 0 || index >= payload.length) {
      throw new Error('Index out of payload boundaries!');
    }

    return resolveTargetObject(payload[index], rest, defaultValue);
  }

  return resolveTargetObject(payload[key], rest, defaultValue);
}
