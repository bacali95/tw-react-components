import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

import { Block } from '..';

describe('Block Component', () => {
  it('renders correctly with default props', () => {
    const { getByTestId } = render(<Block>Test Content</Block>);
    const blockElement = getByTestId('block'); // Uses default dataTestId
    expect(blockElement).toBeInTheDocument();
    expect(blockElement).toHaveTextContent('Test Content');
  });

  it('applies centered class when centered prop is true', () => {
    const { getByTestId } = render(<Block centered>Centered Content</Block>);
    const blockElement = getByTestId('block');
    expect(blockElement).toHaveClass('mx-auto');
  });

  it('applies container class when container prop is true', () => {
    const { getByTestId } = render(<Block container>Container Content</Block>);
    const blockElement = getByTestId('block');
    expect(blockElement).toHaveClass('container');
  });

  it('applies fullWidth class when fullWidth prop is true', () => {
    const { getByTestId } = render(<Block fullWidth>Full Width Content</Block>);
    const blockElement = getByTestId('block');
    expect(blockElement).toHaveClass('w-full');
  });

  it('applies fullHeight class when fullHeight prop is true', () => {
    const { getByTestId } = render(<Block fullHeight>Full Height Content</Block>);
    const blockElement = getByTestId('block');
    expect(blockElement).toHaveClass('h-full');
  });

  it('applies multiple classes when multiple props are true', () => {
    const { getByTestId } = render(
      <Block centered container fullWidth fullHeight>
        Multiple Props Content
      </Block>,
    );
    const blockElement = getByTestId('block');
    expect(blockElement).toHaveClass('mx-auto');
    expect(blockElement).toHaveClass('container');
    expect(blockElement).toHaveClass('w-full');
    expect(blockElement).toHaveClass('h-full');
  });

  it('applies custom className correctly', () => {
    const { getByTestId } = render(<Block className="custom-class">Custom Class Content</Block>);
    const blockElement = getByTestId('block');
    expect(blockElement).toHaveClass('custom-class');
  });

  it('allows customizing the dataTestId', () => {
    const { getByTestId } = render(<Block dataTestId="custom-block">Custom Test ID Content</Block>);
    const blockElement = getByTestId('custom-block');
    expect(blockElement).toBeInTheDocument();
    expect(blockElement).toHaveTextContent('Custom Test ID Content');
  });

  it('passes additional props to the div element', () => {
    const { getByTestId } = render(
      <Block id="special-block" aria-label="Special Block">
        Additional Props Content
      </Block>,
    );
    const blockElement = getByTestId('block');
    expect(blockElement).toHaveAttribute('id', 'special-block');
    expect(blockElement).toHaveAttribute('aria-label', 'Special Block');
  });
});
