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
  dataTestId?: string;
} & Omit<ListSorterProps<T>, 'onChange'> & {
    cancelLabel?: string;
    submitLabel?: string;
    onSubmit: (items: T[]) => void | Promise<void>;
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
  dataTestId = 'list-sorter-dialog',
}: ListSorterDialogProps<T>) {
  const [sortedItems, setSortedItems] = useState<T[]>(structuredClone(items));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) {
      setSortedItems(structuredClone(items));
    }
  }, [items, open]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await onSubmit(sortedItems);
    } catch {
      setLoading(false);
    }

    onClose();
  };

  const customRenderer = (item: T, index: number, listeners?: SyntheticListenerMap) => (
    <Flex
      align="center"
      className="gap-4 p-4 focus:outline-hidden dark:bg-slate-900 hover:dark:bg-slate-800"
      data-testid={`${dataTestId}-item-${index}`}
    >
      <Flex
        align="center"
        justify="center"
        className="cursor-move rounded-lg p-2 hover:bg-slate-200 dark:hover:bg-slate-700"
        data-testid={`${dataTestId}-drag-handle-${index}`}
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
        dataTestId={`${dataTestId}-content`}
      >
        <Dialog.Header dataTestId={`${dataTestId}-header`}>
          <Dialog.Title dataTestId={`${dataTestId}-title`}>{title}</Dialog.Title>
        </Dialog.Header>
        <ListSorter
          className="divide-y overflow-auto rounded-lg border dark:divide-slate-700 dark:border-slate-700 dark:text-white"
          items={sortedItems}
          idResolver={idResolver}
          renderer={customRenderer}
          onChange={setSortedItems}
          dataTestId={`${dataTestId}-sorter`}
        />
        <Dialog.Footer dataTestId={`${dataTestId}-footer`}>
          <Dialog.Close asChild>
            <Button color="red" disabled={loading} dataTestId={`${dataTestId}-cancel-button`}>
              {cancelLabel ?? 'Cancel'}
            </Button>
          </Dialog.Close>
          <Button
            color="green"
            loading={loading}
            onClick={handleSubmit}
            dataTestId={`${dataTestId}-submit-button`}
          >
            {submitLabel ?? 'Submit'}
          </Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  );
}
