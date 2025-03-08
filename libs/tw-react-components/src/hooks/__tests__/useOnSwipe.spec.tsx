import { renderHook } from '@testing-library/react';
import { createRef } from 'react';

import { useOnSwipe } from '../useOnSwipe';

describe('useOnSwipe hook', () => {
  let elementRef: React.RefObject<HTMLDivElement | null>;
  let element: HTMLDivElement;
  let onSwipeMock: jest.Mock;

  beforeEach(() => {
    // Create a real DOM element for testing
    element = document.createElement('div');
    document.body.appendChild(element);

    // Create a ref that points to the element
    elementRef = createRef();
    elementRef.current = element;

    // Create a mock for the onSwipe callback
    onSwipeMock = jest.fn();

    // Mock addEventListener and removeEventListener
    element.addEventListener = jest.fn();
    element.removeEventListener = jest.fn();
  });

  afterEach(() => {
    // Clean up DOM
    if (element.parentNode) {
      element.parentNode.removeChild(element);
    }
    jest.clearAllMocks();
  });

  it('adds event listeners to the element', () => {
    // Render the hook
    renderHook(() => useOnSwipe(elementRef, onSwipeMock, 50));

    // Verify event listeners were added
    expect(element.addEventListener).toHaveBeenCalledWith('touchstart', expect.any(Function));
    expect(element.addEventListener).toHaveBeenCalledWith('touchmove', expect.any(Function));
    expect(element.addEventListener).toHaveBeenCalledWith('touchend', expect.any(Function));
  });

  it('removes event listeners on unmount', () => {
    // Render the hook and get the unmount function
    const { unmount } = renderHook(() => useOnSwipe(elementRef, onSwipeMock, 50));

    // Unmount the hook
    unmount();

    // Verify event listeners were removed
    expect(element.removeEventListener).toHaveBeenCalledWith('touchstart', expect.any(Function));
    expect(element.removeEventListener).toHaveBeenCalledWith('touchmove', expect.any(Function));
    expect(element.removeEventListener).toHaveBeenCalledWith('touchend', expect.any(Function));
  });

  it('does nothing when element ref is null', () => {
    // Create a ref without a current value
    const nullRef = createRef<HTMLDivElement>();

    // Render the hook with a null ref
    renderHook(() => useOnSwipe(nullRef, onSwipeMock, 50));

    // Verify no event listeners were added (since the ref is null)
    expect(element.addEventListener).not.toHaveBeenCalled();
  });

  // Test the swipe detection by accessing the internal handlers directly
  it('detects swipe directions correctly', () => {
    // Use the hook to set up the event handlers
    renderHook(() => useOnSwipe(elementRef, onSwipeMock, 50));

    // Access the event listeners that were added to the element
    const touchStartHandler = (element.addEventListener as jest.Mock).mock.calls.find(
      (call) => call[0] === 'touchstart',
    )?.[1];

    const touchMoveHandler = (element.addEventListener as jest.Mock).mock.calls.find(
      (call) => call[0] === 'touchmove',
    )?.[1];

    const touchEndHandler = (element.addEventListener as jest.Mock).mock.calls.find(
      (call) => call[0] === 'touchend',
    )?.[1];

    expect(touchStartHandler).toBeDefined();
    expect(touchMoveHandler).toBeDefined();
    expect(touchEndHandler).toBeDefined();

    // Test right swipe
    // Simulate touchstart
    touchStartHandler({
      targetTouches: [{ clientX: 100, clientY: 150 }],
    });

    // Simulate touchmove
    touchMoveHandler({
      targetTouches: [{ clientX: 200, clientY: 150 }], // Moved 100px right
    });

    // Simulate touchend
    const touchEndEvent = { stopPropagation: jest.fn() };
    touchEndHandler(touchEndEvent);

    // Verify right swipe was detected
    expect(onSwipeMock).toHaveBeenCalledWith('right');
    onSwipeMock.mockClear();

    // Test left swipe
    touchStartHandler({
      targetTouches: [{ clientX: 200, clientY: 150 }],
    });

    touchMoveHandler({
      targetTouches: [{ clientX: 100, clientY: 150 }], // Moved 100px left
    });

    touchEndHandler(touchEndEvent);

    // Verify left swipe was detected
    expect(onSwipeMock).toHaveBeenCalledWith('left');
    onSwipeMock.mockClear();

    // Test up swipe
    touchStartHandler({
      targetTouches: [{ clientX: 150, clientY: 200 }],
    });

    touchMoveHandler({
      targetTouches: [{ clientX: 150, clientY: 100 }], // Moved 100px up
    });

    touchEndHandler(touchEndEvent);

    // Verify up swipe was detected
    expect(onSwipeMock).toHaveBeenCalledWith('up');
    onSwipeMock.mockClear();

    // Test down swipe
    touchStartHandler({
      targetTouches: [{ clientX: 150, clientY: 100 }],
    });

    touchMoveHandler({
      targetTouches: [{ clientX: 150, clientY: 200 }], // Moved 100px down
    });

    touchEndHandler(touchEndEvent);

    // Verify bottom swipe was detected
    expect(onSwipeMock).toHaveBeenCalledWith('bottom');
  });

  it('respects minimum swipe distance', () => {
    // Render the hook with a larger min swipe distance
    renderHook(() => useOnSwipe(elementRef, onSwipeMock, 100));

    // Access the event listeners that were added to the element
    const touchStartHandler = (element.addEventListener as jest.Mock).mock.calls.find(
      (call) => call[0] === 'touchstart',
    )?.[1];

    const touchMoveHandler = (element.addEventListener as jest.Mock).mock.calls.find(
      (call) => call[0] === 'touchmove',
    )?.[1];

    const touchEndHandler = (element.addEventListener as jest.Mock).mock.calls.find(
      (call) => call[0] === 'touchend',
    )?.[1];

    // Test a swipe that's too short (only 50px)
    touchStartHandler({
      targetTouches: [{ clientX: 100, clientY: 150 }],
    });

    touchMoveHandler({
      targetTouches: [{ clientX: 150, clientY: 150 }], // Only moved 50px right
    });

    touchEndHandler({});

    // Verify onSwipe was not called
    expect(onSwipeMock).not.toHaveBeenCalled();
  });

  it('handles returned value from onSwipe callback correctly', () => {
    // First, mock the callback to return true
    onSwipeMock.mockReturnValue(true);

    // Render the hook
    renderHook(() => useOnSwipe(elementRef, onSwipeMock, 50));

    // Access the event listeners
    const touchStartHandler = (element.addEventListener as jest.Mock).mock.calls.find(
      (call) => call[0] === 'touchstart',
    )?.[1];

    const touchMoveHandler = (element.addEventListener as jest.Mock).mock.calls.find(
      (call) => call[0] === 'touchmove',
    )?.[1];

    const touchEndHandler = (element.addEventListener as jest.Mock).mock.calls.find(
      (call) => call[0] === 'touchend',
    )?.[1];

    // Test a right swipe
    touchStartHandler({
      targetTouches: [{ clientX: 100, clientY: 150 }],
    });

    touchMoveHandler({
      targetTouches: [{ clientX: 200, clientY: 150 }], // Moved 100px right
    });

    // Create an event with stopPropagation spy
    const touchEndEvent = { stopPropagation: jest.fn() };
    touchEndHandler(touchEndEvent);

    // Verify stopPropagation was called because onSwipe returned true
    expect(touchEndEvent.stopPropagation).toHaveBeenCalled();

    // Reset for the next test
    onSwipeMock.mockClear();
    onSwipeMock.mockReturnValue(false);

    // Test again with onSwipe returning false
    touchStartHandler({
      targetTouches: [{ clientX: 100, clientY: 150 }],
    });

    touchMoveHandler({
      targetTouches: [{ clientX: 200, clientY: 150 }], // Moved 100px right
    });

    // Create a new event with stopPropagation spy
    const touchEndEvent2 = { stopPropagation: jest.fn() };
    touchEndHandler(touchEndEvent2);

    // Verify stopPropagation was NOT called because onSwipe returned false
    expect(touchEndEvent2.stopPropagation).not.toHaveBeenCalled();
  });
});
