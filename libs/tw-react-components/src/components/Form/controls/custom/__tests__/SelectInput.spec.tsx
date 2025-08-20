import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';

import type { SelectItem } from '../select';
import { SelectInput } from '../select';

const options: SelectItem<string>[] = [
  { id: '1', value: '1', label: 'Option 1' },
  { id: '2', value: '2', label: 'Option 2' },
  { id: '3', value: '3', label: 'Option 3' },
];

describe('SelectInput', () => {
  it('should render select with correct structure', () => {
    render(<SelectInput items={options} />);

    const select = screen.getByTestId('select-input');
    expect(select).toBeInTheDocument();
    expect(select.querySelector('svg')).toHaveClass('lucide-chevron-down');
  });

  it('should open options on click', async () => {
    render(<SelectInput items={options} />);

    const select = screen.getByTestId('select-input');
    await userEvent.click(select);

    const optionsList = screen.getByTestId('select-input-content');
    expect(optionsList).toBeInTheDocument();
    options.forEach((option) => {
      expect(screen.getByText(option.label)).toBeInTheDocument();
    });
  });

  it('should handle option selection', async () => {
    const onChange = jest.fn();

    const Wrapper = () => {
      const [value, setValue] = useState<string>();

      return (
        <SelectInput
          value={value}
          items={options}
          onChange={(item) => {
            setValue(item);
            onChange(item);
          }}
        />
      );
    };

    render(<Wrapper />);

    // Open select
    await userEvent.click(screen.getByTestId('select-input'));

    // Click an option
    await userEvent.click(screen.getByText('Option 2'));

    expect(onChange).toHaveBeenCalledWith('2');
    expect(screen.getByTestId('select-input-input')).toHaveValue('Option 2');
  });

  it('should handle multiple selection', async () => {
    const onChange = jest.fn();

    const Wrapper = () => {
      const [value, setValue] = useState<string[]>();

      return (
        <SelectInput
          items={options}
          multiple
          value={value ?? []}
          onChange={(item) => {
            setValue(item);
            onChange(item);
          }}
        />
      );
    };

    render(<Wrapper />);

    // Open select
    await userEvent.click(screen.getByTestId('select-input'));

    // Select multiple options
    await userEvent.click(screen.getByText('Option 1'));
    await userEvent.click(screen.getByText('Option 2'));

    expect(onChange).toHaveBeenNthCalledWith(1, ['1']);
    expect(onChange).toHaveBeenNthCalledWith(2, ['1', '2']);
    expect(screen.getByTestId('select-input-input')).toHaveValue('Option 1, Option 2');
  });

  it('should handle search functionality', async () => {
    render(<SelectInput items={options} search />);

    // Open select
    await userEvent.click(screen.getByTestId('select-input'));

    // Type in search
    const searchInput = screen.getByPlaceholderText('Search...');
    await userEvent.type(searchInput, 'Option 2');

    // Check filtered options
    const visibleOptions = screen.getAllByRole('menuitemradio');
    expect(visibleOptions).toHaveLength(1);
    expect(visibleOptions[0]).toHaveTextContent('Option 2');
  });

  it('should handle custom option rendering', async () => {
    const renderItem = (item: SelectItem<string>, selected?: boolean) => (
      <div className="custom-option">{`Custom ${item.label}${selected ? ' (selected)' : ''}`}</div>
    );

    render(<SelectInput items={options} renderItem={renderItem} />);

    // Open select
    await userEvent.click(screen.getByTestId('select-input'));

    options.forEach((option) => {
      expect(screen.getByText(`Custom ${option.label}`)).toBeInTheDocument();
    });
  });

  it('should handle disabled state', () => {
    render(<SelectInput items={options} disabled />);

    const select = screen.getByTestId('select-input-input');
    expect(select).toHaveClass('disabled:opacity-50');
    expect(select).toHaveAttribute('disabled');
  });

  it('should handle loading state', async () => {
    render(<SelectInput items={[]} />);

    const select = screen.getByTestId('select-input-input');
    await userEvent.click(select);

    expect(screen.getByTestId('select-input-content')).toHaveTextContent('No items');
  });

  it('should handle error state', () => {
    render(<SelectInput items={options} hasErrors />);

    const select = screen.getByTestId('select-input-wrapper');
    expect(select).toHaveClass(
      'aria-invalid:!ring-destructive/20 dark:aria-invalid:!ring-destructive/40 aria-invalid:[&>input,&>textarea,&>div]:border-destructive',
    );
  });

  it('should close on Escape', async () => {
    render(<SelectInput items={options} />);

    // Open select
    await userEvent.click(screen.getByTestId('select-input-input'));
    expect(screen.getByTestId('select-input-content')).toBeInTheDocument();

    // Press Escape
    await userEvent.keyboard('{Escape}');
    await waitFor(() => {
      expect(screen.queryByTestId('select-input-content')).not.toBeInTheDocument();
    });
  });

  it('should handle keyboard navigation', async () => {
    const Wrapper = () => {
      const [value, setValue] = useState<string>();

      return <SelectInput items={options} value={value} onChange={(item) => setValue(item)} />;
    };

    render(<Wrapper />);

    const select = screen.getByTestId('select-input-input');
    await userEvent.click(select);

    // Navigate with arrow keys
    await userEvent.keyboard('{ArrowDown}');
    expect(screen.getByTestId('select-input-item-1')).toHaveFocus();

    await userEvent.keyboard('{ArrowDown}');
    expect(screen.getByTestId('select-input-item-2')).toHaveFocus();

    await userEvent.keyboard('{ArrowUp}');
    expect(screen.getByTestId('select-input-item-1')).toHaveFocus();

    // Select with Enter
    await userEvent.keyboard('{Enter}');
    expect(select).toHaveValue('Option 1');

    // Close with Escape
    await userEvent.keyboard('{Escape}');
    await waitFor(() => {
      expect(screen.queryByTestId('select-input-content')).not.toBeInTheDocument();
    });
  });

  it('should handle custom placeholder', () => {
    render(<SelectInput items={options} placeholder="Custom placeholder" />);

    const select = screen.getByTestId('select-input-input');
    expect(select).toHaveAttribute('placeholder', 'Custom placeholder');
  });

  it('should handle clearable functionality', async () => {
    const onChange = jest.fn();

    const Wrapper = () => {
      const [value, setValue] = useState<string | undefined>('1');

      return (
        <SelectInput
          items={options}
          value={value}
          clearable
          onChange={(item) => {
            setValue(item);
            onChange(item);
          }}
        />
      );
    };

    render(<Wrapper />);

    expect(screen.getByTestId('select-input-input')).toHaveValue('Option 1');

    const clearButton = screen.getByTestId('select-input-clear');
    await userEvent.click(clearButton);

    expect(onChange).toHaveBeenCalledWith(undefined);
    expect(screen.getByTestId('select-input-input')).toHaveValue('');
  });

  it('should handle grouped options', async () => {
    const groupedOptions = [
      {
        id: 'group1',
        label: 'Group 1',
        group: true as const,
        items: [
          { id: '1', value: '1', label: 'Option 1' },
          { id: '2', value: '2', label: 'Option 2' },
        ],
      },
      {
        id: 'group2',
        label: 'Group 2',
        group: true as const,
        items: [
          { id: '3', value: '3', label: 'Option 3' },
          { id: '4', value: '4', label: 'Option 4' },
        ],
      },
    ];

    render(<SelectInput items={groupedOptions} />);

    // Open select
    await userEvent.click(screen.getByTestId('select-input'));

    // Check group labels and items
    expect(screen.getByText('Group 1')).toBeInTheDocument();
    expect(screen.getByText('Group 2')).toBeInTheDocument();
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
    expect(screen.getByText('Option 3')).toBeInTheDocument();
    expect(screen.getByText('Option 4')).toBeInTheDocument();
  });
});
