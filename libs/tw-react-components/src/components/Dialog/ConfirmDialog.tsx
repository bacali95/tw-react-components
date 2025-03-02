import type { FC, PropsWithChildren, ReactNode } from 'react';

import { Button } from '../Button';
import { Dialog } from './Dialog';

type Props = {
  open: boolean;
  title: ReactNode;
  yesLabel?: string;
  noLabel?: string;
  onConfirm: () => void;
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
}) => (
  <Dialog open={open} onOpenChange={(value) => !value && onClose()}>
    <Dialog.Content dataTestId={`${dataTestId}-content`}>
      <Dialog.Header dataTestId={`${dataTestId}-header`}>
        <Dialog.Title dataTestId={`${dataTestId}-title`}>{title}</Dialog.Title>
      </Dialog.Header>
      {children}
      <Dialog.Footer dataTestId={`${dataTestId}-footer`}>
        <Dialog.Close asChild>
          <Button color="red" data-testid={`${dataTestId}-no-button`}>
            {noLabel ?? 'No'}
          </Button>
        </Dialog.Close>
        <Dialog.Close asChild>
          <Button color="green" onClick={onConfirm} data-testid={`${dataTestId}-yes-button`}>
            {yesLabel ?? 'Yes'}
          </Button>
        </Dialog.Close>
      </Dialog.Footer>
    </Dialog.Content>
  </Dialog>
);
