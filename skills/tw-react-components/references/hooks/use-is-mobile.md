# useIsMobile

Detect if the viewport is mobile-sized (less than 768px).

## Import

```tsx
import { useIsMobile } from 'tw-react-components';
```

## Usage

```tsx
const isMobile = useIsMobile();
```

## Return Value

| Type | Description |
|------|-------------|
| `boolean` | `true` if viewport width < 768px |

## Breakpoint

The hook uses a breakpoint of **768px**, which corresponds to Tailwind's `md` breakpoint.

## Examples

### Responsive Component

```tsx
function ResponsiveLayout() {
  const isMobile = useIsMobile();

  return isMobile ? <MobileView /> : <DesktopView />;
}
```

### Conditional Rendering

```tsx
function Header() {
  const isMobile = useIsMobile();

  return (
    <header className="flex items-center justify-between p-4">
      <Logo />
      {isMobile ? (
        <Button prefixIcon={MenuIcon} variant="text" onClick={openMobileMenu} />
      ) : (
        <nav className="flex gap-4">
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
        </nav>
      )}
    </header>
  );
}
```

### Different Props Based on Screen

```tsx
function DataDisplay() {
  const isMobile = useIsMobile();

  return (
    <DataTable
      rows={data}
      columns={isMobile ? mobileColumns : desktopColumns}
      pagination={{
        pageSize: isMobile ? 5 : 10,
        // ...
      }}
    />
  );
}
```

### Mobile Navigation

```tsx
function Navigation() {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);

  if (isMobile) {
    return (
      <>
        <Button prefixIcon={MenuIcon} onClick={() => setIsOpen(true)} />
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <Sheet.Content side="left">
            <NavItems />
          </Sheet.Content>
        </Sheet>
      </>
    );
  }

  return <NavItems />;
}
```

### Sidebar Collapse

```tsx
function AppLayout({ children }) {
  const isMobile = useIsMobile();

  return (
    <Layout
      sidebarProps={{
        variant: isMobile ? 'inset' : 'sidebar',
        collapsible: isMobile ? 'icon' : undefined,
        // ...
      }}
    >
      {children}
    </Layout>
  );
}
```

### Modal vs Sheet

```tsx
function EditDialog({ isOpen, onClose, ...props }) {
  const isMobile = useIsMobile();

  return (
    <FormDialog
      as={isMobile ? Sheet : Dialog}
      open={isOpen}
      onClose={onClose}
      {...props}
    />
  );
}
```

### Simplified Mobile UI

```tsx
function ProductCard({ product }) {
  const isMobile = useIsMobile();

  return (
    <Card className="p-4">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      {!isMobile && <p>{product.description}</p>}
      <p className="font-bold">${product.price}</p>
      {!isMobile && (
        <Flex gap={2}>
          <Button>Add to Cart</Button>
          <Button variant="outlined">Details</Button>
        </Flex>
      )}
      {isMobile && (
        <Button fullWidth>Add to Cart</Button>
      )}
    </Card>
  );
}
```

## Notes

- Uses `window.matchMedia` for efficient viewport detection
- Updates automatically when viewport is resized
- Returns `false` during SSR (server-side rendering)
- Initial value may be `undefined` before first render
