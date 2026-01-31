# Flex

Flexbox layout component for arranging child elements.

## Import

```tsx
import { Flex } from 'tw-react-components';
```

## Basic Usage

```tsx
<Flex>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Flex>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `direction` | `'row' \| 'column'` | `'row'` | Flex direction |
| `align` | `'start' \| 'center' \| 'end' \| 'stretch'` | - | align-items |
| `justify` | `'start' \| 'center' \| 'end' \| 'between' \| 'around'` | - | justify-content |
| `wrap` | `boolean` | `false` | Enable flex-wrap |
| `fullWidth` | `boolean` | `false` | width: 100% |
| `fullHeight` | `boolean` | `false` | height: 100% |
| `className` | `string` | - | Additional CSS classes |
| `gap` | - | - | Use className for gap (e.g., `gap-4`) |

## Examples

### Direction

```tsx
// Row (default)
<Flex direction="row">
  <div>1</div>
  <div>2</div>
  <div>3</div>
</Flex>

// Column
<Flex direction="column">
  <div>1</div>
  <div>2</div>
  <div>3</div>
</Flex>
```

### Alignment

```tsx
// Center items vertically
<Flex align="center">
  <div className="h-10">Short</div>
  <div className="h-20">Tall</div>
</Flex>

// Center items horizontally
<Flex justify="center">
  <div>Centered</div>
</Flex>

// Center both
<Flex align="center" justify="center" className="h-64">
  <div>Centered content</div>
</Flex>
```

### Justify Content

```tsx
// Space between
<Flex justify="between">
  <div>Left</div>
  <div>Right</div>
</Flex>

// Space around
<Flex justify="around">
  <div>1</div>
  <div>2</div>
  <div>3</div>
</Flex>

// End
<Flex justify="end">
  <Button>Right-aligned</Button>
</Flex>
```

### Gap

Use Tailwind's gap classes:

```tsx
<Flex className="gap-2">
  <div>Item 1</div>
  <div>Item 2</div>
</Flex>

<Flex className="gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
</Flex>
```

### Wrap

```tsx
<Flex wrap className="gap-2">
  {items.map(item => (
    <Badge key={item.id}>{item.name}</Badge>
  ))}
</Flex>
```

### Full Width/Height

```tsx
// Full width
<Flex fullWidth justify="between">
  <span>Left</span>
  <span>Right</span>
</Flex>

// Full height
<Flex fullHeight direction="column" justify="between">
  <header>Top</header>
  <footer>Bottom</footer>
</Flex>

// Both
<Flex fullWidth fullHeight align="center" justify="center">
  <Spinner />
</Flex>
```

### Common Layouts

#### Header with Actions

```tsx
<Flex justify="between" align="center" fullWidth>
  <h1>Page Title</h1>
  <Flex className="gap-2">
    <Button variant="outlined">Cancel</Button>
    <Button>Save</Button>
  </Flex>
</Flex>
```

#### Form Actions

```tsx
<Flex justify="end" className="gap-2">
  <Button variant="outlined">Cancel</Button>
  <Button color="green">Submit</Button>
</Flex>
```

#### Vertical Stack

```tsx
<Flex direction="column" className="gap-4">
  <TextInput label="Name" />
  <TextInput label="Email" />
  <TextInput label="Phone" />
</Flex>
```

#### Centered Content

```tsx
<Flex align="center" justify="center" className="h-screen">
  <Card className="p-8">
    <h1>Welcome</h1>
  </Card>
</Flex>
```

#### Sidebar Layout

```tsx
<Flex className="h-screen">
  <aside className="w-64">Sidebar</aside>
  <main className="flex-1">Content</main>
</Flex>
```

### With Ref

```tsx
const ref = useRef<HTMLDivElement>(null);

<Flex ref={ref} align="center">
  <div>Content</div>
</Flex>
```
