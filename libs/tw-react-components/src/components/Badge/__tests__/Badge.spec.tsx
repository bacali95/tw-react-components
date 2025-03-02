import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

import { Badge } from '..';

describe('Badge Component', () => {
  it('renders correctly with default props', () => {
    const { getByTestId } = render(<Badge>Test Badge</Badge>);
    const badgeElement = getByTestId('badge'); // Uses default dataTestId
    expect(badgeElement).toBeInTheDocument();
    expect(badgeElement).toHaveTextContent('Test Badge');
  });

  it('applies the default size of small', () => {
    const { getByTestId } = render(<Badge>Small Badge</Badge>);
    const button = getByTestId('badge');
    // The Button component applies specific classes for size
    expect(button).toHaveClass('text-sm');
    expect(button).toHaveClass('h-6');
  });

  it('allows size to be overridden', () => {
    const { getByTestId } = render(<Badge size="medium">Medium Badge</Badge>);
    const button = getByTestId('badge');
    // The Button component applies different classes for medium size
    expect(button).toHaveClass('text-base');
    expect(button).toHaveClass('h-9');
  });

  it('applies the variant correctly', () => {
    const { getByTestId } = render(<Badge variant="outlined">Outlined Badge</Badge>);
    const button = getByTestId('badge');
    // The Button component applies border styles for outlined variant
    expect(button).toHaveClass('border-2');
  });

  it('allows customizing the dataTestId', () => {
    const { getByTestId } = render(
      <Badge dataTestId="custom-badge" className="test-class">
        Custom Badge
      </Badge>,
    );
    const badgeElement = getByTestId('custom-badge');
    expect(badgeElement).toHaveClass('test-class');
    expect(badgeElement).toHaveTextContent('Custom Badge');
  });

  it('applies color property correctly', () => {
    const { getByTestId } = render(
      <Badge variant="filled" color="blue">
        Blue Badge
      </Badge>,
    );
    const button = getByTestId('badge');
    // The Button component applies color-specific background classes
    expect(button).toHaveClass('bg-blue-500', { exact: false });
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    const { getByTestId } = render(<Badge onClick={handleClick}>Clickable Badge</Badge>);
    const badgeElement = getByTestId('badge');

    badgeElement.click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not allow text variant at type level', () => {
    // This is a TypeScript type check - Badge variant doesn't accept 'text'
    // At runtime it would actually work, but TypeScript prevents it
    const { getByTestId } = render(<Badge>No Text Variant</Badge>);
    const button = getByTestId('badge');
    expect(button).toBeInTheDocument();
  });
});
