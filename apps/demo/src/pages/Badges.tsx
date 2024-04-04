import { ArrowLeftIcon, ArrowRightIcon, HomeIcon } from 'lucide-react';
import { FC } from 'react';

import { Badge, Flex } from 'tw-react-components';

import { colors } from '../colors';

export const Badges: FC = () => (
  <Flex className="gap-2 overflow-auto" direction="column">
    <p className="text-lg">Filled buttons</p>
    <Flex className="gap-2" wrap>
      {colors.map((color) => (
        <Badge key={color} className="capitalize" color={color}>
          {color}
        </Badge>
      ))}
    </Flex>
    <p className="text-lg">Outlined badges</p>
    <Flex className="gap-2" wrap>
      {colors.map((color) => (
        <Badge key={color} className="capitalize" color={color} variant="outlined">
          {color}
        </Badge>
      ))}
    </Flex>
    <p className="text-lg">Disabled badges</p>
    <Flex className="gap-2" wrap>
      {colors.map((color) => (
        <Badge key={color} className="capitalize" color={color} disabled>
          {color}
        </Badge>
      ))}
    </Flex>
    <p className="text-lg">Badges Sizes</p>
    <Flex className="gap-2" wrap>
      {colors.map((color) => (
        <Flex key={color} direction="column">
          <Badge className="capitalize" color={color}>
            {color}
          </Badge>
          <Badge className="capitalize" color={color} size="medium">
            {color}
          </Badge>
        </Flex>
      ))}
    </Flex>
    <p className="text-lg">Rounded Badges</p>
    <Flex className="gap-2" wrap>
      {colors.map((color) => (
        <Flex key={color} direction="column">
          <Badge className="capitalize" color={color} rounded>
            {color}
          </Badge>
          <Badge className="capitalize" color={color} size="medium" rounded>
            {color}
          </Badge>
        </Flex>
      ))}
    </Flex>
    <p className="text-lg">Badges with prefix icons</p>
    <Flex className="gap-2" wrap>
      {colors.map((color) => (
        <Flex key={color} direction="column">
          <Badge className="capitalize" color={color} prefixIcon={ArrowLeftIcon}>
            {color}
          </Badge>
          <Badge className="capitalize" color={color} size="medium" prefixIcon={ArrowLeftIcon}>
            {color}
          </Badge>
        </Flex>
      ))}
    </Flex>
    <p className="text-lg">Badges with suffix icons</p>
    <Flex className="gap-2" wrap>
      {colors.map((color) => (
        <Flex key={color} direction="column">
          <Badge className="capitalize" color={color} suffixIcon={ArrowRightIcon}>
            {color}
          </Badge>
          <Badge className="capitalize" color={color} size="medium" suffixIcon={ArrowRightIcon}>
            {color}
          </Badge>
        </Flex>
      ))}
    </Flex>
    <p className="text-lg">Icon badges</p>
    <Flex className="gap-2" wrap>
      {colors.map((color) => (
        <Flex key={color} direction="column">
          <Badge className="capitalize" color={color} prefixIcon={HomeIcon} />
          <Badge className="capitalize" color={color} size="medium" prefixIcon={HomeIcon} />
        </Flex>
      ))}
    </Flex>
  </Flex>
);
