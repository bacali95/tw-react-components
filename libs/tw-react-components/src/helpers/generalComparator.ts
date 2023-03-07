export function generalComparator(a: any, b: any): number {
  if (Array.isArray(a) && Array.isArray(b)) {
    return a.length - b.length;
  }

  if (typeof a === 'number' && typeof b === 'number') {
    return a - b;
  }

  if (typeof a === 'string' && typeof b === 'string') {
    return a.localeCompare(b);
  }

  return 0;
}
