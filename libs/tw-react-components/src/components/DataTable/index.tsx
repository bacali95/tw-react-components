import {
  ArrowUpDownIcon,
  ChevronsDownUpIcon,
  ChevronsUpDownIcon,
  LucideIcon,
  MinusIcon,
  PlusIcon,
  SortAscIcon,
  SortDescIcon,
} from 'lucide-react';
import { ComponentProps, FC, MouseEvent, ReactNode, useMemo, useRef, useState } from 'react';

import { cn, generalComparator, resolveTargetObject } from '../../helpers';
import { Button } from '../Button';
import { Flex } from '../Flex';
import { SelectInput } from '../Form';
import { Hint, HintBadgeProps, HintDotProps } from '../Hint';
import { Pagination, PaginationProps } from '../Pagination';
import { Spinner } from '../Spinner';
import { Table } from '../Table';
import { Color, Paths, ResolvePath } from '../types';

export type DataTableColumn<T, Field extends Paths<T> = Paths<T>> = {
  className?: string;
  header: ReactNode;
  field: Field;
  noSorting?: boolean;
  hide?: boolean;
  align?: ComponentProps<'td'>['align'];
  render?: (item: T, rowIndex: number) => ReactNode;
  comparator?: (a: ResolvePath<T, Field>, b: ResolvePath<T, Field>) => number;
};

export type DataTableColumns<T> = Partial<{
  [Field in Paths<T>]: DataTableColumn<T, Field>;
}>;

export type DataTableSorting<T, Field extends Paths<T> = Paths<T>> = {
  field: Field;
  direction: 'asc' | 'desc';
  comparator: (a: ResolvePath<T, Field>, b: ResolvePath<T, Field>) => number;
};

export type DataTableRowExtraContent<T> = {
  idGetter: (item: T) => number;
  singleExpansion?: boolean;
  component: FC<{ item: T; rowIndex: number }>;
};

const possiblePageSize = [5, 10, 25, 50, 100, 500, 1000] as const;

export type DataTablePageSize = (typeof possiblePageSize)[number];

export type DataTableAction<T> = {
  icon: LucideIcon;
  label?: string;
  hasNotification?: (
    item: T,
    rowIndex: number,
  ) => { type: 'badge'; props: HintBadgeProps } | { type: 'dot'; props: HintDotProps } | boolean;
  color?: Color;
  hide?: boolean | ((item: T) => boolean);
  onClick: (item: T, rowIndex: number) => void;
};

export type DataTableProps<T> = {
  className?: string;
  rows: T[];
  columns: DataTableColumn<T>[] | DataTableColumns<T>;
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
  rowExtraContent?: DataTableRowExtraContent<T>;
  noDataMessage?: ReactNode;
  onRowClick?: DataTableAction<T>['onClick'];
  rowClassName?: (item: T, rowIndex: number) => string | undefined;
};

function defaultRender<T>(item: T, field: Paths<T>): ReactNode {
  return resolveTargetObject(item, field.split('.')) as ReactNode;
}

export function DataTable<T>({
  className,
  columns,
  rows,
  sorting,
  pagination,
  actions = [],
  isLoading,
  rowExtraContent,
  noDataMessage,
  onRowClick,
  rowClassName,
}: DataTableProps<T>) {
  const footerRef = useRef<HTMLDivElement>(null);

  const [expandedRows, setExpandedRows] = useState<Record<number, boolean>>({});
  const allRowsExpanded = useMemo(
    () =>
      rowExtraContent ? rows.every((row) => expandedRows[rowExtraContent.idGetter(row)]) : false,
    [expandedRows, rowExtraContent, rows],
  );

  const _columns: DataTableColumn<T>[] = useMemo(
    () =>
      (Array.isArray(columns) ? columns : Object.values(columns)).filter(
        (column) => !(column as DataTableColumn<T>).hide,
      ) as DataTableColumn<T>[],
    [columns],
  );

  const columnsLength = useMemo(
    () => (rowExtraContent ? 1 : 0) + _columns.length + Math.min(1, actions.length),
    [_columns.length, actions.length, rowExtraContent],
  );

  const handleSorting =
    (field: DataTableSorting<T>['field'], comparator?: DataTableSorting<T>['comparator']) => () => {
      if (!sorting) return;

      if (!sorting.sorting) {
        sorting.onSortingChange({
          field,
          direction: 'asc',
          comparator: comparator ?? generalComparator,
        });
      } else {
        const newDirection =
          sorting.sorting.field === field && sorting.sorting.direction === 'asc' ? 'desc' : 'asc';
        sorting.onSortingChange({
          field,
          direction: newDirection,
          comparator: comparator ?? generalComparator,
        });
      }
    };

  const handleActionClicked =
    (action: DataTableAction<T>, item: T, rowIndex: number) => (event: MouseEvent) => {
      event.stopPropagation();

      action.onClick(item, rowIndex);
    };

  const handleRowClicked = (item: T, rowIndex: number) => (event: MouseEvent) => {
    event.stopPropagation();

    if (onRowClick) {
      return onRowClick?.(item, rowIndex);
    }

    if (rowExtraContent) {
      handleExpandRow(rowExtraContent.idGetter(item))(event);
    }
  };

  const handleExpandAll = (event: MouseEvent) => {
    event.stopPropagation();

    if (!rowExtraContent) return;

    setExpandedRows((prev) => ({
      ...prev,
      ...rows.reduce(
        (acc, row) => ({ ...acc, [rowExtraContent.idGetter(row)]: !allRowsExpanded }),
        {},
      ),
    }));
  };

  const handleExpandRow = (id: number) => (event: MouseEvent) => {
    event.stopPropagation();

    setExpandedRows((prev) =>
      rowExtraContent?.singleExpansion ? { [id]: !prev[id] } : { ...prev, [id]: !prev[id] },
    );
  };

  return (
    <Table className={cn('border dark:border-slate-700', className)}>
      <Table.Head className="sticky top-0 z-10">
        <Table.Row>
          {rowExtraContent && (
            <Table.HeadCell align="center">
              {!rowExtraContent.singleExpansion && (
                <ExpandButton
                  folded={!allRowsExpanded}
                  foldComponent={ChevronsDownUpIcon}
                  unfoldComponent={ChevronsUpDownIcon}
                  onClick={handleExpandAll}
                />
              )}
            </Table.HeadCell>
          )}
          {_columns.map((column, columnIndex) => (
            <Table.HeadCell
              key={columnIndex}
              className={cn('group relative', {
                'cursor-pointer': !isLoading && sorting && !column.noSorting,
              })}
              align={column.align ?? 'left'}
              onClick={
                !isLoading && sorting && !column.noSorting
                  ? handleSorting(column.field, column.comparator)
                  : undefined
              }
            >
              {column.header}
              {sorting &&
                !column.noSorting &&
                (sorting.sorting?.field !== column.field ? (
                  <ArrowUpDownIcon className="absolute top-1/2 float-right ml-1 hidden h-4 w-4 -translate-y-1/2 group-hover:inline-block" />
                ) : sorting.sorting?.direction === 'asc' ? (
                  <SortAscIcon className="absolute top-1/2 float-right ml-1 inline-block h-4 w-4 -translate-y-1/2" />
                ) : (
                  <SortDescIcon className="absolute top-1/2 float-right ml-1 inline-block h-4 w-4 -translate-y-1/2" />
                ))}
            </Table.HeadCell>
          ))}
          {actions.filter((action) => !action.hide).length > 0 && (
            <Table.HeadCell align="center">Actions</Table.HeadCell>
          )}
        </Table.Row>
      </Table.Head>
      <Table.Body className="relative">
        {isLoading && (
          <Table.Row>
            <Table.Cell
              className={cn('z-10 h-full w-full p-0', {
                absolute: rows.length,
              })}
              colSpan={columnsLength}
            >
              <Spinner className="bg-white/50 py-4 dark:bg-slate-700/50" />
            </Table.Cell>
          </Table.Row>
        )}
        {!isLoading && !rows.length && (
          <Table.Row>
            <Table.Cell colSpan={columnsLength}>
              <Flex className="text-slate-500" justify="center">
                {noDataMessage ?? 'No data'}
              </Flex>
            </Table.Cell>
          </Table.Row>
        )}
        {rows.map((item, rowIndex) => [
          <Table.Row
            key={rowIndex}
            className={cn(
              {
                'cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800':
                  onRowClick || rowExtraContent,
              },
              rowClassName?.(item, rowIndex),
            )}
            onClick={handleRowClicked(item, rowIndex)}
          >
            {rowExtraContent && (
              <Table.Cell className="w-min" align="center">
                <ExpandButton
                  folded={!expandedRows[rowExtraContent.idGetter(item)]}
                  foldComponent={MinusIcon}
                  unfoldComponent={PlusIcon}
                  onClick={handleExpandRow(rowExtraContent.idGetter(item))}
                />
              </Table.Cell>
            )}
            {_columns.map((column, columnIndex) => (
              <Table.Cell
                key={columnIndex}
                className={column.className}
                align={column.align ?? 'left'}
              >
                {column.render?.(item, rowIndex) ?? defaultRender(item, column.field)}
              </Table.Cell>
            ))}
            {actions.filter((action) => !action.hide).length > 0 && (
              <Table.Cell className="py-3">
                <Flex align="center" justify="center">
                  {actions
                    .filter((action) =>
                      typeof action.hide === 'boolean' ? !action.hide : !action.hide?.(item),
                    )
                    .map((action, actionIndex) => {
                      const notification = action.hasNotification?.(item, rowIndex);

                      return (
                        <div key={actionIndex} className="relative">
                          <Button
                            size="small"
                            prefixIcon={action.icon}
                            color={action.color}
                            onClick={handleActionClicked(action, item, rowIndex)}
                            children={action.label}
                          />
                          {notification &&
                            (notification === true ? (
                              <Hint.Dot />
                            ) : notification.type === 'dot' ? (
                              <Hint.Dot {...notification.props} />
                            ) : (
                              <Hint.Badge {...notification.props} />
                            ))}
                        </div>
                      );
                    })}
                </Flex>
              </Table.Cell>
            )}
          </Table.Row>,
          rowExtraContent && expandedRows[rowExtraContent.idGetter(item)] && (
            <Table.Row key={`${rowIndex}-expanded`}>
              <Table.Cell className="p-0" colSpan={columnsLength}>
                <rowExtraContent.component item={item} rowIndex={rowIndex} />
              </Table.Cell>
            </Table.Row>
          ),
        ])}
      </Table.Body>
      {pagination && (
        <Table.Footer className="sticky -bottom-px">
          <Table.Row className="border-t dark:border-slate-700">
            <Table.Cell colSpan={columnsLength}>
              <Flex justify="end" ref={footerRef}>
                <Pagination disabled={isLoading} {...pagination} />
                {pagination.onPageSizeChange && (
                  <SelectInput
                    className="w-32"
                    value={pagination.pageSize ?? 10}
                    items={possiblePageSize.map((pageSize) => ({
                      id: pageSize,
                      label: String(pageSize),
                      value: pageSize,
                    }))}
                    onChange={(newPageSize) =>
                      newPageSize && pagination.onPageSizeChange?.(newPageSize)
                    }
                    disabled={isLoading}
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

type ExpandButtonProps = {
  folded: boolean;
  foldComponent: LucideIcon;
  unfoldComponent: LucideIcon;
  onClick: (event: MouseEvent) => void;
};

const ExpandButton: FC<ExpandButtonProps> = ({
  folded,
  foldComponent,
  unfoldComponent,
  onClick,
}) => {
  const Icon = folded ? unfoldComponent : foldComponent;

  return (
    <Icon
      className="h-6 w-6 cursor-pointer rounded p-1 hover:bg-slate-300 hover:dark:bg-slate-600"
      onClick={onClick}
    />
  );
};
