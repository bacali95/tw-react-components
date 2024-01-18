import { FC, PropsWithChildren, ReactNode, useRef } from 'react';

import { useLayoutContext } from '../../contexts';
import { useOutsideClick } from '../../hooks';
import { Flex } from '../Flex';
import { Navbar } from '../Navbar';
import { Sidebar, SidebarProps } from '../Sidebar';

type Props = {
  sidebarProps: SidebarProps;
  navbarChildren?: ReactNode;
};

export const Layout: FC<PropsWithChildren<Props>> = ({
  children,
  sidebarProps,
  navbarChildren,
}) => {
  const { sidebarOpen, toggleSidebar } = useLayoutContext();
  const sidebarRef = useRef<HTMLDivElement>(null);

  useOutsideClick(
    sidebarRef,
    () => sidebarOpen && window.document.documentElement.offsetWidth < 768 && toggleSidebar()
  );

  return (
    <Flex className="h-screen bg-slate-100 p-3 dark:bg-slate-900">
      <Sidebar {...sidebarProps} open={sidebarOpen} ref={sidebarRef} />
      <Flex
        className="overflow-clip [overflow-clip-margin:1rem]"
        direction="column"
        fullHeight
        fullWidth
      >
        <Navbar>{navbarChildren}</Navbar>
        <Flex
          className="overflow-clip [overflow-clip-margin:1rem]"
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
