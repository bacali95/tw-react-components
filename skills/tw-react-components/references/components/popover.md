# Popover

Floating content positioned relative to a trigger element.

## Import

```tsx
import { Popover } from 'tw-react-components';
```

## Basic Usage

```tsx
<Popover>
  <Popover.Trigger asChild>
    <Button>Open Popover</Button>
  </Popover.Trigger>
  <Popover.Content>
    <div className="p-4">
      <h3 className="font-medium">Popover Title</h3>
      <p className="text-sm text-slate-500">Popover content here.</p>
    </div>
  </Popover.Content>
</Popover>
```

## Props

### Popover.Content

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `align` | `'start' \| 'center' \| 'end'` | `'center'` | Horizontal alignment |
| `sideOffset` | `number` | `4` | Distance from trigger |
| `container` | `HTMLElement` | - | Portal container |

## Examples

### Alignment Options

```tsx
// Align to start
<Popover.Content align="start">
  Aligned to start
</Popover.Content>

// Align to center (default)
<Popover.Content align="center">
  Aligned to center
</Popover.Content>

// Align to end
<Popover.Content align="end">
  Aligned to end
</Popover.Content>
```

### Custom Offset

```tsx
<Popover.Content sideOffset={10}>
  Content with more spacing
</Popover.Content>
```

### With Form

```tsx
<Popover>
  <Popover.Trigger asChild>
    <Button>Add Note</Button>
  </Popover.Trigger>
  <Popover.Content align="start" className="w-80">
    <div className="p-4 space-y-4">
      <h3 className="font-medium">Add a Note</h3>
      <TextareaInput
        label="Note"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Enter your note..."
      />
      <Flex justify="end" gap={2}>
        <Button variant="outlined" size="small">Cancel</Button>
        <Button size="small" onClick={handleSave}>Save</Button>
      </Flex>
    </div>
  </Popover.Content>
</Popover>
```

### Color Picker Example

```tsx
const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple'];

<Popover>
  <Popover.Trigger asChild>
    <Button>
      <div 
        className="w-4 h-4 rounded" 
        style={{ backgroundColor: selectedColor }} 
      />
      Pick Color
    </Button>
  </Popover.Trigger>
  <Popover.Content>
    <div className="p-2 grid grid-cols-3 gap-2">
      {colors.map((color) => (
        <button
          key={color}
          className="w-8 h-8 rounded"
          style={{ backgroundColor: color }}
          onClick={() => setSelectedColor(color)}
        />
      ))}
    </div>
  </Popover.Content>
</Popover>
```

### User Menu

```tsx
<Popover>
  <Popover.Trigger asChild>
    <Button variant="text">
      <Avatar src={user.avatar} />
      {user.name}
    </Button>
  </Popover.Trigger>
  <Popover.Content align="end" className="w-64">
    <div className="p-4">
      <div className="flex items-center gap-3 mb-4">
        <Avatar src={user.avatar} size="large" />
        <div>
          <p className="font-medium">{user.name}</p>
          <p className="text-sm text-slate-500">{user.email}</p>
        </div>
      </div>
      <Separator className="my-2" />
      <nav className="space-y-1">
        <a href="/profile" className="block p-2 hover:bg-slate-100 rounded">
          Profile
        </a>
        <a href="/settings" className="block p-2 hover:bg-slate-100 rounded">
          Settings
        </a>
        <button 
          onClick={handleLogout}
          className="w-full text-left p-2 hover:bg-slate-100 rounded text-red-600"
        >
          Log out
        </button>
      </nav>
    </div>
  </Popover.Content>
</Popover>
```

## vs DropdownMenu

Use **Popover** for:
- Rich custom content
- Forms or interactive elements
- Custom layouts

Use **DropdownMenu** for:
- Action menus
- Selection menus with checkboxes/radio
- Keyboard-navigable lists
