# usePagination

Calculates page numbers for pagination with ellipsis for large page counts.

## Import

```tsx
import { usePagination } from 'tw-react-components';
```

## Usage

```tsx
const pages = usePagination(currentPage, totalPages);
// Returns: [1, 2, 3, '...', 10]
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `currentPage` | `number` | Current page (1-indexed) |
| `totalPages` | `number` | Total number of pages |

## Return Value

```typescript
(number | '...')[]
```

Array of page numbers and ellipsis markers.

## Examples

### Basic

```tsx
const pages = usePagination(1, 10);
// [1, 2, 3, 4, 5, '...', 10]

const pages = usePagination(5, 10);
// [1, '...', 4, 5, 6, '...', 10]

const pages = usePagination(10, 10);
// [1, '...', 6, 7, 8, 9, 10]
```

### Custom Pagination UI

```tsx
function MyPagination({ currentPage, totalPages, onPageChange }) {
  const pages = usePagination(currentPage, totalPages);

  return (
    <Flex gap={1}>
      <Button 
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previous
      </Button>
      
      {pages.map((page, index) => (
        page === '...' ? (
          <span key={index} className="px-2">...</span>
        ) : (
          <Button
            key={index}
            variant={page === currentPage ? 'filled' : 'outlined'}
            onClick={() => onPageChange(page)}
          >
            {page}
          </Button>
        )
      ))}
      
      <Button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </Button>
    </Flex>
  );
}
```

### With DataTable

The `Pagination` component uses this hook internally:

```tsx
<DataTable
  rows={data}
  columns={columns}
  pagination={{
    currentPage: page,
    setCurrentPage: setPage,
    totalItems: total,
    pageSize: 10,
  }}
/>
```
