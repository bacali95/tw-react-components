import { RefObject, useEffect } from 'react';

type SwipeDirection = 'up' | 'left' | 'bottom' | 'right';

export function useOnSwipe(
  element: RefObject<HTMLElement>,
  onSwipe: (direction: SwipeDirection) => void,
  minSwipeDistance = 50
) {
  useEffect(() => {
    if (!element.current) return;
    const elem = element.current;

    let touchStartX = 0,
      touchEndX = 0,
      touchStartY = 0,
      touchEndY = 0;

    const onTouchStart = (event: TouchEvent) => {
      event.stopPropagation();

      touchStartX = event.targetTouches[0].clientX;
      touchStartY = event.targetTouches[0].clientY;
    };

    const onTouchMove = (event: TouchEvent) => {
      event.stopPropagation();

      touchEndX = event.targetTouches[0].clientX;
      touchEndY = event.targetTouches[0].clientY;
    };

    const onTouchEnd = (event: TouchEvent) => {
      event.stopPropagation();

      const distanceX = touchEndX - touchStartX;
      const distanceY = touchEndY - touchStartY;

      if (Math.abs(distanceX) > minSwipeDistance && Math.abs(distanceY) > minSwipeDistance) return;

      if (Math.abs(distanceX) > minSwipeDistance) {
        onSwipe(distanceX > 0 ? 'right' : 'left');
      }

      if (Math.abs(distanceY) > minSwipeDistance) {
        onSwipe(distanceY > 0 ? 'bottom' : 'up');
      }
    };

    elem.addEventListener('touchstart', onTouchStart);
    elem.addEventListener('touchmove', onTouchMove);
    elem.addEventListener('touchend', onTouchEnd);

    return () => {
      elem.removeEventListener('touchstart', onTouchStart);
      elem.removeEventListener('touchmove', onTouchMove);
      elem.removeEventListener('touchend', onTouchEnd);
    };
  }, [element, minSwipeDistance, onSwipe]);
}
