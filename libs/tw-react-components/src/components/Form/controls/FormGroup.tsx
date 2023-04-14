import classNames from 'classnames';
import { FC, PropsWithChildren } from 'react';

import { Flex } from '../../Flex';

export type FormGroupProps = PropsWithChildren<{
  className?: string;
  label: string;
}>;

export const FormGroup: FC<FormGroupProps> = ({ className, label, children }) => (
  <Flex
    className={classNames('relative !gap-4 rounded-lg border p-4 dark:border-slate-300', className)}
    direction="column"
    fullWidth
  >
    <div className="absolute right-0 top-0 rounded-bl-lg rounded-tr-lg bg-slate-500 px-2 py-1 font-medium text-white dark:bg-slate-900 dark:text-white">
      {label}
    </div>
    {children}
  </Flex>
);
