import { render, screen } from '@testing-library/react';

import { FormGroup } from '../FormGroup';

describe('FormGroup', () => {
  it('should render with correct structure', () => {
    render(
      <FormGroup label="Test Group">
        <div>Test Content</div>
      </FormGroup>,
    );

    const group = screen.getByText('Test Group').parentElement;
    expect(group).toHaveClass('relative', '!gap-4', 'rounded-lg', 'border', 'p-4');
    expect(group?.querySelector('.absolute')).toHaveClass(
      'absolute',
      'right-0',
      'top-0',
      'rounded-bl-lg',
      'rounded-tr-lg',
      'bg-slate-500',
      'px-2',
      'py-1',
      'font-medium',
      'text-white',
    );
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('should apply custom className', () => {
    render(
      <FormGroup label="Test Group" className="custom-class">
        <div>Test Content</div>
      </FormGroup>,
    );

    const group = screen.getByText('Test Group').parentElement;
    expect(group).toHaveClass('custom-class');
  });

  it('should render children correctly', () => {
    render(
      <FormGroup label="Test Group">
        <div>Child 1</div>
        <div>Child 2</div>
      </FormGroup>,
    );

    expect(screen.getByText('Child 1')).toBeInTheDocument();
    expect(screen.getByText('Child 2')).toBeInTheDocument();
  });

  it('should handle dark mode classes', () => {
    render(
      <FormGroup label="Test Group">
        <div>Test Content</div>
      </FormGroup>,
    );

    const group = screen.getByText('Test Group').parentElement;
    expect(group).toHaveClass('dark:border-slate-700');
    expect(group?.querySelector('.absolute')).toHaveClass('dark:bg-slate-900', 'dark:text-white');
  });
});
