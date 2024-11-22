import { forwardRef } from 'react';

import type { BasicInputProps } from './BasicInput';
import { BasicInput } from './BasicInput';

export type CheckboxInputProps = Omit<BasicInputProps<'checkbox'>, 'type'>;

export const CheckboxInput = forwardRef<HTMLInputElement, CheckboxInputProps>((props, ref) => (
  <BasicInput type="checkbox" {...props} ref={ref} />
));
