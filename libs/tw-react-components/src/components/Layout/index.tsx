import { FC, PropsWithChildren, useState } from 'react';

import { default as Navbar } from '../Navbar';
import { default as Sidebar, SidebarProps } from '../Sidebar';
import { default as ThemeSwitcher } from '../ThemeSwitcher';

type Props = {
  sidebarProps: SidebarProps;
};

const Layout: FC<PropsWithChildren<Props>> = ({ children, sidebarProps }) => {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar visible={sidebarVisible} {...sidebarProps} />
      <div className="flex w-full flex-col overflow-hidden">
        <Navbar toggleSidebar={() => setSidebarVisible(!sidebarVisible)}>
          <ThemeSwitcher />
        </Navbar>
        <div className="flex h-full flex-col overflow-hidden p-3">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
