import { FC } from 'react';

import { Button } from '../Button';
import { Flex } from '../Flex';
import { Dialog, DialogProps } from './Dialog';

export type ConfirmDialogProps = DialogProps & {
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
  <Dialog {...props}>
    <Flex direction="column" fullWidth>
      {children}
      <Flex className="mt-4" justify="end" fullWidth>
        <Button color="red" onClick={props.onClose}>
          {noLabel ?? 'No'}
        </Button>
        <Button color="green" onClick={onConfirm}>
          {yesLabel ?? 'Yes'}
        </Button>
      </Flex>
    </Flex>
  </Dialog>
);
