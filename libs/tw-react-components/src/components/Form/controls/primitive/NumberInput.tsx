import { ReactNode, forwardRef } from 'react';

import { cn } from '../../../../helpers';
import { BasicInput, BasicInputProps } from './BasicInput';

export type NumberInputProps = Omit<BasicInputProps<'number'>, 'type'> & { unit?: ReactNode };

export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  ({ unit, ...props }, ref) => (
    <BasicInput
      type="number"
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
