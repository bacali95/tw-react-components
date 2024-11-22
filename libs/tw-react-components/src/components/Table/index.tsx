import type { ComponentProps, FC } from 'react';

import { cn } from '../../helpers';
import { Flex } from '../Flex';

const $Table: FC<ComponentProps<'table'>> = ({ children, className, ...props }) => (
  <Flex className={cn('overflow-auto rounded-lg', className)} fullWidth>
    <table
      className="min-w-full divide-y divide-slate-200 dark:divide-slate-800 dark:text-white"
      {...props}
    >
      {children}
    </table>
  </Flex>
);

const TableHead: FC<ComponentProps<'thead'>> = ({ children, className, ...props }) => (
  <thead
    className={cn(
      'border-b bg-slate-100 text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300',
      className,
    )}
    {...props}
  >
    {children}
  </thead>
);

const TableHeadCell: FC<ComponentProps<'th'>> = ({ children, className, ...props }) => (
  <th className={cn('px-4 py-2 font-medium', className)} {...props}>
    {children}
  </th>
);

const TableBody: FC<ComponentProps<'tbody'>> = ({ children, className, ...props }) => (
  <tbody
    className={cn(
      'divide-y divide-slate-200 bg-slate-50/80 dark:divide-slate-700 dark:bg-slate-900',
      className,
    )}
    {...props}
  >
    {children}
  </tbody>
);

const TableRow: FC<ComponentProps<'tr'>> = ({ children, ...props }) => (
  <tr {...props}>{children}</tr>
);

const TableCell: FC<ComponentProps<'td'>> = ({ children, className, ...props }) => (
  <td className={cn('px-4 py-2', className)} {...props}>
    {children}
  </td>
);

const TableFooter: FC<ComponentProps<'tfoot'>> = ({ children, className, ...props }) => (
  <tfoot
    className={cn('bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300', className)}
    {...props}
  >
    {children}
  </tfoot>
);

export const Table = Object.assign($Table, {
  Head: TableHead,
  HeadCell: TableHeadCell,
  Body: TableBody,
  Row: TableRow,
  Cell: TableCell,
  Footer: TableFooter,
});
