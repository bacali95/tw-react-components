import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { FC, forwardRef, useState } from 'react';

import { BasicInput, BasicInputProps } from './BasicInput';

export type PasswordInputProps = Omit<BasicInputProps<'number'>, 'type'>;

export const PasswordInput = forwardRef((props: PasswordInputProps, ref) => {
  const [type, setType] = useState<'text' | 'password'>('password');

  const toggleType = () => setType((type) => (type === 'text' ? 'password' : 'text'));

  return (
    <BasicInput
      type={type}
      {...props}
      ExtraIcon={type === 'password' ? EyeIcon : EyeSlashIcon}
      onExtraIconClick={toggleType}
      ref={ref}
    />
  );
}) as FC<PasswordInputProps>;
