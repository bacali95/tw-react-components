import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Sheet } from '..';

// Mock Portal to avoid rendering outside the test container
jest.mock('@radix-ui/react-dialog', () => {
  const actual = jest.requireActual('@radix-ui/react-dialog');
  return {
    ...actual,
    Portal: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  };
});

describe('Sheet Component', () => {
  it('renders the trigger correctly', () => {
    render(
      <Sheet>
        <Sheet.Trigger>Open Sheet</Sheet.Trigger>
        <Sheet.Content>
          <Sheet.Header>
            <Sheet.Title>Sheet Title</Sheet.Title>
          </Sheet.Header>
          Sheet Content
        </Sheet.Content>
      </Sheet>,
    );

    const trigger = screen.getByText('Open Sheet');
    expect(trigger).toBeInTheDocument();
  });

  it('opens sheet when trigger is clicked', async () => {
    render(
      <Sheet>
        <Sheet.Trigger>Open Sheet</Sheet.Trigger>
        <Sheet.Content>
          <Sheet.Header>
            <Sheet.Title>Sheet Title</Sheet.Title>
          </Sheet.Header>
          Sheet Content
        </Sheet.Content>
      </Sheet>,
    );

    const trigger = screen.getByText('Open Sheet');
    await userEvent.click(trigger);

    const content = await screen.findByTestId('sheet-content');
    expect(content).toBeInTheDocument();
    expect(content).toHaveTextContent('Sheet Content');
  });

  it('applies correct side variant styles', async () => {
    render(
      <Sheet>
        <Sheet.Trigger>Open Sheet</Sheet.Trigger>
        <Sheet.Content side="left">
          <Sheet.Header>
            <Sheet.Title>Sheet Title</Sheet.Title>
          </Sheet.Header>
          Sheet Content
        </Sheet.Content>
      </Sheet>,
    );

    const trigger = screen.getByText('Open Sheet');
    await userEvent.click(trigger);

    const content = await screen.findByTestId('sheet-content');
    expect(content).toHaveClass('inset-y-0', 'left-0', 'h-full', 'border-r');
  });

  it('applies default right side variant if not specified', async () => {
    render(
      <Sheet>
        <Sheet.Trigger>Open Sheet</Sheet.Trigger>
        <Sheet.Content>
          <Sheet.Header>
            <Sheet.Title>Sheet Title</Sheet.Title>
          </Sheet.Header>
          Sheet Content
        </Sheet.Content>
      </Sheet>,
    );

    const trigger = screen.getByText('Open Sheet');
    await userEvent.click(trigger);

    const content = await screen.findByTestId('sheet-content');
    expect(content).toHaveClass('inset-y-0', 'right-0', 'h-full', 'border-l');
  });

  it('renders sheet with top side variant', async () => {
    render(
      <Sheet>
        <Sheet.Trigger>Open Sheet</Sheet.Trigger>
        <Sheet.Content side="top">
          <Sheet.Header>
            <Sheet.Title>Sheet Title</Sheet.Title>
          </Sheet.Header>
          Sheet Content
        </Sheet.Content>
      </Sheet>,
    );

    const trigger = screen.getByText('Open Sheet');
    await userEvent.click(trigger);

    const content = await screen.findByTestId('sheet-content');
    expect(content).toHaveClass('inset-x-0', 'top-0', 'border-b');
  });

  it('renders sheet with bottom side variant', async () => {
    render(
      <Sheet>
        <Sheet.Trigger>Open Sheet</Sheet.Trigger>
        <Sheet.Content side="bottom">
          <Sheet.Header>
            <Sheet.Title>Sheet Title</Sheet.Title>
          </Sheet.Header>
          Sheet Content
        </Sheet.Content>
      </Sheet>,
    );

    const trigger = screen.getByText('Open Sheet');
    await userEvent.click(trigger);

    const content = await screen.findByTestId('sheet-content');
    expect(content).toHaveClass('inset-x-0', 'bottom-0', 'border-t');
  });

  it('applies custom className to content', async () => {
    render(
      <Sheet>
        <Sheet.Trigger>Open Sheet</Sheet.Trigger>
        <Sheet.Content className="custom-class">
          <Sheet.Header>
            <Sheet.Title>Sheet Title</Sheet.Title>
          </Sheet.Header>
          Sheet Content
        </Sheet.Content>
      </Sheet>,
    );

    const trigger = screen.getByText('Open Sheet');
    await userEvent.click(trigger);

    const content = await screen.findByTestId('sheet-content');
    expect(content).toHaveClass('custom-class');
  });

  it('closes sheet when close button is clicked', async () => {
    render(
      <Sheet>
        <Sheet.Trigger>Open Sheet</Sheet.Trigger>
        <Sheet.Content>
          <Sheet.Header>
            <Sheet.Title>Sheet Title</Sheet.Title>
          </Sheet.Header>
          Sheet Content
        </Sheet.Content>
      </Sheet>,
    );

    const trigger = screen.getByText('Open Sheet');
    await userEvent.click(trigger);

    const content = await screen.findByTestId('sheet-content');
    expect(content).toBeInTheDocument();

    const closeButton = screen.getByTestId('sheet-content-close-button');
    await userEvent.click(closeButton);

    await waitFor(() => {
      expect(screen.queryByText('Sheet Content')).not.toBeInTheDocument();
    });
  });

  it('supports custom dataTestId for content', async () => {
    render(
      <Sheet>
        <Sheet.Trigger>Open Sheet</Sheet.Trigger>
        <Sheet.Content dataTestId="custom-sheet">
          <Sheet.Header>
            <Sheet.Title>Sheet Title</Sheet.Title>
          </Sheet.Header>
          Sheet Content
        </Sheet.Content>
      </Sheet>,
    );

    const trigger = screen.getByText('Open Sheet');
    await userEvent.click(trigger);

    const content = await screen.findByTestId('custom-sheet');
    expect(content).toBeInTheDocument();

    // Close button should use the custom dataTestId as prefix
    const closeButton = screen.getByTestId('custom-sheet-close-button');
    expect(closeButton).toBeInTheDocument();

    // Overlay should use the custom dataTestId as prefix
    const overlay = screen.getByTestId('custom-sheet-overlay');
    expect(overlay).toBeInTheDocument();
  });

  it('renders Sheet.Header correctly', async () => {
    render(
      <Sheet>
        <Sheet.Trigger>Open Sheet</Sheet.Trigger>
        <Sheet.Content>
          <Sheet.Header>
            <Sheet.Title>Header Content</Sheet.Title>
          </Sheet.Header>
          Sheet Content
        </Sheet.Content>
      </Sheet>,
    );

    const trigger = screen.getByText('Open Sheet');
    await userEvent.click(trigger);

    const header = await screen.findByTestId('sheet-header');
    expect(header).toBeInTheDocument();
    expect(header).toHaveTextContent('Header Content');
    expect(header).toHaveClass('flex', 'flex-col', 'space-y-2');
  });

  it('renders Sheet.Footer correctly', async () => {
    render(
      <Sheet>
        <Sheet.Trigger>Open Sheet</Sheet.Trigger>
        <Sheet.Content>
          <Sheet.Header>
            <Sheet.Title>Sheet Title</Sheet.Title>
          </Sheet.Header>
          <Sheet.Footer>Footer Content</Sheet.Footer>
        </Sheet.Content>
      </Sheet>,
    );

    const trigger = screen.getByText('Open Sheet');
    await userEvent.click(trigger);

    const footer = await screen.findByTestId('sheet-footer');
    expect(footer).toBeInTheDocument();
    expect(footer).toHaveTextContent('Footer Content');
    expect(footer).toHaveClass('flex', 'flex-col-reverse');
  });

  it('renders Sheet.Title correctly', async () => {
    render(
      <Sheet>
        <Sheet.Trigger>Open Sheet</Sheet.Trigger>
        <Sheet.Content>
          <Sheet.Header>
            <Sheet.Title>Sheet Title</Sheet.Title>
          </Sheet.Header>
        </Sheet.Content>
      </Sheet>,
    );

    const trigger = screen.getByText('Open Sheet');
    await userEvent.click(trigger);

    const title = await screen.findByTestId('sheet-title');
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('Sheet Title');
    expect(title).toHaveClass('text-lg', 'font-semibold');
  });

  it('renders Sheet.Description correctly', async () => {
    render(
      <Sheet>
        <Sheet.Trigger>Open Sheet</Sheet.Trigger>
        <Sheet.Content>
          <Sheet.Header>
            <Sheet.Title>Sheet Title</Sheet.Title>
            <Sheet.Description>Sheet Description</Sheet.Description>
          </Sheet.Header>
        </Sheet.Content>
      </Sheet>,
    );

    const trigger = screen.getByText('Open Sheet');
    await userEvent.click(trigger);

    const description = await screen.findByTestId('sheet-description');
    expect(description).toBeInTheDocument();
    expect(description).toHaveTextContent('Sheet Description');
    expect(description).toHaveClass('text-sm');
  });

  it('supports custom dataTestId for all subcomponents', async () => {
    render(
      <Sheet>
        <Sheet.Trigger>Open Sheet</Sheet.Trigger>
        <Sheet.Content>
          <Sheet.Header dataTestId="custom-header">
            <Sheet.Title dataTestId="custom-title">Title</Sheet.Title>
            <Sheet.Description dataTestId="custom-description">Description</Sheet.Description>
          </Sheet.Header>
          <Sheet.Footer dataTestId="custom-footer">Footer</Sheet.Footer>
        </Sheet.Content>
      </Sheet>,
    );

    const trigger = screen.getByText('Open Sheet');
    await userEvent.click(trigger);

    expect(await screen.findByTestId('custom-header')).toBeInTheDocument();
    expect(screen.getByTestId('custom-title')).toBeInTheDocument();
    expect(screen.getByTestId('custom-description')).toBeInTheDocument();
    expect(screen.getByTestId('custom-footer')).toBeInTheDocument();
  });

  it('applies custom className to all subcomponents', async () => {
    render(
      <Sheet>
        <Sheet.Trigger>Open Sheet</Sheet.Trigger>
        <Sheet.Content>
          <Sheet.Header className="header-class">
            <Sheet.Title className="title-class">Title</Sheet.Title>
            <Sheet.Description className="description-class">Description</Sheet.Description>
          </Sheet.Header>
          <Sheet.Footer className="footer-class">Footer</Sheet.Footer>
        </Sheet.Content>
      </Sheet>,
    );

    const trigger = screen.getByText('Open Sheet');
    await userEvent.click(trigger);

    expect(await screen.findByTestId('sheet-header')).toHaveClass('header-class');
    expect(screen.getByTestId('sheet-title')).toHaveClass('title-class');
    expect(screen.getByTestId('sheet-description')).toHaveClass('description-class');
    expect(screen.getByTestId('sheet-footer')).toHaveClass('footer-class');
  });
});
