import { FC, PropsWithChildren, ReactNode, useState } from 'react';

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
  const [sidebarVisible, setSidebarVisible] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar visible={sidebarVisible} {...sidebarProps} />
      <div className="flex w-full flex-col overflow-hidden">
        <Navbar toggleSidebar={() => setSidebarVisible(!sidebarVisible)}>
          {navbarChildren}
          <ThemeSwitcher />
        </Navbar>
        <div className="flex h-full flex-col overflow-hidden p-3">{children}</div>
      </div>
    </div>
  );
};
