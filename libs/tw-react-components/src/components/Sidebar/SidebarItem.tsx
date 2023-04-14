import classNames from 'classnames';
import { FC, ReactNode } from 'react';

import { type SidebarItem } from '.';
import { Tooltip } from '../Tooltip';

export type SidebarItemProps = SidebarItem & {
  active?: boolean;
  isChild?: boolean;
  sidebarOpen: boolean;
  onClick: (pathname: string) => () => void;
};

export const SidebarItemComp: FC<SidebarItemProps> = ({
  pathname,
  title,
  label,
  Icon,
  active,
  isChild,
  sidebarOpen,
  items,
  onClick,
}) => {
  const ItemWrapper = ({ title, children }: { title: string; children: ReactNode }) =>
    !sidebarOpen ? (
      <Tooltip content={title} placement="right" asChild>
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
            'gap-2': sidebarOpen,
            'gap-3': !sidebarOpen,
            'pl-2.5': !sidebarOpen,
            'dark:text-white': active,
            'bg-slate-100 dark:bg-slate-900': active && !isChild && !items,
            'bg-slate-200 dark:bg-slate-800': active && (isChild || items),
            'text-slate-500 dark:text-slate-400': !active,
            'hover:bg-slate-100 dark:hover:bg-slate-700': !active && !isChild,
            'hover:bg-slate-200 dark:hover:bg-slate-800': !active && isChild,
          }
        )}
        onClick={onClick(pathname)}
      >
        <Icon className="h-5 w-5 min-w-min" />
        <div className="min-w-max">
          {title}
          <div className="ml-auto flex items-center space-x-2">{label}</div>
        </div>
      </div>
    </ItemWrapper>
  );
};
