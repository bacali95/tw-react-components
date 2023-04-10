import { ArrowLeftIcon, ArrowRightIcon, XIcon } from 'lucide-react';
import { FC } from 'react';

import { Button, Card, Flex } from 'tw-react-components';

export const Buttons: FC = () => (
  <Card className="overflow-auto" fullWidth>
    <Flex className="gap-2" direction="column">
      <p className="text-lg">Simple buttons</p>
      <Flex className="!gap-2">
        <Button>Primary</Button>
        <Button color="green">Green</Button>
        <Button color="yellow">Yellow</Button>
        <Button color="red">Red</Button>
      </Flex>
      <p className="text-lg">Transparent buttons</p>
      <Flex className="!gap-2">
        <Button transparent>Primary</Button>
        <Button transparent color="green">
          Green
        </Button>
        <Button transparent color="yellow">
          Yellow
        </Button>
        <Button transparent color="red">
          Red
        </Button>
      </Flex>
      <p className="text-lg">Disabled buttons</p>
      <Flex className="!gap-2">
        <Button disabled>Primary</Button>
        <Button color="green" disabled>
          Green
        </Button>
        <Button color="yellow" disabled>
          Yellow
        </Button>
        <Button color="red" disabled>
          Red
        </Button>
      </Flex>
      <p className="text-lg">Buttons Sizes</p>
      <Flex className="!gap-2" align="end">
        <Button size="small">Small</Button>
        <Button size="medium">Medium</Button>
        <Button size="large">Big</Button>
        <Button size="small" color="green" prefixIcon={ArrowLeftIcon}>
          Small
        </Button>
        <Button size="medium" color="green" prefixIcon={ArrowLeftIcon}>
          Medium
        </Button>
        <Button size="large" color="green" prefixIcon={ArrowLeftIcon}>
          Big
        </Button>
        <Button size="small" color="yellow" prefixIcon={XIcon} />
        <Button size="medium" color="yellow" prefixIcon={XIcon} />
        <Button size="large" color="yellow" prefixIcon={XIcon} />
      </Flex>
      <p className="text-lg">Buttons with prefix icons</p>
      <Flex className="!gap-2">
        <Button prefixIcon={ArrowLeftIcon}>Primary</Button>
        <Button prefixIcon={ArrowLeftIcon} color="green">
          Green
        </Button>
        <Button prefixIcon={ArrowLeftIcon} color="yellow">
          Yellow
        </Button>
        <Button prefixIcon={ArrowLeftIcon} color="red">
          Red
        </Button>
      </Flex>
      <p className="text-lg">Buttons with suffix icons</p>
      <Flex className="!gap-2">
        <Button suffixIcon={ArrowRightIcon}>Primary</Button>
        <Button suffixIcon={ArrowRightIcon} color="green">
          Green
        </Button>
        <Button suffixIcon={ArrowRightIcon} color="yellow">
          Yellow
        </Button>
        <Button suffixIcon={ArrowRightIcon} color="red">
          Red
        </Button>
      </Flex>
      <p className="text-lg">Icon buttons</p>
      <Flex className="!gap-2">
        <Button prefixIcon={XIcon} />
        <Button prefixIcon={XIcon} color="green" />
        <Button prefixIcon={XIcon} color="yellow" />
        <Button prefixIcon={XIcon} color="red" />
      </Flex>
    </Flex>
  </Card>
);
