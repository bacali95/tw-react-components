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

const baseInputClasses =
  'peer file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex w-full min-w-0 rounded-md border bg-transparent' +
  'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 transition-color outline-none file:inline-flex file:border-0 file:bg-transparent file:font-medium' +
  'border-input focus:ring-0';

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
    input: 'text-sm md:text-xs py-0.5 px-2 h-6 file:h-5 file:text-xs',
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
    input: 'text-base md:text-sm py-1 px-3 h-9 file:h-7 file:text-sm',
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
    [description, hasErrors, id, label, props.required, size, dataTestId],
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
          errors: hasErrors,
          'mt-1': label && type !== 'checkbox',
          [`items-center ${sizeClasses[size].checkbox.wrapper}`]: type === 'checkbox',
          'has-[input:focus-visible]:border-ring has-[input:focus-visible]:ring-ring/50 has-[textarea:focus-visible]:border-ring has-[textarea:focus-visible]:ring-ring/50 rounded-md has-[input:focus-visible]:ring-[3px] has-[textarea:focus-visible]:ring-[3px]':
            type !== 'checkbox',
          'aria-invalid:!ring-destructive/20 dark:aria-invalid:!ring-destructive/40 aria-invalid:[&>input,&>textarea,&>div]:border-destructive':
            type !== 'checkbox',
          'shadow-xs transition-[color,box-shadow]': type !== 'checkbox',
        })}
        title={type !== 'textarea' && typeof props.value === 'string' ? props.value : undefined}
        data-testid={`${dataTestId}-wrapper`}
        aria-invalid={hasErrors}
      >
        {type === 'textarea' ? (
          <textarea
            id={id}
            className={cn(
              baseInputClasses,
              sizeClasses[size].input.replace(/ h-\d/g, ''),
              'field-sizing-content min-h-16 py-2',
              SuffixIcon && 'rounded-r-none border-r-0',
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
              'border-input rounded-sm disabled:opacity-50',
              'focus:ring-ring/50 focus:border-ring focus:ring-[3px] focus:ring-offset-0',
              'aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40',
              sizeClasses[size].checkbox.input,
              hasErrors && 'bg-red-100',
              inputClassName,
            )}
            type={type}
            checked={Boolean(props.value)}
            {...(props as ComponentProps<'input'>)}
            data-testid={`${dataTestId}-checkbox`}
            aria-invalid={hasErrors}
          />
        ) : (
          <input
            id={id}
            className={cn(
              baseInputClasses,
              sizeClasses[size].input,
              SuffixIcon && 'rounded-r-none border-r-0',
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
              'absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer rounded-full bg-white p-0.5 opacity-0 duration-200 group-hover:opacity-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-800',
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
    disabled?: boolean;
    dataTestId?: string;
    onClick?: (event: MouseEvent<HTMLDivElement>) => void;
  }>
> = ({ children, className, size, disabled, onClick, dataTestId }) => (
  <div
    className={cn(
      'dark:bg-input/30 border-input flex aspect-square items-center justify-center rounded-r-md border border-l-0 bg-transparent aria-disabled:opacity-50',
      sizeClasses[size].suffix.wrapper,
      onClick && 'cursor-pointer',
      className,
    )}
    onClick={!disabled ? onClick : undefined}
    onPointerDown={(event) => event.stopPropagation()}
    data-testid={dataTestId}
    aria-disabled={disabled}
  >
    {children}
  </div>
);
