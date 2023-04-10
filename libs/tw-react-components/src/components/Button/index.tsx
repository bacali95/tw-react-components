import classNames from 'classnames';
import { ComponentProps, FC, PropsWithoutRef, forwardRef } from 'react';

export type ButtonSize = 'small' | 'medium' | 'large';

export type ButtonColor = 'default' | 'green' | 'yellow' | 'red';

const colorClassNames: Record<
  ButtonColor,
  { base: string; hover: string; active: string; border: string }
> = {
  default: {
    base: 'bg-slate-100 dark:bg-slate-900/50',
    hover: 'hover:bg-slate-200 dark:hover:bg-slate-700',
    active: 'active:bg-slate-300 dark:active:bg-slate-900',
    border: 'border-slate-300 dark:border-slate-600',
  },
  green: {
    base: 'text-white bg-green-500 dark:bg-green-600',
    hover: 'hover:text-white hover:bg-green-600 dark:hover:bg-green-700',
    active: 'active:text-white active:bg-green-700 dark:active:bg-green-800',
    border: 'border-green-700 dark:border-green-800',
  },
  yellow: {
    base: 'text-white bg-yellow-500 dark:bg-yellow-600',
    hover: 'hover:text-white hover:bg-yellow-600 dark:hover:bg-yellow-700',
    active: 'active:text-white active:bg-yellow-700 dark:active:bg-yellow-800',
    border: 'border-yellow-700 dark:border-yellow-800',
  },
  red: {
    base: 'text-white bg-red-500 dark:bg-red-600',
    hover: 'hover:text-white hover:bg-red-600 dark:hover:bg-red-700',
    active: 'active:text-white active:bg-red-700 dark:active:bg-red-800',
    border: 'border-red-700 dark:border-red-800',
  },
};

const sizeClassNames: Record<
  ButtonSize,
  {
    base: string;
    withChildren: string;
    icon: { base: string; withChildren: string };
  }
> = {
  small: {
    base: 'gap-1.5 p-1 text-sm',
    withChildren: 'px-2',
    icon: {
      base: 'h-5 w-5',
      withChildren: 'h-3 w-3',
    },
  },
  medium: {
    base: 'gap-2 p-2 text-base',
    withChildren: 'px-3',
    icon: {
      base: 'h-6 w-6',
      withChildren: 'h-4 w-4',
    },
  },
  large: {
    base: 'gap-2.5 p-3 text-xl',
    withChildren: 'px-4',
    icon: {
      base: 'h-7 w-7',
      withChildren: 'h-5 w-5',
    },
  },
};

export type ButtonProps = PropsWithoutRef<ComponentProps<'button'>> & {
  size?: ButtonSize;
  color?: ButtonColor;
  border?: boolean;
  rounded?: boolean;
  transparent?: boolean;
  prefixIcon?: FC<ComponentProps<'svg'>>;
  suffixIcon?: FC<ComponentProps<'svg'>>;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      size = 'medium',
      color = 'default',
      border,
      rounded,
      transparent,
      prefixIcon: PrefixIcon,
      suffixIcon: SuffixIcon,
      ...props
    },
    ref
  ) => (
    <button
      className={classNames(
        className,
        'relative flex cursor-pointer items-center',
        rounded ? 'rounded-full' : 'rounded-md',
        sizeClassNames[size].base,
        {
          'cursor-unset opacity-50': props.disabled,
          [colorClassNames[color].base]: !transparent,
          [sizeClassNames[size].withChildren]: children,
          [`border ${colorClassNames[color].border}`]: border,
          [colorClassNames[color].hover]: !props.disabled,
          [colorClassNames[color].active]: !props.disabled,
        }
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
  )
);
