import { AtSignIcon } from 'lucide-react';
import { forwardRef } from 'react';

import { BasicInput, BasicInputProps } from './BasicInput';

export type EmailInputProps = Omit<BasicInputProps<'email'>, 'type'>;

export const EmailInput = forwardRef<HTMLInputElement, EmailInputProps>((props, ref) => (
  <BasicInput type="email" {...props} suffixIcon={AtSignIcon} ref={ref} />
));
