import { MenuIcon } from 'lucide-react';
import { FC, ReactNode } from 'react';

import { useLayoutContext } from '../../contexts';
import { Block } from '../Block';
import { Button } from '../Button';
import { Flex } from '../Flex';

export type NavbarProps = {
  leftSlot?: ReactNode;
  rightSlot?: ReactNode;
};

export const Navbar: FC<NavbarProps> = ({ leftSlot, rightSlot }) => {
  const { setSidebarOpen } = useLayoutContext();

  return (
    <Block className="border-b p-3 dark:border-slate-700" fullWidth>
      <Flex align="center" justify="between">
        <Flex align="center">
          <Button
            className="xl:hidden"
            prefixIcon={MenuIcon}
            variant="text"
            onClick={() => setSidebarOpen(true)}
          />
          {leftSlot}
        </Flex>
        {rightSlot}
      </Flex>
    </Block>
  );
};
