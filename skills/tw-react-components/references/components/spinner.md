# Spinner

Loading indicator component with animated spinner.

## Import

```tsx
import { Spinner } from 'tw-react-components';
```

## Basic Usage

```tsx
<Spinner />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `fullScreen` | `boolean` | `false` | Fill entire screen |
| `spinnerClassName` | `string` | - | CSS classes for the spinner SVG |
| `className` | `string` | - | CSS classes for the container |
| `dataTestId` | `string` | `'spinner'` | Testing attribute |

## Examples

### Default

```tsx
<Spinner />
```

### Full Screen

Centers spinner in the entire viewport. Useful for initial page load.

```tsx
<Spinner fullScreen />
```

### Custom Size

```tsx
// Smaller
<Spinner spinnerClassName="h-4 w-4" />

// Larger
<Spinner spinnerClassName="h-12 w-12" />

// Extra large
<Spinner spinnerClassName="h-16 w-16" />
```

### Custom Background

```tsx
// Transparent background
<Spinner className="bg-transparent" />

// Custom background
<Spinner className="bg-slate-100 dark:bg-slate-800" />

// Semi-transparent overlay
<Spinner className="bg-white/50 dark:bg-slate-900/50" />
```

### Loading Overlay

```tsx
function LoadingOverlay({ isLoading, children }) {
  return (
    <div className="relative">
      {children}
      {isLoading && (
        <div className="absolute inset-0 z-10">
          <Spinner className="bg-white/80 dark:bg-slate-900/80" />
        </div>
      )}
    </div>
  );
}
```

### In Button

The Button component has built-in loading support:

```tsx
<Button loading>Saving...</Button>
```

### Inline with Text

```tsx
<Flex align="center" gap={2}>
  <Spinner spinnerClassName="h-4 w-4" className="bg-transparent w-fit h-fit" />
  <span>Loading...</span>
</Flex>
```

### Loading State Pattern

```tsx
function DataList() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  if (isLoading) {
    return <Spinner />;
  }

  if (data.length === 0) {
    return <p>No data found</p>;
  }

  return <ul>{data.map(item => <li key={item.id}>{item.name}</li>)}</ul>;
}
```

### In Card

```tsx
<Card className="h-64">
  {isLoading ? (
    <Spinner />
  ) : (
    <div>{content}</div>
  )}
</Card>
```
