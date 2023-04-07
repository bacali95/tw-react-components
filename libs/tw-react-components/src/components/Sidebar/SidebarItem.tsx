import classNames from 'classnames';
import { FC, ReactNode } from 'react';

import { type SidebarItem } from '.';
import { Tooltip } from '../Tooltip';

export type SidebarItemProps = SidebarItem & {
  active?: boolean;
  sidebarOpen: boolean;
  onClick: (pathname: string) => () => void;
};

export const SidebarItemComp: FC<SidebarItemProps> = ({
  pathname,
  title,
  label,
  Icon,
  IconSelected,
  active,
  sidebarOpen,
  onClick,
}) => {
  const ItemWrapper = ({ title, children }: { title: string; children: ReactNode }) =>
    sidebarOpen ? (
      <Tooltip className="!z-50" content={title} placement="right">
        {children}
      </Tooltip>
    ) : (
      <>{children}</>
    );

  return (
    <ItemWrapper title={title}>
      <div
        className={classNames(
          'flex h-10 w-full cursor-pointer items-center overflow-hidden rounded-md p-2 font-medium',
          {
            'bg-gray-100 dark:bg-gray-900 dark:text-white': active,
            'text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700': !active,
          }
        )}
        onClick={onClick(pathname)}
      >
        {active ? (
          <IconSelected className="h-6 w-6 min-w-min" />
        ) : (
          <Icon className="h-6 w-6 min-w-min" />
        )}
        <div className="ml-2 min-w-max">
          {title}
          <div className="ml-auto flex items-center space-x-2">{label}</div>
        </div>
      </div>
    </ItemWrapper>
  );
};
