import {
  AtomIcon,
  BadgeIcon,
  BellIcon,
  Columns2Icon,
  FolderIcon,
  HomeIcon,
  LayersIcon,
  MenuIcon,
  MoveHorizontalIcon,
  RectangleHorizontalIcon,
  SquareDotIcon,
  TableIcon,
  TextCursorIcon,
} from 'lucide-react';
import type { FC } from 'react';
import { useMemo } from 'react';
import { Link, NavLink, Navigate, Outlet, Route, Routes, useLocation } from 'react-router';

import type { LayoutSidebarProps } from 'tw-react-components';
import { Layout, Sidebar, ThemeSelector } from 'tw-react-components';

import { Badges } from './pages/Badges';
import { Buttons } from './pages/Buttons';
import { Dialogs } from './pages/Dialogs';
import { FormControls } from './pages/FormControls';
import { Hints } from './pages/Hints';
import { Home } from './pages/Home';
import { Menus } from './pages/Menus';
import { ResizablePage } from './pages/Resizable';
import { Tables } from './pages/Tables';
import { Tabs } from './pages/Tabs';
import { Toasts } from './pages/Toasts';

export const App: FC = () => {
  const sidebarProps: LayoutSidebarProps = useMemo(
    () => ({
      variant: 'inset',
      header: (
        <Link to="/">
          <Sidebar.MenuButton
            size="lg"
            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          >
            <img
              className="h-8 w-8 rounded-lg"
              src="https://ui-avatars.com/api/?name=TWC&background=1d4ed8&color=fff"
              alt="TwUI"
            />
            <span className="truncate text-lg font-semibold">TW Components</span>
          </Sidebar.MenuButton>
        </Link>
      ),
      items: [
        {
          type: 'group',
          items: [
            {
              pathname: '',
              title: 'Home',
              Icon: HomeIcon,
            },
            {
              pathname: 'atoms',
              title: 'Atoms',
              Icon: AtomIcon,
              items: [
                {
                  pathname: 'buttons',
                  title: 'Buttons',
                  Icon: RectangleHorizontalIcon,
                },
                {
                  pathname: 'badges',
                  title: 'Badges',
                  Icon: BadgeIcon,
                },
                {
                  pathname: 'hints',
                  title: 'Hints',
                  Icon: SquareDotIcon,
                },
                {
                  pathname: 'form-controls',
                  title: 'Form Controls',
                  Icon: TextCursorIcon,
                },
                {
                  pathname: 'resizable',
                  title: 'Resizable',
                  Icon: MoveHorizontalIcon,
                },
              ],
            },
            {
              pathname: 'molecules',
              title: 'Molecules',
              Icon: FolderIcon,
              items: [
                {
                  pathname: 'menus',
                  title: 'Menus',
                  Icon: MenuIcon,
                },
                {
                  pathname: 'dialogs',
                  title: 'Dialogs',
                  Icon: LayersIcon,
                },
                {
                  pathname: 'tables',
                  title: 'Tables',
                  Icon: TableIcon,
                },
                {
                  pathname: 'tabs',
                  title: 'Tabs',
                  Icon: Columns2Icon,
                },
                {
                  pathname: 'toasts',
                  title: 'Toasts',
                  Icon: BellIcon,
                },
              ],
            },
          ],
        },
      ],
    }),
    [],
  );

  return (
    <Routes>
      <Route
        path=""
        element={
          <Layout
            sidebarProps={sidebarProps}
            navbarProps={{ className: 'py-2', rightSlot: <ThemeSelector /> }}
            NavLink={NavLink}
            useLocation={useLocation}
          >
            <Outlet />
          </Layout>
        }
      >
        <Route path="" element={<Home />} />
        <Route path="atoms" element={<Outlet />}>
          <Route path="" element={<Navigate to="buttons" replace />} />
          <Route path="buttons" element={<Buttons />} />
          <Route path="badges" element={<Badges />} />
          <Route path="hints" element={<Hints />} />
          <Route path="form-controls" element={<FormControls />} />
          <Route path="resizable" element={<ResizablePage />} />
          <Route path="*" element={<Navigate to="" replace />} />
        </Route>
        <Route path="molecules" element={<Outlet />}>
          <Route path="" element={<Navigate to="menus" replace />} />
          <Route path="menus" element={<Menus />} />
          <Route path="dialogs" element={<Dialogs />} />
          <Route path="tables" element={<Tables />} />
          <Route path="tabs" element={<Tabs />} />
          <Route path="toasts" element={<Toasts />} />
          <Route path="*" element={<Navigate to="" replace />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="" replace />} />
    </Routes>
  );
};
