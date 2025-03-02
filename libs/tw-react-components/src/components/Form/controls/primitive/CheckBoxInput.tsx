import type { FC } from 'react';

import type { BasicInputProps } from './BasicInput';
import { BasicInput } from './BasicInput';

export type CheckboxInputProps = Omit<BasicInputProps<'checkbox'>, 'type'>;

export const CheckboxInput: FC<CheckboxInputProps> = ({
  dataTestId = 'checkbox-input',
  ...props
}) => <BasicInput type="checkbox" dataTestId={dataTestId} {...props} />;
