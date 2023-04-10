import { MenuIcon } from 'lucide-react';
import { FC, PropsWithChildren } from 'react';

import { useLayoutContext } from '../../contexts';

export const Navbar: FC<PropsWithChildren> = ({ children }) => {
  const { toggleSidebar } = useLayoutContext();

  return (
    <div className="p-1">
      <div className="flex w-full select-none items-center justify-between rounded-lg bg-white p-1 px-3 text-black shadow dark:bg-slate-800 dark:text-white">
        <MenuIcon className="h-6 w-6 cursor-pointer" onClick={toggleSidebar} />
        <div className="flex items-center gap-2 py-1">{children}</div>
      </div>
    </div>
  );
};
