import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button, Card, Dialog, Flex, FormDialog, FormInputs } from 'tw-react-components';

type Login = {
  email: string;
  password: string;
};

export const Dialogs: FC = () => {
  const [openDialogs, setOpenDialogs] = useState<Record<string, boolean>>({});
  const form = useForm<Login>({ defaultValues: {} });

  const toggleDialog = (dialog: string) => () =>
    setOpenDialogs((state) => ({ ...state, [dialog]: !state[dialog] }));

  const handleLogin = (login: Login) => {
    alert(JSON.stringify(login, null, 2));
    toggleDialog('form')();
  };

  return (
    <Flex direction="column">
      <Card fullWidth>
        <Button onClick={toggleDialog('simple')}>Simple dialog</Button>
        <Dialog
          isOpen={openDialogs['simple']}
          title="Simple Dialog"
          onClose={toggleDialog('simple')}
        >
          Your payment has been successfully submitted. We’ve sent you an email with all of the
          details of your order.
        </Dialog>
      </Card>
      <Card fullWidth>
        <Button onClick={toggleDialog('form')}>Form dialog</Button>
        <FormDialog
          title="Form Dialog"
          form={form}
          onSubmit={handleLogin}
          isOpen={openDialogs['form']}
          onClose={toggleDialog('form')}
        >
          <Flex direction="column" fullWidth>
            <FormInputs.Text name="username" label="Username" required />
            <FormInputs.Password name="password" label="Password" required />
          </Flex>
        </FormDialog>
      </Card>
    </Flex>
  );
};
