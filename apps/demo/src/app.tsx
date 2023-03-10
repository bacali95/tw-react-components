import {
  AdjustmentsHorizontalIcon,
  Bars3Icon,
  HomeIcon,
  RectangleGroupIcon,
  RectangleStackIcon,
  TableCellsIcon,
} from '@heroicons/react/24/outline';
import {
  AdjustmentsHorizontalIcon as AdjustmentsHorizontalIconSolid,
  Bars3Icon as Bars3IconSolid,
  HomeIcon as HomeIconSolid,
  RectangleGroupIcon as RectangleGroupIconSolid,
  RectangleStackIcon as RectangleStackIconSolid,
  TableCellsIcon as TableCellsIconSolid,
} from '@heroicons/react/24/solid';
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
          key: '',
          title: 'Home',
          Icon: HomeIcon,
          IconSelected: HomeIconSolid,
        },
        {
          key: 'buttons',
          title: 'Buttons',
          Icon: RectangleStackIcon,
          IconSelected: RectangleStackIconSolid,
        },
        {
          key: 'menus',
          title: 'Menus',
          Icon: Bars3Icon,
          IconSelected: Bars3IconSolid,
        },
        {
          key: 'form-controls',
          title: 'Form Controls',
          Icon: AdjustmentsHorizontalIcon,
          IconSelected: AdjustmentsHorizontalIconSolid,
        },
        {
          key: 'dialogs',
          title: 'Dialogs',
          Icon: RectangleGroupIcon,
          IconSelected: RectangleGroupIconSolid,
        },
        {
          key: 'tables',
          title: 'Tables',
          Icon: TableCellsIcon,
          IconSelected: TableCellsIconSolid,
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
