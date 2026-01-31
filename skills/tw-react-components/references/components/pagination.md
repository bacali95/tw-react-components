# Pagination

Page navigation control with first/previous/next/last buttons and page numbers.

## Import

```tsx
import { Pagination } from 'tw-react-components';
```

## Basic Usage

```tsx
const [page, setPage] = useState(0);

<Pagination
  currentPage={page}
  setCurrentPage={setPage}
  totalItems={100}
  pageSize={10}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `currentPage` | `number` | - | Current page (0-indexed) |
| `setCurrentPage` | `Dispatch<SetStateAction<number>>` | - | Page setter function |
| `totalItems` | `number` | - | Total number of items |
| `pageSize` | `number` | `10` | Items per page |
| `disabled` | `boolean` | `false` | Disable all navigation |
| `dataTestId` | `string` | `'pagination'` | Testing attribute |

## Features

- First/Last page buttons
- Previous/Next page buttons
- Page number display with ellipsis for large page counts
- Automatically adjusts when total items changes

## Examples

### Basic

```tsx
const [page, setPage] = useState(0);
const pageSize = 10;
const totalItems = 150;

const paginatedData = data.slice(page * pageSize, (page + 1) * pageSize);

<>
  <DataList items={paginatedData} />
  <Pagination
    currentPage={page}
    setCurrentPage={setPage}
    totalItems={totalItems}
    pageSize={pageSize}
  />
</>
```

### With Loading State

```tsx
<Pagination
  currentPage={page}
  setCurrentPage={setPage}
  totalItems={totalItems}
  pageSize={pageSize}
  disabled={isLoading}
/>
```

### With DataTable

The DataTable component has built-in pagination support:

```tsx
<DataTable
  rows={paginatedData}
  columns={columns}
  pagination={{
    currentPage: page,
    setCurrentPage: setPage,
    totalItems: totalItems,
    pageSize: pageSize,
    onPageSizeChange: setPageSize,  // Optional: allow changing page size
  }}
/>
```

### Server-Side Pagination

```tsx
function ServerPaginatedList() {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const { data, isLoading } = useQuery(
    ['items', page, pageSize],
    () => fetchItems({ page, pageSize })
  );

  return (
    <>
      {isLoading ? <Spinner /> : <ItemList items={data.items} />}
      
      <Pagination
        currentPage={page}
        setCurrentPage={setPage}
        totalItems={data?.totalCount ?? 0}
        pageSize={pageSize}
        disabled={isLoading}
      />
    </>
  );
}
```

### Custom Page Size

```tsx
const [page, setPage] = useState(0);
const [pageSize, setPageSize] = useState(25);

<Flex direction="column" gap={4}>
  <Flex justify="between" align="center">
    <SelectInput
      label="Items per page"
      value={pageSize}
      items={[
        { id: 10, label: '10', value: 10 },
        { id: 25, label: '25', value: 25 },
        { id: 50, label: '50', value: 50 },
        { id: 100, label: '100', value: 100 },
      ]}
      onChange={(value) => {
        setPageSize(value);
        setPage(0);  // Reset to first page
      }}
    />
  </Flex>
  
  <Pagination
    currentPage={page}
    setCurrentPage={setPage}
    totalItems={totalItems}
    pageSize={pageSize}
  />
</Flex>
```

### Showing Item Range

```tsx
function PaginationWithInfo() {
  const [page, setPage] = useState(0);
  const pageSize = 10;
  const totalItems = 150;

  const startItem = page * pageSize + 1;
  const endItem = Math.min((page + 1) * pageSize, totalItems);

  return (
    <Flex justify="between" align="center">
      <span className="text-sm text-slate-500">
        Showing {startItem} to {endItem} of {totalItems} items
      </span>
      <Pagination
        currentPage={page}
        setCurrentPage={setPage}
        totalItems={totalItems}
        pageSize={pageSize}
      />
    </Flex>
  );
}
```

## Related

- [usePagination](../hooks/use-pagination.md) - Hook for calculating page numbers
- [DataTable](./data-table.md) - Table with built-in pagination
