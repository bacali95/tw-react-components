# Block

Block-level container component (renders as a `div`).

## Import

```tsx
import { Block } from 'tw-react-components';
```

## Basic Usage

```tsx
<Block>Content here</Block>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `fullWidth` | `boolean` | `false` | width: 100% |
| `fullHeight` | `boolean` | `false` | height: 100% |
| `className` | `string` | - | Additional CSS classes |
| `dataTestId` | `string` | - | Testing attribute |

Extends all standard `div` props.

## Examples

### Basic

```tsx
<Block>Simple container</Block>
```

### With Styling

```tsx
<Block className="p-4 bg-slate-100 rounded-lg">
  Styled container
</Block>
```

### Full Width

```tsx
<Block fullWidth className="p-4 border-b">
  Full-width header
</Block>
```

### Full Height

```tsx
<Block fullHeight className="overflow-auto">
  Scrollable content area
</Block>
```

### Full Width and Height

```tsx
<Block fullWidth fullHeight className="flex items-center justify-center">
  Centered content
</Block>
```

### With Ref

```tsx
const ref = useRef<HTMLDivElement>(null);

<Block ref={ref}>
  Content with ref
</Block>
```

### Nested Layout

```tsx
<Block fullWidth fullHeight className="overflow-hidden">
  <Block className="p-4 border-b">Header</Block>
  <Block fullWidth className="flex-1 overflow-auto p-4">
    <p>Scrollable content...</p>
  </Block>
  <Block className="p-4 border-t">Footer</Block>
</Block>
```

### Relative Positioning

```tsx
<Block className="relative">
  <img src={image} alt="" />
  <Block className="absolute bottom-0 left-0 right-0 p-2 bg-black/50">
    <p className="text-white">Image caption</p>
  </Block>
</Block>
```

## When to Use

Use `Block` when you need:
- A simple `div` wrapper with fullWidth/fullHeight shortcuts
- Consistent component API with dataTestId support
- A container that works with the component library's patterns

For flexbox layouts, use [Flex](./flex.md) instead.
