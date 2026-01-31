# Tooltip

Shows contextual information on hover.

## Import

```tsx
import { Tooltip } from 'tw-react-components';
```

## Basic Usage

```tsx
<Tooltip content="Helpful hint text">
  <Button>Hover me</Button>
</Tooltip>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `content` | `ReactNode` | - | Tooltip content (required) |
| `placement` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` | Position |
| `asChild` | `boolean` | `false` | Merge trigger with child |
| `className` | `string` | - | Additional CSS classes |

## Examples

### Placement

```tsx
<Tooltip content="Top tooltip" placement="top">
  <Button>Top</Button>
</Tooltip>

<Tooltip content="Bottom tooltip" placement="bottom">
  <Button>Bottom</Button>
</Tooltip>

<Tooltip content="Left tooltip" placement="left">
  <Button>Left</Button>
</Tooltip>

<Tooltip content="Right tooltip" placement="right">
  <Button>Right</Button>
</Tooltip>
```

### On Icon Button

```tsx
<Tooltip content="Settings">
  <Button prefixIcon={SettingsIcon} variant="text" />
</Tooltip>

<Tooltip content="Delete item">
  <Button prefixIcon={TrashIcon} color="red" />
</Tooltip>
```

### Rich Content

```tsx
<Tooltip 
  content={
    <div>
      <strong>Keyboard Shortcut</strong>
      <p className="text-xs text-slate-400">Ctrl + S</p>
    </div>
  }
>
  <Button>Save</Button>
</Tooltip>
```

### On Disabled Elements

Wrap disabled elements in a span for tooltips to work:

```tsx
<Tooltip content="You don't have permission">
  <span>
    <Button disabled>Delete</Button>
  </span>
</Tooltip>
```

### As Child

Use `asChild` to merge the trigger with a custom component:

```tsx
<Tooltip content="User profile" asChild>
  <a href="/profile">
    <Avatar src={user.avatar} />
  </a>
</Tooltip>
```

### In DataTable Actions

```tsx
<DataTable
  rows={data}
  columns={columns}
  actions={[
    {
      icon: PencilIcon,
      onClick: handleEdit,
      // Tooltip added automatically via label
      label: 'Edit',
    },
  ]}
/>

// Or wrap action buttons manually
<Tooltip content="Edit this item">
  <Button prefixIcon={PencilIcon} size="small" onClick={handleEdit} />
</Tooltip>
```
