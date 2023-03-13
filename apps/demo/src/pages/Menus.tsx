import { FC } from 'react';

import { Block, Button, Card, Flex, Menu, MenuItem } from 'tw-react-components';

export const Menus: FC = () => {
  const items: MenuItem[] = [
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
  ];

  return (
    <Block fullHeight fullWidth>
      <Card fullWidth>
        <Flex justify="between">
          <Menu items={items}>
            <Button>Open Menu</Button>
          </Menu>
          <Menu items={items} position="bottom-right">
            <Button>Open Menu 2</Button>
          </Menu>
        </Flex>
      </Card>
    </Block>
  );
};
