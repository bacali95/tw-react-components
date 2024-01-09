import classNames from 'classnames';
import { CheckIcon, ChevronDownIcon } from 'lucide-react';
import {
  ChangeEvent,
  ForwardedRef,
  ReactNode,
  RefObject,
  forwardRef,
  useMemo,
  useRef,
  useState,
} from 'react';

import { Block } from '../../../../Block';
import { Flex } from '../../../../Flex';
import { List } from '../../../../List';
import { Popover } from '../../../../Popover';
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
      value?: T | null;
      onChange?: (item?: T) => void;
    }
  | {
      multiple: true;
      value: T[];
      onChange?: (item?: T[]) => void;
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
    const [open, setOpen] = useState(false);
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
            : Array.isArray(value)
            ? value
                .map((v) => pureItems.find((item) => selectPredicate(item.value, v))!)
                .filter(Boolean)
            : []
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

    const handleOnSelect = (id: string | number) => {
      !multiple && setOpen(false);
      if (!multiple) {
        if (clearable && selectedItems[0]?.id === id) {
          onChange?.(undefined);
        } else {
          onChange?.(pureItems.find((item) => item.id === id)?.value);
        }
      } else if (multiple) {
        if (selectedMap[id]) {
          onChange?.(selectedItems.filter((item) => item.id !== id).map((item) => item.value));
        } else {
          onChange?.(
            [
              ...selectedItems.map((item) => item.value),
              pureItems.find((item) => item.id === id)?.value,
            ].filter(Boolean) as T[]
          );
        }
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

    const RenderOption = (option: SelectItem<T>) => (
      <List.Item
        key={option.id}
        className={classNames(
          'w-full cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700/40',
          {
            'bg-slate-300 dark:bg-slate-900': !!selectedMap[option.id],
          }
        )}
        size={props.size}
        onClick={() => handleOnSelect(option.id)}
      >
        <span>{renderItem(option, !!selectedMap[option.id])}</span>
        {!!selectedMap[option.id] && <CheckIcon className="ml-auto h-5 w-5" />}
      </List.Item>
    );

    const containerRef = useRef<HTMLDivElement>(null);

    return (
      <Block className="contents" ref={containerRef}>
        <Popover open={open} onOpenChange={setOpen}>
          <Popover.Trigger className={classNames(className, 'w-full')}>
            <TextInput
              className="[&>div>*]:cursor-pointer"
              inputClassName="text-left"
              {...props}
              value={text ?? ''}
              clearable={clearable && !!selectedItems.length}
              onClear={handleOnClear}
              suffixIcon={ChevronDownIcon}
              ref={ref}
              readOnly
            />
          </Popover.Trigger>
          <Popover.Content
            className="flex max-h-80 w-[calc(var(--radix-popover-trigger-width))] flex-col overflow-hidden px-0"
            container={containerRef.current}
          >
            {search && (
              <TextInput
                className="px-1 pb-1"
                value={searchValue}
                placeholder="Search..."
                size={props.size}
                onChange={handleOnSearchValueChange}
                clearable={!!searchValue.length}
                onClear={clearSearchValue}
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
            <Flex className="gap-1 overflow-auto px-1" direction="column" fullWidth noGap>
              {filteredItems.map((item, index) =>
                item.group ? (
                  <Flex key={item.id} className="gap-1" direction="column" fullWidth noGap>
                    <List.Label
                      className="sticky top-0 z-[51] w-full rounded-md bg-slate-200 px-2 py-1 dark:bg-slate-700"
                      size={props.size}
                    >
                      {item.label}
                    </List.Label>
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
            </Flex>
          </Popover.Content>
        </Popover>
      </Block>
    );
  }
) as (<T>(props: SelectInputProps<T> & { ref?: ForwardedRef<HTMLDivElement> }) => JSX.Element) & {
  readonly $$typeof: symbol;
};
