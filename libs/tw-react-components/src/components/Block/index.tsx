import type { ComponentProps, PropsWithoutRef } from 'react';
import { forwardRef } from 'react';

import { cn } from '../../helpers';

export type BlockProps = PropsWithoutRef<
  ComponentProps<'div'> & {
    className?: string;
    centered?: boolean;
    container?: boolean;
    fullWidth?: boolean;
    fullHeight?: boolean;
  }
>;

export const Block = forwardRef<HTMLDivElement, BlockProps>(
  ({ children, className, centered, container, fullWidth, fullHeight, ...props }, ref) => (
    <div
      className={cn(
        centered && 'mx-auto',
        container && 'container',
        fullWidth && 'w-full',
        fullHeight && 'h-full',
        className,
      )}
      {...props}
      ref={ref}
    >
      {children}
    </div>
  ),
);
