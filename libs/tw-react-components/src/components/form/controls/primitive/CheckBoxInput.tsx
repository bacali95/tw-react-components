import { FC, forwardRef } from 'react';

import { BasicInput, BasicInputProps } from './BasicInput';

export type CheckboxInputProps = Omit<BasicInputProps<'checkbox'>, 'type'>;

export const CheckboxInput = forwardRef((props: CheckboxInputProps, ref) => (
  <BasicInput type="checkbox" {...props} ref={ref} />
)) as FC<CheckboxInputProps>;
