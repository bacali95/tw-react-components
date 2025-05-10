import type { FC, PropsWithChildren } from 'react';

import { cn } from '../../../helpers';
import { Flex } from '../../Flex';

export type FormGroupProps = PropsWithChildren<{
  className?: string;
  label: string;
}>;

export const FormGroup: FC<FormGroupProps> = ({ className, label, children }) => (
  <Flex
    className={cn('relative !gap-4 rounded-lg border p-4 dark:border-slate-700', className)}
    direction="column"
    fullWidth
  >
    <div className="absolute top-0 right-0 rounded-tr-lg rounded-bl-lg bg-slate-500 px-2 py-1 font-medium text-white dark:bg-slate-900 dark:text-white">
      {label}
    </div>
    {children}
  </Flex>
);
