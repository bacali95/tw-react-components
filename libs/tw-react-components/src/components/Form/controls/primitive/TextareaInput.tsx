import type { FC } from 'react';

import type { BasicInputProps } from './BasicInput';
import { BasicInput } from './BasicInput';

export type TextareaInputProps = Omit<BasicInputProps<'textarea'>, 'type'>;

export const TextareaInput: FC<TextareaInputProps> = ({
  dataTestId = 'textarea-input',
  ...props
}) => <BasicInput type="textarea" dataTestId={dataTestId} {...props} />;
