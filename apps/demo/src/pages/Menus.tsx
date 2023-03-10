import { FC } from 'react';

import { Button, Card, Menu } from 'tw-react-components';

export const Menus: FC = () => (
  <Card className="overflow-auto" fullHeight fullWidth>
    <Menu
      items={[
        {
          label: 'One',
          onClick: () => alert('One!'),
        },
        {
          label: 'Two',
          onClick: () => alert('Two!'),
        },
        {
          type: 'separator',
        },
        {
          type: 'nested',
          children: 'Nested',
          items: [
            {
              label: 'One',
              onClick: () => alert('One!'),
            },
            {
              label: 'Two',
              onClick: () => alert('Two!'),
            },
          ],
        },
      ]}
    >
      <Button>Open Menu</Button>
    </Menu>
  </Card>
);
