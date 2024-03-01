import { FC, PropsWithChildren, useRef } from 'react';

import { useLayoutContext } from '../../contexts';
import { cn } from '../../helpers';
import { useOnSwipe, useOutsideClick } from '../../hooks';
import { Flex } from '../Flex';
import { Navbar, NavbarProps } from '../Navbar';
import { Sidebar, SidebarProps } from '../Sidebar';

type Props = {
  className?: string;
  sidebarProps: SidebarProps;
  navbarProps: NavbarProps;
};

export const Layout: FC<PropsWithChildren<Props>> = ({
  children,
  className,
  sidebarProps,
  navbarProps,
}) => {
  const { sidebarOpen, setSidebarOpen } = useLayoutContext();
  const screenRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useOnSwipe(screenRef, (direction) =>
    direction === 'right' ? setSidebarOpen(true) : direction === 'left' && setSidebarOpen(false)
  );

  useOutsideClick(
    sidebarRef,
    () =>
      sidebarOpen && window.document.documentElement.offsetWidth <= 1024 && setSidebarOpen(false)
  );

  return (
    <Flex className="h-screen gap-0 text-black dark:bg-slate-900 dark:text-white" ref={screenRef}>
      <Sidebar {...sidebarProps} open={sidebarOpen} ref={sidebarRef} />
      <Flex
        className="gap-0 overflow-clip [overflow-clip-margin:1rem]"
        direction="column"
        fullHeight
        fullWidth
      >
        <Navbar {...navbarProps} />
        <Flex
          className={cn('overflow-clip p-3 [overflow-clip-margin:1rem]', className)}
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
