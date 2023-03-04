import { AtSymbolIcon } from '@heroicons/react/24/outline';
import { FC, forwardRef } from 'react';

import { BasicInput, BasicInputProps } from './BasicInput';

export type EmailInputProps = Omit<BasicInputProps<'email'>, 'type'>;

export const EmailInput = forwardRef((props: EmailInputProps, ref) => (
  <BasicInput type="email" {...props} ExtraIcon={AtSymbolIcon} ref={ref} />
)) as FC<EmailInputProps>;
