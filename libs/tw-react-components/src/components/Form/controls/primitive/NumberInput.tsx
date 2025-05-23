import type { FC, ReactNode } from 'react';

import { cn } from '../../../../helpers';
import type { BasicInputProps } from './BasicInput';
import { BasicInput } from './BasicInput';

export type NumberInputProps = Omit<BasicInputProps<'number'>, 'type'> & { unit?: ReactNode };

export const NumberInput: FC<NumberInputProps> = ({
  unit,
  dataTestId = 'number-input',
  ...props
}) => (
  <BasicInput
    type="number"
    inputClassName={cn(props.clearable && !!props.value && 'pr-8', props.className)}
    dataTestId={dataTestId}
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
  />
);
