import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

import { Hint } from '..';

describe('Hint Component', () => {
  it('renders correctly with default props', () => {
    const { getByTestId } = render(
      <Hint>
        <div>Test Content</div>
      </Hint>,
    );
    const hintElement = getByTestId('hint');
    expect(hintElement).toBeInTheDocument();
    expect(hintElement).toHaveTextContent('Test Content');
  });

  it('renders dot with default props', () => {
    const { getByTestId } = render(
      <Hint>
        <Hint.Dot />
        <div>Test Content</div>
      </Hint>,
    );
    const dotElement = getByTestId('hint-dot');
    expect(dotElement).toBeInTheDocument();
    expect(dotElement).toHaveClass('bg-green-500');
    expect(dotElement).toHaveClass('rounded-full');
  });

  it('renders badge with default props', () => {
    const { getByTestId } = render(
      <Hint>
        <Hint.Badge>New</Hint.Badge>
        <div>Test Content</div>
      </Hint>,
    );
    const badgeElement = getByTestId('hint-badge');
    expect(badgeElement).toBeInTheDocument();
    expect(badgeElement).toHaveTextContent('New');
    expect(badgeElement).toHaveClass('bg-slate-100');
  });

  it('handles dark mode classes for dot', () => {
    const { getByTestId } = render(
      <Hint>
        <Hint.Dot color="red" />
        <div>Test Content</div>
      </Hint>,
    );
    const dotElement = getByTestId('hint-dot');
    expect(dotElement).toHaveClass('dark:bg-red-600');
  });

  it('applies custom class names', () => {
    const { getByTestId } = render(
      <Hint>
        <Hint.Badge className="custom-badge">New</Hint.Badge>
        <div>Test Content</div>
      </Hint>,
    );
    const badgeElement = getByTestId('hint-badge');
    expect(badgeElement).toHaveClass('custom-badge');
  });

  it('handles different placements for dot', () => {
    const placements = ['top-left', 'top-right', 'bottom-right', 'bottom-left'] as const;
    placements.forEach((placement) => {
      const { getByTestId, unmount } = render(
        <Hint>
          <Hint.Dot placement={placement} />
          <div>Test Content</div>
        </Hint>,
      );
      const dotElement = getByTestId('hint-dot');
      expect(dotElement).toHaveClass(
        placement === 'top-left'
          ? '-top-1 -left-1'
          : placement === 'top-right'
            ? '-top-1 -right-1'
            : placement === 'bottom-right'
              ? '-bottom-1 -right-1'
              : '-bottom-1 -left-1',
      );

      unmount();
    });
  });

  it('handles different sizes for dot', () => {
    const sizes = ['small', 'medium'] as const;
    sizes.forEach((size) => {
      const { getByTestId, unmount } = render(
        <Hint>
          <Hint.Dot size={size} />
          <div>Test Content</div>
        </Hint>,
      );
      const dotElement = getByTestId('hint-dot');
      expect(dotElement).toHaveClass(size === 'small' ? 'h-1.5 w-1.5' : 'h-2.5 w-2.5');

      unmount();
    });
  });

  it('handles different placements for badge', () => {
    const placements = ['top-left', 'top-right', 'bottom-right', 'bottom-left'] as const;
    placements.forEach((placement) => {
      const { getByTestId, unmount } = render(
        <Hint>
          <Hint.Badge placement={placement}>New</Hint.Badge>
          <div>Test Content</div>
        </Hint>,
      );
      const badgeElement = getByTestId('hint-badge');
      expect(badgeElement).toHaveClass(
        placement === 'top-left'
          ? 'top-0 -translate-y-1/2 left-2 -translate-x-full'
          : placement === 'top-right'
            ? 'top-0 -translate-y-1/2 right-2 translate-x-full'
            : placement === 'bottom-right'
              ? 'bottom-0 translate-y-1/2 right-2 translate-x-full'
              : 'bottom-0 translate-y-1/2 left-2 -translate-x-full',
      );

      unmount();
    });
  });

  it('handles different sizes for badge', () => {
    const sizes = ['small', 'medium'] as const;
    sizes.forEach((size) => {
      const { getByTestId, unmount } = render(
        <Hint>
          <Hint.Badge size={size}>New</Hint.Badge>
          <div>Test Content</div>
        </Hint>,
      );
      const badgeElement = getByTestId('hint-badge');
      expect(badgeElement).toHaveClass(size === 'small' ? 'h-4' : 'h-5');

      unmount();
    });
  });

  it('handles different variants for badge', () => {
    const variants = ['filled', 'outlined'] as const;
    variants.forEach((variant) => {
      const { getByTestId, unmount } = render(
        <Hint>
          <Hint.Badge variant={variant}>New</Hint.Badge>
          <div>Test Content</div>
        </Hint>,
      );
      const badgeElement = getByTestId('hint-badge');
      expect(badgeElement).toHaveClass(
        variant === 'filled'
          ? 'bg-slate-100 dark:bg-slate-900/70'
          : 'border-2 dark:border-slate-600',
      );

      unmount();
    });
  });

  it('handles different colors for badge', () => {
    const colors = ['red', 'blue', 'green'] as const;
    colors.forEach((color) => {
      const { getByTestId, unmount } = render(
        <Hint>
          <Hint.Badge color={color}>New</Hint.Badge>
          <div>Test Content</div>
        </Hint>,
      );
      const badgeElement = getByTestId('hint-badge');
      expect(badgeElement).toHaveClass(
        color === 'red'
          ? 'bg-red-500 text-white'
          : color === 'blue'
            ? 'bg-blue-500 text-white'
            : 'bg-green-500 text-white',
      );

      unmount();
    });
  });

  it('handles ping animation for dot', () => {
    const { getByTestId } = render(
      <Hint>
        <Hint.Dot ping />
        <div>Test Content</div>
      </Hint>,
    );
    const pingElement = getByTestId('hint-dot').nextElementSibling;
    expect(pingElement).toHaveClass('animate-ping');
    expect(pingElement).toHaveClass('rounded-full');
  });
});
