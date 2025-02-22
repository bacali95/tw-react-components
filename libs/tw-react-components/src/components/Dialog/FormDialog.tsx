import type { PropsWithChildren, ReactNode } from 'react';
import { useId } from 'react';
import type {
  FieldValues,
  SubmitErrorHandler,
  SubmitHandler,
  UseFormReturn,
} from 'react-hook-form';
import { FormProvider } from 'react-hook-form';

import { cn } from '../../helpers';
import { Button } from '../Button';
import { Sheet } from '../Sheet';
import type { Dialog } from './Dialog';

type Props<T extends FieldValues> = {
  className?: string;
  formClassName?: string;
  open: boolean;
  title: ReactNode;
  form: UseFormReturn<T>;
  submitLabel?: string;
  cancelLabel?: string;
  extraAction?: ReactNode;
  as?: typeof Dialog | typeof Sheet;
  onSubmit: SubmitHandler<T>;
  onInvalid?: SubmitErrorHandler<T>;
  onClose: () => void;
};

export const FormDialog = <T extends FieldValues>({
  className,
  formClassName,
  open,
  title,
  form,
  children,
  submitLabel = 'Submit',
  cancelLabel = 'Cancel',
  extraAction,
  as: As = Sheet,
  onSubmit,
  onInvalid,
  onClose,
}: PropsWithChildren<Props<T>>) => {
  const id = useId();

  const handleSubmit: SubmitHandler<T> = async (data, event) => {
    try {
      await onSubmit(data, event);
    } catch {
      // do nothering
    }
  };

  return (
    <As open={open} onOpenChange={(value) => !value && onClose()}>
      <As.Content className={className}>
        <As.Header>
          <As.Title>{title}</As.Title>
        </As.Header>
        <FormProvider {...form}>
          <form
            id={`form-${id}`}
            className={cn('flex h-full w-full flex-col gap-2 overflow-auto', formClassName)}
            onSubmit={form.handleSubmit(handleSubmit, onInvalid)}
          >
            {children}
          </form>
        </FormProvider>
        <As.Footer className="w-full sm:justify-between">
          {extraAction}
          <As.Footer className="ml-auto">
            <As.Close asChild>
              <Button color="red">{cancelLabel}</Button>
            </As.Close>
            <Button
              color="green"
              type="submit"
              form={`form-${id}`}
              disabled={form.formState.isSubmitting}
            >
              {submitLabel}
            </Button>
          </As.Footer>
        </As.Footer>
      </As.Content>
    </As>
  );
};
