import type { ComponentProps, FC } from 'react';

import { cn } from '../../helpers';
import { Flex } from '../Flex';

type TableProps = ComponentProps<'table'> & {
  dataTestId?: string;
};

const $Table: FC<TableProps> = ({ children, className, dataTestId = 'table', ...props }) => (
  <Flex className={cn('overflow-auto rounded-lg', className)} fullWidth>
    <table
      className="min-w-full divide-y divide-slate-200 dark:divide-slate-800 dark:text-white"
      data-testid={dataTestId}
      {...props}
    >
      {children}
    </table>
  </Flex>
);

type TableHeadProps = ComponentProps<'thead'> & {
  dataTestId?: string;
};

const TableHead: FC<TableHeadProps> = ({
  children,
  className,
  dataTestId = 'table-head',
  ...props
}) => (
  <thead
    className={cn(
      'border-b bg-slate-100 text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300',
      className,
    )}
    data-testid={dataTestId}
    {...props}
  >
    {children}
  </thead>
);

type TableHeadCellProps = ComponentProps<'th'> & {
  dataTestId?: string;
};

const TableHeadCell: FC<TableHeadCellProps> = ({
  children,
  className,
  dataTestId = 'table-head-cell',
  ...props
}) => (
  <th className={cn('px-4 py-2 font-medium', className)} data-testid={dataTestId} {...props}>
    {children}
  </th>
);

type TableBodyProps = ComponentProps<'tbody'> & {
  dataTestId?: string;
};

const TableBody: FC<TableBodyProps> = ({
  children,
  className,
  dataTestId = 'table-body',
  ...props
}) => (
  <tbody
    className={cn(
      'divide-y divide-slate-200 bg-slate-50/80 dark:divide-slate-700 dark:bg-slate-900',
      className,
    )}
    data-testid={dataTestId}
    {...props}
  >
    {children}
  </tbody>
);

type TableRowProps = ComponentProps<'tr'> & {
  dataTestId?: string;
};

const TableRow: FC<TableRowProps> = ({ children, dataTestId = 'table-row', ...props }) => (
  <tr data-testid={dataTestId} {...props}>
    {children}
  </tr>
);

type TableCellProps = ComponentProps<'td'> & {
  dataTestId?: string;
};

const TableCell: FC<TableCellProps> = ({
  children,
  className,
  dataTestId = 'table-cell',
  ...props
}) => (
  <td className={cn('px-4 py-2', className)} data-testid={dataTestId} {...props}>
    {children}
  </td>
);

type TableFooterProps = ComponentProps<'tfoot'> & {
  dataTestId?: string;
};

const TableFooter: FC<TableFooterProps> = ({
  children,
  className,
  dataTestId = 'table-footer',
  ...props
}) => (
  <tfoot
    className={cn('bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300', className)}
    data-testid={dataTestId}
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
