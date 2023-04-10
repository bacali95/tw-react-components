import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import classNames from 'classnames';
import { FC, PropsWithChildren, ReactNode } from 'react';

export type TooltipProps = PropsWithChildren<{
  content: ReactNode;
  placement?: TooltipPrimitive.TooltipContentProps['side'];
}>;

export const Tooltip: FC<TooltipProps> = ({ children, content, placement }) => (
  <TooltipPrimitive.Provider delayDuration={100}>
    <TooltipPrimitive.Root>
      <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content
          className={classNames(
            'data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade',
            'z-50 overflow-hidden rounded-md border bg-white px-3 py-1.5 text-sm shadow-md dark:border-slate-700 dark:bg-slate-800 dark:text-white'
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
