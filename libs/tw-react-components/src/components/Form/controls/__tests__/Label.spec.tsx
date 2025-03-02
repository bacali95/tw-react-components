import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Label } from '../Label';

describe('Label', () => {
  it('should render with correct structure', () => {
    render(<Label>Test Label</Label>);

    const label = screen.getByTestId('label');
    expect(label).toHaveClass('flex', 'items-center', 'gap-1', 'font-medium');
    expect(label).toHaveTextContent('Test Label');
  });

  it('should not render when children is not provided', () => {
    const { container } = render(<Label />);
    expect(container).toBeEmptyDOMElement();
  });

  it('should apply custom className', () => {
    render(<Label className="custom-class">Test Label</Label>);

    const label = screen.getByTestId('label');
    expect(label).toHaveClass('custom-class');
  });

  it.skip('should handle description with tooltip', async () => {
    render(<Label description="Test Description">Test Label</Label>);

    const helpIcon = screen.getByTestId('label-description-tooltip-icon');
    expect(helpIcon).toBeInTheDocument();
    expect(helpIcon).toHaveClass('h-4', 'w-4');

    // Hover to show tooltip
    await userEvent.click(helpIcon);
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('should show required indicator', () => {
    render(<Label required>Test Label</Label>);

    const requiredIndicator = screen.getByText('*');
    expect(requiredIndicator).toHaveClass('text-red-600');
  });

  it('should handle error state', () => {
    render(<Label hasErrors>Test Label</Label>);

    const label = screen.getByTestId('label');
    expect(label).toHaveClass('text-red-600');
    expect(label).not.toHaveClass('text-slate-700');
  });

  it('should handle htmlFor attribute', () => {
    render(<Label htmlFor="test-input">Test Label</Label>);

    const label = screen.getByTestId('label');
    expect(label).toHaveAttribute('for', 'test-input');
  });

  it('should handle dark mode classes', () => {
    render(<Label hasErrors>Test Label</Label>);

    const label = screen.getByTestId('label');
    expect(label).toHaveClass('dark:text-red-500');

    const { rerender } = render(<Label>Test Label</Label>);
    const normalLabel = screen.getAllByTestId('label')[1];
    expect(normalLabel).toHaveClass('dark:text-slate-100');
  });

  it('should use custom dataTestId', () => {
    render(<Label dataTestId="custom-label">Test Label</Label>);

    expect(screen.getByTestId('custom-label')).toBeInTheDocument();
  });
});
