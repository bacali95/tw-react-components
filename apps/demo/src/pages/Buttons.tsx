import { ArrowLeftIcon, ArrowRightIcon, HomeIcon } from 'lucide-react';
import { FC } from 'react';

import { Button, Flex } from 'tw-react-components';

import { colors } from '../colors';

const mockOnClick = () => void 0;

export const Buttons: FC = () => (
  <Flex className="gap-2 overflow-auto" direction="column">
    <p className="text-lg">Filled buttons</p>
    <Flex className="gap-2" wrap>
      {colors.map((color) => (
        <Button key={color} className="capitalize" color={color} onClick={mockOnClick}>
          {color}
        </Button>
      ))}
    </Flex>
    <p className="text-lg">Outlined buttons</p>
    <Flex className="gap-2" wrap>
      {colors.map((color) => (
        <Button
          key={color}
          className="capitalize"
          color={color}
          variant="outlined"
          onClick={mockOnClick}
        >
          {color}
        </Button>
      ))}
    </Flex>
    <p className="text-lg">Text buttons</p>
    <Flex className="gap-2" wrap>
      {colors.map((color) => (
        <Button
          key={color}
          className="capitalize"
          color={color}
          variant="text"
          onClick={mockOnClick}
        >
          {color}
        </Button>
      ))}
    </Flex>
    <p className="text-lg">Disabled buttons</p>
    <Flex className="gap-2" wrap>
      {colors.map((color) => (
        <Button key={color} className="capitalize" color={color} disabled onClick={mockOnClick}>
          {color}
        </Button>
      ))}
    </Flex>
    <p className="text-lg">Buttons Sizes</p>
    <Flex className="gap-2" wrap>
      {colors.map((color) => (
        <Flex key={color} direction="column">
          <Button className="capitalize" color={color} size="small" onClick={mockOnClick}>
            {color}
          </Button>
          <Button className="capitalize" color={color} onClick={mockOnClick}>
            {color}
          </Button>
        </Flex>
      ))}
    </Flex>
    <p className="text-lg">Rounded Buttons</p>
    <Flex className="gap-2" wrap>
      {colors.map((color) => (
        <Flex key={color} direction="column">
          <Button className="capitalize" color={color} size="small" rounded onClick={mockOnClick}>
            {color}
          </Button>
          <Button className="capitalize" color={color} rounded onClick={mockOnClick}>
            {color}
          </Button>
        </Flex>
      ))}
    </Flex>
    <p className="text-lg">Buttons with prefix icons</p>
    <Flex className="gap-2" wrap>
      {colors.map((color) => (
        <Flex key={color} direction="column">
          <Button
            className="capitalize"
            color={color}
            size="small"
            prefixIcon={ArrowLeftIcon}
            onClick={mockOnClick}
          >
            {color}
          </Button>
          <Button
            className="capitalize"
            color={color}
            prefixIcon={ArrowLeftIcon}
            onClick={mockOnClick}
          >
            {color}
          </Button>
        </Flex>
      ))}
    </Flex>
    <p className="text-lg">Buttons with suffix icons</p>
    <Flex className="gap-2" wrap>
      {colors.map((color) => (
        <Flex key={color} direction="column">
          <Button
            className="capitalize"
            color={color}
            size="small"
            suffixIcon={ArrowRightIcon}
            onClick={mockOnClick}
          >
            {color}
          </Button>
          <Button
            className="capitalize"
            color={color}
            suffixIcon={ArrowRightIcon}
            onClick={mockOnClick}
          >
            {color}
          </Button>
        </Flex>
      ))}
    </Flex>
    <p className="text-lg">Icon buttons</p>
    <Flex className="gap-2" wrap>
      {colors.map((color) => (
        <Flex key={color} direction="column">
          <Button
            className="capitalize"
            color={color}
            size="small"
            prefixIcon={HomeIcon}
            onClick={mockOnClick}
          />
          <Button
            className="capitalize"
            color={color}
            prefixIcon={HomeIcon}
            onClick={mockOnClick}
          />
        </Flex>
      ))}
    </Flex>
  </Flex>
);
