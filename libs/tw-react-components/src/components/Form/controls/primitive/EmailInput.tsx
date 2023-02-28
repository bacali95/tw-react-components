import { FC, forwardRef } from 'react';

import { BasicInput, BasicInputProps } from './BasicInput';

export type EmailInputProps = Omit<BasicInputProps<'email'>, 'type'>;

export const EmailInput = forwardRef((props: EmailInputProps, ref) => (
  <BasicInput type="email" {...props} ref={ref} />
)) as FC<EmailInputProps>;
