import type { FC } from 'react';

import type { BasicInputProps } from './BasicInput';
import { BasicInput } from './BasicInput';

export type TextInputProps = Omit<BasicInputProps<'text'>, 'type'>;

export const TextInput: FC<TextInputProps> = ({ dataTestId = 'text-input', ...props }) => (
  <BasicInput type="text" dataTestId={dataTestId} {...props} />
);
