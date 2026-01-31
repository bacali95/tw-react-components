# ThemeSelector

Light/dark mode toggle dropdown component.

## Import

```tsx
import { ThemeSelector } from 'tw-react-components';
```

## Basic Usage

```tsx
<ThemeSelector />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | - | Additional CSS classes |
| `dataTestId` | `string` | `'theme-selector'` | Testing attribute |

## Requirements

Requires `LayoutContext` provider to be set up in your app.

## Features

- Dropdown with three options: Light, Dark, System
- Icons for each theme option
- Persists selection

## Examples

### Basic

```tsx
<ThemeSelector />
```

### With Custom Position

```tsx
<ThemeSelector className="ml-auto" />
```

### In Navbar

```tsx
<Navbar>
  <Navbar.Brand>My App</Navbar.Brand>
  <Flex align="center" gap={2} className="ml-auto">
    <ThemeSelector />
    <UserMenu />
  </Flex>
</Navbar>
```

### In Sidebar Footer

```tsx
<Layout
  sidebarProps={{
    items: [...],
    footer: (
      <Flex align="center" justify="between">
        <UserAvatar />
        <ThemeSelector />
      </Flex>
    ),
  }}
  // ...
/>
```

### In Settings Page

```tsx
function SettingsPage() {
  return (
    <div className="space-y-6">
      <section>
        <h2>Appearance</h2>
        <Flex justify="between" align="center">
          <div>
            <p className="font-medium">Theme</p>
            <p className="text-sm text-slate-500">
              Select your preferred theme
            </p>
          </div>
          <ThemeSelector />
        </Flex>
      </section>
    </div>
  );
}
```

## Theme Options

The selector provides three options:

| Option | Description |
|--------|-------------|
| Light | Always use light theme |
| Dark | Always use dark theme |
| System | Follow system preference |

## Using LayoutContext

To manually access theme state:

```tsx
import { useLayoutContext } from 'tw-react-components';

function MyComponent() {
  const { resolvedTheme, setTheme } = useLayoutContext();

  return (
    <div>
      <p>Current theme: {resolvedTheme}</p>
      <Button onClick={() => setTheme('light')}>Light</Button>
      <Button onClick={() => setTheme('dark')}>Dark</Button>
      <Button onClick={() => setTheme('system')}>System</Button>
    </div>
  );
}
```
