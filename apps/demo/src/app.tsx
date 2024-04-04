import {
  AtomIcon,
  BadgeIcon,
  Columns2Icon,
  FolderIcon,
  HomeIcon,
  LayersIcon,
  MenuIcon,
  RectangleHorizontalIcon,
  SquareDotIcon,
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
import { Hints } from './pages/Hints';
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
        { type: 'separator', title: 'Components' },
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
          ],
        },
      ],
      smallLogo: 'SL',
      fullLogo: 'Full Logo',
    }),
    [],
  );

  return (
    <Routes>
      <Route
        path=""
        element={
          <Layout sidebarProps={sidebarProps} navbarProps={{ rightSlot: <ThemeSwitcher /> }}>
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
