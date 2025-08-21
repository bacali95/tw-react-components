import { render, screen } from '@testing-library/react';

import { Card } from '..';

describe('Card', () => {
  it('renders with default props', () => {
    render(<Card>Card Content</Card>);

    const card = screen.getByTestId('card');
    expect(card).toBeInTheDocument();
    expect(card).toHaveTextContent('Card Content');
    expect(card).toHaveClass(
      'bg-card',
      'text-card-foreground',
      'flex',
      'flex-col',
      'gap-6',
      'rounded-xl',
      'border',
      'py-6',
      'shadow-sm',
    );
  });

  it('passes className to the card component', () => {
    render(<Card className="custom-class">Card Content</Card>);

    const card = screen.getByTestId('card');
    expect(card).toHaveClass('custom-class');
    expect(card).toHaveClass(
      'bg-card',
      'text-card-foreground',
      'flex',
      'flex-col',
      'gap-6',
      'rounded-xl',
      'border',
      'py-6',
      'shadow-sm',
    );
  });

  it('passes dataTestId prop correctly', () => {
    render(<Card dataTestId="custom-card">Card Content</Card>);

    expect(screen.queryByTestId('card')).not.toBeInTheDocument();
    const card = screen.getByTestId('custom-card');
    expect(card).toBeInTheDocument();
    expect(card).toHaveTextContent('Card Content');
  });

  it('forwards additional HTML attributes to the card component', () => {
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

describe('Card.Header', () => {
  it('renders with default props', () => {
    render(<Card.Header>Header Content</Card.Header>);

    const header = screen.getByTestId('card-header');
    expect(header).toBeInTheDocument();
    expect(header).toHaveTextContent('Header Content');
    expect(header).toHaveClass(
      '@container/card-header',
      'grid',
      'auto-rows-min',
      'grid-rows-[auto_auto]',
      'items-start',
      'gap-1.5',
      'px-6',
      'has-data-[slot=card-action]:grid-cols-[1fr_auto]',
      '[.border-b]:pb-6',
    );
  });

  it('passes className and dataTestId props correctly', () => {
    render(
      <Card.Header className="custom-header" dataTestId="custom-header">
        Header Content
      </Card.Header>,
    );

    const header = screen.getByTestId('custom-header');
    expect(header).toHaveClass('custom-header');
  });
});

describe('Card.Title', () => {
  it('renders with default props', () => {
    render(<Card.Title>Card Title</Card.Title>);

    const title = screen.getByTestId('card-title');
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('Card Title');
    expect(title).toHaveClass('leading-none', 'font-semibold');
  });

  it('passes className and dataTestId props correctly', () => {
    render(
      <Card.Title className="custom-title" dataTestId="custom-title">
        Card Title
      </Card.Title>,
    );

    const title = screen.getByTestId('custom-title');
    expect(title).toHaveClass('custom-title');
  });
});

describe('Card.Description', () => {
  it('renders with default props', () => {
    render(<Card.Description>Card Description</Card.Description>);

    const description = screen.getByTestId('card-description');
    expect(description).toBeInTheDocument();
    expect(description).toHaveTextContent('Card Description');
    expect(description).toHaveClass('text-muted-foreground', 'text-sm');
  });

  it('passes className and dataTestId props correctly', () => {
    render(
      <Card.Description className="custom-description" dataTestId="custom-description">
        Card Description
      </Card.Description>,
    );

    const description = screen.getByTestId('custom-description');
    expect(description).toHaveClass('custom-description');
  });
});

describe('Card.Action', () => {
  it('renders with default props', () => {
    render(<Card.Action>Action Button</Card.Action>);

    const action = screen.getByTestId('card-action');
    expect(action).toBeInTheDocument();
    expect(action).toHaveTextContent('Action Button');
    expect(action).toHaveClass(
      'col-start-2',
      'row-span-2',
      'row-start-1',
      'self-start',
      'justify-self-end',
    );
  });

  it('passes className and dataTestId props correctly', () => {
    render(
      <Card.Action className="custom-action" dataTestId="custom-action">
        Action Button
      </Card.Action>,
    );

    const action = screen.getByTestId('custom-action');
    expect(action).toHaveClass('custom-action');
  });
});

describe('Card.Content', () => {
  it('renders with default props', () => {
    render(<Card.Content>Card Content</Card.Content>);

    const content = screen.getByTestId('card-content');
    expect(content).toBeInTheDocument();
    expect(content).toHaveTextContent('Card Content');
    expect(content).toHaveClass('px-6');
  });

  it('passes className and dataTestId props correctly', () => {
    render(
      <Card.Content className="custom-content" dataTestId="custom-content">
        Card Content
      </Card.Content>,
    );

    const content = screen.getByTestId('custom-content');
    expect(content).toHaveClass('custom-content');
  });
});

describe('Card.Footer', () => {
  it('renders with default props', () => {
    render(<Card.Footer>Card Footer</Card.Footer>);

    const footer = screen.getByTestId('card-footer');
    expect(footer).toBeInTheDocument();
    expect(footer).toHaveTextContent('Card Footer');
    expect(footer).toHaveClass('flex', 'items-center', 'px-6', '[.border-t]:pt-6');
  });

  it('passes className and dataTestId props correctly', () => {
    render(
      <Card.Footer className="custom-footer" dataTestId="custom-footer">
        Card Footer
      </Card.Footer>,
    );

    const footer = screen.getByTestId('custom-footer');
    expect(footer).toHaveClass('custom-footer');
  });
});

describe('Card compound usage', () => {
  it('renders a complete card with all sub-components', () => {
    render(
      <Card>
        <Card.Header>
          <Card.Title>Card Title</Card.Title>
          <Card.Description>Card Description</Card.Description>
          <Card.Action>Action</Card.Action>
        </Card.Header>
        <Card.Content>Main content goes here</Card.Content>
        <Card.Footer>Footer content</Card.Footer>
      </Card>,
    );

    expect(screen.getByTestId('card')).toBeInTheDocument();
    expect(screen.getByTestId('card-header')).toBeInTheDocument();
    expect(screen.getByTestId('card-title')).toHaveTextContent('Card Title');
    expect(screen.getByTestId('card-description')).toHaveTextContent('Card Description');
    expect(screen.getByTestId('card-action')).toHaveTextContent('Action');
    expect(screen.getByTestId('card-content')).toHaveTextContent('Main content goes here');
    expect(screen.getByTestId('card-footer')).toHaveTextContent('Footer content');
  });
});
