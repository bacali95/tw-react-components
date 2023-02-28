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

export type BasicInputProps<Type extends InputType> = {
  type?: Type;
  label?: string;
  description?: ReactNode;
  hasErrors?: boolean;
  ExtraIcon?: FC<ComponentProps<'svg'>>;
  onExtraIconClick?: (event: MouseEvent<HTMLDivElement>) => void;
} & Omit<Type extends 'textarea' ? ComponentProps<'textarea'> : ComponentProps<'input'>, 'id'>;

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

export const BasicInput = forwardRef(function BasicInput<Type extends InputType>(
  {
    className,
    type = 'text' as Type,
    label,
    description,
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
          htmlFor={id}
          description={description}
          required={props.required}
          hasErrors={hasErrors}
        >
          {label}
        </Label>
      ),
    [description, hasErrors, id, label, props.required]
  );

  return (
    <div className={classNames(className, 'w-full dark:text-white')}>
      {type !== 'checkbox' && memoLabel}
      <div
        className={classNames('flex', {
          'mt-1': label && type !== 'checkbox',
          'h-8 items-center gap-2': type === 'checkbox',
        })}
      >
        {type === 'textarea' ? (
          <textarea
            id={id}
            className={classNames(classes.base.input, {
              [classes.base.disabled]: props.disabled,
              [classes.withoutErrors.input]: !hasErrors,
              [classes.withErrors.input]: hasErrors,
              'rounded-r-none': hasErrors || ExtraIcon,
            })}
            {...(props as ComponentProps<'textarea'>)}
            value={props.value}
            ref={ref as ForwardedRef<HTMLTextAreaElement>}
          />
        ) : type === 'checkbox' ? (
          <input
            id={id}
            className={classNames('h-5 w-5 rounded border-gray-300 text-blue-600', {
              [classes.base.disabled]: props.disabled,
              'bg-red-100': hasErrors,
            })}
            type={type}
            {...(props as ComponentProps<'input'>)}
            ref={ref as ForwardedRef<HTMLInputElement>}
          />
        ) : (
          <input
            id={id}
            className={classNames(classes.base.input, {
              [classes.base.disabled]: props.disabled,
              [classes.withoutErrors.input]: !hasErrors,
              [classes.withErrors.input]: hasErrors,
              'rounded-r-none': hasErrors || ExtraIcon,
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
            hasErrors={hasErrors}
            disabled={props.disabled}
            onClick={onExtraIconClick}
          >
            {hasErrors && !ExtraIcon && <ExclamationTriangleIcon className="h-6 w-6" />}
            {ExtraIcon && <ExtraIcon className="h-6 w-6" />}
          </BasicInputExtension>
        )}
      </div>
    </div>
  );
});

export const BasicInputExtension: FC<
  PropsWithChildren<{
    hasErrors?: boolean;
    disabled?: boolean;
    onClick?: (event: MouseEvent<HTMLDivElement>) => void;
  }>
> = ({ children, hasErrors, disabled, onClick }) => (
  <div
    className={classNames(
      'flex items-center rounded-r-md border border-l-0 bg-gray-50 px-2 peer-focus:border-l peer-focus:ring-1 dark:bg-gray-700',
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
