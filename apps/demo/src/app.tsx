import { AdjustmentsHorizontalIcon, HomeIcon } from '@heroicons/react/24/outline';
import {
  AdjustmentsHorizontalIcon as AdjustmentsHorizontalIconSolid,
  HomeIcon as HomeIconSolid,
} from '@heroicons/react/24/solid';
import { FC, useMemo } from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';

import { Layout, SidebarProps } from 'tw-react-components';

import { FormControls } from './pages/FormControls';
import { Home } from './pages/Home';

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
          key: 'form-controls',
          title: 'Form Controls',
          Icon: AdjustmentsHorizontalIcon,
          IconSelected: AdjustmentsHorizontalIconSolid,
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
        <Route path="form-controls" element={<FormControls />} />
      </Route>
      <Route path="*" element={<Navigate to="" replace />} />
    </Routes>
  );
};
