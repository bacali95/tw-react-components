# DropdownMenu

Context and action menus with full keyboard navigation support.

## Import

```tsx
import { DropdownMenu } from 'tw-react-components';
```

## Basic Usage

```tsx
import { UserIcon, SettingsIcon, LogOutIcon } from 'lucide-react';

<DropdownMenu>
  <DropdownMenu.Trigger asChild>
    <Button>Menu</Button>
  </DropdownMenu.Trigger>
  <DropdownMenu.Content>
    <DropdownMenu.Item onClick={handleProfile}>
      <DropdownMenu.Icon icon={UserIcon} />
      Profile
    </DropdownMenu.Item>
    <DropdownMenu.Item onClick={handleSettings}>
      <DropdownMenu.Icon icon={SettingsIcon} />
      Settings
    </DropdownMenu.Item>
    <DropdownMenu.Separator />
    <DropdownMenu.Item onClick={handleLogout}>
      <DropdownMenu.Icon icon={LogOutIcon} />
      Log out
    </DropdownMenu.Item>
  </DropdownMenu.Content>
</DropdownMenu>
```

## Sub-components

| Component | Description |
|-----------|-------------|
| `DropdownMenu.Trigger` | Element that opens the menu |
| `DropdownMenu.Content` | Menu container |
| `DropdownMenu.Item` | Clickable menu item |
| `DropdownMenu.Label` | Non-interactive label/header |
| `DropdownMenu.Separator` | Visual divider |
| `DropdownMenu.Icon` | Icon wrapper |
| `DropdownMenu.Shortcut` | Keyboard shortcut text |
| `DropdownMenu.Group` | Group of related items |
| `DropdownMenu.Sub` | Submenu container |
| `DropdownMenu.SubTrigger` | Submenu trigger |
| `DropdownMenu.SubContent` | Submenu content |
| `DropdownMenu.CheckboxItem` | Checkable item |
| `DropdownMenu.RadioGroup` | Radio button group |
| `DropdownMenu.RadioItem` | Radio option |

## Content Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `align` | `'start' \| 'center' \| 'end'` | `'center'` | Horizontal alignment |
| `sideOffset` | `number` | `4` | Distance from trigger |

## Examples

### With Labels and Groups

```tsx
<DropdownMenu>
  <DropdownMenu.Trigger asChild>
    <Button>Account</Button>
  </DropdownMenu.Trigger>
  <DropdownMenu.Content align="start" className="w-56">
    <DropdownMenu.Label>My Account</DropdownMenu.Label>
    <DropdownMenu.Separator />
    <DropdownMenu.Group>
      <DropdownMenu.Item>
        <DropdownMenu.Icon icon={UserIcon} />
        Profile
        <DropdownMenu.Shortcut>Ctrl+P</DropdownMenu.Shortcut>
      </DropdownMenu.Item>
      <DropdownMenu.Item>
        <DropdownMenu.Icon icon={CreditCardIcon} />
        Billing
      </DropdownMenu.Item>
    </DropdownMenu.Group>
    <DropdownMenu.Separator />
    <DropdownMenu.Item>
      <DropdownMenu.Icon icon={LogOutIcon} />
      Log out
      <DropdownMenu.Shortcut>Ctrl+Q</DropdownMenu.Shortcut>
    </DropdownMenu.Item>
  </DropdownMenu.Content>
</DropdownMenu>
```

### With Submenus

```tsx
<DropdownMenu>
  <DropdownMenu.Trigger asChild>
    <Button>Actions</Button>
  </DropdownMenu.Trigger>
  <DropdownMenu.Content>
    <DropdownMenu.Item>New File</DropdownMenu.Item>
    <DropdownMenu.Sub>
      <DropdownMenu.SubTrigger>
        <DropdownMenu.Icon icon={ShareIcon} />
        Share
      </DropdownMenu.SubTrigger>
      <DropdownMenu.SubContent>
        <DropdownMenu.Item>
          <DropdownMenu.Icon icon={MailIcon} />
          Email
        </DropdownMenu.Item>
        <DropdownMenu.Item>
          <DropdownMenu.Icon icon={LinkIcon} />
          Copy Link
        </DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item>
          <DropdownMenu.Icon icon={TwitterIcon} />
          Twitter
        </DropdownMenu.Item>
      </DropdownMenu.SubContent>
    </DropdownMenu.Sub>
    <DropdownMenu.Separator />
    <DropdownMenu.Item>Delete</DropdownMenu.Item>
  </DropdownMenu.Content>
</DropdownMenu>
```

### Checkbox Items

```tsx
const [showStatus, setShowStatus] = useState(true);
const [showActivity, setShowActivity] = useState(false);

<DropdownMenu>
  <DropdownMenu.Trigger asChild>
    <Button>View</Button>
  </DropdownMenu.Trigger>
  <DropdownMenu.Content>
    <DropdownMenu.Label>Toggle Columns</DropdownMenu.Label>
    <DropdownMenu.Separator />
    <DropdownMenu.CheckboxItem 
      checked={showStatus} 
      onCheckedChange={setShowStatus}
    >
      Status
    </DropdownMenu.CheckboxItem>
    <DropdownMenu.CheckboxItem 
      checked={showActivity} 
      onCheckedChange={setShowActivity}
    >
      Activity
    </DropdownMenu.CheckboxItem>
  </DropdownMenu.Content>
</DropdownMenu>
```

### Radio Group

```tsx
const [theme, setTheme] = useState('system');

<DropdownMenu>
  <DropdownMenu.Trigger asChild>
    <Button>Theme</Button>
  </DropdownMenu.Trigger>
  <DropdownMenu.Content>
    <DropdownMenu.Label>Appearance</DropdownMenu.Label>
    <DropdownMenu.Separator />
    <DropdownMenu.RadioGroup value={theme} onValueChange={setTheme}>
      <DropdownMenu.RadioItem value="light">
        <DropdownMenu.Icon icon={SunIcon} />
        Light
      </DropdownMenu.RadioItem>
      <DropdownMenu.RadioItem value="dark">
        <DropdownMenu.Icon icon={MoonIcon} />
        Dark
      </DropdownMenu.RadioItem>
      <DropdownMenu.RadioItem value="system">
        <DropdownMenu.Icon icon={MonitorIcon} />
        System
      </DropdownMenu.RadioItem>
    </DropdownMenu.RadioGroup>
  </DropdownMenu.Content>
</DropdownMenu>
```

### Disabled Items

```tsx
<DropdownMenu>
  <DropdownMenu.Trigger asChild>
    <Button>Actions</Button>
  </DropdownMenu.Trigger>
  <DropdownMenu.Content>
    <DropdownMenu.Item>Edit</DropdownMenu.Item>
    <DropdownMenu.Item>Duplicate</DropdownMenu.Item>
    <DropdownMenu.Separator />
    <DropdownMenu.Item disabled>
      <DropdownMenu.Icon icon={CloudIcon} />
      API Access (Upgrade Required)
    </DropdownMenu.Item>
  </DropdownMenu.Content>
</DropdownMenu>
```
