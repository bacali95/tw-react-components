import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Popover } from '..';

// Mock Portal to avoid rendering outside the test container
jest.mock('@radix-ui/react-popover', () => {
  const actual = jest.requireActual('@radix-ui/react-popover');
  return {
    ...actual,
    Portal: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  };
});

describe('Popover Component', () => {
  it('renders the trigger correctly', () => {
    render(
      <Popover>
        <Popover.Trigger>Click me</Popover.Trigger>
        <Popover.Content>Popover content</Popover.Content>
      </Popover>,
    );

    const trigger = screen.getByText('Click me');
    expect(trigger).toBeInTheDocument();
  });

  it('uses default dataTestId for trigger', () => {
    render(
      <Popover>
        <Popover.Trigger>Click me</Popover.Trigger>
        <Popover.Content>Popover content</Popover.Content>
      </Popover>,
    );

    const trigger = screen.getByTestId('popover-trigger');
    expect(trigger).toBeInTheDocument();
    expect(trigger).toHaveTextContent('Click me');
  });

  it('applies custom dataTestId to trigger', () => {
    render(
      <Popover>
        <Popover.Trigger dataTestId="custom-trigger">Click me</Popover.Trigger>
        <Popover.Content>Popover content</Popover.Content>
      </Popover>,
    );

    const trigger = screen.getByTestId('custom-trigger');
    expect(trigger).toBeInTheDocument();
    expect(trigger).toHaveTextContent('Click me');
  });

  it('shows content when trigger is clicked', async () => {
    render(
      <Popover>
        <Popover.Trigger>Click me</Popover.Trigger>
        <Popover.Content>Popover content</Popover.Content>
      </Popover>,
    );

    const trigger = screen.getByText('Click me');
    await userEvent.click(trigger);

    const content = await screen.findByTestId('popover-content');
    expect(content).toBeInTheDocument();
  });

  it('applies custom className to content', async () => {
    render(
      <Popover>
        <Popover.Trigger>Click me</Popover.Trigger>
        <Popover.Content className="custom-class">Popover content</Popover.Content>
      </Popover>,
    );

    const trigger = screen.getByText('Click me');
    await userEvent.click(trigger);

    const content = await screen.findByTestId('popover-content');
    expect(content).toHaveClass('custom-class');
  });

  it('uses default dataTestId for content', async () => {
    render(
      <Popover>
        <Popover.Trigger>Click me</Popover.Trigger>
        <Popover.Content>Popover content</Popover.Content>
      </Popover>,
    );

    const trigger = screen.getByText('Click me');
    await userEvent.click(trigger);

    const content = await screen.findByTestId('popover-content');
    expect(content).toBeInTheDocument();
    expect(content).toHaveTextContent('Popover content');
  });

  it('applies custom dataTestId to content', async () => {
    render(
      <Popover>
        <Popover.Trigger>Click me</Popover.Trigger>
        <Popover.Content dataTestId="custom-popover">Popover content</Popover.Content>
      </Popover>,
    );

    const trigger = screen.getByText('Click me');
    await userEvent.click(trigger);

    const content = await screen.findByTestId('custom-popover');
    expect(content).toBeInTheDocument();
    expect(content).toHaveTextContent('Popover content');
  });

  it('supports custom alignment', async () => {
    render(
      <Popover>
        <Popover.Trigger>Click me</Popover.Trigger>
        <Popover.Content align="end">Popover content</Popover.Content>
      </Popover>,
    );

    const trigger = screen.getByText('Click me');
    await userEvent.click(trigger);

    const content = await screen.findByTestId('popover-content');
    expect(content).toHaveAttribute('data-align', 'end');
  });

  it('supports custom side offset', async () => {
    render(
      <Popover>
        <Popover.Trigger>Click me</Popover.Trigger>
        <Popover.Content sideOffset={10}>Popover content</Popover.Content>
      </Popover>,
    );

    const trigger = screen.getByText('Click me');
    await userEvent.click(trigger);

    const content = await screen.findByTestId('popover-content');
    expect(content.parentElement).toHaveStyle('transform: translate(0px, 10px);');
  });

  it('renders children in Popover.Content', async () => {
    render(
      <Popover>
        <Popover.Trigger>Click me</Popover.Trigger>
        <Popover.Content>
          <div data-testid="child-element">Child element</div>
        </Popover.Content>
      </Popover>,
    );

    const trigger = screen.getByText('Click me');
    await userEvent.click(trigger);

    const childElement = await screen.findByTestId('child-element');
    expect(childElement).toBeInTheDocument();
    expect(childElement).toHaveTextContent('Child element');
  });

  it('applies the correct default classes to content', async () => {
    render(
      <Popover>
        <Popover.Trigger>Click me</Popover.Trigger>
        <Popover.Content>Popover content</Popover.Content>
      </Popover>,
    );

    const trigger = screen.getByText('Click me');
    await userEvent.click(trigger);

    const content = await screen.findByTestId('popover-content');
    expect(content).toHaveClass('z-50');
    expect(content).toHaveClass('rounded-md');
    expect(content).toHaveClass('border');
    expect(content).toHaveClass('bg-white');
    expect(content).toHaveClass('p-1');
    expect(content).toHaveClass('shadow-md');
  });

  it('applies dark mode classes to content', async () => {
    render(
      <Popover>
        <Popover.Trigger>Click me</Popover.Trigger>
        <Popover.Content>Popover content</Popover.Content>
      </Popover>,
    );

    const trigger = screen.getByText('Click me');
    await userEvent.click(trigger);

    const content = await screen.findByTestId('popover-content');
    expect(content).toHaveClass('dark:border-slate-700');
    expect(content).toHaveClass('dark:bg-slate-900');
    expect(content).toHaveClass('dark:text-white');
  });

  it('handles asChild prop on trigger', () => {
    render(
      <Popover>
        <Popover.Trigger asChild>
          <button data-testid="custom-trigger-element">Custom Trigger</button>
        </Popover.Trigger>
        <Popover.Content>Popover content</Popover.Content>
      </Popover>,
    );

    const trigger = screen.getByTestId('custom-trigger-element');
    expect(trigger).toBeInTheDocument();
    expect(trigger).toHaveTextContent('Custom Trigger');
  });

  it('preserves dataTestId when using asChild on trigger', () => {
    render(
      <Popover>
        <Popover.Trigger asChild dataTestId="combined-trigger">
          <button>Custom Trigger</button>
        </Popover.Trigger>
        <Popover.Content>Popover content</Popover.Content>
      </Popover>,
    );

    const trigger = screen.getByTestId('combined-trigger');
    expect(trigger).toBeInTheDocument();
    expect(trigger).toHaveTextContent('Custom Trigger');
  });

  it('closes when clicking outside', async () => {
    render(
      <>
        <div data-testid="outside">Outside</div>
        <Popover>
          <Popover.Trigger>Click me</Popover.Trigger>
          <Popover.Content>Popover content</Popover.Content>
        </Popover>
      </>,
    );

    // Open the popover
    const trigger = screen.getByText('Click me');
    await userEvent.click(trigger);

    // Verify content is shown
    const content = await screen.findByTestId('popover-content');
    expect(content).toBeInTheDocument();

    // Click outside
    const outside = screen.getByTestId('outside');
    await userEvent.click(outside);

    // Verify content is hidden
    await waitFor(() => {
      expect(screen.queryByTestId('popover-content')).not.toBeInTheDocument();
    });
  });

  it('supports container prop for custom portals', async () => {
    const customContainer = document.createElement('div');
    customContainer.setAttribute('data-testid', 'custom-container');
    document.body.appendChild(customContainer);

    render(
      <Popover>
        <Popover.Trigger>Click me</Popover.Trigger>
        <Popover.Content container={customContainer}>Popover content</Popover.Content>
      </Popover>,
    );

    const trigger = screen.getByText('Click me');
    await userEvent.click(trigger);

    const content = await screen.findByTestId('popover-content');
    expect(content).toBeInTheDocument();

    // Clean up
    document.body.removeChild(customContainer);
  });
});
