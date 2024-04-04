import { LucideIcon } from 'lucide-react';
import { ComponentProps, PropsWithoutRef, forwardRef } from 'react';

import { cn } from '../../helpers';
import { Size } from '../types';

export type ButtonVariant = 'default' | 'inverse' | 'green' | 'yellow' | 'red';

const variantClassNames: Record<ButtonVariant, { base: string; hover: string; active: string }> = {
  default: {
    base: 'dark:text-white bg-slate-100 dark:bg-slate-800',
    hover: 'hover:bg-slate-200 dark:hover:bg-slate-700',
    active: 'active:bg-slate-300 dark:active:bg-slate-800/50',
  },
  inverse: {
    base: 'dark:text-white bg-white dark:bg-slate-900',
    hover: 'hover:bg-slate-200 dark:hover:bg-slate-700',
    active: 'active:bg-slate-300 dark:active:bg-slate-900/50',
  },
  green: {
    base: 'text-white bg-green-500 dark:bg-green-600',
    hover: 'hover:text-white hover:bg-green-600 dark:hover:bg-green-700',
    active: 'active:text-white active:bg-green-700 dark:active:bg-green-800',
  },
  yellow: {
    base: 'text-white bg-yellow-500 dark:bg-yellow-600',
    hover: 'hover:text-white hover:bg-yellow-600 dark:hover:bg-yellow-700',
    active: 'active:text-white active:bg-yellow-700 dark:active:bg-yellow-800',
  },
  red: {
    base: 'text-white bg-red-500 dark:bg-red-600',
    hover: 'hover:text-white hover:bg-red-600 dark:hover:bg-red-700',
    active: 'active:text-white active:bg-red-700 dark:active:bg-red-800',
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
    withChildren: 'px-2',
    icon: {
      base: 'h-4 w-4',
      withChildren: 'h-3 w-3',
    },
  },
  medium: {
    base: 'gap-2 p-2.5 text-base h-10',
    withChildren: 'px-3',
    icon: {
      base: 'h-5 w-5',
      withChildren: 'h-4 w-4',
    },
  },
  large: {
    base: 'gap-2.5 p-3.5 text-xl h-14',
    withChildren: 'px-4',
    icon: {
      base: 'h-7 w-7',
      withChildren: 'h-5 w-5',
    },
  },
};

export type ButtonProps = PropsWithoutRef<ComponentProps<'button'>> & {
  size?: Size;
  variant?: ButtonVariant;
  rounded?: boolean;
  transparent?: boolean;
  prefixIcon?: LucideIcon;
  suffixIcon?: LucideIcon;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      size = 'medium',
      variant = 'default',
      rounded,
      transparent,
      prefixIcon: PrefixIcon,
      suffixIcon: SuffixIcon,
      ...props
    },
    ref,
  ) => (
    <button
      className={cn(
        'relative flex cursor-pointer items-center',
        rounded ? 'rounded-full' : 'rounded-md',
        sizeClassNames[size].base,
        {
          'cursor-unset opacity-50': props.disabled,
          [variantClassNames[variant].base]: !transparent,
          [sizeClassNames[size].withChildren]: children,
          [variantClassNames[variant].hover]: !props.disabled,
          [variantClassNames[variant].active]: !props.disabled,
        },
        className,
      )}
      type="button"
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
    </button>
  ),
);
