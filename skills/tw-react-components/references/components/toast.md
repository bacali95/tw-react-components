# Toast & Toaster

Toast notification system for displaying brief messages.

## Import

```tsx
import { Toaster, Toast, useToast } from 'tw-react-components';
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

  const handleSave = () => {
    // ... save logic
    toast({
      title: 'Saved!',
      description: 'Your changes have been saved.',
    });
  };

  return <Button onClick={handleSave}>Save</Button>;
}
```

## Toast Options

```typescript
toast({
  title: string;              // Required
  description?: ReactNode;    // Optional body text
  variant?: 'default' | 'success' | 'destructive';
  action?: ToastActionElement;
  duration?: number;          // Auto-dismiss time in ms
});
```

## Variants

```tsx
// Default
toast({
  title: 'Notification',
  description: 'Something happened.',
});

// Success
toast({
  variant: 'success',
  title: 'Success!',
  description: 'Operation completed successfully.',
});

// Destructive (error)
toast({
  variant: 'destructive',
  title: 'Error',
  description: 'Something went wrong.',
});
```

## With Action

```tsx
toast({
  title: 'Item deleted',
  description: 'The item has been removed.',
  action: (
    <Toast.Action altText="Undo" onClick={handleUndo}>
      Undo
    </Toast.Action>
  ),
});
```

## useToast Hook

```tsx
const { toast, dismiss, toasts } = useToast();

// Show toast and get controls
const { id, dismiss: dismissThis, update } = toast({
  title: 'Processing...',
});

// Update existing toast
update({ title: 'Complete!', variant: 'success' });

// Dismiss specific toast
dismissThis();
// or
dismiss(id);

// Dismiss all toasts
dismiss();

// Access all current toasts
console.log(toasts);
```

## Examples

### Async Operation

```tsx
const handleSubmit = async () => {
  const { update, dismiss } = toast({
    title: 'Saving...',
    description: 'Please wait.',
  });

  try {
    await saveData();
    update({
      variant: 'success',
      title: 'Saved!',
      description: 'Your changes have been saved.',
    });
  } catch (error) {
    update({
      variant: 'destructive',
      title: 'Error',
      description: error.message,
    });
  }
};
```

### Form Validation Error

```tsx
const onInvalid = (errors) => {
  const errorCount = Object.keys(errors).length;
  toast({
    variant: 'destructive',
    title: 'Validation Error',
    description: `Please fix ${errorCount} error(s) in the form.`,
  });
};

<form onSubmit={form.handleSubmit(onSubmit, onInvalid)}>
  ...
</form>
```

### Copy to Clipboard

```tsx
const handleCopy = async (text: string) => {
  await navigator.clipboard.writeText(text);
  toast({
    title: 'Copied!',
    description: 'Text copied to clipboard.',
  });
};
```

### With Undo Action

```tsx
const handleDelete = (item: Item) => {
  // Optimistically remove
  removeItem(item.id);

  toast({
    title: 'Item deleted',
    action: (
      <Toast.Action 
        altText="Undo deletion"
        onClick={() => restoreItem(item)}
      >
        Undo
      </Toast.Action>
    ),
  });
};
```

## Toast Components

For custom toast rendering:

```tsx
<Toast.Provider>
  <Toast.Root variant="success">
    <Toast.Title>Custom Toast</Toast.Title>
    <Toast.Description>With custom structure</Toast.Description>
    <Toast.Action altText="Action">Action</Toast.Action>
    <Toast.Close />
  </Toast.Root>
  <Toast.Viewport />
</Toast.Provider>
```
