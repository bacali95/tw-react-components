import { AtSignIcon } from 'lucide-react';
import type { FC } from 'react';

import type { BasicInputProps } from './BasicInput';
import { BasicInput } from './BasicInput';

export type EmailInputProps = Omit<BasicInputProps<'email'>, 'type'>;

export const EmailInput: FC<EmailInputProps> = ({ dataTestId = 'email-input', ...props }) => (
  <BasicInput type="email" dataTestId={dataTestId} {...props} suffixIcon={AtSignIcon} />
);
