import classNames from 'classnames';
import { LucideIcon, XIcon } from 'lucide-react';
import {
  ChangeEvent,
  ComponentProps,
  FC,
  ForwardedRef,
  MouseEvent,
  PropsWithChildren,
  ReactNode,
  forwardRef,
  useId,
  useMemo,
} from 'react';

import { Size } from '../../../types';
import { Label } from '../Label';

export type InputType = ComponentProps<'input'>['type'] | 'textarea';

export type BasicInputProps<Type extends InputType> = {
  inputClassName?: string;
  extensionClassName?: string;
  type?: Type;
  label?: string;
  description?: ReactNode;
  size?: Size;
  hasErrors?: boolean;
  clearable?: boolean;
  suffixIcon?: LucideIcon;
  onClear?: () => void;
  onSuffixIconClick?: (event: MouseEvent<HTMLDivElement>) => void;
} & Omit<
  Type extends 'textarea' ? ComponentProps<'textarea'> : ComponentProps<'input'>,
  'id' | 'ref' | 'size'
>;

const classes = {
  base: {
    input: 'peer w-full border focus:ring-1 rounded-md shadow-sm overflow-hidden text-ellipsis',
    disabled: 'opacity-60',
  },
  withoutErrors: {
    input:
      'border-slate-300 dark:border-slate-600 dark:bg-slate-700 focus:!border-blue-600 dark:placeholder-slate-500 dark:placeholder-slate-400',
    extension:
      'border-slate-300 text-slate-600 peer-focus:border-blue-600 peer-focus:ring-blue-600 dark:border-slate-600 dark:text-white',
  },
  withErrors: {
    input:
      '!border-red-600 dark:bg-slate-700 placeholder-red-900 !ring-red-600 dark:!border-red-500 dark:!placeholder-red-500 dark:!ring-red-600',
    extension:
      'border-red-600 text-red-600 peer-focus:border-red-600 peer-focus:ring-red-600 dark:border-red-500 dark:text-red-500',
  },
};

const sizeClasses: Record<
  Size,
  {
    label: string;
    input: string;
    checkbox: { input: string; wrapper: string };
    suffix: { wrapper: string; icon: string };
    clearButton: { base: string; withSuffixIcon: string };
  }
> = {
  small: {
    label: 'text-sm',
    input: 'text-sm py-1 px-2 h-7',
    checkbox: {
      input: 'w-4 h-4',
      wrapper: 'h-6 gap-1',
    },
    suffix: {
      wrapper: 'h-7',
      icon: 'h-4 w-4 mx-1.5',
    },
    clearButton: {
      base: 'h-5 w-5',
      withSuffixIcon: '!right-8',
    },
  },
  medium: {
    label: 'text-base',
    input: 'text-base py-2 px-3 h-10',
    checkbox: {
      input: 'w-5 h-5',
      wrapper: 'h-8 gap-2',
    },
    suffix: {
      wrapper: 'h-10',
      icon: 'w-5 h-5 mx-2',
    },
    clearButton: {
      base: 'h-6 w-6',
      withSuffixIcon: '!right-12',
    },
  },
  large: {
    label: 'text-lg',
    input: 'text-lg py-3 px-4 h-14',
    checkbox: {
      input: 'w-6 h-6',
      wrapper: 'h-10 gap-2',
    },
    suffix: {
      wrapper: 'h-14',
      icon: 'h-6 w-6',
    },
    clearButton: {
      base: 'h-7 w-7',
      withSuffixIcon: '!right-16',
    },
  },
};

export const BasicInput = forwardRef(function BasicInput<Type extends InputType>(
  {
    className,
    inputClassName,
    extensionClassName,
    type = 'text' as Type,
    label,
    description,
    size = 'medium',
    hasErrors,
    clearable,
    suffixIcon: SuffixIcon,
    onClear,
    onSuffixIconClick,
    ...props
  }: BasicInputProps<Type>,
  ref: ForwardedRef<HTMLInputElement | HTMLTextAreaElement>
): JSX.Element {
  const id = useId();
  const memoLabel = useMemo(
    () =>
      label && (
        <Label
          className={sizeClasses[size].label}
          htmlFor={id}
          description={description}
          required={props.required}
          hasErrors={hasErrors}
        >
          {label}
        </Label>
      ),
    [description, hasErrors, id, label, props.required, size]
  );

  const handleClear = (event: MouseEvent) => {
    event.stopPropagation();

    onClear?.();
    !onClear && props.onChange?.({ target: { value: '', checked: false } } as ChangeEvent<any>);
  };

  return (
    <div className={classNames(className, 'w-full dark:text-white')}>
      {type !== 'checkbox' && memoLabel}
      <div
        className={classNames('group relative flex', {
          'mt-1': label && type !== 'checkbox',
          [`items-center ${sizeClasses[size].checkbox.wrapper}`]: type === 'checkbox',
        })}
        title={type !== 'textarea' && typeof props.value === 'string' ? props.value : undefined}
      >
        {type === 'textarea' ? (
          <textarea
            id={id}
            className={classNames(
              inputClassName,
              classes.base.input,
              sizeClasses[size].input.replace(/ h-\d/g, ''),
              {
                [classes.base.disabled]: props.disabled,
                [classes.withoutErrors.input]: !hasErrors,
                [classes.withErrors.input]: hasErrors,
                'rounded-r-none border-r-0': SuffixIcon,
              }
            )}
            {...(props as ComponentProps<'textarea'>)}
            value={props.value}
            ref={ref as ForwardedRef<HTMLTextAreaElement>}
          />
        ) : type === 'checkbox' ? (
          <input
            id={id}
            className={classNames(
              inputClassName,
              'rounded border-slate-300 text-blue-600',
              sizeClasses[size].checkbox.input,
              {
                [classes.base.disabled]: props.disabled,
                'bg-red-100': hasErrors,
              }
            )}
            type={type}
            checked={Boolean(props.value)}
            {...(props as ComponentProps<'input'>)}
            ref={ref as ForwardedRef<HTMLInputElement>}
          />
        ) : (
          <input
            id={id}
            className={classNames(inputClassName, classes.base.input, sizeClasses[size].input, {
              [classes.base.disabled]: props.disabled,
              [classes.withoutErrors.input]: !hasErrors,
              [classes.withErrors.input]: hasErrors,
              'rounded-r-none border-r-0': SuffixIcon,
            })}
            type={type ?? 'text'}
            {...(props as ComponentProps<'input'>)}
            value={props.value}
            ref={ref as ForwardedRef<HTMLInputElement>}
          />
        )}
        {type === 'checkbox' && memoLabel}
        {clearable && (onClear || !!props.value) && (
          <XIcon
            className={classNames(
              'absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer rounded-full bg-white p-0.5 opacity-0 duration-200 hover:bg-slate-200 group-hover:opacity-100 dark:bg-slate-700 dark:hover:bg-slate-800',
              sizeClasses[size].clearButton.base,
              {
                [sizeClasses[size].clearButton.withSuffixIcon]: SuffixIcon,
              }
            )}
            onClick={handleClear}
          />
        )}
        {type !== 'checkbox' && SuffixIcon && (
          <BasicInputExtension
            className={extensionClassName}
            hasErrors={hasErrors}
            size={size}
            disabled={props.disabled}
            onClick={onSuffixIconClick}
          >
            <SuffixIcon className={sizeClasses[size].suffix.icon} />
          </BasicInputExtension>
        )}
      </div>
    </div>
  );
});

export const BasicInputExtension: FC<
  PropsWithChildren<{
    className?: string;
    size: Size;
    hasErrors?: boolean;
    disabled?: boolean;
    onClick?: (event: MouseEvent<HTMLDivElement>) => void;
  }>
> = ({ children, className, size, hasErrors, disabled, onClick }) => (
  <div
    className={classNames(
      className,
      'flex aspect-square items-center justify-center rounded-r-md border peer-focus:ring-1 dark:bg-slate-700',
      sizeClasses[size].suffix.wrapper,
      {
        [classes.base.disabled]: disabled,
        [classes.withoutErrors.extension]: !hasErrors,
        [classes.withErrors.extension]: hasErrors,
        'cursor-pointer': onClick,
      }
    )}
    onClick={onClick}
  >
    {children}
  </div>
);
