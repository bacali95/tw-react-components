import { LucideIcon } from 'lucide-react';
import { ComponentPropsWithoutRef, forwardRef } from 'react';

import { cn } from '../../helpers';
import { Block } from '../Block';
import { Flex } from '../Flex';
import { Size } from '../types';

const ListContent = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<'div'>>(
  ({ className, ...props }, ref) => (
    <Block
      className={cn(
        'z-50 min-w-[8rem] overflow-hidden rounded-md border border-slate-100 bg-white p-1 text-slate-700 shadow-md dark:border-slate-800 dark:bg-slate-800 dark:text-white',
        className,
      )}
      ref={ref}
      {...props}
    />
  ),
);

const labelSizeClasses: Record<Size, string> = {
  small: 'p-1 text-sm',
  medium: 'px-2 py-1.5',
};

const ListItem = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<'div'> & {
    size?: Size;
    inset?: boolean;
  }
>(({ className, size = 'medium', inset, ...props }, ref) => (
  <Flex
    className={cn(
      labelSizeClasses[size],
      'relative cursor-default select-none gap-2 rounded-md outline-none focus:bg-slate-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:bg-slate-700',
      inset && 'pl-8',
      className,
    )}
    align="center"
    ref={ref}
    {...props}
  />
));

const ListLabel = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<'div'> & {
    size?: Size;
    inset?: boolean;
  }
>(({ className, size = 'medium', inset, ...props }, ref) => (
  <Block
    className={cn(
      labelSizeClasses[size],
      'font-semibold text-slate-900 dark:text-slate-300',
      inset && 'pl-8',
      className,
    )}
    ref={ref}
    {...props}
  />
));

const ListIndicator = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<'div'> & {
    icon: LucideIcon;
    iconClassName: string;
  }
>(({ className, icon: Icon, iconClassName, ...props }, ref) => (
  <Flex
    className={cn('absolute left-2 h-3.5 w-3.5', className)}
    align="center"
    justify="center"
    ref={ref}
    {...props}
  >
    <Icon className={iconClassName} />
  </Flex>
));

const ListIcon = forwardRef<SVGSVGElement, { className?: string; icon: LucideIcon }>(
  ({ className, icon: Icon }, ref) => <Icon className={cn('h-4 w-4', className)} ref={ref} />,
);

const ListSeparator = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<'div'>>(
  ({ className, ...props }, ref) => (
    <Block
      className={cn('-mx-1 my-1 h-px bg-slate-100 dark:bg-slate-700', className)}
      ref={ref}
      {...props}
    />
  ),
);

export const List = Object.assign(ListContent, {
  Item: ListItem,
  Label: ListLabel,
  Indicator: ListIndicator,
  Icon: ListIcon,
  Separator: ListSeparator,
});
