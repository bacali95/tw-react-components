import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';
import { FC, ReactNode } from 'react';

import { type SidebarItem } from '.';
import { useLayoutContext } from '../../contexts';
import { Tooltip } from '../Tooltip';

export type SidebarItemProps = SidebarItem & {
  active?: boolean;
  completelyVisible: boolean;
  onClick: (pathname: string) => () => void;
};

export const SidebarItemComp: FC<SidebarItemProps> = ({
  pathname,
  title,
  label,
  Icon,
  IconSelected,
  items,
  active,
  completelyVisible,
  onClick,
}) => {
  const { sidebar } = useLayoutContext();

  const ItemWrapper = ({ title, children }: { title: string; children: ReactNode }) =>
    sidebar ? (
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
          'flex w-full cursor-pointer items-center rounded-md p-2 font-medium',
          {
            'bg-gray-100 dark:bg-gray-900 dark:text-white': active,
            'text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700': !active,
            'justify-center': !sidebar,
          }
        )}
        onClick={onClick(pathname)}
      >
        {active ? <IconSelected className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
        <div
          className={classNames({
            'ml-2': completelyVisible,
            'invisible h-0 w-0': !completelyVisible,
          })}
        >
          {title}
          <div className="ml-auto flex items-center space-x-2">{label}</div>
        </div>
        {completelyVisible &&
          items &&
          (active ? (
            <ChevronDownIcon className="ml-auto h-5 w-5" />
          ) : (
            <ChevronRightIcon className="ml-auto h-5 w-5" />
          ))}
      </div>
    </ItemWrapper>
  );
};
