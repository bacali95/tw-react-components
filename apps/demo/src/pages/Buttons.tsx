import { ArrowLeftIcon, ArrowRightIcon, HomeIcon } from 'lucide-react';
import { type FC, Fragment } from 'react';

import { Button, Flex } from 'tw-react-components';

import { colors } from '../colors';

export const Buttons: FC = () => (
  <Flex className="gap-2 overflow-auto" direction="column">
    <p className="text-lg">Loading buttons</p>
    <Flex className="gap-2" align="center" wrap>
      {(['small', 'medium'] as const).map((size) => (
        <Fragment key={size}>
          <Button className="capitalize" loading size={size}>
            Loading
          </Button>
          <Button className="capitalize" prefixIcon={HomeIcon} loading size={size}>
            Loading prefix icon
          </Button>
          <Button prefixIcon={HomeIcon} loading size={size} />
        </Fragment>
      ))}
    </Flex>
    <p className="text-lg">Filled buttons</p>
    <Flex className="gap-2" wrap>
      {colors.map((color) => (
        <Button key={color} className="capitalize" color={color}>
          {color}
        </Button>
      ))}
    </Flex>
    <p className="text-lg">Outlined buttons</p>
    <Flex className="gap-2" wrap>
      {colors.map((color) => (
        <Button key={color} className="capitalize" color={color} variant="outlined">
          {color}
        </Button>
      ))}
    </Flex>
    <p className="text-lg">Text buttons</p>
    <Flex className="gap-2" wrap>
      {colors.map((color) => (
        <Button key={color} className="capitalize" color={color} variant="text">
          {color}
        </Button>
      ))}
    </Flex>
    <p className="text-lg">Disabled buttons</p>
    <Flex className="gap-2" wrap>
      {colors.map((color) => (
        <Button key={color} className="capitalize" color={color} disabled>
          {color}
        </Button>
      ))}
    </Flex>
    <p className="text-lg">Buttons Sizes</p>
    <Flex className="gap-2" wrap>
      {colors.map((color) => (
        <Flex key={color} direction="column">
          <Button className="capitalize" color={color} size="small">
            {color}
          </Button>
          <Button className="capitalize" color={color}>
            {color}
          </Button>
        </Flex>
      ))}
    </Flex>
    <p className="text-lg">Rounded Buttons</p>
    <Flex className="gap-2" wrap>
      {colors.map((color) => (
        <Flex key={color} direction="column">
          <Button className="capitalize" color={color} size="small" rounded>
            {color}
          </Button>
          <Button className="capitalize" color={color} rounded>
            {color}
          </Button>
        </Flex>
      ))}
    </Flex>
    <p className="text-lg">Buttons with prefix icons</p>
    <Flex className="gap-2" wrap>
      {colors.map((color) => (
        <Flex key={color} direction="column">
          <Button className="capitalize" color={color} size="small" prefixIcon={ArrowLeftIcon}>
            {color}
          </Button>
          <Button className="capitalize" color={color} prefixIcon={ArrowLeftIcon}>
            {color}
          </Button>
        </Flex>
      ))}
    </Flex>
    <p className="text-lg">Buttons with suffix icons</p>
    <Flex className="gap-2" wrap>
      {colors.map((color) => (
        <Flex key={color} direction="column">
          <Button className="capitalize" color={color} size="small" suffixIcon={ArrowRightIcon}>
            {color}
          </Button>
          <Button className="capitalize" color={color} suffixIcon={ArrowRightIcon}>
            {color}
          </Button>
        </Flex>
      ))}
    </Flex>
    <p className="text-lg">Icon buttons</p>
    <Flex className="gap-2" wrap>
      {colors.map((color) => (
        <Flex key={color} direction="column">
          <Button color={color} size="small" prefixIcon={HomeIcon} />
          <Button color={color} prefixIcon={HomeIcon} />
        </Flex>
      ))}
    </Flex>
  </Flex>
);
