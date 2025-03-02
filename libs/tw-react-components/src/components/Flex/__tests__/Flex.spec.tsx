import { render, screen } from '@testing-library/react';

import { Flex } from '..';

describe('Flex', () => {
  it('should render children correctly', () => {
    render(
      <Flex>
        <div>Child 1</div>
        <div>Child 2</div>
      </Flex>,
    );

    const container = screen.getByTestId('flex');
    expect(container).toBeInTheDocument();
    expect(container).toHaveClass('flex', 'gap-2');
    expect(container.children).toHaveLength(2);
  });

  it('should apply correct direction classes', () => {
    const { rerender } = render(
      <Flex direction="row">
        <div>Child</div>
      </Flex>,
    );

    let container = screen.getByTestId('flex');
    expect(container).toHaveClass('flex-row');

    rerender(
      <Flex direction="column">
        <div>Child</div>
      </Flex>,
    );

    container = screen.getByTestId('flex');
    expect(container).toHaveClass('flex-col');
  });

  it('should handle reverse prop correctly', () => {
    const { rerender } = render(
      <Flex direction="row" reverse>
        <div>Child</div>
      </Flex>,
    );

    let container = screen.getByTestId('flex');
    expect(container).toHaveClass('flex-row-reverse');

    rerender(
      <Flex direction="column" reverse>
        <div>Child</div>
      </Flex>,
    );

    container = screen.getByTestId('flex');
    expect(container).toHaveClass('flex-col-reverse');
  });

  it('should apply wrap class when wrap prop is true', () => {
    render(
      <Flex wrap>
        <div>Child</div>
      </Flex>,
    );

    const container = screen.getByTestId('flex');
    expect(container).toHaveClass('flex-wrap');
  });

  it('should apply correct alignment classes', () => {
    const { rerender } = render(
      <Flex align="start">
        <div>Child</div>
      </Flex>,
    );

    let container = screen.getByTestId('flex');
    expect(container).toHaveClass('items-start');

    rerender(
      <Flex align="center">
        <div>Child</div>
      </Flex>,
    );

    container = screen.getByTestId('flex');
    expect(container).toHaveClass('items-center');

    rerender(
      <Flex align="end">
        <div>Child</div>
      </Flex>,
    );

    container = screen.getByTestId('flex');
    expect(container).toHaveClass('items-end');
  });

  it('should apply correct justify classes', () => {
    const { rerender } = render(
      <Flex justify="start">
        <div>Child</div>
      </Flex>,
    );

    let container = screen.getByTestId('flex');
    expect(container).toHaveClass('justify-start');

    rerender(
      <Flex justify="center">
        <div>Child</div>
      </Flex>,
    );

    container = screen.getByTestId('flex');
    expect(container).toHaveClass('justify-center');

    rerender(
      <Flex justify="end">
        <div>Child</div>
      </Flex>,
    );

    container = screen.getByTestId('flex');
    expect(container).toHaveClass('justify-end');

    rerender(
      <Flex justify="between">
        <div>Child</div>
      </Flex>,
    );

    container = screen.getByTestId('flex');
    expect(container).toHaveClass('justify-between');
  });

  it('should apply custom className correctly', () => {
    render(
      <Flex className="custom-class">
        <div>Child</div>
      </Flex>,
    );

    const container = screen.getByTestId('flex');
    expect(container).toHaveClass('custom-class');
  });

  it('should apply default props correctly', () => {
    render(
      <Flex>
        <div>Child</div>
      </Flex>,
    );

    const container = screen.getByTestId('flex');
    expect(container).toHaveClass('flex-row', 'items-start', 'justify-start');
  });

  it('should combine multiple props correctly', () => {
    render(
      <Flex
        direction="column"
        reverse
        wrap
        align="center"
        justify="between"
        className="custom-class"
      >
        <div>Child 1</div>
        <div>Child 2</div>
      </Flex>,
    );

    const container = screen.getByTestId('flex');
    expect(container).toHaveClass(
      'flex',
      'gap-2',
      'flex-wrap',
      'flex-col-reverse',
      'items-center',
      'justify-between',
      'custom-class',
    );
  });

  it('should pass through additional props to Block component', () => {
    render(
      <Flex id="custom-id" role="navigation" aria-label="Navigation">
        <div>Child</div>
      </Flex>,
    );

    const container = screen.getByTestId('flex');
    expect(container).toHaveAttribute('id', 'custom-id');
    expect(container).toHaveAttribute('role', 'navigation');
    expect(container).toHaveAttribute('aria-label', 'Navigation');
  });
});
