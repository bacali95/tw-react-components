# Dialog

Modal dialog components including basic Dialog, ConfirmDialog, FormDialog, and specialized dialogs.

## Import

```tsx
import { Dialog, ConfirmDialog, FormDialog, PdfViewerDialog, ListSorterDialog } from 'tw-react-components';
```

## Basic Dialog

```tsx
<Dialog open={isOpen} onOpenChange={setIsOpen}>
  <Dialog.Trigger asChild>
    <Button>Open</Button>
  </Dialog.Trigger>
  <Dialog.Content>
    <Dialog.Header>
      <Dialog.Title>Dialog Title</Dialog.Title>
      <Dialog.Description>Optional description text</Dialog.Description>
    </Dialog.Header>
    <div>Dialog body content</div>
    <Dialog.Footer>
      <Dialog.Close asChild>
        <Button variant="outlined">Cancel</Button>
      </Dialog.Close>
      <Button onClick={handleConfirm}>Confirm</Button>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog>
```

### Sub-components

- `Dialog.Trigger` - Element that opens the dialog
- `Dialog.Content` - The dialog container
- `Dialog.Header` - Header section
- `Dialog.Title` - Dialog title (required for accessibility)
- `Dialog.Description` - Optional description
- `Dialog.Footer` - Footer with actions
- `Dialog.Close` - Closes dialog when clicked

## ConfirmDialog

Pre-built confirmation dialog with Yes/No actions.

```tsx
const [isOpen, setIsOpen] = useState(false);

<Button onClick={() => setIsOpen(true)}>Delete</Button>

<ConfirmDialog
  open={isOpen}
  title="Delete Item?"
  onClose={() => setIsOpen(false)}
  onConfirm={() => {
    deleteItem();
    setIsOpen(false);
  }}
>
  Are you sure you want to delete this item? This action cannot be undone.
</ConfirmDialog>
```

### Props

| Prop | Type | Description |
|------|------|-------------|
| `open` | `boolean` | Open state |
| `title` | `string` | Dialog title |
| `onClose` | `() => void` | Close handler |
| `onConfirm` | `() => void` | Confirm handler |
| `children` | `ReactNode` | Confirmation message |

## FormDialog

Dialog with integrated react-hook-form support.

```tsx
import { useForm } from 'react-hook-form';

type LoginForm = { email: string; password: string };

const form = useForm<LoginForm>({ defaultValues: {} });

<FormDialog
  title="Login"
  form={form}
  onSubmit={(data) => {
    console.log(data);
    setIsOpen(false);
  }}
  open={isOpen}
  onClose={() => setIsOpen(false)}
  extraAction={<Button variant="text">Forgot Password?</Button>}
>
  <FormInputs.Email name="email" label="Email" required />
  <FormInputs.Password name="password" label="Password" required />
</FormDialog>
```

### Props

| Prop | Type | Description |
|------|------|-------------|
| `form` | `UseFormReturn` | react-hook-form instance |
| `onSubmit` | `(data) => void` | Submit handler |
| `open` | `boolean` | Open state |
| `onClose` | `() => void` | Close handler |
| `title` | `string` | Dialog title |
| `extraAction` | `ReactNode` | Additional action button |
| `as` | `typeof Dialog \| typeof Sheet` | Render as different component |

### Render as Sheet

```tsx
<FormDialog
  as={Sheet}
  title="Edit Profile"
  form={form}
  onSubmit={handleSubmit}
  open={isOpen}
  onClose={() => setIsOpen(false)}
>
  {/* Form fields */}
</FormDialog>
```

## PdfViewerDialog

Display PDF documents in a dialog.

```tsx
<PdfViewerDialog
  title="Document Preview"
  url="https://example.com/document.pdf"
  open={isOpen}
  onClose={() => setIsOpen(false)}
/>
```

## ListSorterDialog

Drag-and-drop list reordering dialog.

```tsx
<ListSorterDialog
  title="Reorder Items"
  open={isOpen}
  items={['Item 1', 'Item 2', 'Item 3']}
  renderer={(item) => item}
  idResolver={(item) => item}
  onSubmit={(sortedItems) => {
    console.log(sortedItems);
    setIsOpen(false);
  }}
  onClose={() => setIsOpen(false)}
/>
```
