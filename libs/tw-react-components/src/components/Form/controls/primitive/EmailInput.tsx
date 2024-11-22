import { AtSignIcon } from 'lucide-react';
import { forwardRef } from 'react';

import type { BasicInputProps } from './BasicInput';
import { BasicInput } from './BasicInput';

export type EmailInputProps = Omit<BasicInputProps<'email'>, 'type'>;

export const EmailInput = forwardRef<HTMLInputElement, EmailInputProps>((props, ref) => (
  <BasicInput type="email" {...props} suffixIcon={AtSignIcon} ref={ref} />
));
