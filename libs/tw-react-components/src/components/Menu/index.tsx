import { Menu as HeadlessMenu, Transition } from '@headlessui/react';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';
import { FC, Fragment, MouseEvent, PropsWithChildren, ReactNode, forwardRef } from 'react';

import { Block } from '../Block';
import { Flex } from '../Flex';

type SimpleMenuItem = {
  type?: 'simple';
  label: ReactNode;
  onClick: () => Promise<void> | void;
};

type NestedMenuItem = PropsWithChildren<{
  root?: boolean;
  type: 'nested';
  position?: 'bottom' | 'right';
  items: MenuItem[];
}>;

type SeparatorMenuItem = {
  type: 'separator';
};

export type MenuItem = SimpleMenuItem | NestedMenuItem | SeparatorMenuItem;

export type MenuProps = Omit<NestedMenuItem, 'type'>;

export const Menu = forwardRef<HTMLDivElement, MenuProps>(
  ({ root = true, children, items, position = 'bottom' }, ref) => {
    return (
      <HeadlessMenu as="div" className={classNames('relative', { 'w-fit': root })} ref={ref}>
        <HeadlessMenu.Button as={Fragment}>{children}</HeadlessMenu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <HeadlessMenu.Items
            as={Flex}
            className={classNames(
              'absolute z-30 min-w-[100%] !gap-0.5 rounded-md bg-gray-100 p-1 shadow-lg dark:bg-gray-700',
              {
                'top-full left-0 mt-1': position === 'bottom',
                'top-0 left-full ml-1': position === 'right',
              }
            )}
            direction="column"
          >
            {items.map((item, index) => (
              <MenuItem key={index} item={item} />
            ))}
          </HeadlessMenu.Items>
        </Transition>
      </HeadlessMenu>
    );
  }
);

type MenuItemProps = {
  item: MenuItem;
};

const MenuItem: FC<MenuItemProps> = ({ item }) => {
  const handleNestedClick = (event: MouseEvent) => {
    event.stopPropagation();
  };

  const handleItemClick = async (event: MouseEvent) => {
    event.stopPropagation();
    'onClick' in item && (await item.onClick());
  };

  switch (item.type) {
    case 'separator':
      return <Block className="h-[1px] bg-gray-300 dark:bg-gray-600" fullWidth />;
    case 'nested':
      return (
        <HeadlessMenu.Item>
          <Block
            className="cursor-pointer rounded py-1 px-2 hover:bg-gray-200 dark:hover:bg-gray-800"
            onClick={handleNestedClick}
            fullWidth
          >
            <Menu root={false} items={item.items} position={item.position ?? 'right'}>
              <Flex align="center" justify="between">
                {item.children}
                <ChevronRightIcon className="h-4 w-4" />
              </Flex>
            </Menu>
          </Block>
        </HeadlessMenu.Item>
      );
    default:
      return (
        <HeadlessMenu.Item>
          <Block
            className="cursor-pointer rounded py-1 px-2 hover:bg-gray-200 dark:hover:bg-gray-800"
            onClick={handleItemClick}
            fullWidth
          >
            {item.label}
          </Block>
        </HeadlessMenu.Item>
      );
  }
};
