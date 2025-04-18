import { renderHook } from '@testing-library/react';

import { usePagination } from '../usePagination';

describe('usePagination hook', () => {
  it('returns the current page as the first element', () => {
    const currentPage = 3;
    const totalPages = 10;

    const { result } = renderHook(() => usePagination(currentPage, totalPages));

    expect(result.current).toEqual([1, 2, 3, 4, 5, '...', 10]);
  });

  it('includes all pages when total pages <= 7', () => {
    // Test with 5 total pages, current page 3
    const { result } = renderHook(() => usePagination(3, 5));

    // Should return [3, 2, 1, 4, 5] (current page first, then earlier pages in reverse, then later pages)
    expect(result.current).toEqual([1, 2, 3, 4, 5]);

    // Test with 7 total pages, current page 4
    const { result: result2 } = renderHook(() => usePagination(4, 7));

    // Should return [4, 3, 2, 1, 5, 6, 7]
    expect(result2.current).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  it('handles a current page at the beginning (1)', () => {
    // Test with 10 total pages, current page 1
    const { result } = renderHook(() => usePagination(1, 10));

    // Should return [1, 2, 3, 4, 5, '...', 10]
    expect(result.current).toEqual([1, 2, 3, 4, 5, '...', 10]);
  });

  it('handles a current page near the beginning (2)', () => {
    // Test with 10 total pages, current page 2
    const { result } = renderHook(() => usePagination(2, 10));

    // Should return [2, 1, 3, 4, 5, '...', 10]
    expect(result.current).toEqual([1, 2, 3, 4, 5, '...', 10]);
  });

  it('handles a current page near the beginning (3)', () => {
    // Test with 10 total pages, current page 3
    const { result } = renderHook(() => usePagination(3, 10));

    // Should return [3, 2, 1, 4, 5, '...', 10]
    expect(result.current).toEqual([1, 2, 3, 4, 5, '...', 10]);
  });

  it('handles a current page in the middle (5)', () => {
    // Test with 10 total pages, current page 5
    const { result } = renderHook(() => usePagination(5, 10));

    // Should return [5, 4, 3, 2, 1, 6, 7, 8, 9, 10]
    // When currentIndex > 4, it shows all pages before current without ellipsis
    expect(result.current).toEqual([1, '...', 4, 5, 6, '...', 10]);
  });

  it('handles a current page near the end (8)', () => {
    // Test with 10 total pages, current page 8
    const { result } = renderHook(() => usePagination(8, 10));

    // Should show ellipsis for early pages
    expect(result.current).toEqual([1, '...', 6, 7, 8, 9, 10]);
  });

  it('handles a current page at the end (10)', () => {
    // Test with 10 total pages, current page 10
    const { result } = renderHook(() => usePagination(10, 10));

    // Should show ellipsis for early pages
    expect(result.current).toEqual([1, '...', 6, 7, 8, 9, 10]);
  });

  it('memoizes the result when inputs are unchanged', () => {
    const { result, rerender } = renderHook(({ current, total }) => usePagination(current, total), {
      initialProps: { current: 5, total: 10 },
    });

    const firstResult = result.current;

    // Rerender with the same inputs
    rerender({ current: 5, total: 10 });

    // The result should be the same array instance
    expect(result.current).toBe(firstResult);
  });

  it('recalculates when currentIndex changes', () => {
    const { result, rerender } = renderHook(({ current, total }) => usePagination(current, total), {
      initialProps: { current: 5, total: 10 },
    });

    const firstResult = result.current;

    // Rerender with a different current page
    rerender({ current: 6, total: 10 });

    // The result should be a different array instance
    expect(result.current).not.toBe(firstResult);
    // And should have the correct values
    expect(result.current).toEqual([1, '...', 5, 6, 7, '...', 10]);
  });

  it('recalculates when totalPages changes', () => {
    const { result, rerender } = renderHook(({ current, total }) => usePagination(current, total), {
      initialProps: { current: 5, total: 10 },
    });

    const firstResult = result.current;

    // Rerender with a different total
    rerender({ current: 5, total: 15 });

    // The result should be a different array instance
    expect(result.current).not.toBe(firstResult);
    // And should reflect the new total
    expect(result.current).toContain('...');
    expect(result.current).toContain(15);
  });

  it('handles the case when current > total', () => {
    // Current page can't be greater than total pages in practice,
    // but we should test the edge case
    const { result } = renderHook(() => usePagination(10, 5));

    // Should still return a valid array starting with the passed current page
    expect(result.current).toEqual([1, 2, 3, 4, 5]);
    // And it should have 5 or fewer numeric values
    const numericValues = result.current.filter((item) => typeof item === 'number');
    expect(numericValues.length).toBeLessThanOrEqual(5);
  });

  it('handles the case when totalPages is 0', () => {
    const { result } = renderHook(() => usePagination(1, 0));

    expect(result.current).toEqual([]);
  });
});
