import { render, screen } from '@testing-library/react';

import { Spinner } from '..';

describe('Spinner Component', () => {
  it('renders correctly with default props', () => {
    render(<Spinner />);

    const spinner = screen.getByTestId('spinner');
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass(
      'flex',
      'w-full',
      'items-center',
      'justify-center',
      'bg-white',
      'dark:bg-slate-900',
      'h-full',
    );

    const svgElement = spinner.querySelector('svg');
    expect(svgElement).toBeInTheDocument();
    expect(svgElement).toHaveClass('h-8', 'w-8', 'animate-spin', 'text-black', 'dark:text-white');
  });

  it('applies h-full class when fullScreen is false', () => {
    render(<Spinner fullScreen={false} />);

    const spinner = screen.getByTestId('spinner');
    expect(spinner).toHaveClass('h-full');
    expect(spinner).not.toHaveClass('h-screen');
  });

  it('applies h-screen class when fullScreen is true', () => {
    render(<Spinner fullScreen={true} />);

    const spinner = screen.getByTestId('spinner');
    expect(spinner).toHaveClass('h-screen');
    expect(spinner).not.toHaveClass('h-full');
  });

  it('applies custom className while maintaining default classes', () => {
    render(<Spinner className="custom-class bg-gray-200" />);

    const spinner = screen.getByTestId('spinner');
    expect(spinner).toHaveClass(
      'flex',
      'w-full',
      'items-center',
      'justify-center',
      'dark:bg-slate-900',
      'custom-class',
      'bg-gray-200',
    );
  });

  it('applies default dataTestId', () => {
    render(<Spinner />);

    const spinner = screen.getByTestId('spinner');
    expect(spinner).toBeInTheDocument();
  });

  it('applies custom dataTestId when provided', () => {
    render(<Spinner dataTestId="custom-spinner" />);

    const spinner = screen.getByTestId('custom-spinner');
    expect(spinner).toBeInTheDocument();
  });

  it('renders SVG with correct structure', () => {
    render(<Spinner />);

    const spinner = screen.getByTestId('spinner');
    const svgElement = spinner.querySelector('svg');
    expect(svgElement).toBeInTheDocument();

    const circleElement = svgElement?.querySelector('circle');
    expect(circleElement).toBeInTheDocument();
    expect(circleElement).toHaveAttribute('cx', '12');
    expect(circleElement).toHaveAttribute('cy', '12');
    expect(circleElement).toHaveAttribute('r', '10');
    expect(circleElement).toHaveClass('opacity-25');

    const pathElement = svgElement?.querySelector('path');
    expect(pathElement).toBeInTheDocument();
    expect(pathElement).toHaveClass('opacity-75');
  });

  it('combines fullScreen and custom className correctly', () => {
    render(<Spinner fullScreen={true} className="rounded-lg p-4" />);

    const spinner = screen.getByTestId('spinner');
    expect(spinner).toHaveClass('h-screen', 'p-4', 'rounded-lg');
    expect(spinner).not.toHaveClass('h-full');
  });
});
