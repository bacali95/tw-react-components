# Skeleton

Loading placeholder with pulse animation for content that's loading.

## Import

```tsx
import { Skeleton } from 'tw-react-components';
```

## Basic Usage

```tsx
<Skeleton className="h-4 w-48" />
```

## Props

| Prop | Type | Description |
|------|------|-------------|
| `className` | `string` | CSS classes for sizing and shape |
| `dataTestId` | `string` | Testing attribute (default: `'skeleton'`) |

## Common Patterns

### Text Lines

```tsx
// Single line
<Skeleton className="h-4 w-48" />

// Multiple lines
<div className="space-y-2">
  <Skeleton className="h-4 w-full" />
  <Skeleton className="h-4 w-3/4" />
  <Skeleton className="h-4 w-1/2" />
</div>
```

### Avatar

```tsx
// Circle
<Skeleton className="h-12 w-12 rounded-full" />

// Small avatar
<Skeleton className="h-8 w-8 rounded-full" />

// Large avatar
<Skeleton className="h-16 w-16 rounded-full" />
```

### Card

```tsx
<Skeleton className="h-32 w-full rounded-lg" />
```

### Image

```tsx
<Skeleton className="h-48 w-full rounded-md" />
```

## Examples

### User Card Skeleton

```tsx
function UserCardSkeleton() {
  return (
    <Card className="p-4">
      <Flex gap={3}>
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </Flex>
    </Card>
  );
}
```

### Table Row Skeleton

```tsx
function TableRowSkeleton({ columns = 4 }) {
  return (
    <tr>
      {Array.from({ length: columns }).map((_, i) => (
        <td key={i} className="p-4">
          <Skeleton className="h-4 w-full" />
        </td>
      ))}
    </tr>
  );
}
```

### Article Skeleton

```tsx
function ArticleSkeleton() {
  return (
    <div className="space-y-4">
      {/* Title */}
      <Skeleton className="h-8 w-3/4" />
      
      {/* Meta */}
      <Flex gap={2}>
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-32" />
      </Flex>
      
      {/* Image */}
      <Skeleton className="h-48 w-full rounded-lg" />
      
      {/* Content */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    </div>
  );
}
```

### Loading State Pattern

```tsx
function UserProfile({ userId }) {
  const { data: user, isLoading } = useQuery(['user', userId], fetchUser);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Flex gap={4}>
          <Skeleton className="h-20 w-20 rounded-full" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </Flex>
        <Skeleton className="h-32 w-full" />
      </div>
    );
  }

  return <UserProfileContent user={user} />;
}
```

### List Skeleton

```tsx
function ListSkeleton({ count = 5 }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <Flex key={i} gap={3} align="center">
          <Skeleton className="h-10 w-10 rounded" />
          <div className="flex-1 space-y-1">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </Flex>
      ))}
    </div>
  );
}
```

### Form Skeleton

```tsx
function FormSkeleton() {
  return (
    <div className="space-y-4">
      {/* Input field */}
      <div className="space-y-1">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-10 w-full" />
      </div>
      
      {/* Input field */}
      <div className="space-y-1">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-10 w-full" />
      </div>
      
      {/* Textarea */}
      <div className="space-y-1">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-24 w-full" />
      </div>
      
      {/* Button */}
      <Skeleton className="h-10 w-24" />
    </div>
  );
}
```
