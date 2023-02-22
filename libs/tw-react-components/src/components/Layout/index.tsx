import { FC, PropsWithChildren, ReactNode } from 'react';

import { Navbar } from '../Navbar';
import { Sidebar, SidebarProps } from '../Sidebar';
import { ThemeSwitcher } from '../ThemeSwitcher';

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
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar {...sidebarProps} />
      <div className="flex w-full flex-col overflow-hidden">
        <Navbar>
          {navbarChildren}
          <ThemeSwitcher />
        </Navbar>
        <div className="flex h-full flex-col overflow-hidden p-3">{children}</div>
      </div>
    </div>
  );
};
