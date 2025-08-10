import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Accordion } from '..';

describe('Accordion', () => {
  it('renders with children and is closed by default', () => {
    render(
      <Accordion type="single" className="w-full">
        <Accordion.Item value="item-1">
          <Accordion.Trigger>Section 1</Accordion.Trigger>
          <Accordion.Content>Content 1</Accordion.Content>
        </Accordion.Item>
      </Accordion>,
    );

    const trigger = screen.getByTestId('accordion-trigger');
    expect(trigger).toBeInTheDocument();
    expect(trigger).toHaveTextContent('Section 1');

    const content = screen.getByTestId('accordion-content');
    expect(content).not.toBeVisible();
  });

  it('opens when trigger is clicked and closes when clicked again (collapsible single)', async () => {
    const user = userEvent.setup();

    render(
      <Accordion type="single" collapsible>
        <Accordion.Item value="item-1">
          <Accordion.Trigger>Section 1</Accordion.Trigger>
          <Accordion.Content>Content 1</Accordion.Content>
        </Accordion.Item>
      </Accordion>,
    );

    const trigger = screen.getByTestId('accordion-trigger');

    await user.click(trigger);
    const content = screen.getByTestId('accordion-content');
    expect(content).toBeVisible();

    await user.click(trigger);
    expect(content).not.toBeVisible();
  });

  it('respects defaultValue when provided', () => {
    render(
      <Accordion type="single" defaultValue="item-1">
        <Accordion.Item value="item-1">
          <Accordion.Trigger>Section 1</Accordion.Trigger>
          <Accordion.Content>Content 1</Accordion.Content>
        </Accordion.Item>
      </Accordion>,
    );

    const content = screen.getByTestId('accordion-content');
    expect(content).toBeVisible();
    expect(content).toHaveTextContent('Content 1');
  });

  it('handles onValueChange callback in single mode', async () => {
    const handleValueChange = jest.fn();
    const user = userEvent.setup();

    render(
      <Accordion type="single" collapsible onValueChange={handleValueChange}>
        <Accordion.Item value="item-1">
          <Accordion.Trigger>Section 1</Accordion.Trigger>
          <Accordion.Content>Content 1</Accordion.Content>
        </Accordion.Item>
      </Accordion>,
    );

    const trigger = screen.getByTestId('accordion-trigger');

    await user.click(trigger);
    expect(handleValueChange).toHaveBeenCalledWith('item-1');

    await user.click(trigger);
    expect(handleValueChange).toHaveBeenCalledWith('');
    expect(handleValueChange).toHaveBeenCalledTimes(2);
  });

  it('supports multiple type and allows opening multiple items', async () => {
    const user = userEvent.setup();

    render(
      <Accordion type="multiple">
        <Accordion.Item value="item-1">
          <Accordion.Trigger>Section 1</Accordion.Trigger>
          <Accordion.Content>Content 1</Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="item-2">
          <Accordion.Trigger>Section 2</Accordion.Trigger>
          <Accordion.Content>Content 2</Accordion.Content>
        </Accordion.Item>
      </Accordion>,
    );

    const triggers = screen.getAllByTestId('accordion-trigger');

    await user.click(triggers[0]);
    await user.click(triggers[1]);

    const contents = screen.getAllByTestId('accordion-content');
    expect(contents[0]).toBeVisible();
    expect(contents[1]).toBeVisible();
  });

  it('accepts custom dataTestId props', () => {
    render(
      <Accordion dataTestId="custom-accordion" type="single">
        <Accordion.Item dataTestId="custom-item" value="item-1">
          <Accordion.Trigger dataTestId="custom-trigger">Section 1</Accordion.Trigger>
          <Accordion.Content dataTestId="custom-content">Content 1</Accordion.Content>
        </Accordion.Item>
      </Accordion>,
    );

    expect(screen.getByTestId('custom-accordion')).toBeInTheDocument();
    expect(screen.getByTestId('custom-item')).toBeInTheDocument();
    expect(screen.getByTestId('custom-trigger')).toBeInTheDocument();
    expect(screen.getByTestId('custom-content')).toBeInTheDocument();

    expect(screen.queryByTestId('accordion')).not.toBeInTheDocument();
    expect(screen.queryByTestId('accordion-item')).not.toBeInTheDocument();
    expect(screen.queryByTestId('accordion-trigger')).not.toBeInTheDocument();
    expect(screen.queryByTestId('accordion-content')).not.toBeInTheDocument();
  });
});
