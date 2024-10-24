import { FC, ReactNode } from 'react';

import { Block } from '../Block';
import { Flex } from '../Flex';
import { Sidebar } from '../Sidebar';

export type NavbarProps = {
  leftSlot?: ReactNode;
  rightSlot?: ReactNode;
};

export const Navbar: FC<NavbarProps> = ({ leftSlot, rightSlot }) => (
  <Block className="border-b p-3 dark:border-slate-700" fullWidth>
    <Flex align="center" justify="between">
      <Flex align="center">
        <Sidebar.Trigger />
        {leftSlot}
      </Flex>
      {rightSlot}
    </Flex>
  </Block>
);
