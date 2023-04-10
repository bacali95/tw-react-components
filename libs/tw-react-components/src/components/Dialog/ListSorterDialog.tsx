import { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';
import { ArrowUpDownIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Button } from '../Button';
import { Flex } from '../Flex';
import { ListItem, ListSorter, ListSorterProps } from '../ListSorter';
import { Dialog, DialogProps } from './Dialog';

export type ListSorterDialogProps<T extends ListItem> = Omit<DialogProps, 'children' | 'footer'> &
  Omit<ListSorterProps<T>, 'onChange'> & {
    cancelLabel?: string;
    submitLabel?: string;
    onSubmit: (items: T[]) => void;
  };

export function ListSorterDialog<T extends ListItem>({
  className,
  items,
  idResolver,
  renderer,
  cancelLabel,
  submitLabel,
  onSubmit,
  ...props
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
      className="gap-4 p-4 focus:outline-none dark:bg-slate-800 hover:dark:bg-slate-800/50"
    >
      <Flex
        align="center"
        justify="center"
        className="cursor-move rounded-lg p-2 hover:bg-slate-200 dark:hover:bg-slate-900"
        {...listeners}
      >
        <ArrowUpDownIcon className="h-5 w-5" />
      </Flex>
      {renderer(item, index, listeners)}
    </Flex>
  );

  return (
    <Dialog
      {...props}
      footer={
        <Flex justify="end" fullWidth>
          <Button color="red" onClick={props.onClose}>
            {cancelLabel ?? 'Cancel'}
          </Button>
          <Button color="green" onClick={preFinish}>
            {submitLabel ?? 'Submit'}
          </Button>
        </Flex>
      }
    >
      <ListSorter
        className="divide-y overflow-auto rounded-lg border dark:divide-slate-600 dark:border-slate-600 dark:text-white"
        items={sortedItems}
        idResolver={idResolver}
        renderer={customRenderer}
        onChange={setSortedItems}
      />
    </Dialog>
  );
}
