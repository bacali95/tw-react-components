import { ComponentProps, FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Validate } from 'react-hook-form/dist/types/validator';

import { DateTimeInput, DateTimeInputProps, DateTimeInputType } from './custom';
import {
  BasicInputProps,
  CheckboxInput,
  CheckboxInputProps,
  InputType,
  NumberInput,
  NumberInputProps,
  TextInput,
  TextInputProps,
  TextareaInput,
  TextareaInputProps,
} from './primitive';

export type WithFormProps<
  Type extends InputType,
  Props extends Type extends DateTimeInputType
    ? DateTimeInputProps
    : Omit<BasicInputProps<Type>, 'type'>
> = {
  name: string;
  pattern?: RegExp;
  validate?: Type extends 'number' ? Validate<number> : Validate<string>;
  valueAsDate?: boolean;
  valueAsNumber?: boolean;
} & Omit<Props, 'pattern'>;

function withForm<
  Type extends InputType,
  Props extends Type extends DateTimeInputType ? DateTimeInputProps : BasicInputProps<Type>
>(type: Type, Component: FC<Props>): FC<WithFormProps<Type, Props>> {
  return ({ name, pattern, validate, valueAsDate, valueAsNumber, ...props }) => {
    const { control } = useFormContext();

    return (
      <Controller
        name={name}
        control={control}
        rules={{
          value: props.value as any,
          required: props.required,
          min: (props as ComponentProps<'input'>).min,
          max: (props as ComponentProps<'input'>).max,
          minLength: props.minLength,
          maxLength: props.maxLength,
          pattern,
          validate,
        }}
        render={({ field, fieldState }) => (
          <Component
            {...(props as unknown as Props)}
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
  Text: withForm<'text', TextInputProps>('text', TextInput),
  Textarea: withForm<'textarea', TextareaInputProps>('textarea', TextareaInput),
  Number: withForm<'number', NumberInputProps>('number', NumberInput),
  Checkbox: withForm<'checkbox', CheckboxInputProps>('checkbox', CheckboxInput),
  DateTime: withForm<'datetime-local', DateTimeInputProps>('datetime-local', DateTimeInput),
};
