import { cn } from '../cn';

describe('cn helper function', () => {
  // Test basic string concatenation
  it('combines multiple string class names', () => {
    const result = cn('text-red-500', 'bg-blue-300', 'p-4');
    expect(result).toBe('text-red-500 bg-blue-300 p-4');
  });

  // Test conditional classes with objects
  it('handles conditional classes with objects', () => {
    const isActive = true;
    const isPrimary = false;

    const result = cn('base-class', { 'is-active': isActive }, { 'is-primary': isPrimary });

    expect(result).toBe('base-class is-active');
    expect(result).not.toContain('is-primary');
  });

  // Test array syntax
  it('handles arrays of class names', () => {
    const result = cn(['text-lg', 'font-bold'], 'text-center');
    expect(result).toBe('text-lg font-bold text-center');
  });

  // Test falsy values
  it('ignores falsy values', () => {
    const result = cn('base-class', null, undefined, false, 0, '', 'valid-class');
    expect(result).toBe('base-class valid-class');
  });

  // Test nested structures
  it('handles nested arrays and objects', () => {
    const result = cn('outer', ['inner-1', 'inner-2'], { conditional: true }, [
      { 'nested-conditional': true },
      ['deeply-nested'],
    ]);
    expect(result).toBe('outer inner-1 inner-2 conditional nested-conditional deeply-nested');
  });

  // Test Tailwind merge functionality (the key feature)
  it('properly merges conflicting Tailwind classes', () => {
    // When conflicting classes are provided, the last one should win
    const result = cn('p-2', 'p-4');
    expect(result).toBe('p-4');
    expect(result).not.toContain('p-2');
  });

  it('merges complex Tailwind class conflicts', () => {
    const result = cn('px-2 py-1 bg-red-500 text-white', 'p-4 bg-blue-600');

    // p-4 should override px-2 and py-1
    expect(result).toContain('p-4');
    expect(result).not.toContain('px-2');
    expect(result).not.toContain('py-1');

    // bg-blue-600 should override bg-red-500
    expect(result).toContain('bg-blue-600');
    expect(result).not.toContain('bg-red-500');

    // text-white should remain as it doesn't conflict
    expect(result).toContain('text-white');
  });

  it('handles Tailwind variants correctly', () => {
    const result = cn('hover:bg-gray-200', 'hover:bg-blue-300');

    expect(result).toBe('hover:bg-blue-300');
    expect(result).not.toContain('hover:bg-gray-200');
  });

  it('preserves non-conflicting classes in the right order', () => {
    const result = cn('font-bold text-sm tracking-tight', 'text-lg text-blue-500');

    // text-lg should override text-sm
    expect(result).toContain('text-lg');
    expect(result).not.toContain('text-sm');

    // Other non-conflicting classes should be preserved
    expect(result).toContain('font-bold');
    expect(result).toContain('tracking-tight');
    expect(result).toContain('text-blue-500');
  });

  it('handles complex conditional scenarios', () => {
    const isError = true;
    const isActive = false;
    const size = 'large';

    const result = cn(
      'base-style',
      isError ? 'border-red-500 text-red-500' : 'border-gray-200',
      isActive && 'bg-blue-100',
      {
        'text-sm p-1': size === ('small' as string),
        'text-base p-2': size === ('medium' as string),
        'text-lg p-4': size === 'large',
      },
    );

    expect(result).toContain('base-style');
    expect(result).toContain('border-red-500');
    expect(result).toContain('text-red-500');
    expect(result).not.toContain('border-gray-200');
    expect(result).not.toContain('bg-blue-100');
    expect(result).toContain('text-lg');
    expect(result).toContain('p-4');
  });

  it('properly deduplicates identical class names', () => {
    const result = cn('text-center', 'my-4', 'text-center');
    expect(result).toBe('my-4 text-center');

    // Count occurrences
    expect(result.split(' ').filter((cls) => cls === 'text-center').length).toBe(1);
  });
});
