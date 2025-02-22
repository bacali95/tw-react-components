import type { ReactNode } from 'react';
import { forwardRef } from 'react';

import { cn } from '../../../../helpers';
import type { BasicInputProps } from './BasicInput';
import { BasicInput } from './BasicInput';

export type NumberInputProps = Omit<BasicInputProps<'number'>, 'type'> & { unit?: ReactNode };

export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  ({ unit, ...props }, ref) => (
    <BasicInput
      type="number"
      inputClassName={cn(props.clearable && !!props.value && 'pr-8', props.className)}
      {...props}
      suffixIcon={
        unit
          ? ({ className }) => (
              <div
                className={cn(className, 'flex w-min items-center')}
                onClick={props.onSuffixIconClick}
              >
                {unit}
              </div>
            )
          : props.suffixIcon
      }
      ref={ref}
    />
  ),
);
