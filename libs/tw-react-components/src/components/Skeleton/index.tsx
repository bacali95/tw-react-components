import type { FC, HTMLAttributes } from 'react';

import { cn } from '../../helpers';

export const Skeleton: FC<HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => (
  <div className={cn('bg-muted animate-pulse rounded-md', className)} {...props} />
);
Skeleton.displayName = 'Skeleton';
