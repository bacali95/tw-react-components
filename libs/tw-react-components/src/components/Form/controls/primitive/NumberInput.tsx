import { forwardRef } from 'react';

import { BasicInput, BasicInputProps } from './BasicInput';

export type NumberInputProps = Omit<BasicInputProps<'number'>, 'type'>;

export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>((props, ref) => (
  <BasicInput type="number" {...props} ref={ref} />
));
