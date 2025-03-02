import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { type FC, useState } from 'react';

import type { BasicInputProps } from './BasicInput';
import { BasicInput } from './BasicInput';

export type PasswordInputProps = Omit<BasicInputProps<'number'>, 'type'>;

export const PasswordInput: FC<PasswordInputProps> = ({
  dataTestId = 'password-input',
  ...props
}) => {
  const [type, setType] = useState<'text' | 'password'>('password');

  const toggleType = () => setType((type) => (type === 'text' ? 'password' : 'text'));

  return (
    <BasicInput
      type={type}
      dataTestId={dataTestId}
      {...props}
      suffixIcon={type === 'password' ? EyeIcon : EyeOffIcon}
      onSuffixIconClick={toggleType}
    />
  );
};
