import classNames from 'classnames';
import { ComponentProps, FC, PropsWithoutRef, forwardRef } from 'react';

export type ButtonSize = 'small' | 'medium' | 'large';

export type ButtonColor = 'default' | 'green' | 'yellow' | 'red';

const colorClassNames: Record<ButtonColor, { base: string; hover: string; active: string }> = {
  default: {
    base: 'bg-gray-100 dark:bg-gray-900/50',
    hover: 'hover:bg-gray-200 dark:hover:bg-gray-700',
    active: 'active:bg-gray-300 dark:active:bg-gray-900',
  },
  green: {
    base: 'text-white bg-green-500 dark:bg-green-600',
    hover: 'hover:bg-green-600 dark:hover:bg-green-700',
    active: 'active:bg-green-700 dark:active:bg-green-800',
  },
  yellow: {
    base: 'text-white bg-yellow-500 dark:bg-yellow-600',
    hover: 'hover:bg-yellow-600 dark:hover:bg-yellow-700',
    active: 'active:bg-yellow-700 dark:active:bg-yellow-800',
  },
  red: {
    base: 'text-white bg-red-500 dark:bg-red-600',
    hover: 'hover:bg-red-600 dark:hover:bg-red-700',
    active: 'active:bg-red-700 dark:active:bg-red-800',
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
  rounded?: boolean;
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
      rounded,
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
        colorClassNames[color].base,
        sizeClassNames[size].base,
        {
          'cursor-unset opacity-50': props.disabled,
          [sizeClassNames[size].withChildren]: children,
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
