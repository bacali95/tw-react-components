import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { AlertCircle, ArrowRight } from 'lucide-react';

import { Button } from '..';

describe('Button Component', () => {
  it('renders correctly with default props', () => {
    const { getByTestId } = render(<Button>Click Me</Button>);
    const buttonElement = getByTestId('button');
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveTextContent('Click Me');
  });

  it('applies medium size by default', () => {
    const { getByTestId } = render(<Button>Default Size</Button>);
    const buttonElement = getByTestId('button');
    expect(buttonElement).toHaveClass('text-base');
    expect(buttonElement).toHaveClass('h-9');
  });

  it('applies small size when specified', () => {
    const { getByTestId } = render(<Button size="small">Small Button</Button>);
    const buttonElement = getByTestId('button');
    expect(buttonElement).toHaveClass('text-sm');
    expect(buttonElement).toHaveClass('h-6');
  });

  it('applies filled variant by default', () => {
    const { getByTestId } = render(<Button>Default Variant</Button>);
    const buttonElement = getByTestId('button');
    // Should have slate background for default color in filled variant
    expect(buttonElement).toHaveClass('bg-slate-100', { exact: false });
  });

  it('applies outlined variant correctly', () => {
    const { getByTestId } = render(<Button variant="outlined">Outlined Button</Button>);
    const buttonElement = getByTestId('button');
    expect(buttonElement).toHaveClass('border-2');
  });

  it('applies text variant correctly', () => {
    const { getByTestId } = render(<Button variant="text">Text Button</Button>);
    const buttonElement = getByTestId('button');
    expect(buttonElement).toHaveClass('bg-transparent');
  });

  it('applies slate color by default', () => {
    const { getByTestId } = render(<Button>Default Color</Button>);
    const buttonElement = getByTestId('button');
    expect(buttonElement).toHaveClass('bg-slate-100', { exact: false });
  });

  it('applies blue color correctly', () => {
    const { getByTestId } = render(<Button color="blue">Blue Button</Button>);
    const buttonElement = getByTestId('button');
    expect(buttonElement).toHaveClass('bg-blue-500', { exact: false });
    expect(buttonElement).toHaveClass('text-white');
  });

  it('applies rounded style when rounded prop is true', () => {
    const { getByTestId } = render(<Button rounded>Rounded Button</Button>);
    const buttonElement = getByTestId('button');
    expect(buttonElement).toHaveClass('rounded-full');
    expect(buttonElement).not.toHaveClass('rounded-md');
  });

  it('applies rounded-md by default when rounded prop is not provided', () => {
    const { getByTestId } = render(<Button>Default Rounding</Button>);
    const buttonElement = getByTestId('button');
    expect(buttonElement).toHaveClass('rounded-md');
    expect(buttonElement).not.toHaveClass('rounded-full');
  });

  it('renders with a prefix icon', () => {
    const { getByTestId } = render(<Button prefixIcon={AlertCircle}>With Prefix Icon</Button>);
    const buttonElement = getByTestId('button');
    // Since SVG is rendered, we can check if the button has children that are not text nodes
    expect(buttonElement.querySelector('svg')).toBeInTheDocument();
    expect(buttonElement).toHaveTextContent('With Prefix Icon');
  });

  it('renders with a suffix icon', () => {
    const { getByTestId } = render(<Button suffixIcon={ArrowRight}>With Suffix Icon</Button>);
    const buttonElement = getByTestId('button');
    expect(buttonElement.querySelector('svg')).toBeInTheDocument();
    expect(buttonElement).toHaveTextContent('With Suffix Icon');
  });

  it('renders with both prefix and suffix icons', () => {
    const { getByTestId } = render(
      <Button prefixIcon={AlertCircle} suffixIcon={ArrowRight}>
        With Both Icons
      </Button>,
    );
    const buttonElement = getByTestId('button');
    const svgs = buttonElement.querySelectorAll('svg');
    expect(svgs.length).toBe(2);
    expect(buttonElement).toHaveTextContent('With Both Icons');
  });

  it('applies disabled styles when disabled prop is true', () => {
    const { getByTestId } = render(<Button disabled>Disabled Button</Button>);
    const buttonElement = getByTestId('button');
    expect(buttonElement).toBeDisabled();
    expect(buttonElement).toHaveClass('cursor-not-allowed');
    expect(buttonElement).toHaveClass('opacity-50');
  });

  it('does not apply hover classes when unstyled prop is true', () => {
    const { getByTestId } = render(<Button unstyled>Unstyled Button</Button>);
    const buttonElement = getByTestId('button');
    expect(buttonElement).toHaveClass('cursor-default');
    // Check it doesn't have hover classes
    expect(buttonElement).not.toHaveClass('hover:bg-slate-200', { exact: false });
  });

  it('allows customizing dataTestId', () => {
    const { getByTestId } = render(<Button dataTestId="custom-button">Custom TestId</Button>);
    const buttonElement = getByTestId('custom-button');
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveTextContent('Custom TestId');
  });

  it('applies custom className correctly', () => {
    const { getByTestId } = render(<Button className="my-custom-class">With Custom Class</Button>);
    const buttonElement = getByTestId('button');
    expect(buttonElement).toHaveClass('my-custom-class');
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    const { getByTestId } = render(<Button onClick={handleClick}>Clickable Button</Button>);
    const buttonElement = getByTestId('button');

    buttonElement.click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not trigger click handler when disabled', () => {
    const handleClick = jest.fn();
    const { getByTestId } = render(
      <Button disabled onClick={handleClick}>
        Disabled Button
      </Button>,
    );
    const buttonElement = getByTestId('button');

    buttonElement.click();
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('applies different icon sizes based on button size', () => {
    const { getByTestId: getMedium } = render(
      <Button size="medium" prefixIcon={AlertCircle} dataTestId="medium-button">
        Medium with Icon
      </Button>,
    );
    const mediumButton = getMedium('medium-button');
    const mediumSvg = mediumButton.querySelector('svg');

    const { getByTestId: getSmall } = render(
      <Button size="small" prefixIcon={AlertCircle} dataTestId="small-button">
        Small with Icon
      </Button>,
    );
    const smallButton = getSmall('small-button');
    const smallSvg = smallButton.querySelector('svg');

    // Since we can't easily check computed styles in Jest tests,
    // we verify that the class names applied should be different
    expect(mediumSvg?.classList.toString()).not.toBe(smallSvg?.classList.toString());
  });

  it('passes additional props to the button element', () => {
    const { getByTestId } = render(
      <Button id="special-button" aria-label="Special Button">
        Additional Props
      </Button>,
    );
    const buttonElement = getByTestId('button');
    expect(buttonElement).toHaveAttribute('id', 'special-button');
    expect(buttonElement).toHaveAttribute('aria-label', 'Special Button');
  });

  it('renders loading state', () => {
    const { getByTestId } = render(<Button loading>Loading Button</Button>);
    const buttonElement = getByTestId('button');
    expect(buttonElement).toHaveAttribute('disabled');
    expect(buttonElement).toHaveClass('cursor-not-allowed');
    expect(buttonElement).toHaveClass('opacity-50');
    const spinner = getByTestId('button-spinner');
    expect(spinner).toBeInTheDocument();
  });
});
