import type { DragEndEvent } from '@dnd-kit/core';
import '@testing-library/jest-dom';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { ReactNode } from 'react';

import { ColumnsPicker } from '..';
import type { DataTableColumn } from '../../DataTable';

// Mock Portal to avoid rendering outside the test container
jest.mock('@radix-ui/react-popover', () => {
  const actual = jest.requireActual('@radix-ui/react-popover');
  return {
    ...actual,
    Portal: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  };
});

// Mock the DndContext to directly call onDragEnd
jest.mock('@dnd-kit/core', () => {
  const originalModule = jest.requireActual('@dnd-kit/core');
  return {
    ...originalModule,
    DndContext: ({
      children,
      onDragEnd,
    }: {
      children: ReactNode;
      onDragEnd?: (event: DragEndEvent) => void;
    }) => {
      if (onDragEnd) {
        (global as any).__dndKitOnDragEnd = onDragEnd;
      }
      return children;
    },
  };
});

const columns: DataTableColumn<{ id: string; name: string; email: string }>[] = [
  { field: 'id', header: 'ID' },
  { field: 'name', header: 'Name' },
  { field: 'email', header: 'Email', hide: true },
];

const defaultProps = {
  columns,
  onReorder: jest.fn(),
  onToggleHidden: jest.fn(),
  onReset: jest.fn(),
};

async function openPicker(dataTestId = 'columns-picker') {
  await userEvent.click(screen.getByTestId(`${dataTestId}-trigger`));
  return screen.findByTestId(`${dataTestId}-content`);
}

describe('ColumnsPicker Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (global as any).__dndKitOnDragEnd = null;
  });

  it('renders the trigger button with the default label', () => {
    render(<ColumnsPicker {...defaultProps} />);

    const trigger = screen.getByTestId('columns-picker-trigger');
    expect(trigger).toBeInTheDocument();
    expect(trigger).toHaveAttribute('title', 'Columns');
  });

  it('renders the trigger button with a custom label', () => {
    render(<ColumnsPicker {...defaultProps} labels={{ trigger: 'Manage columns' }} />);

    expect(screen.getByTestId('columns-picker-trigger')).toHaveAttribute('title', 'Manage columns');
  });

  it('uses a custom dataTestId when provided', async () => {
    render(<ColumnsPicker {...defaultProps} dataTestId="custom-picker" />);

    expect(screen.getByTestId('custom-picker-trigger')).toBeInTheDocument();

    await openPicker('custom-picker');

    expect(screen.getByTestId('custom-picker-content')).toBeInTheDocument();
    expect(screen.getByTestId('custom-picker-sorter')).toBeInTheDocument();
    expect(screen.getByTestId('custom-picker-reset-button')).toBeInTheDocument();
  });

  it('lists every column with its header when opened', async () => {
    render(<ColumnsPicker {...defaultProps} />);

    await openPicker();

    expect(screen.getByText('ID')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
  });

  it('checks the switch for visible columns and unchecks it for hidden ones', async () => {
    render(<ColumnsPicker {...defaultProps} />);

    await openPicker();

    const switches = screen.getAllByTestId('switch');
    expect(switches).toHaveLength(3);
    expect(switches[0]).toHaveAttribute('data-state', 'checked'); // id
    expect(switches[1]).toHaveAttribute('data-state', 'checked'); // name
    expect(switches[2]).toHaveAttribute('data-state', 'unchecked'); // email (hide: true)
  });

  it('calls onToggleHidden with the column field when its switch is clicked', async () => {
    const onToggleHidden = jest.fn();
    render(<ColumnsPicker {...defaultProps} onToggleHidden={onToggleHidden} />);

    await openPicker();

    const switches = screen.getAllByTestId('switch');
    await userEvent.click(switches[1]);

    expect(onToggleHidden).toHaveBeenCalledTimes(1);
    expect(onToggleHidden).toHaveBeenCalledWith('name');
  });

  it('calls onReset when the reset button is clicked', async () => {
    const onReset = jest.fn();
    render(<ColumnsPicker {...defaultProps} onReset={onReset} />);

    await openPicker();

    await userEvent.click(screen.getByTestId('columns-picker-reset-button'));

    expect(onReset).toHaveBeenCalledTimes(1);
  });

  it('shows the default reset label', async () => {
    render(<ColumnsPicker {...defaultProps} />);

    await openPicker();

    expect(screen.getByTestId('columns-picker-reset-button')).toHaveTextContent('Reset');
  });

  it('shows a custom reset label', async () => {
    render(<ColumnsPicker {...defaultProps} labels={{ reset: 'Restore defaults' }} />);

    await openPicker();

    expect(screen.getByTestId('columns-picker-reset-button')).toHaveTextContent('Restore defaults');
  });

  it('calls onReorder with the new field order when columns are dragged', async () => {
    const onReorder = jest.fn();
    render(<ColumnsPicker {...defaultProps} onReorder={onReorder} />);

    await openPicker();

    await act(async () => {
      (global as any).__dndKitOnDragEnd?.({ active: { id: 'id' }, over: { id: 'name' } });
    });

    expect(onReorder).toHaveBeenCalledTimes(1);
    expect(onReorder).toHaveBeenCalledWith(['name', 'id', 'email']);
  });

  it('does not call onReorder when dragging over the same column', async () => {
    const onReorder = jest.fn();
    render(<ColumnsPicker {...defaultProps} onReorder={onReorder} />);

    await openPicker();

    await act(async () => {
      (global as any).__dndKitOnDragEnd?.({ active: { id: 'id' }, over: { id: 'id' } });
    });

    expect(onReorder).not.toHaveBeenCalled();
  });
});
