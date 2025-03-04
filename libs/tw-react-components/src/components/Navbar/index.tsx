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
  dataTestId?: string;
};

export const Navbar: FC<NavbarProps> = ({
  className,
  sidebarTriggerClassName,
  leftSlot,
  rightSlot,
  dataTestId = 'navbar',
}) => (
  <Block
    className={cn('border-b p-2 dark:border-slate-700', className)}
    fullWidth
    dataTestId={dataTestId}
  >
    <Flex align="center" justify="between">
      <Flex align="center">
        <Sidebar.Trigger className={sidebarTriggerClassName} />
        {leftSlot}
      </Flex>
      {rightSlot}
    </Flex>
  </Block>
);
