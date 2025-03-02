import { render, screen } from '@testing-library/react';

import { Card } from '..';

describe('Card', () => {
  it('renders with default props', () => {
    render(<Card>Card Content</Card>);

    const card = screen.getByTestId('card');
    expect(card).toBeInTheDocument();
    expect(card).toHaveTextContent('Card Content');
    expect(card).toHaveClass('rounded-lg border p-2');
  });

  it('passes className to the Block component', () => {
    render(<Card className="custom-class">Card Content</Card>);

    const card = screen.getByTestId('card');
    expect(card).toHaveClass('custom-class');
    expect(card).toHaveClass('rounded-lg border p-2');
  });

  it('applies centered prop correctly', () => {
    render(<Card centered>Card Content</Card>);

    const card = screen.getByTestId('card');
    expect(card).toHaveClass('mx-auto');
  });

  it('applies container prop correctly', () => {
    render(<Card container>Card Content</Card>);

    const card = screen.getByTestId('card');
    expect(card).toHaveClass('container');
  });

  it('applies fullWidth prop correctly', () => {
    render(<Card fullWidth>Card Content</Card>);

    const card = screen.getByTestId('card');
    expect(card).toHaveClass('w-full');
  });

  it('applies fullHeight prop correctly', () => {
    render(<Card fullHeight>Card Content</Card>);

    const card = screen.getByTestId('card');
    expect(card).toHaveClass('h-full');
  });

  it('passes dataTestId prop correctly', () => {
    render(<Card dataTestId="custom-card">Card Content</Card>);

    expect(screen.queryByTestId('card')).not.toBeInTheDocument();
    const card = screen.getByTestId('custom-card');
    expect(card).toBeInTheDocument();
    expect(card).toHaveTextContent('Card Content');
  });

  it('forwards additional HTML attributes to the Block component', () => {
    render(
      <Card id="card-id" aria-label="Card label" data-custom="custom-data">
        Card Content
      </Card>,
    );

    const card = screen.getByTestId('card');
    expect(card).toHaveAttribute('id', 'card-id');
    expect(card).toHaveAttribute('aria-label', 'Card label');
    expect(card).toHaveAttribute('data-custom', 'custom-data');
  });
});
