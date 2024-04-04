import { forwardRef } from 'react';

import { cn } from '../../helpers';
import { Block, BlockProps } from '../Block';

export const Card = forwardRef<HTMLDivElement, BlockProps>(
  ({ children, className, ...blockProps }, ref) => (
    <Block
      className={cn('rounded-lg border p-3 dark:border-slate-700/80 dark:bg-slate-800', className)}
      {...blockProps}
      ref={ref}
    >
      {children}
    </Block>
  ),
);
