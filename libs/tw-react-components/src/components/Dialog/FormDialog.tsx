import { ReactNode } from 'react';
import { FormProvider, SubmitErrorHandler, SubmitHandler, UseFormReturn } from 'react-hook-form';

import { Button } from '../Button';
import { Flex } from '../Flex';
import { Dialog, DialogProps } from './Dialog';

export type FormDialogProps<T extends Record<string, any>> = DialogProps & {
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
  return (
    <Dialog {...props}>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit, onInvalid)}>
          <Flex direction="column" fullWidth>
            {children}
            <Flex className="mt-4" justify="between" fullWidth>
              {extraAction}
              <Flex justify="end" fullWidth>
                <Button onClick={props.onClose} color="red">
                  {cancelLabel ?? 'Cancel'}
                </Button>
                <Button type="submit" color="green" disabled={form.formState.isSubmitting}>
                  {submitLabel ?? 'Submit'}
                </Button>
              </Flex>
            </Flex>
          </Flex>
        </form>
      </FormProvider>
    </Dialog>
  );
}
