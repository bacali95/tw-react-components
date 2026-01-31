# Button

Versatile button component with multiple variants, colors, sizes, and icon support.

## Import

```tsx
import { Button } from 'tw-react-components';
```

## Usage

```tsx
import { SaveIcon, TrashIcon } from 'lucide-react';

// Basic variants
<Button>Default</Button>
<Button variant="outlined" color="blue">Outlined</Button>
<Button variant="text" color="red">Text</Button>

// With icons
<Button prefixIcon={SaveIcon}>Save</Button>
<Button suffixIcon={TrashIcon} color="red">Delete</Button>
<Button prefixIcon={SaveIcon} />  // Icon-only button

// States and sizes
<Button loading>Saving...</Button>
<Button disabled>Disabled</Button>
<Button size="small">Small</Button>
<Button rounded>Rounded</Button>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'small' \| 'medium'` | `'medium'` | Button size |
| `color` | `Color` | `'slate'` | Color theme |
| `variant` | `'filled' \| 'outlined' \| 'text'` | `'filled'` | Visual style |
| `rounded` | `boolean` | `false` | Fully rounded corners |
| `loading` | `boolean` | `false` | Show spinner, disable button |
| `disabled` | `boolean` | `false` | Disable interactions |
| `prefixIcon` | `LucideIcon` | - | Icon before text |
| `suffixIcon` | `LucideIcon` | - | Icon after text |
| `unstyled` | `boolean` | `false` | Remove hover/focus styles |
| `dataTestId` | `string` | `'button'` | Testing attribute |

## Examples

### Loading State

```tsx
const [loading, setLoading] = useState(false);

const handleSave = async () => {
  setLoading(true);
  await saveData();
  setLoading(false);
};

<Button loading={loading} onClick={handleSave}>
  {loading ? 'Saving...' : 'Save'}
</Button>
```

### Icon-Only Button

```tsx
<Button prefixIcon={MenuIcon} color="slate" />
<Button prefixIcon={CloseIcon} variant="text" size="small" />
```

### Button Group

```tsx
<Flex gap={2}>
  <Button variant="outlined">Cancel</Button>
  <Button color="green">Submit</Button>
</Flex>
```
