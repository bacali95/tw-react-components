import { ReactNode, useId } from 'react';
import { FormProvider, SubmitErrorHandler, SubmitHandler, UseFormReturn } from 'react-hook-form';

import { Button } from '../Button';
import { Flex } from '../Flex';
import { Dialog, DialogProps } from './Dialog';

export type FormDialogProps<T extends Record<string, any>> = Omit<DialogProps, 'footer'> & {
  form: UseFormReturn<T>;
  onSubmit: SubmitHandler<T>;
  onInvalid?: SubmitErrorHandler<T>;
  submitLabel?: string;
  cancelLabel?: string;
  extraAction?: ReactNode;
};

export function FormDialog<T extends Record<string, any>>({
  children,
  form,
  onSubmit,
  onInvalid,
  submitLabel,
  cancelLabel,
  extraAction,
  ...props
}: FormDialogProps<T>) {
  const id = useId();

  return (
    <Dialog
      {...props}
      footer={
        <Flex justify="between" fullWidth>
          {extraAction}
          <Flex justify="end" fullWidth>
            <Button onClick={props.onClose} color="red">
              {cancelLabel ?? 'Cancel'}
            </Button>
            <Button
              type="submit"
              form={`form-${id}`}
              color="green"
              disabled={form.formState.isSubmitting}
            >
              {submitLabel ?? 'Submit'}
            </Button>
          </Flex>
        </Flex>
      }
    >
      <FormProvider {...form}>
        <form id={`form-${id}`} onSubmit={form.handleSubmit(onSubmit, onInvalid)} {...props}>
          {children}
        </form>
      </FormProvider>
    </Dialog>
  );
}
