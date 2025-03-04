import { render, screen } from '@testing-library/react';

import { Separator } from '..';

describe('Separator Component', () => {
  it('renders correctly with default props', () => {
    render(<Separator />);

    const separator = screen.getByTestId('separator');
    expect(separator).toBeInTheDocument();
    expect(separator).toHaveAttribute('data-orientation', 'horizontal');
    expect(separator).toHaveClass('h-[1px]', 'w-full');
  });

  it('applies horizontal orientation correctly', () => {
    render(<Separator orientation="horizontal" />);

    const separator = screen.getByTestId('separator');
    expect(separator).toHaveAttribute('data-orientation', 'horizontal');
    expect(separator).toHaveClass('h-[1px]', 'w-full');
  });

  it('applies vertical orientation correctly', () => {
    render(<Separator orientation="vertical" />);

    const separator = screen.getByTestId('separator');
    expect(separator).toHaveAttribute('data-orientation', 'vertical');
    expect(separator).toHaveClass('h-full', 'w-[1px]');
  });

  it('applies custom className', () => {
    render(<Separator className="custom-class" />);

    const separator = screen.getByTestId('separator');
    expect(separator).toHaveClass('custom-class');
    // Should still have the default classes
    expect(separator).toHaveClass('bg-border', 'h-[1px]', 'w-full');
  });

  it('sets decorative attribute correctly', () => {
    render(<Separator decorative={false} />);

    const separator = screen.getByTestId('separator');
    expect(separator).not.toHaveAttribute('aria-hidden');
  });

  it('applies default dataTestId', () => {
    render(<Separator />);

    const separator = screen.getByTestId('separator');
    expect(separator).toBeInTheDocument();
  });

  it('applies custom dataTestId', () => {
    render(<Separator dataTestId="custom-separator" />);

    const separator = screen.getByTestId('custom-separator');
    expect(separator).toBeInTheDocument();
  });

  it('forwards additional props to the root element', () => {
    render(<Separator id="test-id" data-custom="test-value" />);

    const separator = screen.getByTestId('separator');
    expect(separator).toHaveAttribute('id', 'test-id');
    expect(separator).toHaveAttribute('data-custom', 'test-value');
  });

  it('renders with correct base styles', () => {
    render(<Separator />);

    const separator = screen.getByTestId('separator');
    expect(separator).toHaveClass('bg-border');
    expect(separator).toHaveClass('shrink-0');
  });

  it('combines custom className with orientation-specific classes', () => {
    render(<Separator orientation="vertical" className="text-red-500" />);

    const separator = screen.getByTestId('separator');
    expect(separator).toHaveClass('h-full', 'w-[1px]', 'text-red-500');
  });
});
