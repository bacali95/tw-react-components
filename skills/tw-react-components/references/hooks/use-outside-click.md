# useOutsideClick

Detect clicks outside a referenced element. Useful for closing dropdowns, modals, and popovers.

## Import

```tsx
import { useOutsideClick } from 'tw-react-components';
```

## Usage

```tsx
const ref = useRef<HTMLDivElement>(null);

useOutsideClick(ref, () => {
  // Called when clicking outside the ref element
  setIsOpen(false);
});

return <div ref={ref}>Content</div>;
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `ref` | `RefObject<HTMLDivElement \| null>` | Reference to the element |
| `callback` | `() => void` | Function called on outside click |

## Examples

### Dropdown

```tsx
function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useOutsideClick(ref, () => setIsOpen(false));

  return (
    <div ref={ref} className="relative">
      <Button onClick={() => setIsOpen(!isOpen)}>
        Toggle
      </Button>
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 p-2 bg-white border rounded shadow">
          Dropdown content
        </div>
      )}
    </div>
  );
}
```

### Modal Overlay

```tsx
function Modal({ isOpen, onClose, children }) {
  const contentRef = useRef<HTMLDivElement>(null);

  useOutsideClick(contentRef, onClose);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div ref={contentRef} className="bg-white p-6 rounded-lg">
        {children}
      </div>
    </div>
  );
}
```

### Search with Suggestions

```tsx
function SearchWithSuggestions() {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useOutsideClick(containerRef, () => setShowSuggestions(false));

  return (
    <div ref={containerRef} className="relative">
      <TextInput
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setShowSuggestions(true);
        }}
        onFocus={() => setShowSuggestions(true)}
        placeholder="Search..."
      />
      {showSuggestions && query && (
        <div className="absolute top-full left-0 right-0 mt-1 border rounded shadow bg-white">
          {suggestions.map(suggestion => (
            <div 
              key={suggestion.id}
              className="p-2 hover:bg-slate-100 cursor-pointer"
              onClick={() => {
                setQuery(suggestion.text);
                setShowSuggestions(false);
              }}
            >
              {suggestion.text}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
```

### Sidebar

```tsx
function MobileSidebar({ isOpen, onClose }) {
  const sidebarRef = useRef<HTMLDivElement>(null);

  useOutsideClick(sidebarRef, onClose);

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" />
      <div 
        ref={sidebarRef}
        className="fixed left-0 top-0 bottom-0 w-64 bg-white z-50 p-4"
      >
        <nav>Navigation items...</nav>
      </div>
    </>
  );
}
```

### Color Picker

```tsx
function ColorPicker({ value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useOutsideClick(ref, () => setIsOpen(false));

  const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple'];

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-8 h-8 rounded border"
        style={{ backgroundColor: value }}
      />
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 p-2 bg-white border rounded shadow grid grid-cols-3 gap-1">
          {colors.map(color => (
            <button
              key={color}
              className="w-6 h-6 rounded"
              style={{ backgroundColor: color }}
              onClick={() => {
                onChange(color);
                setIsOpen(false);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
```

## Notes

- The callback is registered on the `mousedown` event
- The hook properly cleans up the event listener on unmount
- The ref must be attached to a DOM element for the hook to work
