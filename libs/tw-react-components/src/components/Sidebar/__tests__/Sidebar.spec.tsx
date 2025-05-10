import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Sidebar, SidebarContextProvider } from '..';

// Mock the hooks that the Sidebar component uses
jest.mock('../../../hooks', () => ({
  ...jest.requireActual('../../../hooks'),
  useIsMobile: jest.fn().mockReturnValue(false),
  useOnSwipe: jest.fn(),
}));

describe('Sidebar Component', () => {
  beforeEach(() => {
    // Clear mocks
    jest.clearAllMocks();

    // Mock document.cookie access
    Object.defineProperty(document, 'cookie', {
      writable: true,
      value: '',
    });

    // Reset window event listeners
    window.removeEventListener = jest.fn();
    window.addEventListener = jest.fn();
  });

  it('renders with default props', () => {
    render(
      <SidebarContextProvider>
        <Sidebar>
          <div>Sidebar Content</div>
        </Sidebar>
      </SidebarContextProvider>,
    );

    const sidebar = screen.getByTestId('sidebar');
    expect(sidebar).toBeInTheDocument();
    expect(sidebar).toHaveAttribute('data-testid', 'sidebar');
  });

  it('renders with custom dataTestId', () => {
    render(
      <SidebarContextProvider>
        <Sidebar dataTestId="custom-sidebar">
          <div>Sidebar Content</div>
        </Sidebar>
      </SidebarContextProvider>,
    );

    const sidebar = screen.getByTestId('custom-sidebar');
    expect(sidebar).toBeInTheDocument();
    expect(sidebar).toHaveAttribute('data-testid', 'custom-sidebar');
    expect(screen.queryByTestId('sidebar')).not.toBeInTheDocument();
  });

  it('renders with collapsible=none', () => {
    render(
      <SidebarContextProvider>
        <Sidebar collapsible="none">
          <div>Sidebar Content</div>
        </Sidebar>
      </SidebarContextProvider>,
    );

    const sidebar = screen.getByTestId('sidebar');
    expect(sidebar).toBeInTheDocument();
    expect(sidebar).toHaveClass('flex', 'h-full', 'w-(--sidebar-width)');
  });

  it('applies custom className', () => {
    render(
      <SidebarContextProvider>
        <Sidebar className="custom-class">
          <div>Sidebar Content</div>
        </Sidebar>
      </SidebarContextProvider>,
    );

    const sidebar = screen.getByTestId('sidebar');
    expect(sidebar).toHaveClass('custom-class');
  });

  describe('SidebarTrigger', () => {
    it('renders with default dataTestId', () => {
      render(
        <SidebarContextProvider>
          <Sidebar.Trigger>Toggle</Sidebar.Trigger>
        </SidebarContextProvider>,
      );

      const trigger = screen.getByTestId('sidebar-trigger');
      expect(trigger).toBeInTheDocument();
      expect(trigger).toHaveAttribute('data-testid', 'sidebar-trigger');
    });

    it('renders with custom dataTestId', () => {
      render(
        <SidebarContextProvider>
          <Sidebar.Trigger dataTestId="custom-trigger">Toggle</Sidebar.Trigger>
        </SidebarContextProvider>,
      );

      const trigger = screen.getByTestId('custom-trigger');
      expect(trigger).toBeInTheDocument();
      expect(trigger).toHaveAttribute('data-testid', 'custom-trigger');
      expect(screen.queryByTestId('sidebar-trigger')).not.toBeInTheDocument();
    });

    it('opens the sidebar when clicked', async () => {
      render(
        <SidebarContextProvider defaultOpen={false}>
          <Sidebar.Trigger>Toggle</Sidebar.Trigger>
          <Sidebar>
            <Sidebar.Content>
              <div>Sidebar Content</div>
            </Sidebar.Content>
          </Sidebar>
        </SidebarContextProvider>,
      );

      const trigger = screen.getByTestId('sidebar-trigger');
      await userEvent.click(trigger);

      expect(screen.getByTestId('sidebar')).toBeInTheDocument();
      const sidebar = screen.getByTestId('sidebar');
      expect(sidebar).toBeInTheDocument();
      expect(sidebar).toHaveAttribute('data-state', 'expanded');
    });

    it('calls onOpenChange when the sidebar is opened', async () => {
      const setOpen = jest.fn();
      render(
        <SidebarContextProvider defaultOpen={false} onOpenChange={setOpen}>
          <Sidebar.Trigger>Toggle</Sidebar.Trigger>
          <Sidebar>
            <Sidebar.Content>
              <div>Sidebar Content</div>
            </Sidebar.Content>
          </Sidebar>
        </SidebarContextProvider>,
      );

      const trigger = screen.getByTestId('sidebar-trigger');
      await userEvent.click(trigger);

      expect(setOpen).toHaveBeenCalledWith(true);
    });
  });

  describe('SidebarRail', () => {
    it('renders with default dataTestId', () => {
      render(
        <SidebarContextProvider>
          <Sidebar.Rail />
        </SidebarContextProvider>,
      );

      const rail = screen.getByTestId('sidebar-rail');
      expect(rail).toBeInTheDocument();
      expect(rail).toHaveAttribute('data-testid', 'sidebar-rail');
    });

    it('renders with custom dataTestId', () => {
      render(
        <SidebarContextProvider>
          <Sidebar.Rail dataTestId="custom-rail" />
        </SidebarContextProvider>,
      );

      const rail = screen.getByTestId('custom-rail');
      expect(rail).toBeInTheDocument();
      expect(rail).toHaveAttribute('data-testid', 'custom-rail');
      expect(screen.queryByTestId('sidebar-rail')).not.toBeInTheDocument();
    });
  });

  describe('SidebarInset', () => {
    it('renders with default dataTestId', () => {
      render(
        <SidebarContextProvider>
          <Sidebar.Inset>Content</Sidebar.Inset>
        </SidebarContextProvider>,
      );

      const inset = screen.getByTestId('sidebar-inset');
      expect(inset).toBeInTheDocument();
      expect(inset).toHaveAttribute('data-testid', 'sidebar-inset');
    });

    it('renders with custom dataTestId', () => {
      render(
        <SidebarContextProvider>
          <Sidebar.Inset dataTestId="custom-inset">Content</Sidebar.Inset>
        </SidebarContextProvider>,
      );

      const inset = screen.getByTestId('custom-inset');
      expect(inset).toBeInTheDocument();
      expect(inset).toHaveAttribute('data-testid', 'custom-inset');
      expect(screen.queryByTestId('sidebar-inset')).not.toBeInTheDocument();
    });
  });

  describe('SidebarInput', () => {
    it('renders with default dataTestId', () => {
      render(
        <SidebarContextProvider>
          <Sidebar.Input placeholder="Search" />
        </SidebarContextProvider>,
      );

      const input = screen.getByTestId('sidebar-input');
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute('data-testid', 'sidebar-input');
    });

    it('renders with custom dataTestId', () => {
      render(
        <SidebarContextProvider>
          <Sidebar.Input dataTestId="custom-input" placeholder="Search" />
        </SidebarContextProvider>,
      );

      const input = screen.getByTestId('custom-input');
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute('data-testid', 'custom-input');
      expect(screen.queryByTestId('sidebar-input')).not.toBeInTheDocument();
    });
  });

  describe('SidebarHeader', () => {
    it('renders with default dataTestId', () => {
      render(
        <SidebarContextProvider>
          <Sidebar.Header>Header Content</Sidebar.Header>
        </SidebarContextProvider>,
      );

      const header = screen.getByTestId('sidebar-header');
      expect(header).toBeInTheDocument();
      expect(header).toHaveAttribute('data-testid', 'sidebar-header');
    });

    it('renders with custom dataTestId', () => {
      render(
        <SidebarContextProvider>
          <Sidebar.Header dataTestId="custom-header">Header Content</Sidebar.Header>
        </SidebarContextProvider>,
      );

      const header = screen.getByTestId('custom-header');
      expect(header).toBeInTheDocument();
      expect(header).toHaveAttribute('data-testid', 'custom-header');
      expect(screen.queryByTestId('sidebar-header')).not.toBeInTheDocument();
    });
  });

  describe('SidebarFooter', () => {
    it('renders with default dataTestId', () => {
      render(
        <SidebarContextProvider>
          <Sidebar.Footer>Footer Content</Sidebar.Footer>
        </SidebarContextProvider>,
      );

      const footer = screen.getByTestId('sidebar-footer');
      expect(footer).toBeInTheDocument();
      expect(footer).toHaveAttribute('data-testid', 'sidebar-footer');
    });

    it('renders with custom dataTestId', () => {
      render(
        <SidebarContextProvider>
          <Sidebar.Footer dataTestId="custom-footer">Footer Content</Sidebar.Footer>
        </SidebarContextProvider>,
      );

      const footer = screen.getByTestId('custom-footer');
      expect(footer).toBeInTheDocument();
      expect(footer).toHaveAttribute('data-testid', 'custom-footer');
      expect(screen.queryByTestId('sidebar-footer')).not.toBeInTheDocument();
    });
  });

  describe('SidebarSeparator', () => {
    it('renders with default dataTestId', () => {
      render(
        <SidebarContextProvider>
          <Sidebar.Separator />
        </SidebarContextProvider>,
      );

      const separator = screen.getByTestId('sidebar-separator');
      expect(separator).toBeInTheDocument();
      expect(separator).toHaveAttribute('data-testid', 'sidebar-separator');
    });

    it('renders with custom dataTestId', () => {
      render(
        <SidebarContextProvider>
          <Sidebar.Separator dataTestId="custom-separator" />
        </SidebarContextProvider>,
      );

      const separator = screen.getByTestId('custom-separator');
      expect(separator).toBeInTheDocument();
      expect(separator).toHaveAttribute('data-testid', 'custom-separator');
      expect(screen.queryByTestId('sidebar-separator')).not.toBeInTheDocument();
    });
  });

  describe('SidebarContent', () => {
    it('renders with default dataTestId', () => {
      render(
        <SidebarContextProvider>
          <Sidebar.Content>Main Content</Sidebar.Content>
        </SidebarContextProvider>,
      );

      const content = screen.getByTestId('sidebar-content');
      expect(content).toBeInTheDocument();
      expect(content).toHaveAttribute('data-testid', 'sidebar-content');
    });

    it('renders with custom dataTestId', () => {
      render(
        <SidebarContextProvider>
          <Sidebar.Content dataTestId="custom-content">Main Content</Sidebar.Content>
        </SidebarContextProvider>,
      );

      const content = screen.getByTestId('custom-content');
      expect(content).toBeInTheDocument();
      expect(content).toHaveAttribute('data-testid', 'custom-content');
      expect(screen.queryByTestId('sidebar-content')).not.toBeInTheDocument();
    });
  });

  describe('SidebarGroup', () => {
    it('renders with default dataTestId', () => {
      render(
        <SidebarContextProvider>
          <Sidebar.Group>Group Content</Sidebar.Group>
        </SidebarContextProvider>,
      );

      const group = screen.getByTestId('sidebar-group');
      expect(group).toBeInTheDocument();
      expect(group).toHaveAttribute('data-testid', 'sidebar-group');
    });

    it('renders with custom dataTestId', () => {
      render(
        <SidebarContextProvider>
          <Sidebar.Group dataTestId="custom-group">Group Content</Sidebar.Group>
        </SidebarContextProvider>,
      );

      const group = screen.getByTestId('custom-group');
      expect(group).toBeInTheDocument();
      expect(group).toHaveAttribute('data-testid', 'custom-group');
      expect(screen.queryByTestId('sidebar-group')).not.toBeInTheDocument();
    });
  });

  describe('SidebarGroupLabel', () => {
    it('renders with default dataTestId', () => {
      render(
        <SidebarContextProvider>
          <Sidebar.GroupLabel>Group Label</Sidebar.GroupLabel>
        </SidebarContextProvider>,
      );

      const label = screen.getByTestId('sidebar-group-label');
      expect(label).toBeInTheDocument();
      expect(label).toHaveAttribute('data-testid', 'sidebar-group-label');
    });

    it('renders with custom dataTestId', () => {
      render(
        <SidebarContextProvider>
          <Sidebar.GroupLabel dataTestId="custom-group-label">Group Label</Sidebar.GroupLabel>
        </SidebarContextProvider>,
      );

      const label = screen.getByTestId('custom-group-label');
      expect(label).toBeInTheDocument();
      expect(label).toHaveAttribute('data-testid', 'custom-group-label');
      expect(screen.queryByTestId('sidebar-group-label')).not.toBeInTheDocument();
    });
  });

  describe('SidebarGroupAction', () => {
    it('renders with default dataTestId', () => {
      render(
        <SidebarContextProvider>
          <Sidebar.GroupAction>Action</Sidebar.GroupAction>
        </SidebarContextProvider>,
      );

      const action = screen.getByTestId('sidebar-group-action');
      expect(action).toBeInTheDocument();
      expect(action).toHaveAttribute('data-testid', 'sidebar-group-action');
    });

    it('renders with custom dataTestId', () => {
      render(
        <SidebarContextProvider>
          <Sidebar.GroupAction dataTestId="custom-group-action">Action</Sidebar.GroupAction>
        </SidebarContextProvider>,
      );

      const action = screen.getByTestId('custom-group-action');
      expect(action).toBeInTheDocument();
      expect(action).toHaveAttribute('data-testid', 'custom-group-action');
      expect(screen.queryByTestId('sidebar-group-action')).not.toBeInTheDocument();
    });
  });

  describe('SidebarGroupContent', () => {
    it('renders with default dataTestId', () => {
      render(
        <SidebarContextProvider>
          <Sidebar.GroupContent>Group Content</Sidebar.GroupContent>
        </SidebarContextProvider>,
      );

      const content = screen.getByTestId('sidebar-group-content');
      expect(content).toBeInTheDocument();
      expect(content).toHaveAttribute('data-testid', 'sidebar-group-content');
    });

    it('renders with custom dataTestId', () => {
      render(
        <SidebarContextProvider>
          <Sidebar.GroupContent dataTestId="custom-group-content">
            Group Content
          </Sidebar.GroupContent>
        </SidebarContextProvider>,
      );

      const content = screen.getByTestId('custom-group-content');
      expect(content).toBeInTheDocument();
      expect(content).toHaveAttribute('data-testid', 'custom-group-content');
      expect(screen.queryByTestId('sidebar-group-content')).not.toBeInTheDocument();
    });
  });

  describe('SidebarMenu', () => {
    it('renders with default dataTestId', () => {
      render(
        <SidebarContextProvider>
          <Sidebar.Menu>Menu Content</Sidebar.Menu>
        </SidebarContextProvider>,
      );

      const menu = screen.getByTestId('sidebar-menu');
      expect(menu).toBeInTheDocument();
      expect(menu).toHaveAttribute('data-testid', 'sidebar-menu');
    });

    it('renders with custom dataTestId', () => {
      render(
        <SidebarContextProvider>
          <Sidebar.Menu dataTestId="custom-menu">Menu Content</Sidebar.Menu>
        </SidebarContextProvider>,
      );

      const menu = screen.getByTestId('custom-menu');
      expect(menu).toBeInTheDocument();
      expect(menu).toHaveAttribute('data-testid', 'custom-menu');
      expect(screen.queryByTestId('sidebar-menu')).not.toBeInTheDocument();
    });
  });

  describe('SidebarMenuItem', () => {
    it('renders with default dataTestId', () => {
      render(
        <SidebarContextProvider>
          <Sidebar.MenuItem>Menu Item</Sidebar.MenuItem>
        </SidebarContextProvider>,
      );

      const item = screen.getByTestId('sidebar-menu-item');
      expect(item).toBeInTheDocument();
      expect(item).toHaveAttribute('data-testid', 'sidebar-menu-item');
    });

    it('renders with custom dataTestId', () => {
      render(
        <SidebarContextProvider>
          <Sidebar.MenuItem dataTestId="custom-menu-item">Menu Item</Sidebar.MenuItem>
        </SidebarContextProvider>,
      );

      const item = screen.getByTestId('custom-menu-item');
      expect(item).toBeInTheDocument();
      expect(item).toHaveAttribute('data-testid', 'custom-menu-item');
      expect(screen.queryByTestId('sidebar-menu-item')).not.toBeInTheDocument();
    });
  });

  describe('SidebarMenuButton', () => {
    it('renders with default dataTestId', () => {
      render(
        <SidebarContextProvider>
          <Sidebar.MenuButton>Menu Button</Sidebar.MenuButton>
        </SidebarContextProvider>,
      );

      const button = screen.getByTestId('sidebar-menu-button');
      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute('data-testid', 'sidebar-menu-button');
    });

    it('renders with custom dataTestId', () => {
      render(
        <SidebarContextProvider>
          <Sidebar.MenuButton dataTestId="custom-menu-button">Menu Button</Sidebar.MenuButton>
        </SidebarContextProvider>,
      );

      const button = screen.getByTestId('custom-menu-button');
      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute('data-testid', 'custom-menu-button');
      expect(screen.queryByTestId('sidebar-menu-button')).not.toBeInTheDocument();
    });
  });

  describe('SidebarMenuAction', () => {
    it('renders with default dataTestId', () => {
      render(
        <SidebarContextProvider>
          <Sidebar.MenuAction>Action</Sidebar.MenuAction>
        </SidebarContextProvider>,
      );

      const action = screen.getByTestId('sidebar-menu-action');
      expect(action).toBeInTheDocument();
      expect(action).toHaveAttribute('data-testid', 'sidebar-menu-action');
    });

    it('renders with custom dataTestId', () => {
      render(
        <SidebarContextProvider>
          <Sidebar.MenuAction dataTestId="custom-menu-action">Action</Sidebar.MenuAction>
        </SidebarContextProvider>,
      );

      const action = screen.getByTestId('custom-menu-action');
      expect(action).toBeInTheDocument();
      expect(action).toHaveAttribute('data-testid', 'custom-menu-action');
      expect(screen.queryByTestId('sidebar-menu-action')).not.toBeInTheDocument();
    });
  });

  describe('SidebarMenuBadge', () => {
    it('renders with default dataTestId', () => {
      render(
        <SidebarContextProvider>
          <Sidebar.MenuBadge>Badge</Sidebar.MenuBadge>
        </SidebarContextProvider>,
      );

      const badge = screen.getByTestId('sidebar-menu-badge');
      expect(badge).toBeInTheDocument();
      expect(badge).toHaveAttribute('data-testid', 'sidebar-menu-badge');
    });

    it('renders with custom dataTestId', () => {
      render(
        <SidebarContextProvider>
          <Sidebar.MenuBadge dataTestId="custom-menu-badge">Badge</Sidebar.MenuBadge>
        </SidebarContextProvider>,
      );

      const badge = screen.getByTestId('custom-menu-badge');
      expect(badge).toBeInTheDocument();
      expect(badge).toHaveAttribute('data-testid', 'custom-menu-badge');
      expect(screen.queryByTestId('sidebar-menu-badge')).not.toBeInTheDocument();
    });
  });

  describe('SidebarMenuSkeleton', () => {
    it('renders with default dataTestId', () => {
      render(
        <SidebarContextProvider>
          <Sidebar.MenuSkeleton />
        </SidebarContextProvider>,
      );

      const skeleton = screen.getByTestId('sidebar-menu-skeleton');
      expect(skeleton).toBeInTheDocument();
      expect(skeleton).toHaveAttribute('data-testid', 'sidebar-menu-skeleton');
    });

    it('renders with custom dataTestId', () => {
      render(
        <SidebarContextProvider>
          <Sidebar.MenuSkeleton dataTestId="custom-menu-skeleton" />
        </SidebarContextProvider>,
      );

      const skeleton = screen.getByTestId('custom-menu-skeleton');
      expect(skeleton).toBeInTheDocument();
      expect(skeleton).toHaveAttribute('data-testid', 'custom-menu-skeleton');
      expect(screen.queryByTestId('sidebar-menu-skeleton')).not.toBeInTheDocument();
    });
  });

  describe('SidebarMenuSub', () => {
    it('renders with default dataTestId', () => {
      render(
        <SidebarContextProvider>
          <Sidebar.MenuSub>Sub Menu</Sidebar.MenuSub>
        </SidebarContextProvider>,
      );

      const submenu = screen.getByTestId('sidebar-menu-sub');
      expect(submenu).toBeInTheDocument();
      expect(submenu).toHaveAttribute('data-testid', 'sidebar-menu-sub');
    });

    it('renders with custom dataTestId', () => {
      render(
        <SidebarContextProvider>
          <Sidebar.MenuSub dataTestId="custom-menu-sub">Sub Menu</Sidebar.MenuSub>
        </SidebarContextProvider>,
      );

      const submenu = screen.getByTestId('custom-menu-sub');
      expect(submenu).toBeInTheDocument();
      expect(submenu).toHaveAttribute('data-testid', 'custom-menu-sub');
      expect(screen.queryByTestId('sidebar-menu-sub')).not.toBeInTheDocument();
    });
  });

  describe('SidebarMenuSubItem', () => {
    it('renders with default dataTestId', () => {
      render(
        <SidebarContextProvider>
          <Sidebar.MenuSubItem>Sub Item</Sidebar.MenuSubItem>
        </SidebarContextProvider>,
      );

      const subitem = screen.getByTestId('sidebar-menu-sub-item');
      expect(subitem).toBeInTheDocument();
      expect(subitem).toHaveAttribute('data-testid', 'sidebar-menu-sub-item');
    });

    it('renders with custom dataTestId', () => {
      render(
        <SidebarContextProvider>
          <Sidebar.MenuSubItem dataTestId="custom-menu-sub-item">Sub Item</Sidebar.MenuSubItem>
        </SidebarContextProvider>,
      );

      const subitem = screen.getByTestId('custom-menu-sub-item');
      expect(subitem).toBeInTheDocument();
      expect(subitem).toHaveAttribute('data-testid', 'custom-menu-sub-item');
      expect(screen.queryByTestId('sidebar-menu-sub-item')).not.toBeInTheDocument();
    });
  });

  describe('SidebarMenuSubButton', () => {
    it('renders with default dataTestId', () => {
      render(
        <SidebarContextProvider>
          <Sidebar.MenuSubButton>Sub Button</Sidebar.MenuSubButton>
        </SidebarContextProvider>,
      );

      const subbutton = screen.getByTestId('sidebar-menu-sub-button');
      expect(subbutton).toBeInTheDocument();
      expect(subbutton).toHaveAttribute('data-testid', 'sidebar-menu-sub-button');
    });

    it('renders with custom dataTestId', () => {
      render(
        <SidebarContextProvider>
          <Sidebar.MenuSubButton dataTestId="custom-menu-sub-button">
            Sub Button
          </Sidebar.MenuSubButton>
        </SidebarContextProvider>,
      );

      const subbutton = screen.getByTestId('custom-menu-sub-button');
      expect(subbutton).toBeInTheDocument();
      expect(subbutton).toHaveAttribute('data-testid', 'custom-menu-sub-button');
      expect(screen.queryByTestId('sidebar-menu-sub-button')).not.toBeInTheDocument();
    });
  });

  // Additional integration tests

  it('renders the complete Sidebar with all components', () => {
    render(
      <SidebarContextProvider>
        <Sidebar>
          <Sidebar.Header dataTestId="test-header">Header</Sidebar.Header>
          <Sidebar.Content>
            <Sidebar.Group>
              <Sidebar.GroupLabel>Group Label</Sidebar.GroupLabel>
              <Sidebar.GroupAction>+</Sidebar.GroupAction>
              <Sidebar.GroupContent>
                <Sidebar.Menu>
                  <Sidebar.MenuItem>
                    <Sidebar.MenuButton>Menu Button</Sidebar.MenuButton>
                    <Sidebar.MenuAction>X</Sidebar.MenuAction>
                    <Sidebar.MenuBadge>5</Sidebar.MenuBadge>
                  </Sidebar.MenuItem>
                  <Sidebar.MenuSkeleton showIcon />
                  <Sidebar.MenuItem>
                    <Sidebar.MenuSub>
                      <Sidebar.MenuSubItem>
                        <Sidebar.MenuSubButton>Sub Button</Sidebar.MenuSubButton>
                      </Sidebar.MenuSubItem>
                    </Sidebar.MenuSub>
                  </Sidebar.MenuItem>
                </Sidebar.Menu>
              </Sidebar.GroupContent>
            </Sidebar.Group>
          </Sidebar.Content>
          <Sidebar.Separator />
          <Sidebar.Footer>Footer</Sidebar.Footer>
        </Sidebar>
      </SidebarContextProvider>,
    );

    // Check that the main sidebar and some components are rendered
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    expect(screen.getByTestId('test-header')).toBeInTheDocument(); // Testing custom dataTestId
    expect(screen.getByTestId('sidebar-content')).toBeInTheDocument();
    expect(screen.getByTestId('sidebar-group')).toBeInTheDocument();
    expect(screen.getByTestId('sidebar-group-label')).toBeInTheDocument();
    expect(screen.getByTestId('sidebar-menu')).toBeInTheDocument();
    expect(screen.getByTestId('sidebar-menu-button')).toBeInTheDocument();
    expect(screen.getByTestId('sidebar-separator')).toBeInTheDocument();
    expect(screen.getByTestId('sidebar-footer')).toBeInTheDocument();
  });
});
