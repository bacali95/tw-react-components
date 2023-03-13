import { forwardRef } from 'react';

import { BasicInput, BasicInputProps } from './BasicInput';

export type TextareaInputProps = Omit<BasicInputProps<'textarea'>, 'type'>;

export const TextareaInput = forwardRef<HTMLTextAreaElement, TextareaInputProps>((props, ref) => (
  <BasicInput type="textarea" {...props} ref={ref} />
));
