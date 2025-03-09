import { renderHook } from '@testing-library/react';
import { act } from 'react';

import { useIsMobile } from '../useIsMobile';

// Mock window properties and matchMedia
const originalMatchMedia = window.matchMedia;
const originalInnerWidth = window.innerWidth;

describe('useIsMobile hook', () => {
  // Set up mock for window.matchMedia and window.innerWidth
  beforeEach(() => {
    // Clean up mocks between tests
    jest.restoreAllMocks();

    // Mock matchMedia
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));

    // Mock innerWidth
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024, // Desktop width by default
    });
  });

  // Restore original window properties after tests
  afterAll(() => {
    window.matchMedia = originalMatchMedia;
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: originalInnerWidth,
    });
  });

  it('returns false when window width is >= 768px', () => {
    // Set window width to desktop size
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    });

    // Mock matchMedia to match desktop
    window.matchMedia = jest.fn().mockImplementation(() => ({
      matches: false, // Not mobile
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    }));

    const { result } = renderHook(() => useIsMobile());

    // Initial render should detect desktop
    expect(result.current).toBe(false);
  });

  it('returns true when window width is < 768px', () => {
    // Set window width to mobile size
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 767,
    });

    // Mock matchMedia to match mobile
    window.matchMedia = jest.fn().mockImplementation(() => ({
      matches: true, // Is mobile
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    }));

    const { result } = renderHook(() => useIsMobile());

    // Initial render should detect mobile
    expect(result.current).toBe(true);
  });

  it('responds to window resize', () => {
    // Start with desktop width
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    });

    // Create a mock for the match media event handler
    let mediaQueryChangeHandler: any = null;

    // Mock addEventListener to capture the handler
    const addEventListener = jest.fn().mockImplementation((event, handler) => {
      if (event === 'change') {
        mediaQueryChangeHandler = handler;
      }
    });

    // Mock matchMedia with the addEventListener mock
    window.matchMedia = jest.fn().mockImplementation(() => ({
      matches: false,
      addEventListener,
      removeEventListener: jest.fn(),
    }));

    const { result } = renderHook(() => useIsMobile());

    // Initial render should detect desktop
    expect(result.current).toBe(false);

    // Ensure addEventListener was called
    expect(addEventListener).toHaveBeenCalledWith('change', expect.any(Function));

    // Now simulate a resize to mobile width
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 767,
    });

    // Simulate the media query change
    act(() => {
      if (mediaQueryChangeHandler) {
        mediaQueryChangeHandler();
      }
    });

    // The hook should now report mobile
    expect(result.current).toBe(true);
  });

  it('cleans up event listeners on unmount', () => {
    // Mock removeEventListener to verify it's called
    const removeEventListener = jest.fn();

    window.matchMedia = jest.fn().mockImplementation(() => ({
      matches: false,
      addEventListener: jest.fn(),
      removeEventListener,
    }));

    const { unmount } = renderHook(() => useIsMobile());

    // Unmount the component
    unmount();

    // Verify removeEventListener was called
    expect(removeEventListener).toHaveBeenCalled();
  });
});
