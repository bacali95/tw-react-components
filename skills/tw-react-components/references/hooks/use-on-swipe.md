# useOnSwipe

Detect touch swipe gestures on an element.

## Import

```tsx
import { useOnSwipe } from 'tw-react-components';
```

## Usage

```tsx
const ref = useRef<HTMLDivElement>(null);

useOnSwipe(ref, {
  onSwipeLeft: () => console.log('Swiped left'),
  onSwipeRight: () => console.log('Swiped right'),
  onSwipeUp: () => console.log('Swiped up'),
  onSwipeDown: () => console.log('Swiped down'),
});

return <div ref={ref}>Swipe me</div>;
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `ref` | `RefObject<HTMLElement>` | Reference to the target element |
| `callbacks` | `SwipeCallbacks` | Object with swipe direction handlers |

## Callbacks

```typescript
type SwipeCallbacks = {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
};
```

## Examples

### Carousel/Slider

```tsx
function Carousel({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useOnSwipe(containerRef, {
    onSwipeLeft: () => {
      setCurrentIndex(prev => 
        prev < images.length - 1 ? prev + 1 : prev
      );
    },
    onSwipeRight: () => {
      setCurrentIndex(prev => prev > 0 ? prev - 1 : prev);
    },
  });

  return (
    <div ref={containerRef} className="relative overflow-hidden">
      <div 
        className="flex transition-transform"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <img 
            key={index}
            src={image} 
            className="w-full flex-shrink-0" 
            alt=""
          />
        ))}
      </div>
      <div className="flex justify-center gap-2 mt-4">
        {images.map((_, index) => (
          <button
            key={index}
            className={cn(
              'w-2 h-2 rounded-full',
              index === currentIndex ? 'bg-blue-500' : 'bg-slate-300'
            )}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}
```

### Swipe to Delete

```tsx
function SwipeableItem({ item, onDelete }) {
  const [offset, setOffset] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useOnSwipe(ref, {
    onSwipeLeft: () => {
      setOffset(-100);
      setTimeout(() => onDelete(item.id), 300);
    },
    onSwipeRight: () => {
      setOffset(0); // Reset if partially swiped
    },
  });

  return (
    <div className="relative overflow-hidden">
      <div 
        className="absolute inset-y-0 right-0 bg-red-500 text-white flex items-center px-4"
      >
        Delete
      </div>
      <div
        ref={ref}
        className="bg-white p-4 transition-transform"
        style={{ transform: `translateX(${offset}px)` }}
      >
        {item.name}
      </div>
    </div>
  );
}
```

### Navigation Drawer

```tsx
function AppWithDrawer() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useOnSwipe(contentRef, {
    onSwipeRight: () => setIsDrawerOpen(true),
  });

  const drawerRef = useRef<HTMLDivElement>(null);
  
  useOnSwipe(drawerRef, {
    onSwipeLeft: () => setIsDrawerOpen(false),
  });

  return (
    <div ref={contentRef} className="relative">
      {/* Main content */}
      <main className="p-4">
        <p>Swipe right to open drawer</p>
      </main>

      {/* Drawer */}
      {isDrawerOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/50"
            onClick={() => setIsDrawerOpen(false)}
          />
          <div
            ref={drawerRef}
            className="fixed left-0 top-0 bottom-0 w-64 bg-white p-4"
          >
            <nav>Navigation...</nav>
          </div>
        </>
      )}
    </div>
  );
}
```

### Pull to Refresh

```tsx
function PullToRefresh({ onRefresh, children }) {
  const [isPulling, setIsPulling] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useOnSwipe(ref, {
    onSwipeDown: async () => {
      if (ref.current?.scrollTop === 0) {
        setIsPulling(true);
        await onRefresh();
        setIsPulling(false);
      }
    },
  });

  return (
    <div ref={ref} className="h-full overflow-auto">
      {isPulling && (
        <Flex justify="center" className="p-4">
          <Spinner spinnerClassName="h-6 w-6" className="bg-transparent w-fit" />
        </Flex>
      )}
      {children}
    </div>
  );
}
```

### Tab Navigation

```tsx
function TabView({ tabs }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useOnSwipe(containerRef, {
    onSwipeLeft: () => {
      setActiveIndex(prev => 
        prev < tabs.length - 1 ? prev + 1 : prev
      );
    },
    onSwipeRight: () => {
      setActiveIndex(prev => prev > 0 ? prev - 1 : prev);
    },
  });

  return (
    <div>
      <Tabs value={tabs[activeIndex].key}>
        <Tabs.List>
          {tabs.map((tab, index) => (
            <Tabs.Trigger 
              key={tab.key} 
              value={tab.key}
              onClick={() => setActiveIndex(index)}
            >
              {tab.label}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
      </Tabs>
      <div ref={containerRef} className="mt-4">
        {tabs[activeIndex].content}
      </div>
    </div>
  );
}
```

## Notes

- Touch events only - does not work with mouse
- Swipe detection is based on touch start/end positions
- Only triggers for swipes with sufficient distance
