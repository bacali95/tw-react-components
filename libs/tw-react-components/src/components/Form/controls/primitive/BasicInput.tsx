import { XIcon } from 'lucide-react';
import type {
  ChangeEvent,
  ComponentProps,
  FC,
  MouseEvent,
  PropsWithChildren,
  ReactNode,
} from 'react';
import { useId, useMemo } from 'react';

import { cn } from '../../../../helpers';
import type { Size } from '../../../types';
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
  suffixIcon?: FC<ComponentProps<'svg'>>;
  onClear?: () => void;
  onSuffixIconClick?: (event: MouseEvent<HTMLDivElement>) => void;
  dataTestId?: string;
} & Omit<
  Type extends 'textarea' ? ComponentProps<'textarea'> : ComponentProps<'input'>,
  'id' | 'size'
>;

const inputClasses = {
  base: {
    input:
      'dark:bg-transparent peer w-full border focus:ring-0 rounded-md overflow-hidden text-ellipsis',
    disabled: 'opacity-60',
  },
  withoutErrors: {
    input:
      'border-slate-300 dark:border-slate-700 focus:border-blue-500 dark:focus:border-blue-600 dark:placeholder-slate-400',
    extension:
      'bg-white dark:bg-transparent border-slate-300 text-slate-600 peer-focus:border-blue-500 dark:peer-focus:border-blue-600 dark:border-slate-700 dark:text-white',
  },
  withErrors: {
    input:
      'text-red-600 border-red-500 placeholder-red-500 focus:border-red-500 dark:border-red-600 dark:peer-focus:border-red-600 dark:placeholder-red-600',
    extension:
      'text-red-600 border-red-500 peer-focus:border-red-500 dark:border-red-600 dark:peer-focus:border-red-600 dark:text-red-500',
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
    label: 'text-xs',
    input: 'text-xs py-1 px-2 h-6',
    checkbox: {
      input: 'w-3 h-3',
      wrapper: 'h-6 gap-1',
    },
    suffix: {
      wrapper: 'h-6',
      icon: 'h-3 w-3 mx-1.5',
    },
    clearButton: {
      base: 'h-4 w-4',
      withSuffixIcon: 'right-8',
    },
  },
  medium: {
    label: 'text-sm',
    input: 'text-sm py-2 px-3 h-9',
    checkbox: {
      input: 'w-4 h-4',
      wrapper: 'h-8 gap-2',
    },
    suffix: {
      wrapper: 'h-9',
      icon: 'w-4 h-4 mx-2',
    },
    clearButton: {
      base: 'h-5 w-5',
      withSuffixIcon: 'right-9',
    },
  },
};

export const BasicInput = <Type extends InputType>({
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
  dataTestId = 'basic-input',
  ...props
}: BasicInputProps<Type>) => {
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
          dataTestId={`${dataTestId}-label`}
        >
          {label}
        </Label>
      ),
    [description, hasErrors, id, label, props.required, size],
  );

  const handleClear = (event: MouseEvent) => {
    event.stopPropagation();

    onClear?.();
    props.onChange?.({ target: { value: '', checked: false } } as ChangeEvent<any>);
  };

  return (
    <div className={cn('w-full dark:text-white', className)} data-testid={dataTestId}>
      {type !== 'checkbox' && memoLabel}
      <div
        className={cn('group relative flex', {
          'mt-1': label && type !== 'checkbox',
          [`items-center ${sizeClasses[size].checkbox.wrapper}`]: type === 'checkbox',
        })}
        title={type !== 'textarea' && typeof props.value === 'string' ? props.value : undefined}
      >
        {type === 'textarea' ? (
          <textarea
            id={id}
            className={cn(
              inputClasses.base.input,
              sizeClasses[size].input.replace(/ h-\d/g, ''),
              {
                [inputClasses.base.disabled]: props.disabled,
                [inputClasses.withoutErrors.input]: !hasErrors,
                [inputClasses.withErrors.input]: hasErrors,
                'rounded-r-none border-r-0': SuffixIcon,
              },
              inputClassName,
            )}
            {...(props as ComponentProps<'textarea'>)}
            value={props.value}
            data-testid={`${dataTestId}-textarea`}
          />
        ) : type === 'checkbox' ? (
          <input
            id={id}
            className={cn(
              'rounded border-slate-300 text-blue-600',
              sizeClasses[size].checkbox.input,
              {
                [inputClasses.base.disabled]: props.disabled,
                'bg-red-100': hasErrors,
              },
              inputClassName,
            )}
            type={type}
            checked={Boolean(props.value)}
            {...(props as ComponentProps<'input'>)}
            data-testid={`${dataTestId}-checkbox`}
          />
        ) : (
          <input
            id={id}
            className={cn(
              inputClasses.base.input,
              sizeClasses[size].input,
              {
                [inputClasses.base.disabled]: props.disabled,
                [inputClasses.withoutErrors.input]: !hasErrors,
                [inputClasses.withErrors.input]: hasErrors,
                'rounded-r-none border-r-0': SuffixIcon,
              },
              inputClassName,
            )}
            type={type ?? 'text'}
            {...(props as ComponentProps<'input'>)}
            value={props.value}
            data-testid={`${dataTestId}-input`}
          />
        )}
        {type === 'checkbox' && memoLabel}
        {clearable && (onClear || !!props.value) && !props.disabled && (
          <XIcon
            className={cn(
              'absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer rounded-full bg-white p-0.5 opacity-0 duration-200 hover:bg-slate-200 group-hover:opacity-100 dark:bg-slate-700 dark:hover:bg-slate-800',
              sizeClasses[size].clearButton.base,
              {
                [sizeClasses[size].clearButton.withSuffixIcon]: SuffixIcon,
              },
            )}
            onClick={handleClear}
            onPointerDown={(event) => event.stopPropagation()}
            data-testid={`${dataTestId}-clear`}
          />
        )}
        {type !== 'checkbox' && SuffixIcon && (
          <BasicInputExtension
            className={extensionClassName}
            hasErrors={hasErrors}
            size={size}
            disabled={props.disabled}
            onClick={onSuffixIconClick}
            dataTestId={`${dataTestId}-suffix`}
          >
            <SuffixIcon className={sizeClasses[size].suffix.icon} />
          </BasicInputExtension>
        )}
      </div>
    </div>
  );
};

export const BasicInputExtension: FC<
  PropsWithChildren<{
    className?: string;
    size: Size;
    hasErrors?: boolean;
    disabled?: boolean;
    dataTestId?: string;
    onClick?: (event: MouseEvent<HTMLDivElement>) => void;
  }>
> = ({ children, className, size, hasErrors, disabled, onClick, dataTestId }) => (
  <div
    className={cn(
      'flex aspect-square items-center justify-center rounded-r-md border border-l-0',
      sizeClasses[size].suffix.wrapper,
      {
        [inputClasses.base.disabled]: disabled,
        [inputClasses.withoutErrors.extension]: !hasErrors,
        [inputClasses.withErrors.extension]: hasErrors,
        'cursor-pointer': onClick,
      },
      className,
    )}
    onClick={!disabled ? onClick : undefined}
    onPointerDown={(event) => event.stopPropagation()}
    data-testid={dataTestId}
  >
    {children}
  </div>
);
