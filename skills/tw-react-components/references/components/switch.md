# Switch

Toggle switch control for boolean settings.

## Import

```tsx
import { Switch } from 'tw-react-components';
```

## Basic Usage

```tsx
const [enabled, setEnabled] = useState(false);

<Switch checked={enabled} onCheckedChange={setEnabled} />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `boolean` | - | Checked state |
| `onCheckedChange` | `(checked: boolean) => void` | - | Change handler |
| `disabled` | `boolean` | `false` | Disable switch |
| `thumbProps` | `object` | - | Props for thumb element |
| `className` | `string` | - | Additional CSS classes |
| `dataTestId` | `string` | `'switch'` | Testing attribute |

## Examples

### Controlled

```tsx
const [isEnabled, setIsEnabled] = useState(false);

<Switch checked={isEnabled} onCheckedChange={setIsEnabled} />
```

### With Label

```tsx
<Flex align="center" gap={2}>
  <Switch 
    id="notifications" 
    checked={notifications} 
    onCheckedChange={setNotifications} 
  />
  <label htmlFor="notifications">Enable notifications</label>
</Flex>
```

### With Label (Clickable)

```tsx
<label className="flex items-center gap-2 cursor-pointer">
  <Switch checked={enabled} onCheckedChange={setEnabled} />
  <span>Enable feature</span>
</label>
```

### Disabled

```tsx
<Switch disabled />
<Switch checked disabled />
```

### In Settings Form

```tsx
function SettingsForm() {
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    autoSave: true,
  });

  const toggle = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-4">
      <Flex justify="between" align="center">
        <div>
          <p className="font-medium">Notifications</p>
          <p className="text-sm text-slate-500">Receive email notifications</p>
        </div>
        <Switch 
          checked={settings.notifications} 
          onCheckedChange={() => toggle('notifications')} 
        />
      </Flex>
      
      <Separator />
      
      <Flex justify="between" align="center">
        <div>
          <p className="font-medium">Dark Mode</p>
          <p className="text-sm text-slate-500">Use dark theme</p>
        </div>
        <Switch 
          checked={settings.darkMode} 
          onCheckedChange={() => toggle('darkMode')} 
        />
      </Flex>
      
      <Separator />
      
      <Flex justify="between" align="center">
        <div>
          <p className="font-medium">Auto Save</p>
          <p className="text-sm text-slate-500">Automatically save changes</p>
        </div>
        <Switch 
          checked={settings.autoSave} 
          onCheckedChange={() => toggle('autoSave')} 
        />
      </Flex>
    </div>
  );
}
```

### With Form

```tsx
<form onSubmit={handleSubmit}>
  <Flex direction="column" gap={4}>
    <TextInput name="name" label="Name" value={name} onChange={setName} />
    
    <Flex align="center" gap={2}>
      <Switch 
        id="active"
        checked={isActive} 
        onCheckedChange={setIsActive} 
      />
      <label htmlFor="active">Active</label>
    </Flex>
    
    <Button type="submit">Save</Button>
  </Flex>
</form>
```

### Toggle with Loading

```tsx
const [isLoading, setIsLoading] = useState(false);
const [enabled, setEnabled] = useState(false);

const handleChange = async (checked: boolean) => {
  setIsLoading(true);
  try {
    await updateSetting(checked);
    setEnabled(checked);
  } finally {
    setIsLoading(false);
  }
};

<Flex align="center" gap={2}>
  <Switch 
    checked={enabled} 
    onCheckedChange={handleChange}
    disabled={isLoading}
  />
  {isLoading && <Spinner spinnerClassName="h-4 w-4" className="bg-transparent w-fit" />}
</Flex>
```
