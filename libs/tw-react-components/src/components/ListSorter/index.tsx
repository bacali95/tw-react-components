import type { DragEndEvent } from '@dnd-kit/core';
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import type { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';
import { restrictToFirstScrollableAncestor } from '@dnd-kit/modifiers';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { ReactElement, ReactNode } from 'react';
import { useMemo } from 'react';

export type ListSorterItem = number | string | boolean | Record<'rank', number>;

export type ListSorterProps<T extends ListSorterItem> = {
  className?: string;
  items: T[];
  dataTestId?: string;
  idResolver: (item: T, index: number) => string;
  renderer: (item: T, index: number, listeners?: SyntheticListenerMap) => ReactNode;
  onChange: (items: T[]) => void;
};

export function ListSorter<T extends ListSorterItem>({
  className,
  items,
  dataTestId = 'list-sorter',
  idResolver,
  renderer,
  onChange,
}: ListSorterProps<T>): ReactElement {
  const adaptedItems = useMemo(
    () => items.map((value, index) => ({ id: idResolver(value, index), value })),
    [idResolver, items],
  );

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over || active.id === over.id) return;

    const sortedItems: typeof adaptedItems = structuredClone(adaptedItems);
    const oldIndex = sortedItems.findIndex((item) => item.id === active.id);
    const newIndex = sortedItems.findIndex((item) => item.id === over.id);

    const [removed] = sortedItems.splice(oldIndex, 1);
    sortedItems.splice(newIndex, 0, removed);

    for (const [index, { value }] of Object.entries(sortedItems)) {
      if (typeof value === 'object') {
        value.rank = +index;
      }
    }

    onChange(sortedItems.map(({ value }) => value));
  };

  return (
    <DndContext
      sensors={sensors}
      modifiers={[restrictToFirstScrollableAncestor]}
      collisionDetection={closestCenter}
      onDragEnd={onDragEnd}
    >
      <SortableContext items={adaptedItems} strategy={verticalListSortingStrategy}>
        <div className={className} data-testid={dataTestId}>
          {adaptedItems.map((item, index) => (
            <SortableItem
              key={item.id}
              item={item}
              index={index}
              renderer={renderer}
              dataTestId={dataTestId}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}

type SortableItemProps<T extends ListSorterItem> = {
  item: { id: string; value: T };
  index: number;
  dataTestId?: string;
  renderer: (item: T, index: number, listeners?: SyntheticListenerMap) => ReactNode;
};

function SortableItem<T extends ListSorterItem>({
  item,
  index,
  dataTestId,
  renderer,
}: SortableItemProps<T>): ReactElement {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: item.id });
  const style = { transform: CSS.Transform.toString(transform), transition };

  return (
    <div ref={setNodeRef} style={style} {...attributes} data-testid={`${dataTestId}-item-${index}`}>
      {renderer(item.value, index, listeners)}
    </div>
  );
}
