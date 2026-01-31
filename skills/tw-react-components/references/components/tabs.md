# Tabs

Tabbed interface for organizing content into switchable panels.

## Import

```tsx
import { Tabs } from 'tw-react-components';
```

## Basic Usage

```tsx
<Tabs defaultValue="account">
  <Tabs.List>
    <Tabs.Trigger value="account">Account</Tabs.Trigger>
    <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
    <Tabs.Trigger value="notifications">Notifications</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="account">
    <p>Account settings and profile information.</p>
  </Tabs.Content>
  <Tabs.Content value="settings">
    <p>Application settings and preferences.</p>
  </Tabs.Content>
  <Tabs.Content value="notifications">
    <p>Notification preferences.</p>
  </Tabs.Content>
</Tabs>
```

## Controlled

```tsx
const [activeTab, setActiveTab] = useState('account');

<Tabs value={activeTab} onValueChange={setActiveTab}>
  <Tabs.List>
    <Tabs.Trigger value="account">Account</Tabs.Trigger>
    <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="account">Account content</Tabs.Content>
  <Tabs.Content value="settings">Settings content</Tabs.Content>
</Tabs>

// Change tab programmatically
<Button onClick={() => setActiveTab('settings')}>Go to Settings</Button>
```

## Props

### Tabs (Root)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `defaultValue` | `string` | - | Initial active tab (uncontrolled) |
| `value` | `string` | - | Active tab (controlled) |
| `onValueChange` | `(value: string) => void` | - | Tab change handler |
| `className` | `string` | - | Additional CSS classes |

### Tabs.Trigger

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | - | Tab identifier (required) |
| `disabled` | `boolean` | `false` | Disable the tab |

## Examples

### With Disabled Tab

```tsx
<Tabs defaultValue="tab1">
  <Tabs.List>
    <Tabs.Trigger value="tab1">Active</Tabs.Trigger>
    <Tabs.Trigger value="tab2">Also Active</Tabs.Trigger>
    <Tabs.Trigger value="tab3" disabled>Disabled</Tabs.Trigger>
  </Tabs.List>
  {/* ... */}
</Tabs>
```

### Dynamic Tabs

```tsx
const tabs = [
  { key: 'overview', label: 'Overview', content: <Overview /> },
  { key: 'analytics', label: 'Analytics', content: <Analytics /> },
  { key: 'reports', label: 'Reports', content: <Reports /> },
];

<Tabs defaultValue={tabs[0].key}>
  <Tabs.List>
    {tabs.map((tab) => (
      <Tabs.Trigger key={tab.key} value={tab.key}>
        {tab.label}
      </Tabs.Trigger>
    ))}
  </Tabs.List>
  {tabs.map((tab) => (
    <Tabs.Content key={tab.key} value={tab.key}>
      {tab.content}
    </Tabs.Content>
  ))}
</Tabs>
```

### With Icons

```tsx
import { UserIcon, SettingsIcon, BellIcon } from 'lucide-react';

<Tabs defaultValue="profile">
  <Tabs.List>
    <Tabs.Trigger value="profile">
      <Flex align="center" gap={2}>
        <UserIcon className="h-4 w-4" />
        Profile
      </Flex>
    </Tabs.Trigger>
    <Tabs.Trigger value="settings">
      <Flex align="center" gap={2}>
        <SettingsIcon className="h-4 w-4" />
        Settings
      </Flex>
    </Tabs.Trigger>
  </Tabs.List>
  {/* ... */}
</Tabs>
```

### Styled Content

```tsx
<Tabs defaultValue="tab1" className="w-[400px]">
  <Tabs.List>
    <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
    <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="tab1">
    <Card className="p-4">
      <h3>Tab 1 Content</h3>
      <p>Content with card styling.</p>
    </Card>
  </Tabs.Content>
  <Tabs.Content value="tab2">
    <Card className="p-4">
      <h3>Tab 2 Content</h3>
      <p>More content here.</p>
    </Card>
  </Tabs.Content>
</Tabs>
```
