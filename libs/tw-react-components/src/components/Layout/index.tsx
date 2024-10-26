import { LucideIcon } from 'lucide-react';
import { ComponentProps, FC, PropsWithChildren, ReactNode, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { cn } from '../../helpers';
import { Flex } from '../Flex';
import { Navbar, NavbarProps } from '../Navbar';
import { Sidebar, useSidebar } from '../Sidebar';

export type SidebarItem = {
  pathname: string;
  title: string;
  Icon?: LucideIcon;
  hidden?: boolean;
  items?: SidebarItem[];
};

export type SidebarProps = ComponentProps<typeof Sidebar> & {
  basePath?: string;
  header?: ReactNode;
  items: (
    | ({ type: 'item' } & SidebarItem)
    | { type: 'group'; title?: string; items: SidebarItem[] }
  )[];
  footer?: ReactNode;
};

type Props = {
  className?: string;
  sidebarProps: SidebarProps;
  navbarProps?: NavbarProps;
};

export const Layout: FC<PropsWithChildren<Props>> = ({
  children,
  className,
  sidebarProps: { basePath, header, items, footer, ...sidebarProps },
  navbarProps,
}) => {
  return (
    <Flex className="h-screen w-screen gap-0 text-black dark:bg-slate-900 dark:text-white">
      <Sidebar collapsible="icon" {...sidebarProps}>
        {header && (
          <Sidebar.Header>
            <Sidebar.Menu>
              <Sidebar.MenuItem>{header}</Sidebar.MenuItem>
            </Sidebar.Menu>
          </Sidebar.Header>
        )}
        <Sidebar.Content className="gap-0">
          {items.map((item, index) =>
            item.type === 'item' ? (
              <Sidebar.Group key={index}>
                <Sidebar.Menu>
                  <RenderSideBarItem basePath={basePath} {...item} />
                </Sidebar.Menu>
              </Sidebar.Group>
            ) : (
              <Sidebar.Group key={index}>
                {item.title && <Sidebar.GroupLabel>{item.title}</Sidebar.GroupLabel>}
                <Sidebar.GroupContent>
                  <Sidebar.Menu>
                    {item.items.map((item, index) => (
                      <RenderSideBarItem key={index} basePath={basePath} {...item} />
                    ))}
                  </Sidebar.Menu>
                </Sidebar.GroupContent>
              </Sidebar.Group>
            ),
          )}
        </Sidebar.Content>
        {footer && (
          <Sidebar.Footer>
            <Sidebar.Menu>
              <Sidebar.MenuItem>{footer}</Sidebar.MenuItem>
            </Sidebar.Menu>
          </Sidebar.Footer>
        )}
        <Sidebar.Rail />
      </Sidebar>
      <Flex className="gap-0 overflow-hidden" direction="column" fullHeight fullWidth>
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
    </Flex>
  );
};

const RenderSideBarItem: FC<SidebarItem & { basePath?: string }> = ({
  basePath = '/',
  pathname,
  title,
  Icon,
  items,
}) => {
  const location = useLocation();
  const { open } = useSidebar();

  const currentPath = useMemo(
    () => location.pathname.replace(basePath, '').replace(/^\/*/, ''),
    [basePath, location.pathname],
  );

  return (
    <Sidebar.MenuItem>
      <Sidebar.MenuButton
        asChild
        tooltip={title}
        isActive={
          isLinkStartsWithPathname(currentPath, pathname) &&
          (!items ||
            (!open &&
              items.some((item) =>
                isLinkStartsWithPathname(currentPath, `${pathname}/${item.pathname}`),
              )))
        }
      >
        <Link to={pathname} className="font-medium">
          {Icon && <Icon />}
          {title}
        </Link>
      </Sidebar.MenuButton>
      {items && (
        <Sidebar.MenuSub>
          {items.map((subItem, index) => (
            <Sidebar.MenuSubItem key={index}>
              <Sidebar.MenuSubButton
                asChild
                isActive={isLinkStartsWithPathname(currentPath, `${pathname}/${subItem.pathname}`)}
              >
                <Link to={`${pathname}/${subItem.pathname}`}>{subItem.title}</Link>
              </Sidebar.MenuSubButton>
            </Sidebar.MenuSubItem>
          ))}
        </Sidebar.MenuSub>
      )}
    </Sidebar.MenuItem>
  );
};

function isLinkStartsWithPathname(link: string, pathname: string) {
  return pathname === '' ? link === pathname : link.startsWith(pathname);
}
