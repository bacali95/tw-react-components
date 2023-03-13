import { forwardRef } from 'react';

import { BasicInput, BasicInputProps } from './BasicInput';

export type CheckboxInputProps = Omit<BasicInputProps<'checkbox'>, 'type'>;

export const CheckboxInput = forwardRef<HTMLInputElement, CheckboxInputProps>((props, ref) => (
  <BasicInput type="checkbox" {...props} ref={ref} />
));
