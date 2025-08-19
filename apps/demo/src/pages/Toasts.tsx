import type { FC } from 'react';

import { Button, Toast, type ToasterToast, useToast } from 'tw-react-components';

export const Toasts: FC = () => {
  const { toast } = useToast();

  return <Button onClick={() => toast(getRandomToast())}>Show toast</Button>;
};

function getRandomToast() {
  const toasts: Omit<ToasterToast, 'id'>[] = [
    {
      variant: 'default',
      title: 'Default',
      description: 'Default description',
      action: <Toast.Action altText="Action">Action</Toast.Action>,
    },
    {
      variant: 'success',
      title: 'Success',
      description: 'Success description',
      action: <Toast.Action altText="Action">Action</Toast.Action>,
    },
    {
      variant: 'destructive',
      title: 'Destructive',
      description: 'Destructive description',
      action: <Toast.Action altText="Action">Action</Toast.Action>,
    },
  ];
  const random = Math.floor(Math.random() * toasts.length);

  return toasts[random];
}
