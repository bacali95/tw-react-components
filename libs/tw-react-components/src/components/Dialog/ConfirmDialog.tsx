import { type FC, type PropsWithChildren, type ReactNode, useState } from 'react';

import { useToast } from '../../hooks';
import { Button } from '../Button';
import { Dialog } from './Dialog';

type Props = {
  open: boolean;
  title: ReactNode;
  yesLabel?: string;
  noLabel?: string;
  onConfirm: () => void | Promise<void>;
  onClose: () => void;
  dataTestId?: string;
};

export const ConfirmDialog: FC<PropsWithChildren<Props>> = ({
  open,
  title,
  children,
  yesLabel,
  noLabel,
  onConfirm,
  onClose,
  dataTestId = 'confirm-dialog',
}) => {
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await onConfirm();
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error instanceof Error ? error.message : 'Something went wrong',
      });
    } finally {
      setLoading(false);
    }

    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(value) => !value && onClose()}>
      <Dialog.Content dataTestId={`${dataTestId}-content`}>
        <Dialog.Header dataTestId={`${dataTestId}-header`}>
          <Dialog.Title dataTestId={`${dataTestId}-title`}>{title}</Dialog.Title>
        </Dialog.Header>
        {children}
        <Dialog.Footer dataTestId={`${dataTestId}-footer`}>
          <Dialog.Close asChild>
            <Button color="red" disabled={loading} data-testid={`${dataTestId}-no-button`}>
              {noLabel ?? 'No'}
            </Button>
          </Dialog.Close>
          <Button
            color="green"
            loading={loading}
            onClick={handleConfirm}
            data-testid={`${dataTestId}-yes-button`}
          >
            {yesLabel ?? 'Yes'}
          </Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  );
};
