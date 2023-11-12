import { FC } from 'react';

import { Button, Card, NewDialog as Dialog } from 'tw-react-components';

export const NewDialogs: FC = () => {
  return (
    <Card fullWidth>
      <Dialog>
        <Dialog.Trigger asChild>
          <Button>Simple dialog</Button>
        </Dialog.Trigger>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>Simple Dialog</Dialog.Title>
            <Dialog.Description>Simple Description</Dialog.Description>
          </Dialog.Header>
          <p>
            Your payment has been successfully submitted. We’ve sent you an email with all of the
            details of your order.
          </p>
        </Dialog.Content>
      </Dialog>
    </Card>
  );
};
