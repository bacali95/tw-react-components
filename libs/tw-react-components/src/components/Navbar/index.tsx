import { MenuIcon } from 'lucide-react';
import { FC, PropsWithChildren } from 'react';

import { useLayoutContext } from '../../contexts';
import { Button } from '../Button';

export const Navbar: FC<PropsWithChildren> = ({ children }) => {
  const { toggleSidebar } = useLayoutContext();

  return (
    <div className="p-1">
      <div className="flex w-full select-none items-center justify-between rounded-lg bg-white p-2 text-black shadow dark:bg-slate-800 dark:text-white">
        <Button prefixIcon={MenuIcon} transparent onClick={toggleSidebar} />
        <div className="flex items-center gap-2">{children}</div>
      </div>
    </div>
  );
};
