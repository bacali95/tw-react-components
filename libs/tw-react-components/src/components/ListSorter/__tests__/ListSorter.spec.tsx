import type { DragEndEvent } from '@dnd-kit/core';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { type ReactNode, act } from 'react';

import { ListSorter } from '..';

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

describe('ListSorter Component', () => {
  // Define a type that satisfies the ListSorterItem constraint
  type TestItem = { id: number; name: string; rank: number };

  const mockItems: TestItem[] = [
    { id: 1, name: 'Item 1', rank: 0 },
    { id: 2, name: 'Item 2', rank: 1 },
    { id: 3, name: 'Item 3', rank: 2 },
  ];

  const defaultProps = {
    items: mockItems,
    idResolver: (item: TestItem) => String(item.id),
    renderer: (item: TestItem) => <div>{item.name}</div>,
    onChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (global as any).__dndKitOnDragEnd = null;
  });

  it('renders with all items', () => {
    render(<ListSorter {...defaultProps} />);

    // Check that all items are rendered
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
    expect(screen.getByText('Item 3')).toBeInTheDocument();

    // Check that the container has correct test id
    expect(screen.getByTestId('list-sorter')).toBeInTheDocument();
  });

  it('renders items with correct indices in sortable items', () => {
    render(
      <ListSorter
        {...defaultProps}
        renderer={(item, index) => <div>{`${item.name} at index ${index}`}</div>}
      />,
    );

    // Check that items are rendered with correct indices
    expect(screen.getByText('Item 1 at index 0')).toBeInTheDocument();
    expect(screen.getByText('Item 2 at index 1')).toBeInTheDocument();
    expect(screen.getByText('Item 3 at index 2')).toBeInTheDocument();
  });

  it('handles drag and drop to reorder items', async () => {
    const onChangeMock = jest.fn();
    render(<ListSorter {...defaultProps} onChange={onChangeMock} />);

    // Simulate a drag operation by directly calling the onDragEnd handler
    await act(async () => {
      if ((global as any).__dndKitOnDragEnd) {
        // Simulate dragging item 1 to position 2
        (global as any).__dndKitOnDragEnd({
          active: { id: '1' },
          over: { id: '2' },
        });
      }
    });

    // Check that onChange was called with reordered items
    expect(onChangeMock).toHaveBeenCalledTimes(1);
    const newItems = onChangeMock.mock.calls[0][0];

    // Verify the correct order and updated ranks
    expect(newItems[0].id).toBe(2); // Item 2 is now first
    expect(newItems[1].id).toBe(1); // Item 1 is now second
    expect(newItems[2].id).toBe(3); // Item 3 is unchanged

    expect(newItems[0].rank).toBe(0);
    expect(newItems[1].rank).toBe(1);
    expect(newItems[2].rank).toBe(2);
  });

  it('does not call onChange when dragging over the same item', async () => {
    const onChangeMock = jest.fn();
    render(<ListSorter {...defaultProps} onChange={onChangeMock} />);

    // Simulate a drag operation over the same item
    await act(async () => {
      if ((global as any).__dndKitOnDragEnd) {
        (global as any).__dndKitOnDragEnd({
          active: { id: '1' },
          over: { id: '1' },
        });
      }
    });

    // Check that onChange was not called
    expect(onChangeMock).not.toHaveBeenCalled();
  });

  it('does not call onChange when there is no over item', async () => {
    const onChangeMock = jest.fn();
    render(<ListSorter {...defaultProps} onChange={onChangeMock} />);

    // Simulate a drag operation with no over item
    await act(async () => {
      if ((global as any).__dndKitOnDragEnd) {
        (global as any).__dndKitOnDragEnd({
          active: { id: '1' },
          over: null,
        });
      }
    });

    // Check that onChange was not called
    expect(onChangeMock).not.toHaveBeenCalled();
  });

  it('applies custom className to the container', () => {
    render(<ListSorter {...defaultProps} className="custom-sorter-class" />);

    expect(screen.getByTestId('list-sorter')).toHaveClass('custom-sorter-class');
  });

  it('uses custom dataTestId when provided', () => {
    const customDataTestId = 'custom-list-sorter';

    render(<ListSorter {...defaultProps} dataTestId={customDataTestId} />);

    // Check that the container has the custom test id
    expect(screen.getByTestId(customDataTestId)).toBeInTheDocument();

    // Check that the items have the custom test id prefix
    expect(screen.getByTestId(`${customDataTestId}-item-0`)).toBeInTheDocument();
    expect(screen.getByTestId(`${customDataTestId}-item-1`)).toBeInTheDocument();
    expect(screen.getByTestId(`${customDataTestId}-item-2`)).toBeInTheDocument();

    // Check that the default test id isn't used
    expect(screen.queryByTestId('list-sorter')).not.toBeInTheDocument();
  });

  it('works with non-object items', async () => {
    const stringItems = ['Item A', 'Item B', 'Item C'];
    const onChangeMock = jest.fn();

    render(
      <ListSorter
        items={stringItems}
        idResolver={(item, index) => `item-${index}`}
        renderer={(item) => <div>{item}</div>}
        onChange={onChangeMock}
      />,
    );

    // Check that all items are rendered
    expect(screen.getByText('Item A')).toBeInTheDocument();
    expect(screen.getByText('Item B')).toBeInTheDocument();
    expect(screen.getByText('Item C')).toBeInTheDocument();

    // Simulate a drag operation
    await act(async () => {
      if ((global as any).__dndKitOnDragEnd) {
        // Simulate dragging item 0 to position 1
        (global as any).__dndKitOnDragEnd({
          active: { id: 'item-0' },
          over: { id: 'item-1' },
        });
      }
    });

    // Check that onChange was called with reordered items
    expect(onChangeMock).toHaveBeenCalledTimes(1);
    const newItems = onChangeMock.mock.calls[0][0];

    // Verify the correct order
    expect(newItems[0]).toBe('Item B');
    expect(newItems[1]).toBe('Item A');
    expect(newItems[2]).toBe('Item C');
  });

  it('passes listeners to the renderer function', () => {
    // Create a mock renderer that defines all expected parameters
    const rendererMock = jest.fn<ReactNode, [item: TestItem, index: number, listeners: any]>(
      (item) => <div>{item.name}</div>,
    );

    render(<ListSorter {...defaultProps} renderer={rendererMock} />);

    // Check that renderer was called for each item
    expect(rendererMock).toHaveBeenCalledTimes(3);

    // Just test that listeners exist for the first call
    const firstCall = rendererMock.mock.calls[0];
    expect(firstCall[0]).toBeDefined(); // item
    expect(firstCall[1]).toBeDefined(); // index
    expect(firstCall[2]).toBeDefined(); // listeners
  });
});
