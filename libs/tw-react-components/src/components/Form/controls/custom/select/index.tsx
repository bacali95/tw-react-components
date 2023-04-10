import { Listbox, Portal } from '@headlessui/react';
import classNames from 'classnames';
import { CheckIcon, ChevronDownIcon, XIcon } from 'lucide-react';
import {
  ChangeEvent,
  ForwardedRef,
  ReactNode,
  RefObject,
  forwardRef,
  useMemo,
  useState,
} from 'react';

import { usePopper } from '../../../../../hooks';
import { Flex } from '../../../../Flex';
import { List } from '../../../../List';
import { BasicInputProps, TextInput } from '../../primitive';

export type SelectInputType = 'select';

export type SelectItem<T, Group extends boolean = false> = {
  id: string | number;
  label: string;
} & (Group extends false
  ? {
      group?: false;
      value: T;
    }
  : {
      group: true;
      value?: never;
      items: SelectItem<T>[];
    });

export type SelectInputProps<T = any> = {
  items: SelectItem<T, boolean>[];
  renderItem?: (item: SelectItem<T>, selected?: boolean) => ReactNode;
  clearable?: boolean;
  allowAddition?: boolean;
  onNewItemAdded?: (value: string) => void;
  search?: boolean;
  searchPredicate?: (item: SelectItem<T>, searchValue: string) => boolean;
  selectPredicate?: (a: T, b: T) => boolean;
  parentRef?: RefObject<HTMLDivElement>;
} & (
  | {
      multiple?: false;
      value?: T;
      onChange?: (item: T | undefined) => void;
    }
  | {
      multiple: true;
      value: T[];
      onChange?: (item: T[] | undefined) => void;
    }
) &
  Pick<
    BasicInputProps<'text'>,
    | 'className'
    | 'inputClassName'
    | 'extensionClassName'
    | 'name'
    | 'label'
    | 'size'
    | 'placeholder'
    | 'required'
    | 'hasErrors'
    | 'disabled'
    | 'readOnly'
  >;

export const SelectInput = forwardRef<HTMLInputElement, SelectInputProps>(
  <T,>(
    {
      className,
      items,
      renderItem = (item: SelectItem<T>) => item.label,
      value,
      multiple,
      clearable,
      allowAddition,
      onNewItemAdded,
      search,
      searchPredicate = (item, searchValue) =>
        item.label.toLowerCase().includes(searchValue.toLowerCase()),
      selectPredicate = (a, b) => a === b,
      onChange,
      readOnly,
      parentRef,
      ...props
    }: SelectInputProps<T>,
    ref: ForwardedRef<HTMLInputElement>
  ): JSX.Element => {
    const [trigger, container] = usePopper({
      placement: 'bottom',
      strategy: 'fixed',
      modifiers: [
        { name: 'offset', options: { offset: [-2, 8] } },
        {
          name: 'matchTriggerSize',
          enabled: true,
          phase: 'beforeWrite',
          requires: ['computeStyles'],
          fn({ state }) {
            (state.styles as any).popper.minWidth = `${state.rects.reference.width}px`;
          },
          effect({ state }) {
            state.elements.popper.style.minWidth = `${
              (state.elements.reference as HTMLDivElement).offsetWidth
            }px`;
          },
        },
      ],
    });

    const [searchValue, setSearchValue] = useState('');
    const pureItems = useMemo(
      () => items.flatMap((item: SelectItem<T, boolean>) => (item.group ? item.items : [item])),
      [items]
    );
    const selectedItems = useMemo<SelectItem<T>[]>(
      () =>
        value
          ? !multiple
            ? pureItems.find((item) => selectPredicate(item.value, value))
              ? [pureItems.find((item) => selectPredicate(item.value, value))!]
              : []
            : value
                .map((v) => pureItems.find((item) => selectPredicate(item.value, v))!)
                .filter(Boolean)
          : [],
      [multiple, pureItems, selectPredicate, value]
    );

    const filteredItems = useMemo(
      () =>
        !search || !searchValue
          ? items
          : items.flatMap<SelectItem<T, boolean>>((item: SelectItem<T, boolean>) =>
              item.group
                ? item.items.some((subItem) =>
                    subItem.label.toLowerCase().includes(searchValue.toLowerCase())
                  )
                  ? [
                      {
                        ...item,
                        items: item.items.filter((subItem) =>
                          subItem.label.toLowerCase().includes(searchValue.toLowerCase())
                        ),
                      },
                    ]
                  : []
                : item.label.toLowerCase().includes(searchValue.toLowerCase())
                ? [item]
                : []
            ),
      [items, search, searchValue]
    );

    const text = useMemo(
      () =>
        selectedItems.length
          ? !multiple
            ? selectedItems[0].label
            : selectedItems.map((item) => item.label).join(', ')
          : undefined,
      [multiple, selectedItems]
    );

    const selectedMap = useMemo(
      () =>
        selectedItems.reduce<Record<string | number, T>>(
          (prev, curr) => ({ ...prev, [curr.id]: curr.value }),
          {}
        ),
      [selectedItems]
    );

    const handleOnChange = (value: SelectItem<T> | SelectItem<T>[]) => {
      if (!multiple && !Array.isArray(value)) {
        if (clearable && selectedItems[0]?.id === value.id) {
          onChange?.(undefined);
        } else {
          onChange?.(value.value);
        }
      } else if (multiple && Array.isArray(value)) {
        onChange?.(value.map((item) => item.value));
      }
    };

    const handleOnSearchValueChange = (event: ChangeEvent<HTMLInputElement>) =>
      setSearchValue(event.target.value);

    const clearSearchValue = () => setSearchValue('');

    const handleOnClear = () => {
      if (readOnly) return;

      onChange?.(undefined);
    };

    const handleOnAddItemClicked = () => {
      onNewItemAdded?.(searchValue);
      setSearchValue('');
    };

    const RenderOption = (item: SelectItem<T>) => (
      <Listbox.Option className="w-full px-1" value={item}>
        {({ active, selected }) => (
          <List.Item
            className={classNames('cursor-pointer', {
              'bg-slate-100 dark:bg-slate-700/40': active,
              'bg-slate-300 dark:bg-slate-900': selected,
            })}
            size={props.size}
          >
            <span>{renderItem(item, !!selectedMap[item.id])}</span>
            {selected && <CheckIcon className="ml-auto h-5 w-5" />}
          </List.Item>
        )}
      </Listbox.Option>
    );

    return (
      <div className={classNames(className, 'w-full')}>
        <Listbox
          by="id"
          value={!multiple ? selectedItems[0] : selectedItems}
          multiple={multiple}
          onChange={handleOnChange}
        >
          <Listbox.Button className="w-full" ref={trigger}>
            <TextInput
              className="[&>div>*]:cursor-pointer"
              {...props}
              value={text ?? ''}
              ExtraIcon={clearable && selectedItems.length ? XIcon : ChevronDownIcon}
              onExtraIconClick={clearable && selectedItems.length ? handleOnClear : undefined}
              ref={ref}
              readOnly
            />
          </Listbox.Button>
          <Portal>
            <Listbox.Options
              className="z-20 flex max-h-80 flex-col overflow-hidden rounded-md border bg-white py-1 shadow dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              ref={container}
            >
              {search && (
                <TextInput
                  className="px-1 pb-1"
                  value={searchValue}
                  placeholder="Search..."
                  size={props.size}
                  onChange={handleOnSearchValueChange}
                  ExtraIcon={searchValue.length ? XIcon : undefined}
                  onExtraIconClick={clearSearchValue}
                />
              )}
              {filteredItems.length === 0 &&
                (allowAddition && searchValue ? (
                  <button
                    className="mx-1 rounded bg-slate-100 p-2 text-center hover:bg-slate-200 dark:bg-slate-900/30 dark:hover:bg-slate-700/30"
                    onClick={handleOnAddItemClicked}
                  >
                    Add '{searchValue}'
                  </button>
                ) : (
                  <div className="p-2 text-center text-slate-500">No items.</div>
                ))}
              <div className="flex flex-col gap-1 overflow-auto">
                {filteredItems.map((item, index) =>
                  item.group ? (
                    <Flex key={item.id} className="gap-1" noGap direction="column" fullWidth>
                      <div className="sticky top-0 z-[51] w-full px-1">
                        <List.Label
                          className="w-full rounded-md bg-slate-200 px-2 py-1 dark:bg-slate-700"
                          size={props.size}
                        >
                          {item.label}
                        </List.Label>
                      </div>
                      {item.items.map((subItem) => (
                        <RenderOption key={subItem.id} {...subItem} />
                      ))}
                      {index < filteredItems.length - 1 && (
                        <div className="mb-1 h-px w-full bg-slate-200 dark:bg-slate-700" />
                      )}
                    </Flex>
                  ) : (
                    <RenderOption key={item.id} {...item} />
                  )
                )}
              </div>
            </Listbox.Options>
          </Portal>
        </Listbox>
      </div>
    );
  }
) as (<T>(props: SelectInputProps<T> & { ref?: ForwardedRef<HTMLDivElement> }) => JSX.Element) & {
  readonly $$typeof: symbol;
};
