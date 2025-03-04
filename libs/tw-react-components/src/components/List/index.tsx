import type { LucideIcon } from 'lucide-react';
import type { ComponentProps, FC, Ref } from 'react';

import { cn } from '../../helpers';
import { Block } from '../Block';
import { Flex } from '../Flex';
import type { Size } from '../types';

export type ListContentProps = ComponentProps<'div'> & {
  dataTestId?: string;
};

const ListContent: FC<ListContentProps> = ({ className, dataTestId = 'list', ...props }) => (
  <Block
    className={cn(
      'z-50 min-w-[8rem] overflow-hidden rounded-md border border-slate-100 bg-white p-1 text-slate-700 shadow-md dark:border-slate-700 dark:bg-slate-900 dark:text-white',
      className,
    )}
    dataTestId={dataTestId}
    {...props}
  />
);

const labelSizeClasses: Record<Size, string> = {
  small: 'p-1 text-sm',
  medium: 'px-2 py-1.5',
};

export type ListItemProps = ComponentProps<'div'> & {
  size?: Size;
  inset?: boolean;
  dataTestId?: string;
};

const ListItem: FC<ListItemProps> = ({
  className,
  size = 'medium',
  inset,
  dataTestId = 'list-item',
  ...props
}) => (
  <Flex
    className={cn(
      labelSizeClasses[size],
      'relative cursor-default select-none gap-2 rounded-md outline-none focus:bg-slate-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:bg-slate-700',
      inset && 'pl-8',
      className,
    )}
    align="center"
    dataTestId={dataTestId}
    {...props}
  />
);

export type ListLabelProps = ComponentProps<'div'> & {
  size?: Size;
  inset?: boolean;
  dataTestId?: string;
};

const ListLabel: FC<ListLabelProps> = ({
  className,
  size = 'medium',
  inset,
  dataTestId = 'list-label',
  ...props
}) => (
  <Block
    className={cn(
      labelSizeClasses[size],
      'font-semibold text-slate-900 dark:text-slate-300',
      inset && 'pl-8',
      className,
    )}
    dataTestId={dataTestId}
    {...props}
  />
);

export type ListIndicatorProps = ComponentProps<'div'> & {
  icon: LucideIcon;
  iconClassName: string;
  dataTestId?: string;
};

const ListIndicator: FC<ListIndicatorProps> = ({
  className,
  icon: Icon,
  iconClassName,
  dataTestId = 'list-indicator',
  ...props
}) => (
  <Flex
    className={cn('absolute left-2 h-3.5 w-3.5', className)}
    align="center"
    justify="center"
    dataTestId={dataTestId}
    {...props}
  >
    <Icon className={iconClassName} />
  </Flex>
);

export type ListIconProps = {
  className?: string;
  icon: LucideIcon;
  ref?: Ref<SVGSVGElement>;
  dataTestId?: string;
};

const ListIcon: FC<ListIconProps> = ({ className, icon: Icon, ref, dataTestId = 'list-icon' }) => (
  <Icon className={cn('h-4 w-4', className)} ref={ref} data-testid={dataTestId} />
);

export type ListSeparatorProps = ComponentProps<'div'> & {
  dataTestId?: string;
};

const ListSeparator: FC<ListSeparatorProps> = ({
  className,
  dataTestId = 'list-separator',
  ...props
}) => (
  <Block
    className={cn('-mx-1 my-1 h-px bg-slate-100 dark:bg-slate-700', className)}
    dataTestId={dataTestId}
    {...props}
  />
);

export const List = Object.assign(ListContent, {
  Item: ListItem,
  Label: ListLabel,
  Indicator: ListIndicator,
  Icon: ListIcon,
  Separator: ListSeparator,
});
