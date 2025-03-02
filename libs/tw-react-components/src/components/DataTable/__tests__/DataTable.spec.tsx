import { fireEvent, render, screen } from '@testing-library/react';
import { Edit } from 'lucide-react';

import { DataTable } from '..';

describe('DataTable', () => {
  // Mock data for testing
  type TestData = {
    id: number;
    name: string;
    age: number;
    nested: {
      value: string;
    };
  };

  const mockData: TestData[] = [
    { id: 1, name: 'John', age: 25, nested: { value: 'A' } },
    { id: 2, name: 'Alice', age: 30, nested: { value: 'B' } },
    { id: 3, name: 'Bob', age: 22, nested: { value: 'C' } },
  ];

  const columns = [
    { header: 'ID', field: 'id' as const },
    { header: 'Name', field: 'name' as const },
    { header: 'Age', field: 'age' as const },
    { header: 'Nested Value', field: 'nested.value' as const },
  ];

  // Test basic rendering
  it('renders the component with headers and data', () => {
    render(<DataTable rows={mockData} columns={columns} />);

    // Check that the component renders with the default dataTestId
    expect(screen.getByTestId('data-table')).toBeInTheDocument();

    // Check headers
    expect(screen.getByText('ID')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Age')).toBeInTheDocument();
    expect(screen.getByText('Nested Value')).toBeInTheDocument();

    // Check data rows
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('John')).toBeInTheDocument();
    expect(screen.getByText('25')).toBeInTheDocument();
    expect(screen.getByText('A')).toBeInTheDocument();

    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('30')).toBeInTheDocument();
    expect(screen.getByText('B')).toBeInTheDocument();
  });

  // Test custom dataTestId
  it('uses custom dataTestId when provided', () => {
    const customDataTestId = 'custom-data-table';
    render(<DataTable rows={mockData} columns={columns} dataTestId={customDataTestId} />);

    expect(screen.getByTestId(customDataTestId)).toBeInTheDocument();
    expect(screen.queryByTestId('data-table')).not.toBeInTheDocument();
  });

  // Test no data message
  it('displays no data message when there are no rows', () => {
    render(<DataTable rows={[]} columns={columns} />);
    expect(screen.getByText('No data')).toBeInTheDocument();
    expect(screen.getByTestId('data-table-empty-row')).toBeInTheDocument();
    expect(screen.getByTestId('data-table-empty-cell')).toBeInTheDocument();
  });

  // Test custom no data message
  it('displays custom no data message when provided', () => {
    const customMessage = 'Custom no data message';
    render(<DataTable rows={[]} columns={columns} noDataMessage={customMessage} />);
    expect(screen.getByText(customMessage)).toBeInTheDocument();
  });

  // Test loading state
  it('displays spinner when loading', () => {
    render(<DataTable rows={mockData} columns={columns} isLoading={true} />);
    // Use the dataTestId to find the spinner
    expect(screen.getByTestId('data-table-spinner')).toBeInTheDocument();
    expect(screen.getByTestId('data-table-loading-cell')).toBeInTheDocument();
  });

  // Test sorting functionality
  it('calls onSortingChange when header is clicked', () => {
    const onSortingChangeMock = jest.fn();
    render(
      <DataTable
        rows={mockData}
        columns={columns}
        sorting={{
          sorting: undefined,
          onSortingChange: onSortingChangeMock,
        }}
      />,
    );

    // Click on the Name header to sort
    fireEvent.click(screen.getByText('Name'));

    // Check if onSortingChange was called with correct params
    expect(onSortingChangeMock).toHaveBeenCalledWith({
      field: 'name',
      direction: 'asc',
      comparator: expect.any(Function),
    });
  });

  // Test pagination functionality
  it('renders pagination when provided', () => {
    const setCurrentPage = jest.fn();
    render(
      <DataTable
        rows={mockData}
        columns={columns}
        pagination={{
          currentPage: 0,
          totalItems: 30,
          pageSize: 10,
          setCurrentPage: setCurrentPage,
        }}
      />,
    );

    // Check if pagination component is rendered using the dataTestId
    expect(screen.getByTestId('data-table-pagination')).toBeInTheDocument();
    expect(screen.getByTestId('data-table-pagination-first-page')).toBeInTheDocument();
    // Try to navigate to the next page
    const nextPageButton = screen.getByTestId('data-table-pagination-next-page');
    fireEvent.click(nextPageButton);

    // Check if setCurrentPage was called correctly
    expect(setCurrentPage).toHaveBeenCalled();
  });

  // Test actions rendering and clicking
  it('renders action buttons and handles clicks', () => {
    const actionClickMock = jest.fn();

    const actions = [
      {
        icon: Edit,
        onClick: actionClickMock,
      },
    ];

    render(<DataTable rows={mockData} columns={columns} actions={actions} />);

    // Find action buttons using dataTestId
    const actionButton = screen.getByTestId('data-table-action-button-0-0');
    expect(actionButton).toBeInTheDocument();

    // Click on the first action button
    fireEvent.click(actionButton);

    // Check if action click handler was called with correct params
    expect(actionClickMock).toHaveBeenCalledWith(mockData[0], 0);
  });

  // Test row expansion
  it('expands row when clicking on expand button', () => {
    const ExpandedComponent = ({ item }: { item: TestData; rowIndex: number }) => (
      <div data-testid={`expanded-content-${item.id}`}>Expanded content for {item.name}</div>
    );

    render(
      <DataTable
        rows={mockData}
        columns={columns}
        rowExtraContent={{
          idGetter: (item) => item.id,
          component: ExpandedComponent,
        }}
      />,
    );

    // Initially, no expanded content should be visible
    expect(screen.queryByTestId('expanded-content-1')).not.toBeInTheDocument();

    // Find expand button using dataTestId
    const expandButton = screen.getByTestId('data-table-expand-button-0');
    expect(expandButton).toBeInTheDocument();

    // Click on the expand button
    fireEvent.click(expandButton);

    // Now the expanded content should be visible
    expect(screen.getByTestId('expanded-content-1')).toBeInTheDocument();
    expect(screen.getByText(`Expanded content for ${mockData[0].name}`)).toBeInTheDocument();
  });

  // Test custom render function for cells
  it('uses custom render functions for cells when provided', () => {
    const customColumns = [
      ...columns.slice(0, 2),
      {
        header: 'Custom Age',
        field: 'age' as const,
        render: (item: TestData) => (
          <span data-testid={`custom-age-${item.id}`}>{item.age} years old</span>
        ),
      },
    ];

    render(<DataTable rows={mockData} columns={customColumns} />);

    // Check if custom rendering is applied
    expect(screen.getByTestId('custom-age-1')).toBeInTheDocument();
    expect(screen.getByText('25 years old')).toBeInTheDocument();
    expect(screen.getByTestId('custom-age-2')).toBeInTheDocument();
    expect(screen.getByText('30 years old')).toBeInTheDocument();
  });

  // Test row click handler
  it('calls onRowClick when a row is clicked', () => {
    const onRowClickMock = jest.fn();

    render(<DataTable rows={mockData} columns={columns} onRowClick={onRowClickMock} />);

    // Get the row using dataTestId
    const dataRow = screen.getByTestId('data-table-row-0');

    // Click on the first data row
    fireEvent.click(dataRow);

    // Check if onRowClick was called with correct params
    expect(onRowClickMock).toHaveBeenCalledWith(mockData[0], 0);
  });
});
