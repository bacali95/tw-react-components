import { ChevronRightIcon, LucideIcon } from 'lucide-react';
import { ComponentProps, FC, PropsWithChildren, ReactNode, useMemo } from 'react';
import type { LinkProps, useLocation } from 'react-router-dom';

import { cn } from '../../helpers';
import { Collapsible } from '../Collapsible';
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
    | { type: 'group'; title?: string; hidden?: boolean; items: SidebarItem[] }
  )[];
  extraContent?: ReactNode;
  footer?: ReactNode;
};

type Props = {
  className?: string;
  sidebarProps: SidebarProps;
  navbarProps?: NavbarProps;
  Link: FC<LinkProps>;
  useLocation: typeof useLocation;
};

export const Layout: FC<PropsWithChildren<Props>> = ({
  children,
  className,
  sidebarProps: { basePath, header, items, extraContent, footer, ...sidebarProps },
  navbarProps,
  Link,
  useLocation,
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
          {items
            .filter((item) => !item.hidden)
            .map((item, index) =>
              item.type === 'item' ? (
                <Sidebar.Group key={index}>
                  <Sidebar.Menu>
                    <RenderSideBarItem
                      basePath={basePath}
                      Link={Link}
                      useLocation={useLocation}
                      {...item}
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
                            Link={Link}
                            useLocation={useLocation}
                            {...subItem}
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

const RenderSideBarItem: FC<
  SidebarItem & { basePath?: string; Link: FC<LinkProps>; useLocation: typeof useLocation }
> = ({ basePath = '/', pathname, title, Icon, items, Link, useLocation }) => {
  const location = useLocation();
  const { open } = useSidebar();

  const currentPath = useMemo(
    () => location.pathname.replace(basePath, '').replace(/^\/*/, ''),
    [basePath, location.pathname],
  );

  if (!items?.filter((subItem) => !subItem.hidden).length) {
    return (
      <Sidebar.MenuItem>
        <Sidebar.MenuButton asChild isActive={isLinkStartsWithPathname(currentPath, pathname)}>
          <Link to={pathname} className="font-medium">
            {Icon && <Icon />}
            {title}
          </Link>
        </Sidebar.MenuButton>
      </Sidebar.MenuItem>
    );
  }

  const isOpen =
    open &&
    (isLinkStartsWithPathname(currentPath, pathname) ||
      items.some((subItem) =>
        isLinkStartsWithPathname(currentPath, `${pathname}/${subItem.pathname}`),
      ));

  return (
    <Collapsible asChild open={isOpen} className="group/collapsible">
      <Sidebar.MenuItem>
        <Collapsible.Trigger asChild>
          <Sidebar.MenuButton
            asChild
            tooltip={title}
            isActive={
              open
                ? currentPath === pathname &&
                  !items.some((subItem) =>
                    isLinkStartsWithPathname(currentPath, `${pathname}/${subItem.pathname}`),
                  )
                : isLinkStartsWithPathname(currentPath, pathname)
            }
          >
            <Link to={pathname} className="font-medium">
              {Icon && <Icon />}
              {title}
              <ChevronRightIcon className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
            </Link>
          </Sidebar.MenuButton>
        </Collapsible.Trigger>
        {items && (
          <Collapsible.Content>
            <Sidebar.MenuSub>
              {items
                .filter((subItem) => !subItem.hidden)
                .map((subItem, index) => (
                  <Sidebar.MenuSubItem key={index}>
                    <Sidebar.MenuSubButton
                      asChild
                      isActive={isLinkStartsWithPathname(
                        currentPath,
                        `${pathname}/${subItem.pathname}`,
                      )}
                    >
                      <Link to={`${pathname}/${subItem.pathname}`}>{subItem.title}</Link>
                    </Sidebar.MenuSubButton>
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
