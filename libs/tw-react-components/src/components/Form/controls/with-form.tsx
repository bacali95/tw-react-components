import type { ComponentProps, FC } from 'react';
import type { ControllerRenderProps, Validate } from 'react-hook-form';
import { Controller, useFormContext } from 'react-hook-form';

import type {
  DateTimeInputProps,
  DateTimeInputType,
  FileInputProps,
  SelectInputProps,
  SelectInputType,
} from './custom';
import { DateTimeInput, FileInput, SelectInput } from './custom';
import type {
  BasicInputProps,
  CheckboxInputProps,
  EmailInputProps,
  InputType,
  NumberInputProps,
  PasswordInputProps,
  TextInputProps,
  TextareaInputProps,
} from './primitive';
import {
  CheckboxInput,
  EmailInput,
  NumberInput,
  PasswordInput,
  TextInput,
  TextareaInput,
} from './primitive';

export type WithFormProps<
  Type extends InputType | SelectInputType,
  Props = Type extends DateTimeInputType
    ? DateTimeInputProps
    : Type extends SelectInputType
      ? SelectInputProps
      : Omit<BasicInputProps<Type>, 'type'>,
> = {
  name: string;
  pattern?: RegExp;
  validate?: Type extends 'number'
    ? Validate<number, any>
    : Type extends DateTimeInputType
      ? Validate<Date, any>
      : Type extends SelectInputType
        ? Validate<any, any>
        : Validate<string, any>;
} & Omit<Props, 'pattern' | keyof Omit<ControllerRenderProps, 'disabled' | 'ref'>>;

function withForm<
  Type extends InputType | SelectInputType,
  Props = Type extends DateTimeInputType
    ? DateTimeInputProps
    : Type extends SelectInputType
      ? SelectInputProps
      : BasicInputProps<Type>,
>(Component: FC<Props>): FC<WithFormProps<Type, Props>> {
  return (props) => {
    const { name, pattern, validate, ...restProps } = props as WithFormProps<Type, Props>;
    const { control, formState } = useFormContext();

    return (
      <Controller
        name={name}
        control={control}
        rules={{
          required: (restProps as ComponentProps<'input'>).required,
          min: (restProps as ComponentProps<'input'>).min,
          max: (restProps as ComponentProps<'input'>).max,
          minLength: (restProps as ComponentProps<'input'>).minLength,
          maxLength: (restProps as ComponentProps<'input'>).maxLength,
          pattern,
          validate,
        }}
        render={({ field, fieldState }) => (
          <Component
            {...(restProps as Props)}
            {...field}
            value={field.value ?? ''}
            disabled={
              (field.disabled ?? (restProps as ComponentProps<'input'>).disabled) ||
              formState.isSubmitting
            }
            hasErrors={fieldState.error}
          />
        )}
      />
    );
  };
}

export const FormInputs = {
  Text: withForm<'text', TextInputProps>(TextInput),
  Email: withForm<'email', EmailInputProps>(EmailInput),
  Password: withForm<'password', PasswordInputProps>(PasswordInput),
  Textarea: withForm<'textarea', TextareaInputProps>(TextareaInput),
  Number: withForm<'number', NumberInputProps>(NumberInput),
  Checkbox: withForm<'checkbox', CheckboxInputProps>(CheckboxInput),
  DateTime: withForm<'datetime-local', DateTimeInputProps>(DateTimeInput),
  Select: withForm<'select', SelectInputProps>(SelectInput),
  File: withForm<'file', FileInputProps>(FileInput),
};
