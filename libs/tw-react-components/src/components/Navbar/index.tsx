import type { FC, ReactNode } from 'react';

import { cn } from '../../helpers';
import { Block } from '../Block';
import { Flex } from '../Flex';
import { Sidebar } from '../Sidebar';

export type NavbarProps = {
  className?: string;
  sidebarTriggerClassName?: string;
  leftSlot?: ReactNode;
  rightSlot?: ReactNode;
};

export const Navbar: FC<NavbarProps> = ({
  className,
  sidebarTriggerClassName,
  leftSlot,
  rightSlot,
}) => (
  <Block className={cn('border-b p-2 dark:border-slate-700', className)} fullWidth>
    <Flex align="center" justify="between">
      <Flex align="center">
        <Sidebar.Trigger className={sidebarTriggerClassName} />
        {leftSlot}
      </Flex>
      {rightSlot}
    </Flex>
  </Block>
);
