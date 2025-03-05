import type { FC, HTMLAttributes } from 'react';

import { cn } from '../../helpers';

export type SkeletonProps = HTMLAttributes<HTMLDivElement> & {
  dataTestId?: string;
};

export const Skeleton: FC<SkeletonProps> = ({ className, dataTestId = 'skeleton', ...props }) => (
  <div
    className={cn('bg-muted animate-pulse rounded-md', className)}
    data-testid={dataTestId}
    {...props}
  />
);
Skeleton.displayName = 'Skeleton';
