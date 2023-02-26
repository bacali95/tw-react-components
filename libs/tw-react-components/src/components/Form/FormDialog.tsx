import { FormProvider, SubmitErrorHandler, SubmitHandler, UseFormReturn } from 'react-hook-form';

import { Button } from '../Button';
import { Dialog, DialogProps } from '../Dialog';
import { Flex } from '../Flex';

export type FormDialogProps<T extends Record<string, any>> = DialogProps & {
  form: UseFormReturn<T>;
  onSubmit: SubmitHandler<T>;
  onInvalid?: SubmitErrorHandler<T>;
  submitLabel?: string;
  cancelLabel?: string;
};

export function FormDialog<T extends Record<string, any>>({
  children,
  form,
  onSubmit,
  onInvalid,
  submitLabel,
  cancelLabel,
  ...props
}: FormDialogProps<T>) {
  return (
    <Dialog {...props}>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit, onInvalid)}>
          <Flex direction="column" fullWidth>
            {children}
            <Flex className="mt-4" justify="end" fullWidth>
              <Button onClick={props.onClose} color="red">
                {cancelLabel ?? 'Cancel'}
              </Button>
              <Button type="submit" color="green" disabled={form.formState.isSubmitting}>
                {submitLabel ?? 'Submit'}
              </Button>
            </Flex>
          </Flex>
        </form>
      </FormProvider>
    </Dialog>
  );
}
