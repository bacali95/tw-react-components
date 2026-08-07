import type { FC } from 'react';

import { Flex, Switch } from 'tw-react-components';

export const Switches: FC = () => {
  return (
    <Flex direction="column">
      <Flex align="center">
        <Switch size="sm" /> <span>Small Switch</span>
      </Flex>
      <Flex align="center">
        <Switch /> <span>Default Switch</span>
      </Flex>
    </Flex>
  );
};
