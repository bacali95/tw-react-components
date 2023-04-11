import { ArrowLeftIcon, ArrowRightIcon, Trash2Icon, XIcon } from 'lucide-react';
import { FC } from 'react';

import { Button, Card, Flex } from 'tw-react-components';

export const Buttons: FC = () => (
  <>
    <Card className="overflow-auto" fullWidth>
      <Flex className="gap-2" direction="column">
        <p className="text-lg">Simple buttons</p>
        <Flex className="!gap-2">
          <Button>Primary</Button>
          <Button variant="green">Green</Button>
          <Button variant="yellow">Yellow</Button>
          <Button variant="red">Red</Button>
        </Flex>
        <p className="text-lg">Transparent buttons</p>
        <Flex className="!gap-2">
          <Button transparent>Primary</Button>
          <Button transparent variant="green">
            Green
          </Button>
          <Button transparent variant="yellow">
            Yellow
          </Button>
          <Button transparent variant="red">
            Red
          </Button>
        </Flex>
        <p className="text-lg">Disabled buttons</p>
        <Flex className="!gap-2">
          <Button disabled>Primary</Button>
          <Button variant="green" disabled>
            Green
          </Button>
          <Button variant="yellow" disabled>
            Yellow
          </Button>
          <Button variant="red" disabled>
            Red
          </Button>
        </Flex>
        <p className="text-lg">Buttons Sizes</p>
        <Flex className="!gap-2" align="end">
          <Button size="small">Small</Button>
          <Button size="medium">Medium</Button>
          <Button size="large">Big</Button>
          <Button size="small" variant="green" prefixIcon={ArrowLeftIcon}>
            Small
          </Button>
          <Button size="medium" variant="green" prefixIcon={ArrowLeftIcon}>
            Medium
          </Button>
          <Button size="large" variant="green" prefixIcon={ArrowLeftIcon}>
            Big
          </Button>
          <Button size="small" variant="yellow" prefixIcon={XIcon} />
          <Button size="medium" variant="yellow" prefixIcon={XIcon} />
          <Button size="large" variant="yellow" prefixIcon={XIcon} />
        </Flex>
        <p className="text-lg">Rounded Buttons</p>
        <Flex className="!gap-2" align="end">
          <Button size="small" rounded>
            Small
          </Button>
          <Button size="medium" rounded>
            Medium
          </Button>
          <Button size="large" rounded>
            Big
          </Button>
          <Button size="small" rounded variant="green" prefixIcon={ArrowLeftIcon}>
            Small
          </Button>
          <Button size="medium" rounded variant="green" prefixIcon={ArrowLeftIcon}>
            Medium
          </Button>
          <Button size="large" rounded variant="green" prefixIcon={ArrowLeftIcon}>
            Big
          </Button>
          <Button size="small" rounded variant="yellow" prefixIcon={Trash2Icon} />
          <Button size="medium" rounded variant="yellow" prefixIcon={Trash2Icon} />
          <Button size="large" rounded variant="yellow" prefixIcon={Trash2Icon} />
        </Flex>
        <p className="text-lg">Buttons with prefix icons</p>
        <Flex className="!gap-2">
          <Button prefixIcon={ArrowLeftIcon}>Primary</Button>
          <Button prefixIcon={ArrowLeftIcon} variant="green">
            Green
          </Button>
          <Button prefixIcon={ArrowLeftIcon} variant="yellow">
            Yellow
          </Button>
          <Button prefixIcon={ArrowLeftIcon} variant="red">
            Red
          </Button>
        </Flex>
        <p className="text-lg">Buttons with suffix icons</p>
        <Flex className="!gap-2">
          <Button suffixIcon={ArrowRightIcon}>Primary</Button>
          <Button suffixIcon={ArrowRightIcon} variant="green">
            Green
          </Button>
          <Button suffixIcon={ArrowRightIcon} variant="yellow">
            Yellow
          </Button>
          <Button suffixIcon={ArrowRightIcon} variant="red">
            Red
          </Button>
        </Flex>
        <p className="text-lg">Icon buttons</p>
        <Flex className="!gap-2">
          <Button prefixIcon={XIcon} />
          <Button prefixIcon={XIcon} variant="green" />
          <Button prefixIcon={XIcon} variant="yellow" />
          <Button prefixIcon={XIcon} variant="red" />
        </Flex>
      </Flex>
    </Card>
    <Button variant="inverse">Inverse</Button>
  </>
);
