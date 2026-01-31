# Hint

Notification indicators (dots and badges) to overlay on elements.

## Import

```tsx
import { Hint } from 'tw-react-components';
```

## Basic Usage

```tsx
<Hint>
  <Button prefixIcon={BellIcon} />
  <Hint.Dot color="red" />
</Hint>
```

## Components

- `Hint` - Root wrapper
- `Hint.Dot` - Small dot indicator
- `Hint.Badge` - Badge with content (text, number)

## Hint.Dot Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `color` | `Color` | `'green'` | Dot color |
| `size` | `'small' \| 'medium'` | `'medium'` | Dot size |
| `placement` | `'top-left' \| 'top-right' \| 'bottom-right' \| 'bottom-left'` | `'top-right'` | Position |
| `ping` | `boolean` | `false` | Animated ping effect |

## Hint.Badge Props

Same as Badge component plus:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `placement` | `HintPlacement` | `'top-right'` | Position |

## Examples

### Dot Indicator

```tsx
<Hint>
  <Button prefixIcon={BellIcon} />
  <Hint.Dot />
</Hint>
```

### With Ping Animation

```tsx
<Hint>
  <Button prefixIcon={BellIcon} />
  <Hint.Dot color="green" ping />
</Hint>
```

### Different Colors

```tsx
<Hint>
  <Button>Online</Button>
  <Hint.Dot color="green" />
</Hint>

<Hint>
  <Button>Busy</Button>
  <Hint.Dot color="red" />
</Hint>

<Hint>
  <Button>Away</Button>
  <Hint.Dot color="yellow" />
</Hint>
```

### Placement Options

```tsx
<Hint>
  <Button>Top Left</Button>
  <Hint.Dot placement="top-left" />
</Hint>

<Hint>
  <Button>Top Right</Button>
  <Hint.Dot placement="top-right" />
</Hint>

<Hint>
  <Button>Bottom Right</Button>
  <Hint.Dot placement="bottom-right" />
</Hint>

<Hint>
  <Button>Bottom Left</Button>
  <Hint.Dot placement="bottom-left" />
</Hint>
```

### Badge with Count

```tsx
<Hint>
  <Button prefixIcon={InboxIcon} />
  <Hint.Badge color="red">5</Hint.Badge>
</Hint>

<Hint>
  <Button prefixIcon={MailIcon} />
  <Hint.Badge color="blue">12</Hint.Badge>
</Hint>

<Hint>
  <Button prefixIcon={ShoppingCartIcon} />
  <Hint.Badge color="green">99+</Hint.Badge>
</Hint>
```

### Styled Badge

```tsx
<Hint>
  <Button prefixIcon={BellIcon} />
  <Hint.Badge 
    color="red" 
    className="text-xs rounded-full aspect-square justify-center"
  >
    3
  </Hint.Badge>
</Hint>
```

### Notification Icon

```tsx
function NotificationButton({ count }: { count: number }) {
  return (
    <Hint>
      <Button prefixIcon={BellIcon} variant="text" />
      {count > 0 && (
        <Hint.Badge color="red">
          {count > 99 ? '99+' : count}
        </Hint.Badge>
      )}
    </Hint>
  );
}
```

### Online Status Avatar

```tsx
function UserAvatar({ user, isOnline }) {
  return (
    <Hint>
      <img 
        src={user.avatar} 
        className="h-10 w-10 rounded-full" 
        alt={user.name} 
      />
      <Hint.Dot 
        color={isOnline ? 'green' : 'gray'} 
        placement="bottom-right"
        size="small"
      />
    </Hint>
  );
}
```

### In DataTable Actions

```tsx
<DataTable
  rows={data}
  columns={columns}
  actions={[
    {
      icon: MessageIcon,
      hasNotification: (item) => 
        item.unreadMessages > 0 
          ? { 
              type: 'badge', 
              props: { 
                children: item.unreadMessages,
                color: 'red',
              } 
            }
          : false,
      onClick: handleMessages,
    },
    {
      icon: AlertIcon,
      hasNotification: (item) => 
        item.hasWarning ? { type: 'dot', props: { color: 'yellow', ping: true } } : false,
      onClick: handleWarning,
    },
  ]}
/>
```

### Sidebar Menu Item

```tsx
function MenuItem({ icon: Icon, label, notificationCount }) {
  return (
    <Hint>
      <Flex align="center" gap={2} className="p-2 hover:bg-slate-100 rounded">
        <Icon className="h-5 w-5" />
        <span>{label}</span>
      </Flex>
      {notificationCount > 0 && (
        <Hint.Badge color="red" placement="top-right">
          {notificationCount}
        </Hint.Badge>
      )}
    </Hint>
  );
}
```
