import type { FC } from 'react';

import type { BasicInputProps } from './BasicInput';
import { BasicInput } from './BasicInput';

export type TextInputProps = Omit<BasicInputProps<'text'>, 'type'>;

export const TextInput: FC<TextInputProps> = (props) => <BasicInput type="text" {...props} />;
