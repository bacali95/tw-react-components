import type { RefObject } from 'react';
import { useEffect } from 'react';

export function useOutsideClick(ref: RefObject<HTMLDivElement | null>, callback: () => void): void {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref?.current && !ref.current.contains(event.target as any)) {
        callback();
      }
    };

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, callback]);
}
