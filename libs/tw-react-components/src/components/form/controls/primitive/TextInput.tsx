import { FC, forwardRef } from 'react';

import { BasicInput, BasicInputProps } from './BasicInput';

export type TextInputProps = Omit<BasicInputProps<'text'>, 'type'>;

export const TextInput = forwardRef((props: TextInputProps, ref) => (
  <BasicInput type="text" {...props} ref={ref} />
)) as FC<TextInputProps>;
