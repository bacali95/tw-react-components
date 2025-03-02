import type { ComponentProps, FC } from 'react';

import { cn } from '../../helpers';

export type BlockProps = ComponentProps<'div'> & {
  className?: string;
  centered?: boolean;
  container?: boolean;
  fullWidth?: boolean;
  fullHeight?: boolean;
  dataTestId?: string;
};

export const Block: FC<BlockProps> = ({
  children,
  className,
  centered,
  container,
  fullWidth,
  fullHeight,
  dataTestId = 'block',
  ...props
}) => (
  <div
    data-testid={dataTestId}
    className={cn(
      centered && 'mx-auto',
      container && 'container',
      fullWidth && 'w-full',
      fullHeight && 'h-full',
      className,
    )}
    {...props}
  >
    {children}
  </div>
);
