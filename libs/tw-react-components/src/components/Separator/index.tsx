import * as SeparatorPrimitive from '@radix-ui/react-separator';
import type { ComponentProps, FC } from 'react';

import { cn } from '../../helpers';

export type SeparatorProps = ComponentProps<typeof SeparatorPrimitive.Root> & {
  dataTestId?: string;
};

export const Separator: FC<SeparatorProps> = ({
  className,
  orientation = 'horizontal',
  decorative = true,
  dataTestId = 'separator',
  ...props
}) => (
  <SeparatorPrimitive.Root
    decorative={decorative}
    orientation={orientation}
    className={cn(
      'bg-border shrink-0',
      orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]',
      className,
    )}
    data-testid={dataTestId}
    {...props}
  />
);
Separator.displayName = SeparatorPrimitive.Root.displayName;
