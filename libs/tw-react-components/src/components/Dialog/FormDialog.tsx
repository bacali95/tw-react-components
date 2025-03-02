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
  dataTestId?: string;
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
  dataTestId = 'form-dialog',
}: PropsWithChildren<Props<T>>) => {
  const id = useId();

  return (
    <As open={open} onOpenChange={(value) => !value && onClose()}>
      <As.Content className={className} dataTestId={`${dataTestId}-content`}>
        <As.Header dataTestId={`${dataTestId}-header`}>
          <As.Title dataTestId={`${dataTestId}-title`}>{title}</As.Title>
        </As.Header>
        <FormProvider {...form}>
          <form
            id={`form-${id}`}
            className={cn('flex h-full w-full flex-col gap-2 overflow-auto', formClassName)}
            onSubmit={form.handleSubmit(onSubmit, onInvalid)}
            data-testid={`${dataTestId}-form`}
          >
            {children}
          </form>
        </FormProvider>
        <As.Footer className="w-full sm:justify-between" dataTestId={`${dataTestId}-footer`}>
          {extraAction}
          <As.Footer className="ml-auto" dataTestId={`${dataTestId}-actions`}>
            <As.Close asChild>
              <Button color="red" dataTestId={`${dataTestId}-cancel-button`}>
                {cancelLabel}
              </Button>
            </As.Close>
            <Button
              color="green"
              type="submit"
              form={`form-${id}`}
              disabled={form.formState.isSubmitting}
              dataTestId={`${dataTestId}-submit-button`}
            >
              {submitLabel}
            </Button>
          </As.Footer>
        </As.Footer>
      </As.Content>
    </As>
  );
};
