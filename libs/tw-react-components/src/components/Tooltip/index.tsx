import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { FC, PropsWithChildren, ReactNode } from 'react';

import { cn } from '../../helpers';

export type TooltipProps = PropsWithChildren<{
  className?: string;
  content: ReactNode;
  asChild?: boolean;
  placement?: TooltipPrimitive.TooltipContentProps['side'];
}>;

export const Tooltip: FC<TooltipProps> = ({ children, className, content, asChild, placement }) => (
  <TooltipPrimitive.Provider delayDuration={200}>
    <TooltipPrimitive.Root>
      <TooltipPrimitive.Trigger asChild={asChild}>{children}</TooltipPrimitive.Trigger>
      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content
          className={cn(
            'animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
            'z-[101] overflow-hidden rounded-md border bg-white px-3 py-1.5 text-sm shadow-md dark:border-slate-700 dark:bg-slate-800 dark:text-white',
            className,
          )}
          side={placement}
          sideOffset={5}
        >
          {content}
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  </TooltipPrimitive.Provider>
);
