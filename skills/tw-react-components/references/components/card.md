# Card

Container component with border, background, and shadow styling.

## Import

```tsx
import { Card } from 'tw-react-components';
```

## Basic Usage

```tsx
<Card className="p-4">
  <h2>Card Title</h2>
  <p>Card content goes here.</p>
</Card>
```

## Props

Standard `div` props plus:

| Prop | Type | Description |
|------|------|-------------|
| `className` | `string` | Additional CSS classes |
| `dataTestId` | `string` | Testing attribute |

## Examples

### Basic

```tsx
<Card className="p-4">
  <h2 className="text-lg font-medium">Card Title</h2>
  <p className="text-slate-500">Some description text.</p>
</Card>
```

### With Actions

```tsx
<Card className="p-4">
  <h2 className="font-medium">Settings</h2>
  <p className="text-sm text-slate-500 mb-4">Configure your preferences.</p>
  <Flex justify="end" className="gap-2">
    <Button variant="outlined">Cancel</Button>
    <Button>Save</Button>
  </Flex>
</Card>
```

### Stat Card

```tsx
<Card className="p-4">
  <p className="text-sm text-slate-500">Total Users</p>
  <p className="text-3xl font-bold">1,234</p>
  <p className="text-sm text-green-500">+12% from last month</p>
</Card>
```

### User Card

```tsx
<Card className="p-4">
  <Flex gap={4} align="center">
    <img 
      src={user.avatar} 
      alt={user.name}
      className="h-16 w-16 rounded-full"
    />
    <div>
      <h3 className="font-medium">{user.name}</h3>
      <p className="text-slate-500">{user.email}</p>
    </div>
  </Flex>
</Card>
```

### List Card

```tsx
<Card className="p-0 divide-y">
  {items.map(item => (
    <div key={item.id} className="p-4 hover:bg-slate-50">
      <p className="font-medium">{item.title}</p>
      <p className="text-sm text-slate-500">{item.description}</p>
    </div>
  ))}
</Card>
```

### Card with Header

```tsx
<Card className="p-0">
  <div className="p-4 border-b">
    <h3 className="font-medium">Recent Activity</h3>
  </div>
  <div className="p-4">
    <p>Activity content here...</p>
  </div>
</Card>
```

### Card with Image

```tsx
<Card className="p-0 overflow-hidden">
  <img 
    src={image} 
    alt="Cover" 
    className="w-full h-48 object-cover"
  />
  <div className="p-4">
    <h3 className="font-medium">{title}</h3>
    <p className="text-slate-500">{description}</p>
  </div>
</Card>
```

### Clickable Card

```tsx
<Card 
  className="p-4 cursor-pointer hover:shadow-lg transition-shadow"
  onClick={handleClick}
>
  <h3 className="font-medium">{title}</h3>
  <p className="text-slate-500">{description}</p>
</Card>
```

### Card Grid

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {items.map(item => (
    <Card key={item.id} className="p-4">
      <h3 className="font-medium">{item.title}</h3>
      <p className="text-slate-500">{item.description}</p>
    </Card>
  ))}
</div>
```

### Loading Card

```tsx
<Card className="p-4">
  {isLoading ? (
    <div className="space-y-2">
      <Skeleton className="h-6 w-1/3" />
      <Skeleton className="h-4 w-2/3" />
    </div>
  ) : (
    <>
      <h3 className="font-medium">{data.title}</h3>
      <p className="text-slate-500">{data.description}</p>
    </>
  )}
</Card>
```
