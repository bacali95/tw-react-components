import { forwardRef } from 'react';

import { BasicInput, BasicInputProps } from './BasicInput';

export type TextInputProps = Omit<BasicInputProps<'text'>, 'type'>;

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>((props, ref) => (
  <BasicInput type="text" {...props} ref={ref} />
));
