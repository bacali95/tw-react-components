import { ComponentProps, FC, ForwardRefExoticComponent } from 'react';
import { Controller, ControllerRenderProps, useFormContext } from 'react-hook-form';
import { Validate } from 'react-hook-form/dist/types/validator';

import {
  DateTimeInput,
  DateTimeInputProps,
  DateTimeInputType,
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
    : Omit<BasicInputProps<Type>, 'type'>
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
} & Omit<Props, 'pattern' | keyof ControllerRenderProps>;

function withForm<
  Type extends InputType | SelectInputType,
  Props = Type extends DateTimeInputType
    ? DateTimeInputProps
    : Type extends SelectInputType
    ? SelectInputProps
    : BasicInputProps<Type>
>(Component: ForwardRefExoticComponent<Props>): FC<WithFormProps<Type, Props>> {
  return ({ name, pattern, validate, ...props }) => {
    const { control } = useFormContext();

    return (
      <Controller
        name={name}
        control={control}
        rules={{
          required: (props as ComponentProps<'input'>).required,
          min: (props as ComponentProps<'input'>).min,
          max: (props as ComponentProps<'input'>).max,
          minLength: (props as ComponentProps<'input'>).minLength,
          maxLength: (props as ComponentProps<'input'>).maxLength,
          pattern,
          validate,
        }}
        render={({ field, fieldState }) => (
          <Component
            {...(props as Props)}
            {...field}
            value={field.value ?? ''}
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
};
