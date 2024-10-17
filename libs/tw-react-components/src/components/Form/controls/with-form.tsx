import { ComponentProps, ForwardRefExoticComponent, forwardRef } from 'react';
import { Controller, ControllerRenderProps, Validate, useFormContext } from 'react-hook-form';

import { mergeRefs } from '../../../helpers';
import {
  DateTimeInput,
  DateTimeInputProps,
  DateTimeInputType,
  FileInput,
  FileInputProps,
  SelectInput,
  SelectInputProps,
  SelectInputType,
} from './custom';
import {
  BasicInputProps,
  CheckboxInput,
  CheckboxInputProps,
  EmailInput,
  EmailInputProps,
  InputType,
  NumberInput,
  NumberInputProps,
  PasswordInput,
  PasswordInputProps,
  TextInput,
  TextInputProps,
  TextareaInput,
  TextareaInputProps,
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
} & Omit<Props, 'pattern' | keyof Omit<ControllerRenderProps, 'disabled'>>;

function withForm<
  Type extends InputType | SelectInputType,
  HtmlElement extends HTMLInputElement | HTMLTextAreaElement | HTMLDivElement,
  Props = Type extends DateTimeInputType
    ? DateTimeInputProps
    : Type extends SelectInputType
      ? SelectInputProps
      : BasicInputProps<Type>,
>(Component: ForwardRefExoticComponent<Props>) {
  return forwardRef<HtmlElement, WithFormProps<Type, Props>>((props, ref) => {
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
            ref={mergeRefs([ref, field.ref])}
          />
        )}
      />
    );
  });
}

export const FormInputs = {
  Text: withForm<'text', HTMLInputElement, TextInputProps>(TextInput),
  Email: withForm<'email', HTMLInputElement, EmailInputProps>(EmailInput),
  Password: withForm<'password', HTMLInputElement, PasswordInputProps>(PasswordInput),
  Textarea: withForm<'textarea', HTMLTextAreaElement, TextareaInputProps>(TextareaInput),
  Number: withForm<'number', HTMLInputElement, NumberInputProps>(NumberInput),
  Checkbox: withForm<'checkbox', HTMLInputElement, CheckboxInputProps>(CheckboxInput),
  DateTime: withForm<'datetime-local', HTMLDivElement, DateTimeInputProps>(DateTimeInput),
  Select: withForm<'select', HTMLInputElement, SelectInputProps>(SelectInput),
  File: withForm<'file', HTMLInputElement, FileInputProps>(FileInput),
};
