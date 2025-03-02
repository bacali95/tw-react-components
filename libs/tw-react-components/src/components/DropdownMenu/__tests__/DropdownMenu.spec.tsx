import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';

import { DropdownMenu } from '..';

describe('DropdownMenu', () => {
  it('should render trigger and show/hide content on click', async () => {
    render(
      <DropdownMenu>
        <DropdownMenu.Trigger>Open Menu</DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Item>Item 1</DropdownMenu.Item>
          <DropdownMenu.Item>Item 2</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu>,
    );

    // Check trigger is rendered
    const trigger = screen.getByTestId('dropdown-menu-trigger');
    expect(trigger).toBeInTheDocument();
    expect(trigger).toHaveTextContent('Open Menu');

    // Content should not be visible initially
    expect(screen.queryByTestId('dropdown-menu-content')).not.toBeInTheDocument();

    // Click trigger and check content appears
    await userEvent.click(trigger);
    const content = screen.getByTestId('dropdown-menu-content');
    expect(content).toBeInTheDocument();
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();

    // Press Escape to close
    await userEvent.keyboard('{Escape}');
    expect(screen.queryByTestId('dropdown-menu-content')).not.toBeInTheDocument();
  });

  it('should handle checkbox items correctly', async () => {
    const TestComponent = () => {
      const [checked, setChecked] = useState(false);

      return (
        <DropdownMenu>
          <DropdownMenu.Trigger>Open Menu</DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.CheckboxItem checked={checked} onCheckedChange={setChecked}>
              Toggle Me
            </DropdownMenu.CheckboxItem>
          </DropdownMenu.Content>
        </DropdownMenu>
      );
    };

    render(<TestComponent />);

    // Open menu
    await userEvent.click(screen.getByTestId('dropdown-menu-trigger'));

    // Click checkbox item
    let checkboxItem = screen.getByTestId('dropdown-menu-checkbox-item');

    expect(checkboxItem).toHaveAttribute('data-state', 'unchecked');

    await userEvent.click(checkboxItem);

    // Check if checkbox state changed
    expect(checkboxItem).toHaveAttribute('data-state', 'checked');

    // Open menu
    await userEvent.click(screen.getByTestId('dropdown-menu-trigger'));

    checkboxItem = screen.getByTestId('dropdown-menu-checkbox-item');

    // Click again to uncheck
    await userEvent.click(checkboxItem);

    expect(checkboxItem).toHaveAttribute('data-state', 'unchecked');
  });

  it('should handle multiple checkbox items correctly', async () => {
    const TestComponent = () => {
      const [state, setState] = useState<string[]>([]);

      const handleCheckedChange = (value: string) => (checked: boolean) => {
        if (checked) {
          setState([...state, value]);
        } else {
          setState(state.filter((item) => item !== value));
        }
      };

      return (
        <DropdownMenu>
          <DropdownMenu.Trigger>Open Menu</DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Group>
              <DropdownMenu.CheckboxItem
                checked={state.includes('1')}
                onCheckedChange={handleCheckedChange('1')}
              >
                Option 1
              </DropdownMenu.CheckboxItem>
              <DropdownMenu.CheckboxItem
                checked={state.includes('2')}
                onCheckedChange={handleCheckedChange('2')}
              >
                Option 2
              </DropdownMenu.CheckboxItem>
            </DropdownMenu.Group>
          </DropdownMenu.Content>
        </DropdownMenu>
      );
    };

    render(<TestComponent />);

    // Open menu
    await userEvent.click(screen.getByTestId('dropdown-menu-trigger'));

    // Check initial state
    const option1 = screen.getByText('Option 1');

    expect(option1).toHaveAttribute('data-state', 'unchecked');

    await userEvent.click(option1);

    expect(option1).toHaveAttribute('data-state', 'checked');

    // Open menu
    await userEvent.click(screen.getByTestId('dropdown-menu-trigger'));

    const option2 = screen.getByText('Option 2');

    expect(option2).toHaveAttribute('data-state', 'unchecked');

    await userEvent.click(option2);

    expect(option2).toHaveAttribute('data-state', 'checked');
  });

  it('should handle radio items correctly', async () => {
    const TestComponent = () => {
      const [value, setValue] = useState('1');

      return (
        <DropdownMenu>
          <DropdownMenu.Trigger>Open Menu</DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.RadioGroup value={value} onValueChange={setValue}>
              <DropdownMenu.RadioItem value="1">Option 1</DropdownMenu.RadioItem>
              <DropdownMenu.RadioItem value="2">Option 2</DropdownMenu.RadioItem>
            </DropdownMenu.RadioGroup>
          </DropdownMenu.Content>
        </DropdownMenu>
      );
    };

    render(<TestComponent />);

    // Open menu
    await userEvent.click(screen.getByTestId('dropdown-menu-trigger'));

    // Check initial state
    const option1 = screen.getByText('Option 1');
    const option2 = screen.getByText('Option 2');
    expect(option1.closest('[data-state]')).toHaveAttribute('data-state', 'checked');
    expect(option2.closest('[data-state]')).toHaveAttribute('data-state', 'unchecked');

    // Select second option
    await userEvent.click(option2);
    expect(option1.closest('[data-state]')).toHaveAttribute('data-state', 'unchecked');
    expect(option2.closest('[data-state]')).toHaveAttribute('data-state', 'checked');
  });

  it('should render sub-menu correctly', async () => {
    render(
      <DropdownMenu>
        <DropdownMenu.Trigger>Open Menu</DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Item>Item 1</DropdownMenu.Item>
          <DropdownMenu.Sub>
            <DropdownMenu.SubTrigger>More Options</DropdownMenu.SubTrigger>
            <DropdownMenu.Portal>
              <DropdownMenu.SubContent>
                <DropdownMenu.Item>Sub Item 1</DropdownMenu.Item>
                <DropdownMenu.Item>Sub Item 2</DropdownMenu.Item>
              </DropdownMenu.SubContent>
            </DropdownMenu.Portal>
          </DropdownMenu.Sub>
        </DropdownMenu.Content>
      </DropdownMenu>,
    );

    // Open main menu
    await userEvent.click(screen.getByTestId('dropdown-menu-trigger'));

    // Check sub-menu trigger exists
    const subTrigger = screen.getByTestId('dropdown-menu-subtrigger');
    expect(subTrigger).toBeInTheDocument();
    expect(subTrigger).toHaveTextContent('More Options');

    // Open sub-menu
    await userEvent.click(subTrigger);

    // Check sub-menu content appears
    const subContent = screen.getByTestId('dropdown-menu-subcontent');
    expect(subContent).toBeInTheDocument();
    expect(screen.getByText('Sub Item 1')).toBeInTheDocument();
    expect(screen.getByText('Sub Item 2')).toBeInTheDocument();
  });

  it('should render label and separator correctly', async () => {
    render(
      <DropdownMenu>
        <DropdownMenu.Trigger>Open Menu</DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Label>Group 1</DropdownMenu.Label>
          <DropdownMenu.Item>Item 1</DropdownMenu.Item>
          <DropdownMenu.Separator />
          <DropdownMenu.Label>Group 2</DropdownMenu.Label>
          <DropdownMenu.Item>Item 2</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu>,
    );

    // Open menu
    await userEvent.click(screen.getByTestId('dropdown-menu-trigger'));

    // Check labels and separator
    const labels = screen.getAllByTestId('dropdown-menu-label');
    expect(labels).toHaveLength(2);
    expect(labels[0]).toHaveTextContent('Group 1');
    expect(labels[1]).toHaveTextContent('Group 2');

    const separator = screen.getByTestId('dropdown-menu-separator');
    expect(separator).toBeInTheDocument();
  });

  it('should render shortcut correctly', async () => {
    render(
      <DropdownMenu>
        <DropdownMenu.Trigger>Open Menu</DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Item>
            Copy
            <DropdownMenu.Shortcut>⌘C</DropdownMenu.Shortcut>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu>,
    );

    // Open menu
    await userEvent.click(screen.getByTestId('dropdown-menu-trigger'));

    // Check shortcut
    const shortcut = screen.getByTestId('dropdown-menu-shortcut');
    expect(shortcut).toBeInTheDocument();
    expect(shortcut).toHaveTextContent('⌘C');
  });

  it('should handle keyboard navigation', async () => {
    render(
      <DropdownMenu>
        <DropdownMenu.Trigger>Open Menu</DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Item>Item 1</DropdownMenu.Item>
          <DropdownMenu.Item>Item 2</DropdownMenu.Item>
          <DropdownMenu.Item>Item 3</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu>,
    );

    // Open menu
    await userEvent.click(screen.getByTestId('dropdown-menu-trigger'));

    // Press arrow down to navigate
    await userEvent.keyboard('{ArrowDown}');
    expect(screen.getByText('Item 1')).toHaveFocus();

    await userEvent.keyboard('{ArrowDown}');
    expect(screen.getByText('Item 2')).toHaveFocus();

    await userEvent.keyboard('{ArrowUp}');
    expect(screen.getByText('Item 1')).toHaveFocus();

    // Press Escape to close
    await userEvent.keyboard('{Escape}');
    expect(screen.queryByTestId('dropdown-menu-content')).not.toBeInTheDocument();
  });
});
