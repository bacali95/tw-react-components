import { forwardRef } from 'react';

import { cn } from '../../helpers';
import type { BlockProps } from '../Block';
import { Block } from '../Block';

export const Card = forwardRef<HTMLDivElement, BlockProps>(
  ({ children, className, ...blockProps }, ref) => (
    <Block
      className={cn('rounded-lg border p-3 dark:border-slate-700 dark:bg-slate-900', className)}
      {...blockProps}
      ref={ref}
    >
      {children}
    </Block>
  ),
);
