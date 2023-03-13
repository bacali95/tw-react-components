import { Menu as HeadlessMenu, Transition } from '@headlessui/react';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';
import { FC, Fragment, MouseEvent, PropsWithChildren, ReactNode, forwardRef } from 'react';

import { Block } from '../Block';
import { Flex } from '../Flex';

export type MenuPosition = 'bottom-left' | 'bottom-right' | 'right' | 'left';

type SimpleMenuItem = {
  type?: 'simple';
  label: ReactNode;
  onClick: () => Promise<void> | void;
};

type NestedMenuItem = PropsWithChildren<{
  root?: boolean;
  type: 'nested';
  position?: MenuPosition;
  items: MenuItem[];
}>;

type SeparatorMenuItem = {
  type: 'separator';
};

const positionClasses: Record<MenuPosition, string> = {
  'bottom-left': 'top-full left-0 mt-1',
  'bottom-right': 'top-full right-0 mt-1',
  right: 'top-0 left-full ml-1',
  left: 'top-0 right-full mr-1',
};

export type MenuItem = SimpleMenuItem | NestedMenuItem | SeparatorMenuItem;

export type MenuProps = Omit<NestedMenuItem, 'type'>;

export const Menu = forwardRef<HTMLDivElement, MenuProps>(
  ({ root = true, children, items, position = 'bottom-left' }, ref) => {
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
              'absolute z-20 min-w-[100%] !gap-0.5 rounded-md bg-white p-1 shadow-lg dark:bg-gray-700',
              positionClasses[position]
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
            className="min-w-[11rem] cursor-pointer rounded py-1 px-2 hover:bg-gray-100 dark:hover:bg-gray-800"
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
            className="min-w-[11rem] cursor-pointer rounded py-1 px-2 hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={handleItemClick}
            fullWidth
          >
            {item.label}
          </Block>
        </HeadlessMenu.Item>
      );
  }
};
