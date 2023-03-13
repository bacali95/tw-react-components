import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';
import {
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

import { Label } from '../Label';

export type InputType = ComponentProps<'input'>['type'] | 'textarea';

export type InputSize = 'small' | 'medium' | 'large';

export type BasicInputProps<Type extends InputType> = {
  inputClassName?: string;
  extensionClassName?: string;
  type?: Type;
  label?: string;
  description?: ReactNode;
  size?: InputSize;
  hasErrors?: boolean;
  ExtraIcon?: FC<ComponentProps<'svg'>>;
  onExtraIconClick?: (event: MouseEvent<HTMLDivElement>) => void;
} & Omit<
  Type extends 'textarea' ? ComponentProps<'textarea'> : ComponentProps<'input'>,
  'id' | 'ref' | 'size'
>;

const classes = {
  base: {
    input: 'peer w-full rounded-md shadow-sm',
    disabled: 'opacity-60',
  },
  withoutErrors: {
    input:
      'border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:!border-blue-600 dark:placeholder-gray-500 dark:placeholder-gray-400',
    extension:
      'border-gray-300 text-gray-600 peer-focus:border-blue-600 peer-focus:ring-blue-600 dark:border-gray-600 dark:text-white',
  },
  withErrors: {
    input:
      '!border-red-600 dark:bg-gray-700 placeholder-red-900 !ring-red-600 dark:!border-red-500 dark:!placeholder-red-500 dark:!ring-red-600',
    extension:
      'border-red-600 text-red-600 peer-focus:border-red-600 peer-focus:ring-red-600 dark:border-red-500 dark:text-red-500',
  },
};

const sizeClasses: Record<
  InputSize,
  { label: string; input: string; checkbox: { input: string; wrapper: string }; extension: string }
> = {
  small: {
    label: 'text-sm',
    input: 'text-sm py-1 px-2',
    checkbox: {
      input: 'w-4 h-4',
      wrapper: 'h-6 gap-1',
    },
    extension: 'h-4 w-4 mx-1.5',
  },
  medium: {
    label: 'text-base',
    input: 'text-base py-2 px-3',
    checkbox: {
      input: 'w-5 h-5',
      wrapper: 'h-8 gap-2',
    },
    extension: 'w-5 h-5 mx-2',
  },
  large: {
    label: 'text-lg',
    input: 'text-lg py-3 px-4',
    checkbox: {
      input: 'w-6 h-6',
      wrapper: 'h-10 gap-2',
    },
    extension: 'h-6 w-6 mx-3',
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
    ExtraIcon,
    onExtraIconClick,
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

  return (
    <div className={classNames(className, 'w-full dark:text-white')}>
      {type !== 'checkbox' && memoLabel}
      <div
        className={classNames('flex', {
          'mt-1': label && type !== 'checkbox',
          [`items-center ${sizeClasses[size].checkbox.wrapper}`]: type === 'checkbox',
        })}
      >
        {type === 'textarea' ? (
          <textarea
            id={id}
            className={classNames(inputClassName, classes.base.input, sizeClasses[size].input, {
              [classes.base.disabled]: props.disabled,
              [classes.withoutErrors.input]: !hasErrors,
              [classes.withErrors.input]: hasErrors,
              'rounded-r-none border-r-0': hasErrors || ExtraIcon,
            })}
            {...(props as ComponentProps<'textarea'>)}
            value={props.value}
            ref={ref as ForwardedRef<HTMLTextAreaElement>}
          />
        ) : type === 'checkbox' ? (
          <input
            id={id}
            className={classNames(
              inputClassName,
              'rounded border-gray-300 text-blue-600',
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
              'rounded-r-none border-r-0': hasErrors || ExtraIcon,
            })}
            type={type ?? 'text'}
            {...(props as ComponentProps<'input'>)}
            value={props.value}
            ref={ref as ForwardedRef<HTMLInputElement>}
          />
        )}
        {type === 'checkbox' && memoLabel}
        {type !== 'checkbox' && (hasErrors || ExtraIcon) && (
          <BasicInputExtension
            className={extensionClassName}
            hasErrors={hasErrors}
            disabled={props.disabled}
            onClick={onExtraIconClick}
          >
            {hasErrors && !ExtraIcon && (
              <ExclamationTriangleIcon className={sizeClasses[size].extension} />
            )}
            {ExtraIcon && <ExtraIcon className={sizeClasses[size].extension} />}
          </BasicInputExtension>
        )}
      </div>
    </div>
  );
});

export const BasicInputExtension: FC<
  PropsWithChildren<{
    className?: string;
    hasErrors?: boolean;
    disabled?: boolean;
    onClick?: (event: MouseEvent<HTMLDivElement>) => void;
  }>
> = ({ children, className, hasErrors, disabled, onClick }) => (
  <div
    className={classNames(
      className,
      'flex items-center rounded-r-md border border-l-0 peer-focus:ring-1 dark:bg-gray-700',
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
