import type { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';
import { ArrowUpDownIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Button } from '../Button';
import { Flex } from '../Flex';
import type { ListSorterItem, ListSorterProps } from '../ListSorter';
import { ListSorter } from '../ListSorter';
import { Dialog } from './Dialog';

export type ListSorterDialogProps<T extends ListSorterItem> = {
  className?: string;
  open: boolean;
  title: string;
  onClose: () => void;
} & Omit<ListSorterProps<T>, 'onChange'> & {
    cancelLabel?: string;
    submitLabel?: string;
    onSubmit: (items: T[]) => void;
  };

export function ListSorterDialog<T extends ListSorterItem>({
  className,
  open,
  title,
  items,
  idResolver,
  renderer,
  cancelLabel,
  submitLabel,
  onSubmit,
  onClose,
}: ListSorterDialogProps<T>) {
  const [sortedItems, setSortedItems] = useState<T[]>(structuredClone(items));

  useEffect(() => {
    return () => {
      setSortedItems(structuredClone(items));
    };
  }, [items]);

  const preFinish = () => onSubmit(sortedItems);

  const customRenderer = (item: T, index: number, listeners?: SyntheticListenerMap) => (
    <Flex
      align="center"
      className="gap-4 p-4 focus:outline-none dark:bg-slate-900 hover:dark:bg-slate-800"
    >
      <Flex
        align="center"
        justify="center"
        className="cursor-move rounded-lg p-2 hover:bg-slate-200 dark:hover:bg-slate-700"
        {...listeners}
      >
        <ArrowUpDownIcon className="h-5 w-5" />
      </Flex>
      {renderer(item, index, listeners)}
    </Flex>
  );

  return (
    <Dialog open={open} onOpenChange={(value) => !value && onClose()}>
      <Dialog.Content
        className={className}
        onPointerDownOutside={(event) => event.preventDefault()}
      >
        <Dialog.Header>
          <Dialog.Title>{title}</Dialog.Title>
        </Dialog.Header>
        <ListSorter
          className="divide-y overflow-auto rounded-lg border dark:divide-slate-700 dark:border-slate-700 dark:text-white"
          items={sortedItems}
          idResolver={idResolver}
          renderer={customRenderer}
          onChange={setSortedItems}
        />
        <Dialog.Footer>
          <Dialog.Close asChild>
            <Button color="red">{cancelLabel ?? 'Cancel'}</Button>
          </Dialog.Close>
          <Button color="green" onClick={preFinish}>
            {submitLabel ?? 'Submit'}
          </Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  );
}
