import { FC, PropsWithChildren, ReactNode } from 'react';

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
  return (
    <div className="flex h-screen gap-1 bg-slate-100 p-2 dark:bg-slate-900">
      <Sidebar {...sidebarProps} />
      <div className="flex w-full flex-col gap-1 overflow-hidden">
        <Navbar>{navbarChildren}</Navbar>
        <Flex className="overflow-hidden p-1" direction="column" fullWidth fullHeight>
          {children}
        </Flex>
      </div>
    </div>
  );
};
