import { useMemo } from 'react';

export function usePagination(currentIndex: number, totalPages: number): (number | '...')[] {
  return useMemo(() => {
    const result: (number | '...')[] = [];

    result.push(Math.min(currentIndex, totalPages));

    if (totalPages > 7 && currentIndex > 4) {
      for (
        let index = currentIndex - 1;
        index >= Math.min(totalPages - 4, currentIndex - 1);
        index--
      ) {
        result.push(index);
      }
      result.push('...');
      result.push(1);
    } else {
      for (let index = Math.min(currentIndex, totalPages) - 1; index > 0; index--) {
        result.push(index);
      }
    }

    result.reverse();

    if (totalPages > 7 && totalPages - currentIndex >= 4) {
      for (let index = currentIndex + 1; index <= Math.max(5, currentIndex + 1); index++) {
        result.push(index);
      }
      result.push('...');
      result.push(totalPages);
    } else {
      for (let index = currentIndex + 1; index <= totalPages; index++) {
        result.push(index);
      }
    }

    return result;
  }, [currentIndex, totalPages]);
}
