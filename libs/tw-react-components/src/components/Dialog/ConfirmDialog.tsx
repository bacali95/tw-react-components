import { FC } from 'react';

import { Button } from '../Button';
import { Flex } from '../Flex';
import { Dialog, DialogProps } from './Dialog';

export type ConfirmDialogProps = Omit<DialogProps, 'footer'> & {
  yesLabel?: string;
  noLabel?: string;
  onConfirm: () => void;
};

export const ConfirmDialog: FC<ConfirmDialogProps> = ({
  children,
  yesLabel,
  noLabel,
  onConfirm,
  ...props
}) => (
  <Dialog
    {...props}
    footer={
      <Flex justify="end" fullWidth>
        <Button variant="red" onClick={props.onClose}>
          {noLabel ?? 'No'}
        </Button>
        <Button
          variant="green"
          onClick={() => {
            onConfirm();
            props.onClose();
          }}
        >
          {yesLabel ?? 'Yes'}
        </Button>
      </Flex>
    }
  >
    {children}
  </Dialog>
);
