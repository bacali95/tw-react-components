import type { FC } from 'react';

import { cn } from '../../helpers';
import type { BlockProps } from '../Block';
import { Block } from '../Block';

type Direction = 'row' | 'column';

const directionClasses: Record<Direction, Record<'normal' | 'reverse', string>> = {
  row: {
    normal: 'flex-row',
    reverse: 'flex-row-reverse',
  },
  column: {
    normal: 'flex-col',
    reverse: 'flex-col-reverse',
  },
};

type Position = 'start' | 'center' | 'end';

const alignClasses: Record<Position, string> = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
};

const justifyClasses: Record<Position | 'between', string> = {
  start: 'justify-start',
  center: 'justify-center',
  between: 'justify-between',
  end: 'justify-end',
};

export type FlexProps = BlockProps & {
  reverse?: boolean;
  wrap?: boolean;
  direction?: Direction;
  align?: Position;
  justify?: Position | 'between';
};

export const Flex: FC<FlexProps> = ({
  children,
  className,
  reverse,
  wrap,
  direction = 'row',
  align = 'start',
  justify = 'start',
  dataTestId = 'flex',
  ...blockProps
}) => (
  <Block
    className={cn(
      'flex gap-2',
      wrap && 'flex-wrap',
      directionClasses[direction][reverse ? 'reverse' : 'normal'],
      alignClasses[align],
      justifyClasses[justify],
      className,
    )}
    dataTestId={dataTestId}
    {...blockProps}
  >
    {children}
  </Block>
);
