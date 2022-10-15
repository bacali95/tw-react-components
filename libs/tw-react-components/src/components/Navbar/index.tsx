import { FC, PropsWithChildren } from 'react';
import { HiOutlineBars3 } from 'react-icons/hi2';

type Props = {
  toggleSidebar: () => void;
};

const Navbar: FC<PropsWithChildren<Props>> = ({ children, toggleSidebar }) => {
  return (
    <div className="p-3 pb-0">
      <div className="flex w-full select-none items-center justify-between rounded-lg bg-white p-1 px-3 text-black shadow dark:bg-gray-800 dark:text-white">
        <HiOutlineBars3 className="h-6 w-6 cursor-pointer" onClick={toggleSidebar} />
        <div className="flex items-center gap-2 py-1">{children}</div>
      </div>
    </div>
  );
};

export default Navbar;
