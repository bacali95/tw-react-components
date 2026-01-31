# Sheet

Slide-in panel from screen edges. Use for side panels, mobile menus, or detail views.

## Import

```tsx
import { Sheet } from 'tw-react-components';
```

## Basic Usage

```tsx
<Sheet open={isOpen} onOpenChange={setIsOpen}>
  <Sheet.Trigger asChild>
    <Button>Open Sheet</Button>
  </Sheet.Trigger>
  <Sheet.Content>
    <Sheet.Header>
      <Sheet.Title>Sheet Title</Sheet.Title>
      <Sheet.Description>Optional description text</Sheet.Description>
    </Sheet.Header>
    <div className="py-4">
      Sheet body content goes here.
    </div>
    <Sheet.Footer>
      <Button variant="outlined" onClick={() => setIsOpen(false)}>
        Cancel
      </Button>
      <Button onClick={handleSave}>Save</Button>
    </Sheet.Footer>
  </Sheet.Content>
</Sheet>
```

## Props

### Sheet (Root)

| Prop | Type | Description |
|------|------|-------------|
| `open` | `boolean` | Controlled open state |
| `onOpenChange` | `(open: boolean) => void` | State change handler |
| `defaultOpen` | `boolean` | Initial open state (uncontrolled) |

### Sheet.Content

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `side` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'right'` | Slide direction |

## Sub-components

| Component | Description |
|-----------|-------------|
| `Sheet.Trigger` | Element that opens the sheet |
| `Sheet.Content` | The sheet container |
| `Sheet.Header` | Header section |
| `Sheet.Title` | Sheet title (required for accessibility) |
| `Sheet.Description` | Optional description |
| `Sheet.Footer` | Footer with actions |
| `Sheet.Close` | Closes sheet when clicked |

## Examples

### Different Sides

```tsx
// Right (default)
<Sheet.Content side="right">...</Sheet.Content>

// Left
<Sheet.Content side="left">...</Sheet.Content>

// Top
<Sheet.Content side="top">...</Sheet.Content>

// Bottom
<Sheet.Content side="bottom">...</Sheet.Content>
```

### Navigation Menu

```tsx
<Sheet>
  <Sheet.Trigger asChild>
    <Button prefixIcon={MenuIcon} variant="text" />
  </Sheet.Trigger>
  <Sheet.Content side="left">
    <Sheet.Header>
      <Sheet.Title>Navigation</Sheet.Title>
    </Sheet.Header>
    <nav className="flex flex-col gap-2 py-4">
      <a href="/" className="p-2 hover:bg-slate-100 rounded">Home</a>
      <a href="/about" className="p-2 hover:bg-slate-100 rounded">About</a>
      <a href="/contact" className="p-2 hover:bg-slate-100 rounded">Contact</a>
    </nav>
  </Sheet.Content>
</Sheet>
```

### Form Sheet

Use with FormDialog for form sheets:

```tsx
import { FormDialog, Sheet } from 'tw-react-components';

<FormDialog
  as={Sheet}
  title="Edit Profile"
  form={form}
  onSubmit={handleSubmit}
  open={isOpen}
  onClose={() => setIsOpen(false)}
>
  <FormInputs.Text name="name" label="Name" required />
  <FormInputs.Email name="email" label="Email" required />
</FormDialog>
```

### Detail View

```tsx
const [selectedItem, setSelectedItem] = useState(null);

<Sheet open={!!selectedItem} onOpenChange={(open) => !open && setSelectedItem(null)}>
  <Sheet.Content className="w-[400px] sm:max-w-[400px]">
    <Sheet.Header>
      <Sheet.Title>{selectedItem?.name}</Sheet.Title>
      <Sheet.Description>Item Details</Sheet.Description>
    </Sheet.Header>
    <div className="py-4 space-y-4">
      <div>
        <label className="text-sm text-slate-500">Status</label>
        <p>{selectedItem?.status}</p>
      </div>
      <div>
        <label className="text-sm text-slate-500">Created</label>
        <p>{selectedItem?.createdAt}</p>
      </div>
    </div>
    <Sheet.Footer>
      <Button variant="outlined" onClick={() => setSelectedItem(null)}>
        Close
      </Button>
      <Button onClick={() => handleEdit(selectedItem)}>Edit</Button>
    </Sheet.Footer>
  </Sheet.Content>
</Sheet>
```

### Custom Width

```tsx
<Sheet.Content side="right" className="w-[500px] sm:max-w-[500px]">
  {/* wider sheet */}
</Sheet.Content>
```
