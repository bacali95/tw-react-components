# useLongPress

Detect long press/touch events on an element.

## Import

```tsx
import { useLongPress } from 'tw-react-components';
```

## Usage

```tsx
const handlers = useLongPress(
  () => console.log('Long press detected!'),
  500 // Duration in milliseconds
);

return <button {...handlers}>Long press me</button>;
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `callback` | `() => void` | Function called when long press is detected |
| `ms` | `number` | Press duration threshold in milliseconds |

## Return Value

Returns event handlers object to spread on the target element:

```typescript
{
  onMouseDown: () => void;
  onMouseUp: () => void;
  onMouseLeave: () => void;
  onTouchStart: () => void;
  onTouchEnd: () => void;
}
```

## Examples

### Basic

```tsx
function LongPressButton() {
  const handlers = useLongPress(
    () => alert('Long press!'),
    500
  );

  return (
    <Button {...handlers}>
      Hold me
    </Button>
  );
}
```

### Delete Confirmation

```tsx
function DeleteButton({ onDelete }) {
  const [showHint, setShowHint] = useState(false);
  
  const handlers = useLongPress(() => {
    onDelete();
    setShowHint(false);
  }, 1000);

  return (
    <div className="relative">
      <Button 
        color="red"
        {...handlers}
        onMouseDown={(e) => {
          setShowHint(true);
          handlers.onMouseDown?.(e);
        }}
        onMouseUp={(e) => {
          setShowHint(false);
          handlers.onMouseUp?.(e);
        }}
        onMouseLeave={(e) => {
          setShowHint(false);
          handlers.onMouseLeave?.(e);
        }}
      >
        <TrashIcon className="h-4 w-4" />
      </Button>
      {showHint && (
        <div className="absolute top-full mt-1 text-xs text-slate-500">
          Hold to delete...
        </div>
      )}
    </div>
  );
}
```

### Context Menu

```tsx
function ItemWithContextMenu({ item }) {
  const [showMenu, setShowMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  
  const handlers = useLongPress((event) => {
    // Show context menu at press position
    setMenuPosition({ x: event.clientX, y: event.clientY });
    setShowMenu(true);
  }, 500);

  return (
    <>
      <div {...handlers} className="p-4 border rounded">
        {item.name}
      </div>
      {showMenu && (
        <ContextMenu 
          position={menuPosition} 
          onClose={() => setShowMenu(false)}
        />
      )}
    </>
  );
}
```

### Selection Mode

```tsx
function SelectableList({ items }) {
  const [selectionMode, setSelectionMode] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);

  const handlers = useLongPress(() => {
    setSelectionMode(true);
  }, 500);

  return (
    <div>
      {selectionMode && (
        <Flex justify="between" className="mb-4">
          <span>{selected.length} selected</span>
          <Button size="small" onClick={() => {
            setSelectionMode(false);
            setSelected([]);
          }}>
            Cancel
          </Button>
        </Flex>
      )}
      {items.map(item => (
        <div
          key={item.id}
          {...(!selectionMode && handlers)}
          onClick={() => {
            if (selectionMode) {
              setSelected(prev => 
                prev.includes(item.id)
                  ? prev.filter(id => id !== item.id)
                  : [...prev, item.id]
              );
            }
          }}
          className={cn(
            'p-4 border-b',
            selectionMode && selected.includes(item.id) && 'bg-blue-100'
          )}
        >
          {item.name}
        </div>
      ))}
    </div>
  );
}
```

### Touch Device Action

```tsx
function TouchAction() {
  const handlers = useLongPress(
    () => navigator.vibrate?.(100), // Haptic feedback
    300
  );

  return (
    <div {...handlers} className="p-8 bg-slate-100 rounded-lg text-center">
      Long press for haptic feedback
    </div>
  );
}
```

## Notes

- Works with both mouse and touch events
- The callback is called only after the specified duration
- Releasing before the duration cancels the long press
- Moving the mouse/finger outside the element cancels the long press
