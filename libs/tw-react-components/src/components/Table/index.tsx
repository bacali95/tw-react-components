import classNames from 'classnames';
import { ComponentProps, FC } from 'react';

import { Flex } from '../Flex';

const $Table: FC<ComponentProps<'table'>> = ({ children, className, ...props }) => (
  <Flex className="overflow-auto rounded-lg" fullWidth>
    <table
      className={classNames(
        'min-w-full divide-y divide-gray-200 dark:divide-gray-800 dark:text-white',
        className
      )}
      {...props}
    >
      {children}
    </table>
  </Flex>
);

const TableHead: FC<ComponentProps<'thead'>> = ({ children, className, ...props }) => (
  <thead
    className={classNames(
      'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300',
      className
    )}
    {...props}
  >
    {children}
  </thead>
);

const TableHeadCell: FC<ComponentProps<'th'>> = ({ children, className, ...props }) => (
  <th className={classNames('px-2 py-2 font-medium', className)} {...props}>
    {children}
  </th>
);

const TableBody: FC<ComponentProps<'tbody'>> = ({ children, className, ...props }) => (
  <tbody
    className={classNames(
      'divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800',
      className
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
  <td className={classNames('py-3 px-4', className)} {...props}>
    {children}
  </td>
);

const TableFooter: FC<ComponentProps<'tfoot'>> = ({ children, className, ...props }) => (
  <tfoot
    className={classNames(
      'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300',
      className
    )}
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
