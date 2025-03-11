import { fireEvent, render, renderHook, screen } from '@testing-library/react';
import type { ReactNode } from 'react';

import * as helpers from '../../helpers';
import {
  LayoutContextProvider,
  SHOW_IDS_COOKIE_NAME,
  THEME_COOKIE_NAME,
  THEME_MEDIA_QUERY,
  useLayoutContext,
} from '../LayoutContext';

// Mock the helpers module to control cookie values
jest.mock('../../helpers', () => ({
  getValueFromCookie: jest.fn(),
}));

// Mock document methods and properties
Object.defineProperty(document, 'cookie', {
  writable: true,
  value: '',
});

const mockAddEventListener = jest.fn();
const mockRemoveEventListener = jest.fn();

describe('LayoutContext', () => {
  // Create a mock for matchMedia
  const mockMatchMedia = jest.fn().mockImplementation((query) => ({
    matches: false, // Default to light theme
    media: query,
    onchange: null,
    addEventListener: mockAddEventListener,
    removeEventListener: mockRemoveEventListener,
    dispatchEvent: jest.fn(),
  }));

  beforeEach(() => {
    jest.clearAllMocks();
    window.matchMedia = mockMatchMedia;
    document.cookie = '';
    document.documentElement.classList.remove('dark');
  });

  // Test component that displays theme and showIds values
  const TestComponent = () => {
    const { theme, resolvedTheme, showIds, setTheme, toggleShowIds } = useLayoutContext();

    return (
      <div>
        <div data-testid="theme">{theme}</div>
        <div data-testid="resolved-theme">{resolvedTheme}</div>
        <div data-testid="show-ids">{showIds ? 'true' : 'false'}</div>
        <button data-testid="set-light" onClick={() => setTheme('light')}>
          Set Light
        </button>
        <button data-testid="set-dark" onClick={() => setTheme('dark')}>
          Set Dark
        </button>
        <button data-testid="set-system" onClick={() => setTheme('system')}>
          Set System
        </button>
        <button data-testid="toggle-ids" onClick={toggleShowIds}>
          Toggle IDs
        </button>
      </div>
    );
  };

  const renderWithProvider = (ui: ReactNode, { theme, showIds }: any = {}) => {
    return render(
      <LayoutContextProvider theme={theme} showIds={showIds}>
        {ui}
      </LayoutContextProvider>,
    );
  };

  describe('Initial state and cookies', () => {
    it('uses default values when no cookies or props are provided', () => {
      (helpers.getValueFromCookie as jest.Mock).mockImplementation(
        (name, defaultValue) => defaultValue,
      );

      renderWithProvider(<TestComponent />);

      expect(screen.getByTestId('theme').textContent).toBe('system');
      expect(screen.getByTestId('resolved-theme').textContent).toBe('light'); // Default resolved to light
      expect(screen.getByTestId('show-ids').textContent).toBe('false');
    });

    it('reads values from cookies when available', () => {
      (helpers.getValueFromCookie as jest.Mock).mockImplementation((name, defaultValue) => {
        if (name === THEME_COOKIE_NAME) return 'dark';
        if (name === SHOW_IDS_COOKIE_NAME) return true;
        return defaultValue;
      });

      renderWithProvider(<TestComponent />);

      expect(screen.getByTestId('theme').textContent).toBe('dark');
      expect(screen.getByTestId('resolved-theme').textContent).toBe('dark');
      expect(screen.getByTestId('show-ids').textContent).toBe('true');
    });

    it('uses props values when provided, overriding cookies', () => {
      (helpers.getValueFromCookie as jest.Mock).mockImplementation((name, defaultValue) => {
        if (name === THEME_COOKIE_NAME) return 'dark';
        if (name === SHOW_IDS_COOKIE_NAME) return true;
        return defaultValue;
      });

      renderWithProvider(<TestComponent />, { theme: 'light', showIds: false });

      expect(screen.getByTestId('theme').textContent).toBe('light');
      expect(screen.getByTestId('resolved-theme').textContent).toBe('light');
      expect(screen.getByTestId('show-ids').textContent).toBe('false');
    });
  });

  describe('Theme switching', () => {
    it('updates theme and resolvedTheme when setTheme is called', () => {
      (helpers.getValueFromCookie as jest.Mock).mockReturnValue('light');

      renderWithProvider(<TestComponent />);

      // Initial state
      expect(screen.getByTestId('theme').textContent).toBe('light');
      expect(screen.getByTestId('resolved-theme').textContent).toBe('light');

      // Set to dark theme
      fireEvent.click(screen.getByTestId('set-dark'));
      expect(screen.getByTestId('theme').textContent).toBe('dark');
      expect(screen.getByTestId('resolved-theme').textContent).toBe('dark');

      // Set to system theme
      fireEvent.click(screen.getByTestId('set-system'));
      expect(screen.getByTestId('theme').textContent).toBe('system');
      // resolvedTheme depends on system preference, which is mocked to light
      expect(screen.getByTestId('resolved-theme').textContent).toBe('light');
    });

    it('sets a cookie when theme is changed', () => {
      (helpers.getValueFromCookie as jest.Mock).mockReturnValue('light');

      renderWithProvider(<TestComponent />);

      fireEvent.click(screen.getByTestId('set-dark'));

      expect(document.cookie).toContain(`${THEME_COOKIE_NAME}=dark`);
    });

    it('adds dark class to html element when dark theme is active', () => {
      (helpers.getValueFromCookie as jest.Mock).mockReturnValue('light');

      renderWithProvider(<TestComponent />);

      expect(document.documentElement.classList.contains('dark')).toBe(false);

      fireEvent.click(screen.getByTestId('set-dark'));

      expect(document.documentElement.classList.contains('dark')).toBe(true);
    });

    it('removes dark class from html element when light theme is active', () => {
      (helpers.getValueFromCookie as jest.Mock).mockReturnValue('dark');

      renderWithProvider(<TestComponent />);

      // Dark theme should have added the class
      expect(document.documentElement.classList.contains('dark')).toBe(true);

      fireEvent.click(screen.getByTestId('set-light'));

      expect(document.documentElement.classList.contains('dark')).toBe(false);
    });
  });

  describe('System theme detection', () => {
    it('detects system dark preference correctly', () => {
      // Mock system preference to dark
      mockMatchMedia.mockImplementation((query) => ({
        matches: query === THEME_MEDIA_QUERY, // Will be true for dark mode query
        media: query,
        addEventListener: mockAddEventListener,
        removeEventListener: mockRemoveEventListener,
        dispatchEvent: jest.fn(),
      }));

      (helpers.getValueFromCookie as jest.Mock).mockReturnValue('system');

      renderWithProvider(<TestComponent />);

      expect(screen.getByTestId('theme').textContent).toBe('system');
      expect(screen.getByTestId('resolved-theme').textContent).toBe('dark');
    });

    it('listens for system theme changes when theme is set to system', () => {
      (helpers.getValueFromCookie as jest.Mock).mockReturnValue('system');

      renderWithProvider(<TestComponent />);

      expect(mockAddEventListener).toHaveBeenCalledWith('change', expect.any(Function));
    });

    it('removes event listener on unmount', () => {
      (helpers.getValueFromCookie as jest.Mock).mockReturnValue('system');

      const { unmount } = renderWithProvider(<TestComponent />);

      unmount();

      expect(mockRemoveEventListener).toHaveBeenCalledWith('change', expect.any(Function));
    });
  });

  describe('Show IDs functionality', () => {
    it('toggles showIds value when toggleShowIds is called', () => {
      (helpers.getValueFromCookie as jest.Mock).mockReturnValue(false);

      renderWithProvider(<TestComponent />);

      // Initial state
      expect(screen.getByTestId('show-ids').textContent).toBe('false');

      // Toggle to true
      fireEvent.click(screen.getByTestId('toggle-ids'));
      expect(screen.getByTestId('show-ids').textContent).toBe('true');

      // Toggle back to false
      fireEvent.click(screen.getByTestId('toggle-ids'));
      expect(screen.getByTestId('show-ids').textContent).toBe('false');
    });

    it('sets a cookie when showIds is toggled', () => {
      (helpers.getValueFromCookie as jest.Mock).mockReturnValue(false);

      renderWithProvider(<TestComponent />);

      fireEvent.click(screen.getByTestId('toggle-ids'));

      expect(document.cookie).toContain(`${SHOW_IDS_COOKIE_NAME}=true`);
    });
  });

  describe('useLayoutContext hook', () => {
    it('throws an error when used outside of LayoutContextProvider', () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => void 0);

      expect(() => {
        renderHook(() => useLayoutContext());
      }).toThrow('Please use LayoutContextProvider!');

      consoleErrorSpy.mockRestore();
    });

    it('returns the context when used inside LayoutContextProvider', () => {
      (helpers.getValueFromCookie as jest.Mock).mockImplementation((name, defaultValue) => {
        if (name === THEME_COOKIE_NAME) return 'light';
        if (name === SHOW_IDS_COOKIE_NAME) return false;
        return defaultValue;
      });

      const { result } = renderHook(() => useLayoutContext(), {
        wrapper: ({ children }) => <LayoutContextProvider>{children}</LayoutContextProvider>,
      });

      expect(result.current).toEqual({
        theme: 'light',
        resolvedTheme: 'light',
        setTheme: expect.any(Function),
        showIds: false,
        toggleShowIds: expect.any(Function),
      });
    });
  });
});
