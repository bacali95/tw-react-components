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
    <Flex className="h-screen text-black dark:bg-slate-900 dark:text-white" noGap>
      <Sidebar {...sidebarProps} open={sidebarOpen} ref={sidebarRef} />
      <Flex
        className="overflow-clip [overflow-clip-margin:1rem]"
        direction="column"
        fullHeight
        fullWidth
        noGap
      >
        <Navbar>{navbarChildren}</Navbar>
        <Flex
          className="overflow-clip p-3 [overflow-clip-margin:1rem]"
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
