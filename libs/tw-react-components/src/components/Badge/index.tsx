import { LucideIcon } from 'lucide-react';
import { ComponentProps, PropsWithoutRef, forwardRef } from 'react';

import { cn } from '../../helpers';
import { Size } from '../types';

export type BadgeVariant =
  | 'default'
  | 'inverse'
  | 'red'
  | 'orange'
  | 'yellow'
  | 'green'
  | 'blue'
  | 'purple';

const variantClassNames: Record<
  BadgeVariant,
  { base: string; outline?: string; hover: string; active: string }
> = {
  default: {
    base: 'bg-slate-100 dark:bg-slate-800',
    outline: 'border-slate-100 dark:border-slate-800',
    hover:
      'hover:bg-slate-200 hover:border-slate-200 dark:hover:bg-slate-700 dark:hover:border-slate-700',
    active:
      'active:bg-slate-300 active:border-slate-300 dark:active:bg-slate-800/50 dark:active:border-slate-800/50',
  },
  inverse: {
    base: 'bg-white dark:bg-slate-900',
    outline: 'border-slate-100 dark:border-slate-900',
    hover:
      'hover:bg-slate-200 hover:border-slate-200 dark:hover:bg-slate-700 dark:hover:border-slate-700',
    active:
      'active:bg-slate-300 active:border-slate-300 dark:active:bg-slate-900/50 dark:active:border-slate-900/50',
  },
  red: {
    base: 'text-white bg-red-500 dark:bg-red-600',
    outline: 'border-red-500 dark:border-red-600',
    hover:
      'hover:text-white hover:bg-red-600 hover:border-red-600 dark:hover:bg-red-700 dark:hover:border-red-700',
    active:
      'active:text-white active:bg-red-700 active:border-red-700 dark:active:bg-red-800 dark:active:border-red-800',
  },
  orange: {
    base: 'text-white bg-orange-500 dark:bg-orange-600',
    outline: 'border-orange-500 dark:border-orange-600',
    hover:
      'hover:text-white hover:bg-orange-600 hover:border-orange-600 dark:hover:bg-orange-700 dark:hover:border-orange-700',
    active:
      'active:text-white active:bg-orange-700 active:border-orange-700 dark:active:bg-orange-800 dark:active:border-orange-800',
  },
  yellow: {
    base: 'text-white bg-yellow-500 dark:bg-yellow-600',
    outline: 'border-yellow-500 dark:border-yellow-600',
    hover:
      'hover:text-white hover:bg-yellow-600 hover:border-yellow-600 dark:hover:bg-yellow-700 dark:hover:border-yellow-700',
    active:
      'active:text-white active:bg-yellow-700 active:border-yellow-700 dark:active:bg-yellow-800 dark:active:border-yellow-800',
  },
  green: {
    base: 'text-white bg-green-500 dark:bg-green-600',
    outline: 'border-green-500 dark:border-green-600',
    hover:
      'hover:text-white hover:bg-green-600 hover:border-green-600 dark:hover:bg-green-700 dark:hover:border-green-700',
    active:
      'active:text-white active:bg-green-700 active:border-green-700 dark:active:bg-green-800 dark:active:border-green-800',
  },
  blue: {
    base: 'text-white bg-blue-500 dark:bg-blue-600',
    outline: 'border-blue-500 dark:border-blue-600',
    hover:
      'hover:text-white hover:bg-blue-600 hover:border-blue-600 dark:hover:bg-blue-700 dark:hover:border-blue-700',
    active:
      'active:text-white active:bg-blue-700 active:border-blue-700 dark:active:bg-blue-800 dark:active:border-blue-800',
  },
  purple: {
    base: 'text-white bg-purple-500 dark:bg-purple-600',
    outline: 'border-purple-500 dark:border-purple-600',
    hover:
      'hover:text-white hover:bg-purple-600 hover:border-purple-600 dark:hover:bg-purple-700 dark:hover:border-purple-700',
    active:
      'active:text-white active:bg-purple-700 active:border-purple-700 dark:active:bg-purple-800 dark:active:border-purple-800',
  },
};

const sizeClassNames: Record<
  Size,
  {
    base: string;
    withChildren: string;
    icon: { base: string; withChildren: string };
  }
> = {
  small: {
    base: 'gap-1.5 p-1.5 text-sm h-7',
    withChildren: 'px-3',
    icon: {
      base: 'h-4 w-4',
      withChildren: 'h-3 w-3',
    },
  },
  medium: {
    base: 'gap-2 p-2.5 text-base h-10',
    withChildren: 'px-4',
    icon: {
      base: 'h-5 w-5',
      withChildren: 'h-4 w-4',
    },
  },
  large: {
    base: 'gap-2.5 p-3.5 text-xl h-14',
    withChildren: 'px-5',
    icon: {
      base: 'h-7 w-7',
      withChildren: 'h-5 w-5',
    },
  },
};

export type BadgeProps = PropsWithoutRef<ComponentProps<'div'>> & {
  size?: Size;
  variant?: BadgeVariant;
  outline?: boolean;
  prefixIcon?: LucideIcon;
  suffixIcon?: LucideIcon;
};

export const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  (
    {
      children,
      className,
      size = 'small',
      variant = 'default',
      outline = false,
      prefixIcon: PrefixIcon,
      suffixIcon: SuffixIcon,
      ...props
    },
    ref
  ) => (
    <div
      className={cn(
        'relative flex items-center rounded-full dark:text-white',
        sizeClassNames[size].base,
        variantClassNames[variant][outline ? 'outline' : 'base'],
        {
          'border-2': outline,
          [`cursor-pointer ${variantClassNames[variant].hover} ${variantClassNames[variant].active}`]:
            !!props.onClick,
          [sizeClassNames[size].withChildren]: children,
        },
        className
      )}
      {...props}
      ref={ref}
    >
      {PrefixIcon && (
        <PrefixIcon
          className={
            children ? sizeClassNames[size].icon.withChildren : sizeClassNames[size].icon.base
          }
        />
      )}
      {children}
      {SuffixIcon && (
        <SuffixIcon
          className={
            children ? sizeClassNames[size].icon.withChildren : sizeClassNames[size].icon.base
          }
        />
      )}
    </div>
  )
);
