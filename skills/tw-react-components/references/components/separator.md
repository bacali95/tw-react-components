# Separator

Visual divider line for separating content.

## Import

```tsx
import { Separator } from 'tw-react-components';
```

## Basic Usage

```tsx
<Separator />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Line direction |
| `decorative` | `boolean` | `true` | Accessibility: purely decorative |
| `className` | `string` | - | Additional CSS classes |
| `dataTestId` | `string` | `'separator'` | Testing attribute |

## Examples

### Horizontal (Default)

```tsx
<div>
  <p>Section 1</p>
  <Separator />
  <p>Section 2</p>
</div>
```

### Vertical

```tsx
<Flex align="center" gap={4}>
  <span>Left</span>
  <Separator orientation="vertical" className="h-6" />
  <span>Right</span>
</Flex>
```

### With Spacing

```tsx
<Separator className="my-4" />
<Separator className="my-8" />
```

### Custom Color

```tsx
<Separator className="bg-slate-300 dark:bg-slate-600" />
<Separator className="bg-blue-500" />
```

### Between Menu Items

```tsx
<DropdownMenu.Content>
  <DropdownMenu.Item>Profile</DropdownMenu.Item>
  <DropdownMenu.Item>Settings</DropdownMenu.Item>
  <Separator className="my-1" />
  <DropdownMenu.Item>Log out</DropdownMenu.Item>
</DropdownMenu.Content>
```

### In Navigation

```tsx
<Flex align="center" gap={2}>
  <a href="/">Home</a>
  <Separator orientation="vertical" className="h-4" />
  <a href="/about">About</a>
  <Separator orientation="vertical" className="h-4" />
  <a href="/contact">Contact</a>
</Flex>
```

### Section Divider

```tsx
<div className="space-y-6">
  <section>
    <h2>Personal Information</h2>
    {/* form fields */}
  </section>
  
  <Separator />
  
  <section>
    <h2>Account Settings</h2>
    {/* form fields */}
  </section>
</div>
```

### With Label

```tsx
<Flex align="center" gap={4}>
  <Separator className="flex-1" />
  <span className="text-sm text-slate-500">OR</span>
  <Separator className="flex-1" />
</Flex>
```

### Card Section Divider

```tsx
<Card className="p-0">
  <div className="p-4">
    <h3>Header</h3>
  </div>
  <Separator />
  <div className="p-4">
    <p>Body content</p>
  </div>
  <Separator />
  <div className="p-4">
    <Flex justify="end" gap={2}>
      <Button variant="outlined">Cancel</Button>
      <Button>Save</Button>
    </Flex>
  </div>
</Card>
```
