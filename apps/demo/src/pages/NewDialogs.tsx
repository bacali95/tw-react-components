import { FC, useEffect, useId } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { Button, Card, NewDialog as Dialog, Flex, FormInputs } from 'tw-react-components';

import { countriesItems } from '../data';

type Login = {
  email: string;
  password: string;
  country: string;
};

export const NewDialogs: FC = () => {
  const form = useForm<Login>({ defaultValues: {} });
  const id = useId();

  useEffect(() => {
    form.reset();
  }, [form]);

  const handleLogin = (login: Login) => {
    alert(JSON.stringify(login, null, 2));
  };

  return (
    <>
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
      <Card fullWidth>
        <Dialog modal={false}>
          <Dialog.Trigger asChild>
            <Button>Form dialog</Button>
          </Dialog.Trigger>
          <Dialog.Content>
            <FormProvider {...form}>
              <Dialog.Header>
                <Dialog.Title>Form Dialog</Dialog.Title>
              </Dialog.Header>
              <form id={id} onSubmit={form.handleSubmit(handleLogin)}>
                <Flex direction="column" fullWidth>
                  <FormInputs.Text name="username" label="Username" required />
                  <FormInputs.Password name="password" label="Password" required />
                  <FormInputs.Select
                    name="country"
                    label="Country"
                    placeholder="Select country..."
                    items={countriesItems}
                    required
                    clearable
                    search
                  />
                </Flex>
              </form>
              <Dialog.Footer>
                <Dialog.Close asChild>
                  <Button variant="red">Close</Button>
                </Dialog.Close>
                <Button variant="green" form={id} type="submit">
                  Submit
                </Button>
              </Dialog.Footer>
            </FormProvider>
          </Dialog.Content>
        </Dialog>
      </Card>
    </>
  );
};
