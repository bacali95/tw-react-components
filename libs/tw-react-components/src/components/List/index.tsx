import type { LucideIcon } from 'lucide-react';
import type { ComponentProps, FC, Ref } from 'react';

import { cn } from '../../helpers';
import { Block } from '../Block';
import { Flex } from '../Flex';
import type { Size } from '../types';

const ListContent: FC<ComponentProps<'div'>> = ({ className, ...props }) => (
  <Block
    className={cn(
      'z-50 min-w-[8rem] overflow-hidden rounded-md border border-slate-100 bg-white p-1 text-slate-700 shadow-md dark:border-slate-700 dark:bg-slate-900 dark:text-white',
      className,
    )}
    {...props}
  />
);

const labelSizeClasses: Record<Size, string> = {
  small: 'p-1 text-sm',
  medium: 'px-2 py-1.5',
};

const ListItem: FC<
  ComponentProps<'div'> & {
    size?: Size;
    inset?: boolean;
  }
> = ({ className, size = 'medium', inset, ...props }) => (
  <Flex
    className={cn(
      labelSizeClasses[size],
      'relative cursor-default select-none gap-2 rounded-md outline-none focus:bg-slate-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:bg-slate-700',
      inset && 'pl-8',
      className,
    )}
    align="center"
    {...props}
  />
);

const ListLabel: FC<
  ComponentProps<'div'> & {
    size?: Size;
    inset?: boolean;
  }
> = ({ className, size = 'medium', inset, ...props }) => (
  <Block
    className={cn(
      labelSizeClasses[size],
      'font-semibold text-slate-900 dark:text-slate-300',
      inset && 'pl-8',
      className,
    )}
    {...props}
  />
);

const ListIndicator: FC<
  ComponentProps<'div'> & {
    icon: LucideIcon;
    iconClassName: string;
  }
> = ({ className, icon: Icon, iconClassName, ...props }) => (
  <Flex
    className={cn('absolute left-2 h-3.5 w-3.5', className)}
    align="center"
    justify="center"
    {...props}
  >
    <Icon className={iconClassName} />
  </Flex>
);

const ListIcon: FC<{ className?: string; icon: LucideIcon; ref?: Ref<SVGSVGElement> }> = ({
  className,
  icon: Icon,
  ref,
}) => <Icon className={cn('h-4 w-4', className)} ref={ref} />;

const ListSeparator: FC<ComponentProps<'div'>> = ({ className, ...props }) => (
  <Block className={cn('-mx-1 my-1 h-px bg-slate-100 dark:bg-slate-700', className)} {...props} />
);

export const List = Object.assign(ListContent, {
  Item: ListItem,
  Label: ListLabel,
  Indicator: ListIndicator,
  Icon: ListIcon,
  Separator: ListSeparator,
});
