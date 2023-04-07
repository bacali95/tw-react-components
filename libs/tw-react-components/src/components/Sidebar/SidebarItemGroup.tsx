import { ChevronRightIcon } from '@heroicons/react/24/outline';
import * as Accordion from '@radix-ui/react-accordion';
import classNames from 'classnames';
import { forwardRef } from 'react';

import { SidebarItem } from '.';
import { SidebarItemComp, SidebarItemProps } from './SidebarItem';

export type SidebarItemGroupProps = Omit<SidebarItemProps, 'items'> & {
  currentTab: string;
  items: SidebarItem[];
};

export const SidebarItemGroup = forwardRef<HTMLDivElement, SidebarItemGroupProps>(
  ({ items, currentTab, sidebarOpen, onClick, ...item }, ref) => (
    <Accordion.Item className="flex flex-col gap-1" value={item.pathname} ref={ref}>
      <Accordion.Header>
        <Accordion.Trigger className="relative w-full data-[state=open]:[--rotate-chevron:90deg]">
          <SidebarItemComp {...item} sidebarOpen={sidebarOpen} onClick={onClick} />
          {sidebarOpen && (
            <ChevronRightIcon className="absolute top-1/2 right-2 h-4 w-4 -translate-y-1/2 rotate-[var(--rotate-chevron,0deg)] transition-transform duration-200" />
          )}
        </Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Content className="overflow-hidden data-[state=open]:animate-[slideDown_200ms_ease-out] data-[state=closed]:animate-[slideUp_200ms_ease-out]">
        <div
          className={classNames('flex flex-col gap-1', {
            'rounded-md bg-gray-50 p-1 dark:bg-gray-700': sidebarOpen,
          })}
        >
          {items.map((subItem) => (
            <SidebarItemComp
              key={subItem.pathname}
              {...subItem}
              active={currentTab === subItem.pathname}
              sidebarOpen={sidebarOpen}
              onClick={onClick}
            />
          ))}
        </div>
      </Accordion.Content>
    </Accordion.Item>
  )
);
