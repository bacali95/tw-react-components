import { act, renderHook } from '@testing-library/react';

import { useToast } from '../useToast';

describe('useToast Hook', () => {
  beforeEach(() => {
    // Reset the state before each test
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should initialize with empty toasts array', () => {
    const { result } = renderHook(() => useToast());

    expect(result.current.toasts).toEqual([]);
  });

  it('should add a toast', () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      result.current.toast({
        title: 'Test Toast',
        description: 'Test Description',
      });
    });

    expect(result.current.toasts).toHaveLength(1);
    expect(result.current.toasts[0]).toMatchObject({
      title: 'Test Toast',
      description: 'Test Description',
      open: true,
    });
  });

  it('should limit the number of toasts to 1', () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      result.current.toast({ title: 'First Toast' });
      result.current.toast({ title: 'Second Toast' });
    });

    expect(result.current.toasts).toHaveLength(1);
    expect(result.current.toasts[0].title).toBe('Second Toast');
  });

  it('should update an existing toast', () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      result.current.toast({
        title: 'Original Title',
        description: 'Original Description',
      });
    });

    act(() => {
      result.current.toast({
        title: 'Updated Title',
        description: 'Updated Description',
      });
    });

    expect(result.current.toasts).toHaveLength(1);
    expect(result.current.toasts[0]).toMatchObject({
      title: 'Updated Title',
      description: 'Updated Description',
    });
  });

  it('should dismiss a specific toast', () => {
    const { result } = renderHook(() => useToast());

    let toastId: string | undefined;

    act(() => {
      const { id } = result.current.toast({ title: 'Test Toast' });
      toastId = id;
    });

    if (toastId) {
      act(() => {
        result.current.dismiss(toastId);
      });

      expect(result.current.toasts[0].open).toBe(false);

      act(() => {
        jest.advanceTimersByTime(5000);
      });

      expect(result.current.toasts).toHaveLength(0);
    }
  });

  it('should dismiss all toasts', () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      result.current.toast({ title: 'First Toast' });
      result.current.toast({ title: 'Second Toast' });
    });

    act(() => {
      result.current.dismiss();
    });

    expect(result.current.toasts[0].open).toBe(false);

    // Fast-forward the timer to trigger removal
    act(() => {
      jest.advanceTimersByTime(5000);
    });

    expect(result.current.toasts).toHaveLength(0);
  });

  it('should handle toast with action', () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      result.current.toast({
        title: 'Action Toast',
        action: <button>Click Me</button>,
      });
    });

    expect(result.current.toasts[0]).toMatchObject({
      title: 'Action Toast',
      action: expect.any(Object),
    });
  });

  it('should handle toast with different variants', () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      result.current.toast({
        title: 'Default Toast',
        variant: 'default',
      });
      result.current.toast({
        title: 'Success Toast',
        variant: 'success',
      });
      result.current.toast({
        title: 'Destructive Toast',
        variant: 'destructive',
      });
    });

    expect(result.current.toasts[0]).toMatchObject({
      title: 'Destructive Toast',
      variant: 'destructive',
    });
  });

  it('should handle toast with onOpenChange callback', () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      result.current.toast({
        title: 'Test Toast',
        onOpenChange: (open) => {
          if (!open) {
            result.current.dismiss();
          }
        },
      });
    });

    // Simulate onOpenChange(false)
    act(() => {
      result.current.toasts[0].onOpenChange?.(false);
    });

    expect(result.current.toasts[0].open).toBe(false);
  });

  it('should clean up listeners on unmount', () => {
    const { result, unmount } = renderHook(() => useToast());

    // Add a toast to ensure listeners are set up
    act(() => {
      result.current.toast({ title: 'Test Toast' });
    });

    // Unmount the hook
    unmount();

    // Add another toast after unmount
    act(() => {
      result.current.toast({ title: 'New Toast' });
    });

    // The state should not be updated since the listener was removed
    expect(result.current.toasts).toHaveLength(1);
    expect(result.current.toasts[0].title).toBe('Test Toast');
  });
});
