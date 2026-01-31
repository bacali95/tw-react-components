# Layout

Application layout component with sidebar navigation, navbar, and content area.

## Import

```tsx
import { Layout } from 'tw-react-components';
```

## Usage

Requires react-router's `NavLink` and `useLocation`.

```tsx
import { NavLink, useLocation } from 'react-router';
import { HomeIcon, UsersIcon, SettingsIcon } from 'lucide-react';

<Layout
  sidebarProps={{
    variant: 'sidebar',
    basePath: '/app',
    items: [
      { type: 'item', pathname: '', title: 'Home', Icon: HomeIcon },
      {
        type: 'group',
        title: 'Admin',
        items: [
          { pathname: 'users', title: 'Users', Icon: UsersIcon },
          { pathname: 'settings', title: 'Settings', Icon: SettingsIcon },
        ],
      },
    ],
    header: <Logo />,
    footer: <UserMenu />,
  }}
  navbarProps={{
    // navbar configuration
  }}
  NavLink={NavLink}
  useLocation={useLocation}
>
  {children}
</Layout>
```

## Props

```typescript
type LayoutProps = {
  className?: string;
  sidebarProps: LayoutSidebarProps;
  navbarProps?: NavbarProps;
  NavLink: FC<NavLinkProps>;      // From react-router
  useLocation: typeof useLocation; // From react-router
};
```

## Sidebar Props

```typescript
type LayoutSidebarProps = {
  variant?: 'sidebar' | 'inset';  // Visual style
  basePath?: string;              // Base path for navigation
  header?: ReactNode;             // Header content (logo, etc.)
  footer?: ReactNode;             // Footer content (user menu, etc.)
  extraContent?: ReactNode;       // Additional sidebar content
  items: SidebarItem[];           // Navigation items
};
```

### Sidebar Variants

- `'sidebar'` - Standard sidebar with rail (default)
- `'inset'` - Inset style with rounded content area

```tsx
// Standard sidebar
<Layout sidebarProps={{ variant: 'sidebar', items }} ... />

// Inset style
<Layout sidebarProps={{ variant: 'inset', items }} ... />
```

## Navigation Items

### Single Item

```tsx
{
  type: 'item',
  pathname: 'dashboard',
  title: 'Dashboard',
  Icon: HomeIcon,
  hidden: false,  // Optional: hide item
}
```

### Group with Sub-items

```tsx
{
  type: 'group',
  title: 'Administration',  // Optional group label
  hidden: false,
  items: [
    { pathname: 'users', title: 'Users', Icon: UsersIcon },
    { pathname: 'roles', title: 'Roles', Icon: ShieldIcon },
  ],
}
```

### Nested Navigation

```tsx
{
  type: 'item',
  pathname: 'settings',
  title: 'Settings',
  Icon: SettingsIcon,
  items: [  // Sub-items create collapsible menu
    { pathname: 'general', title: 'General' },
    { pathname: 'security', title: 'Security' },
    { pathname: 'notifications', title: 'Notifications' },
  ],
}
```

## Complete Example

```tsx
import { NavLink, useLocation, Outlet } from 'react-router';
import { 
  HomeIcon, 
  UsersIcon, 
  SettingsIcon, 
  FileTextIcon,
  BarChartIcon 
} from 'lucide-react';
import { Layout, ThemeSelector } from 'tw-react-components';

function AppLayout() {
  return (
    <Layout
      sidebarProps={{
        variant: 'sidebar',
        basePath: '/app',
        header: (
          <Flex align="center" gap={2}>
            <Logo />
            <span className="font-bold">My App</span>
          </Flex>
        ),
        items: [
          { type: 'item', pathname: '', title: 'Home', Icon: HomeIcon },
          { type: 'item', pathname: 'reports', title: 'Reports', Icon: BarChartIcon },
          {
            type: 'group',
            title: 'Content',
            items: [
              { pathname: 'documents', title: 'Documents', Icon: FileTextIcon },
            ],
          },
          {
            type: 'group',
            title: 'Admin',
            hidden: !isAdmin,
            items: [
              { pathname: 'users', title: 'Users', Icon: UsersIcon },
              { 
                pathname: 'settings', 
                title: 'Settings', 
                Icon: SettingsIcon,
                items: [
                  { pathname: 'general', title: 'General' },
                  { pathname: 'security', title: 'Security' },
                ],
              },
            ],
          },
        ],
        footer: (
          <Flex align="center" justify="between">
            <UserAvatar />
            <ThemeSelector />
          </Flex>
        ),
      }}
      NavLink={NavLink}
      useLocation={useLocation}
    >
      <Outlet />
    </Layout>
  );
}
```

## Related Components

- [Sidebar](./sidebar.md) - Standalone sidebar component
- [Navbar](./navbar.md) - Top navigation bar
