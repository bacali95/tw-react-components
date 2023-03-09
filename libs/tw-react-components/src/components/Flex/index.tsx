import classNames from 'classnames';
import { forwardRef } from 'react';

import { Block, BlockProps } from '../Block';

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

type Props = BlockProps & {
  reverse?: boolean;
  wrap?: boolean;
  direction?: Direction;
  align?: Position;
  justify?: Position | 'between';
};

export const Flex = forwardRef<HTMLDivElement, Props>(
  (
    {
      children,
      className,
      reverse,
      wrap,
      direction = 'row',
      align = 'start',
      justify = 'start',
      ...blockProps
    },
    ref
  ) => (
    <Block
      className={classNames(
        className,
        'flex gap-3',
        wrap && 'flex-wrap',
        directionClasses[direction][reverse ? 'reverse' : 'normal'],
        alignClasses[align],
        justifyClasses[justify]
      )}
      {...blockProps}
      ref={ref}
    >
      {children}
    </Block>
  )
);
