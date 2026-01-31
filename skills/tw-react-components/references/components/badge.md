# Badge

Small status indicator component, built on top of the Button component.

## Import

```tsx
import { Badge } from 'tw-react-components';
```

## Basic Usage

```tsx
<Badge>Default</Badge>
<Badge color="green">Success</Badge>
<Badge color="red">Error</Badge>
<Badge color="blue">Info</Badge>
<Badge color="yellow">Warning</Badge>
```

## Props

Same as Button, except `variant` is limited to `'filled' | 'outlined'`.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'small' \| 'medium'` | `'small'` | Badge size |
| `color` | `Color` | `'slate'` | Color theme |
| `variant` | `'filled' \| 'outlined'` | `'filled'` | Visual style |
| `prefixIcon` | `LucideIcon` | - | Icon before text |
| `suffixIcon` | `LucideIcon` | - | Icon after text |

## Examples

### Variants

```tsx
<Badge color="green">Active</Badge>
<Badge color="green" variant="outlined">Active</Badge>
```

### Sizes

```tsx
<Badge size="small" color="blue">Small</Badge>
<Badge size="medium" color="blue">Medium</Badge>
```

### With Icons

```tsx
import { CheckIcon, XIcon, ClockIcon } from 'lucide-react';

<Badge prefixIcon={CheckIcon} color="green">Approved</Badge>
<Badge prefixIcon={XIcon} color="red">Rejected</Badge>
<Badge prefixIcon={ClockIcon} color="yellow">Pending</Badge>
```

### Status Indicators

```tsx
function StatusBadge({ status }: { status: string }) {
  const config = {
    active: { color: 'green', label: 'Active' },
    inactive: { color: 'gray', label: 'Inactive' },
    pending: { color: 'yellow', label: 'Pending' },
    error: { color: 'red', label: 'Error' },
  }[status];

  return <Badge color={config.color}>{config.label}</Badge>;
}
```

### In DataTable

```tsx
const columns: DataTableColumns<User> = {
  status: {
    header: 'Status',
    field: 'status',
    render: (item) => (
      <Badge color={item.active ? 'green' : 'gray'}>
        {item.active ? 'Active' : 'Inactive'}
      </Badge>
    ),
  },
};
```

### Count Badge

```tsx
<Badge color="red" className="rounded-full aspect-square justify-center">
  5
</Badge>

<Badge color="blue" className="rounded-full px-2">
  99+
</Badge>
```

### Badge Group

```tsx
<Flex gap={1} wrap>
  <Badge color="blue">React</Badge>
  <Badge color="cyan">TypeScript</Badge>
  <Badge color="purple">TailwindCSS</Badge>
</Flex>
```

## Colors

All Tailwind colors are available:

```tsx
<Badge color="primary">Primary</Badge>
<Badge color="secondary">Secondary</Badge>
<Badge color="slate">Slate</Badge>
<Badge color="red">Red</Badge>
<Badge color="orange">Orange</Badge>
<Badge color="yellow">Yellow</Badge>
<Badge color="green">Green</Badge>
<Badge color="blue">Blue</Badge>
<Badge color="purple">Purple</Badge>
<Badge color="pink">Pink</Badge>
```
