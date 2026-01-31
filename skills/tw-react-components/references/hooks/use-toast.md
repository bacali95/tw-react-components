# useToast

Hook for displaying toast notifications.

## Import

```tsx
import { useToast, Toaster } from 'tw-react-components';
```

## Setup

Add `Toaster` to your app root (once):

```tsx
function App() {
  return (
    <>
      <Toaster />
      <MyApp />
    </>
  );
}
```

## Basic Usage

```tsx
function MyComponent() {
  const { toast } = useToast();

  const handleClick = () => {
    toast({
      title: 'Success',
      description: 'Operation completed.',
    });
  };

  return <Button onClick={handleClick}>Show Toast</Button>;
}
```

## Return Value

```typescript
const { toast, dismiss, toasts } = useToast();
```

| Property | Type | Description |
|----------|------|-------------|
| `toast` | `(options) => { id, dismiss, update }` | Show a toast |
| `dismiss` | `(toastId?: string) => void` | Dismiss toast(s) |
| `toasts` | `ToasterToast[]` | Current toasts array |

## Toast Options

```typescript
toast({
  title: string;              // Required
  description?: ReactNode;    // Body text
  variant?: 'default' | 'success' | 'destructive';
  action?: ToastActionElement;
  duration?: number;
});
```

## Examples

### Variants

```tsx
// Default
toast({ title: 'Info', description: 'Something happened.' });

// Success
toast({ variant: 'success', title: 'Saved!' });

// Error
toast({ variant: 'destructive', title: 'Error', description: 'Failed to save.' });
```

### With Action

```tsx
import { Toast } from 'tw-react-components';

toast({
  title: 'Item deleted',
  action: (
    <Toast.Action altText="Undo" onClick={handleUndo}>
      Undo
    </Toast.Action>
  ),
});
```

### Update Toast

```tsx
const { update } = toast({ title: 'Saving...' });

await saveData();

update({ variant: 'success', title: 'Saved!' });
```

### Dismiss

```tsx
// Dismiss specific toast
const { dismiss } = toast({ title: 'Hello' });
dismiss();

// Or by ID
const { id } = toast({ title: 'Hello' });
dismiss(id);

// Dismiss all
const { dismiss: dismissAll } = useToast();
dismissAll();
```

### Async Operation Pattern

```tsx
const handleSubmit = async () => {
  const { update } = toast({ title: 'Processing...' });

  try {
    await submitData();
    update({ variant: 'success', title: 'Complete!' });
  } catch (error) {
    update({ 
      variant: 'destructive', 
      title: 'Error', 
      description: error.message 
    });
  }
};
```
