import { ArrowsUpDownIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';
import { ComponentProps, FC, MouseEvent, ReactNode, useRef } from 'react';

import { generalComparator } from '../../helpers';
import { Button, ButtonProps } from '../Button';
import { Flex } from '../Flex';
import { SelectInput } from '../Form';
import { Pagination, PaginationProps } from '../Pagination';
import { Spinner } from '../Spinner';
import { Table } from '../Table';

export type DataTableColumn<T, Field extends keyof T = keyof T> = {
  header: ReactNode;
  field: Field;
  render?: (item: T, rowIndex: number) => ReactNode;
  className?: string;
  align?: ComponentProps<'td'>['align'];
  comparator?: (a: T[Field], b: T[Field]) => number;
  noSorting?: boolean;
};

export type DataTableSorting<T> = {
  field: keyof T;
  direction: 'asc' | 'desc';
  comparator: (a: T[keyof T], b: T[keyof T]) => number;
};

const possiblePageSize = [5, 10, 50, 100, 500, 1000] as const;

export type DataTablePageSize = (typeof possiblePageSize)[number];

export type DataTableAction<T> = {
  icon: FC<ComponentProps<'svg'>>;
  label?: string;
  color?: ButtonProps['color'];
  hide?: boolean | ((item: T) => boolean);
  onClick: (item: T, rowIndex: number) => void;
};

export type DataTableProps<T> = {
  rows: T[];
  columns: DataTableColumn<T>[];
  sorting?: {
    sorting: DataTableSorting<T> | undefined;
    onSortingChange: (sorting: DataTableSorting<T>) => void;
  };
  pagination?: PaginationProps & {
    pageSize?: DataTablePageSize;
    onPageSizeChange?: (pageSize: DataTablePageSize) => void;
  };
  actions?: DataTableAction<T>[];
  isLoading?: boolean;
  onRowClick?: DataTableAction<T>['onClick'];
};

function defaultRender<T>(item: T, field: keyof T): ReactNode {
  return item[field] as ReactNode;
}

export function DataTable<T>({
  columns,
  rows,
  sorting,
  pagination,
  actions = [],
  isLoading,
  onRowClick,
}: DataTableProps<T>) {
  const footerRef = useRef<HTMLDivElement>(null);

  const handleSorting =
    (field: DataTableSorting<T>['field'], comparator: DataTableSorting<T>['comparator']) => () => {
      if (!sorting) return;

      if (!sorting.sorting) {
        sorting.onSortingChange({ field, direction: 'asc', comparator });
      } else {
        const newDirection =
          sorting.sorting.field === field && sorting.sorting.direction === 'asc' ? 'desc' : 'asc';
        sorting.onSortingChange({ field, direction: newDirection, comparator });
      }
    };

  const handleActionClicked =
    (action: DataTableAction<T>, item: T, rowIndex: number) => (event: MouseEvent) => {
      event.stopPropagation();

      action.onClick(item, rowIndex);
    };

  const handleRowClicked = (item: T, rowIndex: number) => (event: MouseEvent) => {
    event.stopPropagation();

    onRowClick?.(item, rowIndex);
  };
  return (
    <Table>
      <Table.Head className="sticky top-0 z-10">
        <Table.Row>
          {columns.map((column, columnIndex) => (
            <Table.HeadCell
              key={columnIndex}
              className={classNames('group relative', {
                'cursor-pointer': !isLoading && sorting && !column.noSorting,
              })}
              align="center"
              onClick={
                !isLoading
                  ? handleSorting(column.field, column.comparator ?? generalComparator)
                  : undefined
              }
            >
              {column.header}
              {sorting &&
                !column.noSorting &&
                (sorting.sorting?.field !== column.field ? (
                  <ArrowsUpDownIcon className="absolute top-1/2 float-right ml-1 hidden h-4 w-4 -translate-y-1/2 group-hover:inline-block" />
                ) : sorting.sorting?.direction === 'asc' ? (
                  <ChevronDownIcon className="absolute top-1/2 float-right ml-1 inline-block h-4 w-4 -translate-y-1/2" />
                ) : (
                  <ChevronUpIcon className="absolute top-1/2 float-right ml-1 inline-block h-4 w-4 -translate-y-1/2" />
                ))}
            </Table.HeadCell>
          ))}
          {actions.length > 0 && <Table.HeadCell align="center">Actions</Table.HeadCell>}
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {(isLoading || !rows.length) && (
          <Table.Row>
            <Table.Cell colSpan={columns.length + Math.min(1, actions.length)}>
              {isLoading ? (
                <Spinner className="rounded-lg bg-gray-700 opacity-50" />
              ) : (
                <Flex className="text-gray-500" justify="center">
                  No data
                </Flex>
              )}
            </Table.Cell>
          </Table.Row>
        )}
        {rows.map((item, rowIndex) => (
          <Table.Row
            key={rowIndex}
            className={classNames({
              'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-900': onRowClick,
            })}
            onClick={handleRowClicked(item, rowIndex)}
          >
            {columns.map((column, columnIndex) => (
              <Table.Cell
                key={columnIndex}
                className={column.className}
                align={column.align ?? 'center'}
              >
                {column.render?.(item, rowIndex) ?? defaultRender(item, column.field)}
              </Table.Cell>
            ))}
            {actions.length > 0 && (
              <Table.Cell>
                <Flex align="center" justify="center">
                  {actions
                    .filter((action) =>
                      typeof action.hide === 'boolean' ? !action.hide : !action.hide?.(item)
                    )
                    .map((action, actionIndex) => (
                      <Button
                        key={actionIndex}
                        rounded={!action.label}
                        size="small"
                        className={!action.label ? '!p-2' : undefined}
                        prefixIcon={() => <action.icon className="h-4 w-4" />}
                        color={action.color}
                        onClick={handleActionClicked(action, item, rowIndex)}
                        children={action.label}
                      />
                    ))}
                </Flex>
              </Table.Cell>
            )}
          </Table.Row>
        ))}
      </Table.Body>
      {pagination && !isLoading && (
        <Table.Footer className="sticky bottom-0">
          <Table.Row>
            <Table.Cell colSpan={columns.length + Math.min(1, actions.length)}>
              <Flex justify="end" ref={footerRef}>
                <Pagination {...pagination} />
                {pagination.onPageSizeChange && (
                  <SelectInput
                    className="!w-32"
                    value={pagination.pageSize ?? 10}
                    items={possiblePageSize.map((pageSize) => ({
                      id: pageSize,
                      label: String(pageSize),
                      value: pageSize,
                    }))}
                    onChange={(newPageSize) =>
                      newPageSize && pagination.onPageSizeChange?.(newPageSize)
                    }
                    parentRef={footerRef}
                  />
                )}
              </Flex>
            </Table.Cell>
          </Table.Row>
        </Table.Footer>
      )}
    </Table>
  );
}
