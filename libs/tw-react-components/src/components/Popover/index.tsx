import * as PopoverPrimitive from '@radix-ui/react-popover';
import type { ComponentProps, FC } from 'react';

import { cn } from '../../helpers';

const $Popover = PopoverPrimitive.Root;

const PopoverTrigger: FC<
  ComponentProps<typeof PopoverPrimitive.Trigger> & {
    dataTestId?: string;
  }
> = ({ dataTestId = 'popover-trigger', ...props }) => (
  <PopoverPrimitive.Trigger data-testid={dataTestId} {...props} />
);

const PopoverContent: FC<
  ComponentProps<typeof PopoverPrimitive.Content> & {
    container?: HTMLElement | null;
    dataTestId?: string;
  }
> = ({
  className,
  align = 'center',
  sideOffset = 4,
  container,
  dataTestId = 'popover-content',
  ...props
}) => (
  <PopoverPrimitive.Portal container={container}>
    <PopoverPrimitive.Content
      align={align}
      sideOffset={sideOffset}
      data-testid={dataTestId}
      className={cn(
        'z-50 rounded-md border bg-white p-1 shadow-md outline-hidden dark:border-slate-700 dark:bg-slate-900 dark:text-white',
        'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
        'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
        'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        className,
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
);
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export const Popover = Object.assign($Popover, {
  Trigger: PopoverTrigger,
  Content: PopoverContent,
});
