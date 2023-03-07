import { ArrowsUpDownIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';
import { ComponentProps, ReactNode, useState } from 'react';

import { generalComparator } from '../../helpers';
import { Table } from '../Table';

export type DataTableColumn<T> = {
  header: ReactNode;
  field: keyof T;
  render?: (item: T, index: number) => ReactNode;
  className?: string;
  align?: ComponentProps<'td'>['align'];
  comparator?: (a: T[keyof T], b: T[keyof T]) => number;
  noSorting?: boolean;
};

export type DataTableSorting<T> = {
  field: keyof T;
  direction: 'asc' | 'desc';
  comparator: (a: T[keyof T], b: T[keyof T]) => number;
};

export type DataTableProps<T> = {
  columns: DataTableColumn<T>[];
  rows: T[];
  onSortingChange?: (sorting: DataTableSorting<T>) => void;
};

function defaultRender<T>(item: T, field: keyof T): ReactNode {
  return item[field] as ReactNode;
}

export function DataTable<T>({ columns, rows, onSortingChange }: DataTableProps<T>) {
  const [sorting, setSorting] = useState<DataTableSorting<T>>();

  const handleSorting =
    (field: DataTableSorting<T>['field'], comparator: DataTableSorting<T>['comparator']) => () => {
      if (!sorting) {
        onSortingChange?.({ field, direction: 'asc', comparator });
        setSorting({ field, direction: 'asc', comparator });
      } else {
        const newDirection =
          sorting.field === field && sorting.direction === 'asc' ? 'desc' : 'asc';
        onSortingChange?.({ field, direction: newDirection, comparator });
        setSorting({ field, direction: newDirection, comparator });
      }
    };

  return (
    <Table>
      <Table.Head>
        <Table.Row>
          {columns.map((column, columnIndex) => (
            <Table.HeadCell
              key={columnIndex}
              className={classNames('group relative', {
                'cursor-pointer': !column.noSorting,
              })}
              onClick={handleSorting(column.field, column.comparator ?? generalComparator)}
            >
              {column.header}
              {!column.noSorting &&
                (sorting?.field !== column.field ? (
                  <ArrowsUpDownIcon className="absolute top-1/2 float-right ml-1 hidden h-4 w-4 -translate-y-1/2 group-hover:inline-block" />
                ) : sorting.direction === 'asc' ? (
                  <ChevronDownIcon className="absolute top-1/2 float-right ml-1 inline-block h-4 w-4 -translate-y-1/2" />
                ) : (
                  <ChevronUpIcon className="absolute top-1/2 float-right ml-1 inline-block h-4 w-4 -translate-y-1/2" />
                ))}
            </Table.HeadCell>
          ))}
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {rows.map((item, rowIndex) => (
          <Table.Row key={rowIndex}>
            {columns.map((column, columnIndex) => (
              <Table.Cell
                key={columnIndex}
                className={column.className}
                align={column.align ?? 'center'}
              >
                {column.render?.(item, rowIndex) ?? defaultRender(item, column.field)}
              </Table.Cell>
            ))}
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}
