# DataTable

Advanced data table with sorting, pagination, row actions, and expandable rows.

## Import

```tsx
import { 
  DataTable, 
  type DataTableColumns, 
  type DataTableColumn,
  type DataTableSorting,
  type DataTablePageSize 
} from 'tw-react-components';
```

## Basic Usage

```tsx
import { PencilIcon, TrashIcon } from 'lucide-react';

type Person = { 
  id: number; 
  name: string; 
  email: string;
  active: boolean;
};

const [sorting, setSorting] = useState<DataTableSorting<Person>>();
const [page, setPage] = useState(0);
const [pageSize, setPageSize] = useState<DataTablePageSize>(10);

const columns: DataTableColumns<Person> = {
  id: { header: 'ID', field: 'id' },
  name: { header: 'Name', field: 'name' },
  email: { header: 'Email', field: 'email', noSorting: true },
};

<DataTable
  rows={data}
  columns={columns}
  sorting={{ sorting, onSortingChange: setSorting }}
  pagination={{
    currentPage: page,
    setCurrentPage: setPage,
    totalItems: totalCount,
    pageSize,
    onPageSizeChange: setPageSize,
  }}
  actions={[
    { icon: PencilIcon, color: 'yellow', onClick: (item) => edit(item) },
    { icon: TrashIcon, color: 'red', onClick: (item) => remove(item) },
  ]}
  isLoading={loading}
  noDataMessage="No records found"
/>
```

## Props

| Prop | Type | Description |
|------|------|-------------|
| `rows` | `T[]` | Data array |
| `columns` | `DataTableColumn<T>[] \| DataTableColumns<T>` | Column definitions |
| `sorting` | `{ sorting, onSortingChange }` | Sorting state and handler |
| `pagination` | `PaginationProps & { pageSize, onPageSizeChange }` | Pagination config |
| `actions` | `DataTableAction<T>[]` | Row action buttons |
| `isLoading` | `boolean` | Show loading overlay |
| `rowExtraContent` | `DataTableRowExtraContent<T>` | Expandable row content |
| `noDataMessage` | `ReactNode` | Empty state message |
| `onRowClick` | `(item, rowIndex) => void` | Row click handler |
| `rowClassName` | `(item, rowIndex) => string` | Dynamic row classes |

## Column Definition

```typescript
type DataTableColumn<T> = {
  header: ReactNode;           // Column header
  field: Paths<T>;             // Dot-notation path to field
  noSorting?: boolean;         // Disable sorting for this column
  hide?: boolean;              // Hide column
  align?: 'left' | 'center' | 'right';
  className?: string;
  render?: (item: T, rowIndex: number) => ReactNode;
  comparator?: (a, b) => number;  // Custom sort function
};
```

### Custom Rendering

```tsx
const columns: DataTableColumns<Person> = {
  name: { 
    header: 'Name', 
    field: 'name',
    render: (item) => (
      <Flex align="center" gap={2}>
        <Avatar src={item.avatar} />
        <span>{item.name}</span>
      </Flex>
    ),
  },
  status: {
    header: 'Status',
    field: 'status',
    render: (item) => (
      <Badge color={item.active ? 'green' : 'gray'}>
        {item.active ? 'Active' : 'Inactive'}
      </Badge>
    ),
  },
  createdAt: {
    header: 'Created',
    field: 'createdAt',
    render: (item) => getDisplayDate(new Date(item.createdAt), { format: 'LL' }),
  },
};
```

### Nested Field Access

```tsx
type User = {
  id: number;
  profile: {
    firstName: string;
    lastName: string;
  };
};

const columns: DataTableColumns<User> = {
  firstName: { header: 'First Name', field: 'profile.firstName' },
  lastName: { header: 'Last Name', field: 'profile.lastName' },
};
```

## Row Actions

```typescript
type DataTableAction<T> = {
  icon: LucideIcon;
  label?: string;              // Text label next to icon
  color?: Color;
  hide?: boolean | ((item: T) => boolean);
  loading?: boolean;
  hasNotification?: (item, rowIndex) => 
    | { type: 'badge'; props: HintBadgeProps } 
    | { type: 'dot'; props: HintDotProps } 
    | boolean;
  onClick: (item: T, rowIndex: number) => void;
};
```

### Conditional Actions

```tsx
actions={[
  {
    icon: PencilIcon,
    color: 'yellow',
    onClick: handleEdit,
  },
  {
    icon: TrashIcon,
    color: 'red',
    hide: (item) => !item.canDelete,  // Hide based on item
    onClick: handleDelete,
  },
  {
    icon: ArchiveIcon,
    color: 'gray',
    hide: !hasPermission('archive'),  // Hide based on permission
    onClick: handleArchive,
  },
]}
```

### Action with Notification

```tsx
actions={[
  {
    icon: BellIcon,
    hasNotification: (item) => 
      item.unreadCount > 0 
        ? { type: 'badge', props: { children: item.unreadCount } }
        : false,
    onClick: handleNotifications,
  },
]}
```

## Expandable Rows

```tsx
<DataTable
  rows={data}
  columns={columns}
  rowExtraContent={{
    idGetter: (item) => item.id,
    singleExpansion: true,  // Only one row open at a time
    component: ({ item, rowIndex }) => (
      <div className="p-4 bg-slate-50 dark:bg-slate-900">
        <h4>Details for {item.name}</h4>
        <p>{item.description}</p>
      </div>
    ),
  }}
/>
```

## Row Styling

```tsx
<DataTable
  rows={data}
  columns={columns}
  onRowClick={(item) => navigate(`/users/${item.id}`)}
  rowClassName={(item) => {
    if (item.status === 'error') return 'bg-red-100 dark:bg-red-900/20';
    if (item.status === 'warning') return 'bg-yellow-100 dark:bg-yellow-900/20';
    return '';
  }}
/>
```

## Sorting

### Client-side Sorting

```tsx
const [sorting, setSorting] = useState<DataTableSorting<Person>>();

const sortedData = useMemo(() => {
  if (!sorting) return data;
  
  return [...data].sort((a, b) =>
    sorting.direction === 'asc'
      ? sorting.comparator(a[sorting.field], b[sorting.field])
      : sorting.comparator(b[sorting.field], a[sorting.field])
  );
}, [data, sorting]);

<DataTable
  rows={sortedData}
  columns={columns}
  sorting={{ sorting, onSortingChange: setSorting }}
/>
```

### Server-side Sorting

```tsx
const [sorting, setSorting] = useState<DataTableSorting<Person>>();

useEffect(() => {
  fetchData({ 
    sortBy: sorting?.field, 
    sortOrder: sorting?.direction 
  });
}, [sorting]);

<DataTable
  rows={data}
  columns={columns}
  sorting={{ sorting, onSortingChange: setSorting }}
/>
```

## Pagination

Available page sizes: `5`, `10`, `25`, `50`, `100`, `500`, `1000`

```tsx
const [page, setPage] = useState(0);
const [pageSize, setPageSize] = useState<DataTablePageSize>(10);

// Client-side pagination
const paginatedData = useMemo(
  () => data.slice(page * pageSize, (page + 1) * pageSize),
  [data, page, pageSize]
);

<DataTable
  rows={paginatedData}
  columns={columns}
  pagination={{
    currentPage: page,
    setCurrentPage: setPage,
    totalItems: data.length,
    pageSize,
    onPageSizeChange: setPageSize,
  }}
/>
```
