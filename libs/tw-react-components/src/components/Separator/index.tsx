import * as SeparatorPrimitive from '@radix-ui/react-separator';
import type { ComponentProps, FC } from 'react';

import { cn } from '../../helpers';

export const Separator: FC<ComponentProps<typeof SeparatorPrimitive.Root>> = ({
  className,
  orientation = 'horizontal',
  decorative = true,
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
    {...props}
  />
);
Separator.displayName = SeparatorPrimitive.Root.displayName;
