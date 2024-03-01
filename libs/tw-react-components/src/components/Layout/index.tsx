import { FC, PropsWithChildren, ReactNode, useRef } from 'react';

import { useLayoutContext } from '../../contexts';
import { cn } from '../../helpers';
import { useOutsideClick } from '../../hooks';
import { Flex } from '../Flex';
import { Navbar } from '../Navbar';
import { Sidebar, SidebarProps } from '../Sidebar';

type Props = {
  className?: string;
  sidebarProps: SidebarProps;
  navbarChildren?: ReactNode;
};

export const Layout: FC<PropsWithChildren<Props>> = ({
  children,
  className,
  sidebarProps,
  navbarChildren,
}) => {
  const { sidebarOpen, toggleSidebar } = useLayoutContext();
  const sidebarRef = useRef<HTMLDivElement>(null);

  useOutsideClick(
    sidebarRef,
    () => sidebarOpen && window.document.documentElement.offsetWidth <= 1024 && toggleSidebar()
  );

  return (
    <Flex className="h-screen gap-0 text-black dark:bg-slate-900 dark:text-white">
      <Sidebar {...sidebarProps} open={sidebarOpen} ref={sidebarRef} />
      <Flex
        className="gap-0 overflow-clip [overflow-clip-margin:1rem]"
        direction="column"
        fullHeight
        fullWidth
      >
        <Navbar>{navbarChildren}</Navbar>
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
