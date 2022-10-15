import { FC, useMemo } from 'react';
import {
  HiAdjustmentsHorizontal,
  HiHome,
  HiOutlineAdjustmentsHorizontal,
  HiOutlineHome,
} from 'react-icons/hi2';
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
          Icon: HiOutlineHome,
          IconSelected: HiHome,
        },
        {
          key: 'form-controls',
          title: 'Form Controls',
          Icon: HiOutlineAdjustmentsHorizontal,
          IconSelected: HiAdjustmentsHorizontal,
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
