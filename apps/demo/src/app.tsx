import {
  AtomIcon,
  BadgeIcon,
  Columns2Icon,
  FolderIcon,
  HomeIcon,
  LayersIcon,
  MenuIcon,
  RectangleHorizontalIcon,
  TableIcon,
  TextCursorIcon,
} from 'lucide-react';
import { FC, useMemo } from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';

import { Layout, SidebarProps, ThemeSwitcher } from 'tw-react-components';

import { Badges } from './pages/Badges';
import { Buttons } from './pages/Buttons';
import { Dialogs } from './pages/Dialogs';
import { FormControls } from './pages/FormControls';
import { Home } from './pages/Home';
import { Menus } from './pages/Menus';
import { Tables } from './pages/Tables';
import { Tabs } from './pages/Tabs';

export const App: FC = () => {
  const sidebarProps: SidebarProps = useMemo(
    () => ({
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
              pathname: 'atoms/buttons',
              title: 'Buttons',
              Icon: RectangleHorizontalIcon,
            },
            {
              pathname: 'atoms/badges',
              title: 'Badges',
              Icon: BadgeIcon,
            },
            {
              pathname: 'atoms/form-controls',
              title: 'Form Controls',
              Icon: TextCursorIcon,
            },
          ],
        },
        {
          pathname: 'molecules',
          title: 'Molecules',
          Icon: FolderIcon,
          items: [
            {
              pathname: 'molecules/menus',
              title: 'Menus',
              Icon: MenuIcon,
            },
            {
              pathname: 'molecules/dialogs',
              title: 'Dialogs',
              Icon: LayersIcon,
            },
            {
              pathname: 'molecules/tables',
              title: 'Tables',
              Icon: TableIcon,
            },
            {
              pathname: 'molecules/tabs',
              title: 'Tabs',
              Icon: Columns2Icon,
            },
          ],
        },
      ],
      smallLogo: 'SL',
      fullLogo: 'Full Logo',
    }),
    []
  );

  return (
    <Routes>
      <Route
        path=""
        element={
          <Layout sidebarProps={sidebarProps} navbarChildren={<ThemeSwitcher />}>
            <Outlet />
          </Layout>
        }
      >
        <Route path="" element={<Home />} />
        <Route path="atoms" element={<Outlet />}>
          <Route path="" element={<Navigate to="buttons" replace />} />
          <Route path="buttons" element={<Buttons />} />
          <Route path="badges" element={<Badges />} />
          <Route path="form-controls" element={<FormControls />} />
          <Route path="*" element={<Navigate to="" replace />} />
        </Route>
        <Route path="molecules" element={<Outlet />}>
          <Route path="" element={<Navigate to="menus" replace />} />
          <Route path="menus" element={<Menus />} />
          <Route path="dialogs" element={<Dialogs />} />
          <Route path="tables" element={<Tables />} />
          <Route path="tabs" element={<Tabs />} />
          <Route path="*" element={<Navigate to="" replace />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="" replace />} />
    </Routes>
  );
};
