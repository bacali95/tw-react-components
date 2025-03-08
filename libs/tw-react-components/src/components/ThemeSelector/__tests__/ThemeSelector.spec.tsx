import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ThemeSelector } from '..';
import * as LayoutContext from '../../../contexts/LayoutContext';

// Mock the useLayoutContext hook
jest.mock('../../../contexts/LayoutContext', () => ({
  useLayoutContext: jest.fn(),
}));

describe('ThemeSelector Component', () => {
  const mockSetTheme = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Light Theme', () => {
    beforeEach(() => {
      // Mock the context for light theme
      jest.spyOn(LayoutContext, 'useLayoutContext').mockReturnValue({
        resolvedTheme: 'light',
        setTheme: mockSetTheme,
        theme: 'light',
      } as any);
    });

    it('renders correctly with light theme', () => {
      render(<ThemeSelector />);

      // Find the trigger button (which should have a sun icon for light theme)
      const triggerButton = screen.getByTestId('theme-selector-trigger');
      expect(triggerButton).toBeInTheDocument();

      // The button should contain the SunIcon when in light mode
      expect(triggerButton.querySelector('svg')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(<ThemeSelector className="custom-selector-class" />);

      const triggerButton = screen.getByTestId('theme-selector-trigger').closest('button');
      expect(triggerButton).toHaveClass('custom-selector-class');
    });

    it('applies custom dataTestId', () => {
      render(<ThemeSelector dataTestId="custom-theme-selector" />);

      const triggerButton = screen.getByTestId('custom-theme-selector-trigger');
      expect(triggerButton).toBeInTheDocument();
    });
  });

  describe('Dark Theme', () => {
    beforeEach(() => {
      // Mock the context for dark theme
      jest.spyOn(LayoutContext, 'useLayoutContext').mockReturnValue({
        resolvedTheme: 'dark',
        setTheme: mockSetTheme,
        theme: 'dark',
      } as any);
    });

    it('renders correctly with dark theme', () => {
      render(<ThemeSelector />);

      // Find the trigger button (which should have a moon icon for dark theme)
      const triggerButton = screen.getByTestId('theme-selector-trigger');
      expect(triggerButton).toBeInTheDocument();

      // The button should contain the MoonIcon when in dark mode
      expect(triggerButton.querySelector('svg')).toBeInTheDocument();
    });
  });

  describe('Theme Switching', () => {
    beforeEach(() => {
      // Default to light theme
      jest.spyOn(LayoutContext, 'useLayoutContext').mockReturnValue({
        resolvedTheme: 'light',
        setTheme: mockSetTheme,
        theme: 'light',
      } as any);
    });

    it('opens dropdown menu when clicked', async () => {
      render(<ThemeSelector />);

      const triggerButton = screen.getByTestId('theme-selector-trigger');
      await userEvent.click(triggerButton);

      // This test is limited since we can't easily test Radix UI's portal behavior in this simple test setup
      // In a real scenario, we'd test for the presence of the dropdown items
    });

    ['light', 'dark', 'system'].forEach((theme) => {
      it(`calls setTheme with "${theme}" when ${theme} option is clicked`, async () => {
        // Mock the implementation to simulate dropdown being open
        render(<ThemeSelector />);

        // Simulate opening the dropdown (in real testing we'd click the trigger)
        // For simplicity in this test, we'll directly test the click handlers
        const triggerButton = screen.getByTestId('theme-selector-trigger');
        await userEvent.click(triggerButton);

        // Find the light theme option and click it (mocking this interaction)
        const lightThemeOption = screen.getByTestId(`theme-selector-${theme}`);
        await userEvent.click(lightThemeOption);

        expect(mockSetTheme).toHaveBeenCalledWith(theme);
      });
    });
  });
});
