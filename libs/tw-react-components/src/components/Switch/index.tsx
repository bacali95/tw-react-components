import * as SwitchPrimitives from '@radix-ui/react-switch';
import type { ComponentProps, ComponentPropsWithoutRef, ElementRef } from 'react';
import { forwardRef } from 'react';

import { cn } from '../../helpers';

export type SwitchProps = ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> & {
  thumbProps?: ComponentProps<typeof SwitchPrimitives.Thumb>;
};

const Switch = forwardRef<ElementRef<typeof SwitchPrimitives.Root>, SwitchProps>(
  ({ className, thumbProps: { className: thumbClassName, ...thumbProps } = {}, ...props }, ref) => (
    <SwitchPrimitives.Root
      className={cn(
        'peer inline-flex h-[calc(1.5rem+6px)] w-[calc(3rem+6px)] shrink-0 cursor-pointer items-center rounded-full border-[3px] border-transparent',
        'transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-600 focus-visible:ring-offset-2',
        'focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-blue-600 data-[state=unchecked]:bg-slate-300',
        'dark:focus-visible:ring-slate-200 dark:focus-visible:ring-offset-slate-800 dark:data-[state=checked]:bg-blue-700 dark:data-[state=unchecked]:bg-slate-700',
        className,
      )}
      {...props}
      ref={ref}
    >
      <SwitchPrimitives.Thumb
        className={cn(
          'pointer-events-none block h-6 w-6 rounded-full bg-white shadow-lg ring-0 transition-transform',
          'data-[state=checked]:translate-x-6 data-[state=unchecked]:translate-x-0 dark:bg-slate-900',
          thumbClassName,
        )}
        {...thumbProps}
      />
    </SwitchPrimitives.Root>
  ),
);

Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
