import { Columns3Icon, GripVerticalIcon } from 'lucide-react';
import type { ReactElement } from 'react';

import type { ColumnsPickerProps } from '../../hooks';
import { Button } from '../Button';
import { Flex } from '../Flex';
import { ListSorter } from '../ListSorter';
import { Popover } from '../Popover';
import { Switch } from '../Switch';

export type ColumnsPickerLabels = {
  trigger?: string;
  reset?: string;
};

export function ColumnsPicker<T>({
  columns,
  onReorder,
  onToggleHidden,
  onReset,
  labels,
  dataTestId = 'columns-picker',
}: ColumnsPickerProps<T> & { labels?: ColumnsPickerLabels; dataTestId?: string }): ReactElement {
  return (
    <Popover>
      <Popover.Trigger asChild dataTestId={`${dataTestId}-trigger`}>
        <Button prefixIcon={Columns3Icon} title={labels?.trigger ?? 'Columns'} />
      </Popover.Trigger>
      <Popover.Content
        className="bg-background! w-64"
        align="end"
        dataTestId={`${dataTestId}-content`}
      >
        <ListSorter
          items={columns.map((column) => String(column.field))}
          idResolver={(field) => field}
          onChange={onReorder}
          dataTestId={`${dataTestId}-sorter`}
          renderer={(field, _index, listeners) => {
            const column = columns.find((c) => String(c.field) === field)!;
            return (
              <Flex align="center" justify="between" className="gap-2 py-1">
                <Flex align="center" className="w-48 min-w-0 gap-2">
                  <GripVerticalIcon
                    className="text-muted-foreground h-4 w-4 shrink-0 cursor-grab"
                    {...listeners}
                  />
                  <span className="truncate">{column.header}</span>
                </Flex>
                <Switch checked={!column.hide} onCheckedChange={() => onToggleHidden(field)} />
              </Flex>
            );
          }}
        />
        <Button
          variant="text"
          onClick={onReset}
          className="mt-2 w-full"
          dataTestId={`${dataTestId}-reset-button`}
        >
          {labels?.reset ?? 'Reset'}
        </Button>
      </Popover.Content>
    </Popover>
  );
}
