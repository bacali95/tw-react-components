import { type FC } from 'react';

import { cn } from '../../helpers';
import type { BlockProps } from '../Block';
import { Block } from '../Block';

export const Card: FC<BlockProps> = ({
  children,
  className,
  dataTestId = 'card',
  ...blockProps
}) => (
  <Block
    className={cn('rounded-lg border p-2 dark:border-slate-700 dark:bg-slate-900', className)}
    dataTestId={dataTestId}
    {...blockProps}
  >
    {children}
  </Block>
);
