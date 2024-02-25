import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';

import {
  Button,
  ConfirmDialog,
  Dialog,
  Flex,
  FormDialog,
  FormInputs,
  ListSorterDialog,
  PdfViewerDialog,
  Tooltip,
} from 'tw-react-components';

import { countriesItems } from '../data';

type Login = {
  email: string;
  password: string;
  country: string;
};

export const Dialogs: FC = () => {
  const [openDialogs, setOpenDialogs] = useState<Record<string, boolean>>({});
  const form = useForm<Login>({ defaultValues: {} });

  const toggleDialog = (dialog: string) => () =>
    setOpenDialogs((state) => ({ ...state, [dialog]: !state[dialog] }));

  const handleConfirmDialog = (action: string) => () => {
    alert(`${action} clicked!`);
  };

  const handleLogin = (login: Login) => {
    alert(JSON.stringify(login, null, 2));
    toggleDialog('form')();
  };

  const handleSorter = (items: string[]) => {
    alert(JSON.stringify(items, null, 2));
    toggleDialog('sorter')();
  };

  return (
    <>
      <Dialog
        open={openDialogs['simple']}
        onOpenChange={(value) => !value && toggleDialog('simple')()}
      >
        <Dialog.Trigger asChild>
          <Button onClick={toggleDialog('simple')}>Simple dialog</Button>
        </Dialog.Trigger>
        <Dialog.Content>
          <Dialog.Header>Simple Dialog</Dialog.Header>
          <p>
            Your payment has been successfully submitted. We’ve sent you an email with all of the
            details of your{' '}
            <Tooltip className="w-fit" content="Simple Tooltip">
              order.
            </Tooltip>
          </p>
        </Dialog.Content>
      </Dialog>
      <Button onClick={toggleDialog('confirm')}>Confirm dialog</Button>
      <ConfirmDialog
        open={openDialogs['confirm']}
        title="Confirm Dialog"
        onClose={toggleDialog('confirm')}
        onConfirm={handleConfirmDialog('Yes')}
      >
        Are you sure you want to delete this item?
      </ConfirmDialog>
      <Button onClick={toggleDialog('form')}>Form dialog</Button>
      <FormDialog
        title="Form Dialog"
        form={form}
        onSubmit={handleLogin}
        open={openDialogs['form']}
        onClose={toggleDialog('form')}
        extraAction={<Button>Action</Button>}
      >
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
      </FormDialog>
      <Button onClick={toggleDialog('pdf')}>Pdf dialog</Button>
      <PdfViewerDialog
        title="Pdf Dialog"
        url="https://www.orimi.com/pdf-test.pdf"
        open={openDialogs['pdf']}
        onClose={toggleDialog('pdf')}
      />
      <Button onClick={toggleDialog('sorter')}>Sorter dialog</Button>
      <ListSorterDialog
        title="Sorter Dialog"
        open={openDialogs['sorter']}
        items={['one', 'two', 'three']}
        renderer={(item) => item}
        idResolver={(item) => item}
        onSubmit={handleSorter}
        onClose={toggleDialog('sorter')}
      />
    </>
  );
};
