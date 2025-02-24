import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { forwardRef, useState } from 'react';

import type { BasicInputProps } from './BasicInput';
import { BasicInput } from './BasicInput';

export type PasswordInputProps = Omit<BasicInputProps<'number'>, 'type'>;

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>((props, ref) => {
  const [type, setType] = useState<'text' | 'password'>('password');

  const toggleType = () => setType((type) => (type === 'text' ? 'password' : 'text'));

  return (
    <BasicInput
      type={type}
      {...props}
      suffixIcon={type === 'password' ? EyeIcon : EyeOffIcon}
      onSuffixIconClick={toggleType}
      ref={ref}
    />
  );
});
