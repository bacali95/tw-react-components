import { act, renderHook } from '@testing-library/react';

import { useLongPress } from '../useLongPress';

// Mock timer functions
jest.useFakeTimers();

describe('useLongPress hook', () => {
  afterEach(() => {
    jest.clearAllTimers();
  });

  it('returns expected event handlers', () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useLongPress(callback));

    // Check that all event handlers are returned
    expect(result.current).toHaveProperty('onMouseDown');
    expect(result.current).toHaveProperty('onMouseUp');
    expect(result.current).toHaveProperty('onMouseLeave');
    expect(result.current).toHaveProperty('onTouchStart');
    expect(result.current).toHaveProperty('onTouchEnd');

    // Check that all returned properties are functions
    expect(typeof result.current.onMouseDown).toBe('function');
    expect(typeof result.current.onMouseUp).toBe('function');
    expect(typeof result.current.onMouseLeave).toBe('function');
    expect(typeof result.current.onTouchStart).toBe('function');
    expect(typeof result.current.onTouchEnd).toBe('function');
  });

  it('calls callback after default delay when mouse is pressed', () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useLongPress(callback));

    // Start long press
    act(() => {
      result.current.onMouseDown();
    });

    // Verify callback hasn't been called yet
    expect(callback).not.toHaveBeenCalled();

    // Advance timers to trigger the callback
    act(() => {
      jest.advanceTimersByTime(100); // Default delay is 100ms
    });

    // Verify callback has been called
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('calls callback after custom delay when mouse is pressed', () => {
    const callback = jest.fn();
    const customDelay = 500;
    const { result } = renderHook(() => useLongPress(callback, customDelay));

    // Start long press
    act(() => {
      result.current.onMouseDown();
    });

    // Advance timers but not enough to trigger callback
    act(() => {
      jest.advanceTimersByTime(499);
    });

    // Verify callback hasn't been called yet
    expect(callback).not.toHaveBeenCalled();

    // Advance timers more to trigger the callback
    act(() => {
      jest.advanceTimersByTime(1);
    });

    // Verify callback has been called
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('does not call callback if mouse up occurs before delay', () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useLongPress(callback, 100));

    // Start long press
    act(() => {
      result.current.onMouseDown();
    });

    // Advance timers but not enough to trigger callback
    act(() => {
      jest.advanceTimersByTime(50);
    });

    // Release before the delay
    act(() => {
      result.current.onMouseUp();
    });

    // Advance timers past the delay
    act(() => {
      jest.advanceTimersByTime(50);
    });

    // Verify callback hasn't been called
    expect(callback).not.toHaveBeenCalled();
  });

  it('does not call callback if mouse leave occurs before delay', () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useLongPress(callback, 100));

    // Start long press
    act(() => {
      result.current.onMouseDown();
    });

    // Advance timers but not enough to trigger callback
    act(() => {
      jest.advanceTimersByTime(50);
    });

    // Mouse leaves before the delay
    act(() => {
      result.current.onMouseLeave();
    });

    // Advance timers past the delay
    act(() => {
      jest.advanceTimersByTime(50);
    });

    // Verify callback hasn't been called
    expect(callback).not.toHaveBeenCalled();
  });

  it('calls callback after delay when touch starts', () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useLongPress(callback));

    // Start touch
    act(() => {
      result.current.onTouchStart();
    });

    // Verify callback hasn't been called yet
    expect(callback).not.toHaveBeenCalled();

    // Advance timers to trigger the callback
    act(() => {
      jest.advanceTimersByTime(100);
    });

    // Verify callback has been called
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('does not call callback if touch ends before delay', () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useLongPress(callback, 100));

    // Start touch
    act(() => {
      result.current.onTouchStart();
    });

    // Advance timers but not enough to trigger callback
    act(() => {
      jest.advanceTimersByTime(50);
    });

    // End touch before the delay
    act(() => {
      result.current.onTouchEnd();
    });

    // Advance timers past the delay
    act(() => {
      jest.advanceTimersByTime(50);
    });

    // Verify callback hasn't been called
    expect(callback).not.toHaveBeenCalled();
  });

  it('cleans up timeout on unmount', () => {
    const callback = jest.fn();
    const { result, unmount } = renderHook(() => useLongPress(callback));

    // Start long press
    act(() => {
      result.current.onMouseDown();
    });

    // Unmount the component
    unmount();

    // Advance timers
    act(() => {
      jest.advanceTimersByTime(100);
    });

    // Verify callback hasn't been called
    expect(callback).not.toHaveBeenCalled();
  });
});
