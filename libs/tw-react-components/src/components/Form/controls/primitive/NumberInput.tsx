import { FC, forwardRef } from 'react';

import { BasicInput, BasicInputProps } from './BasicInput';

export type NumberInputProps = Omit<BasicInputProps<'number'>, 'type'>;

export const NumberInput = forwardRef((props: NumberInputProps, ref) => (
  <BasicInput type="number" {...props} ref={ref} />
)) as FC<NumberInputProps>;
