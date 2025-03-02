import type { DndContextProps, DragEndEvent } from '@dnd-kit/core';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { type ReactNode, act } from 'react';

import { ListSorterDialog } from '..';

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
      // Store the onDragEnd callback for later use
      if (onDragEnd) {
        (global as any).__dndKitOnDragEnd = onDragEnd;
      }
      return children;
    },
  };
});

describe('ListSorterDialog', () => {
  // Mock data for testing
  // Define a type that satisfies the ListSorterItem constraint
  type TestItem = { id: number; name: string; rank: number };

  const mockItems: TestItem[] = [
    { id: 1, name: 'Item 1', rank: 0 },
    { id: 2, name: 'Item 2', rank: 1 },
    { id: 3, name: 'Item 3', rank: 2 },
  ];

  const defaultProps = {
    open: true,
    title: 'Sort Items',
    items: mockItems,
    idResolver: (item: TestItem) => String(item.id),
    renderer: (item: TestItem) => <span>{item.name}</span>,
    onSubmit: jest.fn(),
    onClose: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (global as any).__dndKitOnDragEnd = null;
  });

  it('renders the dialog with items when open', () => {
    render(<ListSorterDialog {...defaultProps} />);

    // Check that the dialog content is rendered
    expect(screen.getByTestId('list-sorter-dialog-title')).toBeInTheDocument();
    expect(screen.getByTestId('list-sorter-dialog-title')).toHaveTextContent('Sort Items');
    expect(screen.getByTestId('list-sorter-dialog-content')).toBeInTheDocument();

    // Check that all items are rendered
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
    expect(screen.getByText('Item 3')).toBeInTheDocument();

    // Check that buttons are rendered
    expect(screen.getByTestId('list-sorter-dialog-submit-button')).toBeInTheDocument();
    expect(screen.getByTestId('list-sorter-dialog-cancel-button')).toBeInTheDocument();
  });

  it('does not render the dialog when closed', () => {
    render(<ListSorterDialog {...defaultProps} open={false} />);

    // Check that the dialog content is not rendered
    expect(screen.queryByTestId('list-sorter-dialog-content')).not.toBeInTheDocument();
    expect(screen.queryByText('Item 1')).not.toBeInTheDocument();
    expect(screen.queryByTestId('list-sorter-dialog-submit-button')).not.toBeInTheDocument();
    expect(screen.queryByTestId('list-sorter-dialog-cancel-button')).not.toBeInTheDocument();
  });

  it('calls onClose when Cancel button is clicked', () => {
    render(<ListSorterDialog {...defaultProps} />);

    // Click the Cancel button
    fireEvent.click(screen.getByTestId('list-sorter-dialog-cancel-button'));

    // Check that onClose was called
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onSubmit with sorted items when Submit button is clicked', async () => {
    const onSubmitMock = jest.fn();
    render(<ListSorterDialog {...defaultProps} onSubmit={onSubmitMock} />);

    // Simulate a drag operation by directly calling the onDragEnd handler
    // This bypasses the need for complex pointer events
    await act(async () => {
      if ((global as any).__dndKitOnDragEnd) {
        // Simulate dragging item 1 to position 2
        (global as any).__dndKitOnDragEnd({
          active: { id: '1' },
          over: { id: '2' },
        });
      }
    });

    // Click the Submit button
    fireEvent.click(screen.getByTestId('list-sorter-dialog-submit-button'));

    // Uncomment and adjust this expectation once the test is working
    expect(onSubmitMock).toHaveBeenCalledWith([
      { ...mockItems[1], rank: 0 }, // Item 2 moved up
      { ...mockItems[0], rank: 1 }, // Item 1 moved down
      { ...mockItems[2], rank: 2 }, // Item 3 unchanged
    ]);
  });

  it('renders custom button labels when provided', () => {
    render(<ListSorterDialog {...defaultProps} submitLabel="Save Order" cancelLabel="Go Back" />);

    // Check that custom button labels are rendered
    const submitButton = screen.getByTestId('list-sorter-dialog-submit-button');
    const cancelButton = screen.getByTestId('list-sorter-dialog-cancel-button');
    expect(submitButton).toHaveTextContent('Save Order');
    expect(cancelButton).toHaveTextContent('Go Back');
    expect(screen.queryByText('Submit')).not.toBeInTheDocument();
    expect(screen.queryByText('Cancel')).not.toBeInTheDocument();
  });

  it('applies custom className to the dialog', () => {
    render(<ListSorterDialog {...defaultProps} className="custom-dialog-class" />);

    // Check that the dialog content is rendered (confirming the dialog works)
    expect(screen.getByTestId('list-sorter-dialog-content')).toBeInTheDocument();
    expect(screen.getByTestId('list-sorter-dialog-content')).toHaveClass('custom-dialog-class');
  });

  it('resets items when dialog is reopened', async () => {
    const { rerender } = render(<ListSorterDialog {...defaultProps} />);

    // Simulate a drag operation by directly calling the onDragEnd handler
    // This bypasses the need for complex pointer events
    await act(async () => {
      if ((global as any).__dndKitOnDragEnd) {
        // Simulate dragging item 1 to position 2
        (global as any).__dndKitOnDragEnd({
          active: { id: '1' },
          over: { id: '2' },
        });
      }
    });

    const beforeListItems = screen.getAllByText(/Item \d/);
    expect(beforeListItems[0].textContent).toBe('Item 2');
    expect(beforeListItems[1].textContent).toBe('Item 1');
    expect(beforeListItems[2].textContent).toBe('Item 3');

    // Close and reopen the dialog
    rerender(<ListSorterDialog {...defaultProps} open={false} />);
    rerender(<ListSorterDialog {...defaultProps} open={true} />);

    // Check that items are reset to original order
    const afterListItems = screen.getAllByText(/Item \d/);
    expect(afterListItems[0].textContent).toBe('Item 1');
    expect(afterListItems[1].textContent).toBe('Item 2');
    expect(afterListItems[2].textContent).toBe('Item 3');
  });

  it('uses custom dataTestId when provided', () => {
    const customDataTestId = 'custom-list-sorter-dialog';

    render(<ListSorterDialog {...defaultProps} dataTestId={customDataTestId} />);

    // Check that custom dataTestId is used
    expect(screen.getByTestId(`${customDataTestId}-title`)).toBeInTheDocument();
    expect(screen.getByTestId(`${customDataTestId}-content`)).toBeInTheDocument();
    expect(screen.getByTestId(`${customDataTestId}-submit-button`)).toBeInTheDocument();
    expect(screen.getByTestId(`${customDataTestId}-cancel-button`)).toBeInTheDocument();
  });
});
