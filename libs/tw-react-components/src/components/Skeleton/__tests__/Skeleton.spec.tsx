import { render, screen } from '@testing-library/react';

import { Skeleton } from '..';

describe('Skeleton Component', () => {
  it('renders correctly with default props', () => {
    render(<Skeleton />);

    const skeleton = screen.getByTestId('skeleton');
    expect(skeleton).toBeInTheDocument();
    expect(skeleton).toHaveClass('bg-muted', 'animate-pulse', 'rounded-md');
  });

  it('applies custom className while maintaining default classes', () => {
    render(<Skeleton className="custom-class h-10 w-20" />);

    const skeleton = screen.getByTestId('skeleton');
    expect(skeleton).toHaveClass(
      'bg-muted',
      'animate-pulse',
      'rounded-md',
      'custom-class',
      'h-10',
      'w-20',
    );
  });

  it('applies custom dataTestId when provided', () => {
    render(<Skeleton dataTestId="custom-skeleton" />);

    const skeleton = screen.getByTestId('custom-skeleton');
    expect(skeleton).toBeInTheDocument();
  });

  it('forwards additional props to the root element', () => {
    render(<Skeleton id="test-id" data-custom="test-value" aria-label="loading" />);

    const skeleton = screen.getByTestId('skeleton');
    expect(skeleton).toHaveAttribute('id', 'test-id');
    expect(skeleton).toHaveAttribute('data-custom', 'test-value');
    expect(skeleton).toHaveAttribute('aria-label', 'loading');
  });

  it('renders with various dimensions', () => {
    render(
      <>
        <Skeleton className="h-4 w-full" data-testid="full-width" />
        <Skeleton className="h-10 w-10" data-testid="square" />
        <Skeleton className="h-20 w-40" data-testid="rectangle" />
      </>,
    );

    const fullWidth = screen.getByTestId('full-width');
    const square = screen.getByTestId('square');
    const rectangle = screen.getByTestId('rectangle');

    expect(fullWidth).toHaveClass('w-full', 'h-4');
    expect(square).toHaveClass('w-10', 'h-10');
    expect(rectangle).toHaveClass('w-40', 'h-20');
  });
});
