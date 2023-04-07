import { FC, useEffect, useState } from 'react';

import { SidebarItem } from '.';
import { SidebarItemComp, SidebarItemProps } from './SidebarItem';

export type SidebarItemGroupProps = Omit<SidebarItemProps, 'items'> & {
  currentTab: string;
  items: SidebarItem[];
};

export const SidebarItemGroup: FC<SidebarItemGroupProps> = ({
  items,
  currentTab,
  completelyVisible,
  onClick,
  ...item
}) => {
  const [open, setOpen] = useState(
    () => item.active || items.some((item) => item.pathname === currentTab)
  );

  const handleOnClick = (pathname: string) => () => {
    setOpen((open) => !open);
    onClick(pathname)();
  };

  useEffect(() => {
    setOpen(item.active || items.some((item) => item.pathname === currentTab));
  }, [currentTab, item.active, items]);

  return (
    <>
      <SidebarItemComp
        {...item}
        items={items}
        completelyVisible={completelyVisible}
        onClick={handleOnClick}
      />
      {open && (
        <div className="flex flex-col gap-1 rounded-md bg-gray-50 p-1 dark:bg-gray-700">
          {items.map((subItem) => (
            <SidebarItemComp
              key={subItem.pathname}
              {...subItem}
              active={currentTab === subItem.pathname}
              completelyVisible={completelyVisible}
              onClick={onClick}
            />
          ))}
        </div>
      )}
    </>
  );
};
