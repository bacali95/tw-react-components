import {
  AtomIcon,
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

import { Layout, SidebarProps } from 'tw-react-components';

import { Buttons } from './pages/Buttons';
import { Dialogs } from './pages/Dialogs';
import { FormControls } from './pages/FormControls';
import { Home } from './pages/Home';
import { Menus } from './pages/Menus';
import { Tables } from './pages/Tables';

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
          pathname: 'buttons',
          title: 'Atoms',
          Icon: AtomIcon,
          items: [
            {
              pathname: 'buttons',
              title: 'Buttons',
              Icon: RectangleHorizontalIcon,
            },
            {
              pathname: 'form-controls',
              title: 'Form Controls',
              Icon: TextCursorIcon,
            },
          ],
        },
        {
          pathname: 'menus',
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
          <Layout sidebarProps={sidebarProps}>
            <Outlet />
          </Layout>
        }
      >
        <Route path="" element={<Home />} />
        <Route path="buttons" element={<Buttons />} />
        <Route path="menus" element={<Menus />} />
        <Route path="form-controls" element={<FormControls />} />
        <Route path="dialogs" element={<Dialogs />} />
        <Route path="tables" element={<Tables />} />
      </Route>
      <Route path="*" element={<Navigate to="" replace />} />
    </Routes>
  );
};
