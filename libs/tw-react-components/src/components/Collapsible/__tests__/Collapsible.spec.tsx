import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Collapsible } from '..';

describe('Collapsible', () => {
  it('renders with children and is closed by default', async () => {
    render(
      <Collapsible>
        <Collapsible.Trigger>Toggle</Collapsible.Trigger>
        <Collapsible.Content>Content</Collapsible.Content>
      </Collapsible>,
    );

    // Trigger should be visible
    const trigger = screen.getByTestId('collapsible-trigger');
    expect(trigger).toBeInTheDocument();
    expect(trigger).toHaveTextContent('Toggle');

    // Content should be hidden initially
    const content = screen.queryByTestId('collapsible-content');
    expect(content).not.toBeVisible();
  });

  it('opens when trigger is clicked and closes when clicked again', async () => {
    const user = userEvent.setup();

    render(
      <Collapsible>
        <Collapsible.Trigger>Toggle</Collapsible.Trigger>
        <Collapsible.Content>Content</Collapsible.Content>
      </Collapsible>,
    );

    const trigger = screen.getByTestId('collapsible-trigger');

    // Click to open
    await user.click(trigger);

    // Content should now be visible
    const content = screen.getByTestId('collapsible-content');
    expect(content).toBeVisible();
    expect(content).toHaveTextContent('Content');

    // Click to close
    await user.click(trigger);

    // Content should be hidden again
    expect(content).not.toBeVisible();
  });

  it('respects the open prop when provided', () => {
    render(
      <Collapsible open>
        <Collapsible.Trigger>Toggle</Collapsible.Trigger>
        <Collapsible.Content>Content</Collapsible.Content>
      </Collapsible>,
    );

    // Content should be visible because open={true}
    const content = screen.getByTestId('collapsible-content');
    expect(content).toBeVisible();
  });

  it('supports the asChild prop', () => {
    render(
      <Collapsible asChild>
        <div>
          <Collapsible.Trigger asChild>
            <button data-testid="custom-trigger">Custom Trigger</button>
          </Collapsible.Trigger>
          <Collapsible.Content>Content</Collapsible.Content>
        </div>
      </Collapsible>,
    );

    // Our custom button should be used as the trigger
    const customTrigger = screen.getByTestId('custom-trigger');
    expect(customTrigger).toBeInTheDocument();
    expect(customTrigger).toHaveTextContent('Custom Trigger');
  });

  it('handles onOpenChange callback', async () => {
    const handleOpenChange = jest.fn();
    const user = userEvent.setup();

    render(
      <Collapsible onOpenChange={handleOpenChange}>
        <Collapsible.Trigger>Toggle</Collapsible.Trigger>
        <Collapsible.Content>Content</Collapsible.Content>
      </Collapsible>,
    );

    const trigger = screen.getByTestId('collapsible-trigger');

    // Click to open
    await user.click(trigger);
    expect(handleOpenChange).toHaveBeenCalledWith(true);

    // Click to close
    await user.click(trigger);
    expect(handleOpenChange).toHaveBeenCalledWith(false);
    expect(handleOpenChange).toHaveBeenCalledTimes(2);
  });

  it('can be controlled programmatically', () => {
    const { rerender } = render(
      <Collapsible open={false}>
        <Collapsible.Trigger>Toggle</Collapsible.Trigger>
        <Collapsible.Content>Content</Collapsible.Content>
      </Collapsible>,
    );

    // Content should be hidden initially
    const content = screen.queryByTestId('collapsible-content');
    expect(content).not.toBeVisible();

    // Update the open prop
    rerender(
      <Collapsible open={true}>
        <Collapsible.Trigger>Toggle</Collapsible.Trigger>
        <Collapsible.Content>Content</Collapsible.Content>
      </Collapsible>,
    );

    // Content should now be visible
    expect(content).toBeVisible();
  });

  it('accepts custom dataTestId props', () => {
    render(
      <Collapsible dataTestId="custom-collapsible">
        <Collapsible.Trigger dataTestId="custom-trigger">Toggle</Collapsible.Trigger>
        <Collapsible.Content dataTestId="custom-content">Content</Collapsible.Content>
      </Collapsible>,
    );

    // Check for custom IDs
    expect(screen.getByTestId('custom-collapsible')).toBeInTheDocument();
    expect(screen.getByTestId('custom-trigger')).toBeInTheDocument();
    expect(screen.queryByTestId('custom-content')).not.toBeVisible();

    // Make sure default IDs aren't there
    expect(screen.queryByTestId('collapsible')).not.toBeInTheDocument();
    expect(screen.queryByTestId('collapsible-trigger')).not.toBeInTheDocument();
    expect(screen.queryByTestId('collapsible-content')).not.toBeInTheDocument();
  });
});
