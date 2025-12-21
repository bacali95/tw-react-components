import type { LucideIcon } from 'lucide-react';
import { ChevronRightIcon } from 'lucide-react';
import type { ComponentProps, FC, PropsWithChildren, ReactNode } from 'react';
import { useMemo } from 'react';
import type { NavLinkProps, useLocation } from 'react-router';

import { cn } from '../../helpers';
import { Block } from '../Block';
import { Collapsible } from '../Collapsible';
import { Flex } from '../Flex';
import type { NavbarProps } from '../Navbar';
import { Navbar } from '../Navbar';
import { Sidebar, type SidebarProps, useSidebar } from '../Sidebar';

export type LayoutSidebarItem = {
  pathname: string;
  title: string;
  Icon?: LucideIcon;
  hidden?: boolean;
  items?: LayoutSidebarItem[];
};

export type LayoutSidebarProps = ComponentProps<typeof Sidebar> & {
  basePath?: string;
  header?: ReactNode;
  items: (
    | ({ type: 'item' } & LayoutSidebarItem)
    | { type: 'group'; title?: string; hidden?: boolean; items: LayoutSidebarItem[] }
  )[];
  extraContent?: ReactNode;
  footer?: ReactNode;
};

export type LayoutProps = {
  className?: string;
  sidebarProps: LayoutSidebarProps;
  navbarProps?: NavbarProps;
  NavLink: FC<NavLinkProps>;
  useLocation: typeof useLocation;
};

const Wrapper = ({ children, variant }: PropsWithChildren<{ variant: SidebarProps['variant'] }>) =>
  variant === 'inset' ? (
    <Block className="overflow-hidden p-2" fullHeight fullWidth>
      <Block className="bg-background overflow-hidden rounded-xl shadow-sm" fullHeight fullWidth>
        {children}
      </Block>
    </Block>
  ) : (
    children
  );

export const Layout: FC<PropsWithChildren<LayoutProps>> = ({
  children,
  className,
  sidebarProps: { basePath, header, items, extraContent, footer, ...sidebarProps },
  navbarProps,
  NavLink,
  useLocation,
}) => {
  return (
    <Flex className="bg-sidebar h-screen w-screen gap-0 text-black dark:text-white">
      <Sidebar
        collapsible="icon"
        {...sidebarProps}
        className={cn('h-full overflow-hidden', sidebarProps.className)}
      >
        {header && (
          <Sidebar.Header>
            <Sidebar.Menu>
              <Sidebar.MenuItem>{header}</Sidebar.MenuItem>
            </Sidebar.Menu>
          </Sidebar.Header>
        )}
        <Sidebar.Content className="gap-0">
          {items
            .filter((item) => !item.hidden)
            .map((item, index) =>
              item.type === 'item' ? (
                <Sidebar.Group key={index}>
                  <Sidebar.Menu>
                    <RenderSideBarItem
                      basePath={basePath}
                      {...item}
                      NavLink={NavLink}
                      useLocation={useLocation}
                    />
                  </Sidebar.Menu>
                </Sidebar.Group>
              ) : (
                <Sidebar.Group key={index}>
                  {item.title && <Sidebar.GroupLabel>{item.title}</Sidebar.GroupLabel>}
                  <Sidebar.GroupContent>
                    <Sidebar.Menu>
                      {item.items
                        .filter((subItem) => !subItem.hidden)
                        .map((subItem, index) => (
                          <RenderSideBarItem
                            key={index}
                            basePath={basePath}
                            {...subItem}
                            NavLink={NavLink}
                            useLocation={useLocation}
                          />
                        ))}
                    </Sidebar.Menu>
                  </Sidebar.GroupContent>
                </Sidebar.Group>
              ),
            )}
          {extraContent}
        </Sidebar.Content>
        {footer && (
          <Sidebar.Footer>
            <Sidebar.Menu>
              <Sidebar.MenuItem>{footer}</Sidebar.MenuItem>
            </Sidebar.Menu>
          </Sidebar.Footer>
        )}
        {sidebarProps.variant === 'sidebar' && <Sidebar.Rail />}
      </Sidebar>
      <Wrapper variant={sidebarProps.variant}>
        <Flex className="gap-0 overflow-hidden" direction="column" fullWidth fullHeight>
          {navbarProps && <Navbar {...navbarProps} />}
          <Flex
            className={cn('overflow-hidden p-3', className)}
            direction="column"
            fullWidth
            fullHeight
          >
            {children}
          </Flex>
        </Flex>
      </Wrapper>
    </Flex>
  );
};

const RenderSideBarItem: FC<
  LayoutSidebarItem & { basePath?: string } & Pick<LayoutProps, 'NavLink' | 'useLocation'>
> = ({ basePath = '/', pathname, title, Icon, items, NavLink, useLocation }) => {
  const location = useLocation();
  const { open } = useSidebar();

  const currentPath = useMemo(
    () => location.pathname.replace(basePath, '').replace(/^\/*/, ''),
    [basePath, location.pathname],
  );

  if (!items?.filter((subItem) => !subItem.hidden).length) {
    return (
      <Sidebar.MenuItem>
        <NavLink to={pathname} className="font-medium">
          {({ isActive }) => (
            <Sidebar.MenuButton isActive={isActive}>
              {Icon && <Icon />}
              {title}
            </Sidebar.MenuButton>
          )}
        </NavLink>
      </Sidebar.MenuItem>
    );
  }

  const isOpen = open && isLinkStartsWithPathname(currentPath, pathname);

  return (
    <Collapsible asChild open={isOpen} className="group/collapsible">
      <Sidebar.MenuItem>
        <Collapsible.Trigger asChild>
          <NavLink to={pathname} className="font-medium">
            {({ isActive }) => (
              <Sidebar.MenuButton tooltip={title} isActive={!open && isActive}>
                {Icon && <Icon />}
                {title}
                <ChevronRightIcon className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
              </Sidebar.MenuButton>
            )}
          </NavLink>
        </Collapsible.Trigger>
        {items && (
          <Collapsible.Content>
            <Sidebar.MenuSub>
              {items
                .filter((subItem) => !subItem.hidden)
                .map((subItem, index) => (
                  <Sidebar.MenuSubItem key={index}>
                    <NavLink to={`${pathname}/${subItem.pathname}`}>
                      {({ isActive }) => (
                        <Sidebar.MenuSubButton isActive={isActive}>
                          {subItem.title}
                        </Sidebar.MenuSubButton>
                      )}
                    </NavLink>
                  </Sidebar.MenuSubItem>
                ))}
            </Sidebar.MenuSub>
          </Collapsible.Content>
        )}
      </Sidebar.MenuItem>
    </Collapsible>
  );
};

function isLinkStartsWithPathname(link: string, pathname: string) {
  return pathname === '' ? link === pathname : link.startsWith(pathname);
}
