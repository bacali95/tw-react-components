import { FC, forwardRef } from 'react';

import { BasicInput, BasicInputProps } from './BasicInput';

export type TextareaInputProps = Omit<BasicInputProps<'textarea'>, 'type'>;

export const TextareaInput = forwardRef((props: TextareaInputProps, ref) => (
  <BasicInput type="textarea" {...props} ref={ref} />
)) as FC<TextareaInputProps>;
