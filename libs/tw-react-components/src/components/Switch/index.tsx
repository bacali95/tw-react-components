import * as SwitchPrimitives from '@radix-ui/react-switch';
import type { ComponentProps, FC } from 'react';

import { cn } from '../../helpers';

export type SwitchProps = ComponentProps<typeof SwitchPrimitives.Root> & {
  size?: 'sm' | 'default';
  thumbProps?: ComponentProps<typeof SwitchPrimitives.Thumb>;
  dataTestId?: string;
};

export const Switch: FC<SwitchProps> = ({
  className,
  size = 'default',
  thumbProps: { className: thumbClassName, ...thumbProps } = {},
  dataTestId = 'switch',
  ...props
}) => (
  <SwitchPrimitives.Root
    className={cn(
      'group/switch peer inline-flex shrink-0 cursor-pointer items-center rounded-full border-[1px] border-transparent',
      'data-[size=default]:h-[18.4px] data-[size=default]:w-[32px] data-[size=sm]:h-[14px] data-[size=sm]:w-[24px]',
      'transition-colors focus-visible:ring-2 focus-visible:ring-slate-600 focus-visible:ring-offset-2 focus-visible:outline-hidden',
      'focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-blue-600 data-[state=unchecked]:bg-slate-300',
      'dark:focus-visible:ring-slate-200 dark:focus-visible:ring-offset-slate-800 dark:data-[state=checked]:bg-blue-700 dark:data-[state=unchecked]:bg-slate-700',
      className,
    )}
    data-size={size}
    data-testid={dataTestId}
    {...props}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        'group-data-[size=default]/switch:size-4 group-data-[size=sm]/switch:size-3 dark:bg-slate-900',
        'pointer-events-none block rounded-full bg-white shadow-lg ring-0 transition-transform',
        'group-data-[size=default]/switch:data-[state=checked]:translate-x-[calc(100%-2px)] group-data-[size=sm]/switch:data-[state=checked]:translate-x-[calc(100%-2px)]',
        'group-data-[size=default]/switch:data-[state=unchecked]:translate-x-0 group-data-[size=sm]/switch:data-[state=unchecked]:translate-x-0',
        thumbClassName,
      )}
      data-testid={`${dataTestId}-thumb`}
      {...thumbProps}
    />
  </SwitchPrimitives.Root>
);

Switch.displayName = SwitchPrimitives.Root.displayName;
