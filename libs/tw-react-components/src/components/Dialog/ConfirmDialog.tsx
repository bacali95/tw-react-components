import { FC, PropsWithChildren, ReactNode } from 'react';

import { Button } from '../Button';
import { Dialog } from './Dialog';

type Props = {
  open: boolean;
  title: ReactNode;
  yesLabel?: string;
  noLabel?: string;
  onConfirm: () => void;
  onClose: () => void;
};

export const ConfirmDialog: FC<PropsWithChildren<Props>> = ({
  open,
  title,
  children,
  yesLabel,
  noLabel,
  onConfirm,
  onClose,
}) => (
  <Dialog open={open} onOpenChange={(value) => !value && onClose()}>
    <Dialog.Content onPointerDownOutside={(event) => event.preventDefault()}>
      <Dialog.Header>
        <Dialog.Title>{title}</Dialog.Title>
      </Dialog.Header>
      {children}
      <Dialog.Footer>
        <Dialog.Close asChild>
          <Button color="red">{noLabel ?? 'No'}</Button>
        </Dialog.Close>
        <Dialog.Close asChild>
          <Button color="green" onClick={onConfirm}>
            {yesLabel ?? 'Yes'}
          </Button>
        </Dialog.Close>
      </Dialog.Footer>
    </Dialog.Content>
  </Dialog>
);
