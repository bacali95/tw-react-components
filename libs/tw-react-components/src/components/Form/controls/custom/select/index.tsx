import { ChevronDownIcon } from 'lucide-react';
import type { ChangeEvent, ForwardedRef, JSX, ReactNode, RefObject } from 'react';
import { forwardRef, useCallback, useMemo, useState } from 'react';

import { cn } from '../../../../../helpers';
import { DropdownMenu } from '../../../../DropdownMenu';
import { Flex } from '../../../../Flex';
import type { BasicInputProps } from '../../primitive';
import { TextInput } from '../../primitive';

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
    | 'description'
    | 'size'
    | 'placeholder'
    | 'required'
    | 'hasErrors'
    | 'disabled'
    | 'readOnly'
  >;

const defaultRenderItem = <T,>(item: SelectItem<T>, selected?: boolean) => item.label;

const defaultSearchPredicate = <T,>(item: SelectItem<T>, searchValue: string) =>
  item.label.toLowerCase().includes(searchValue.toLowerCase());

const defaultSelectPredicate = <T,>(a: T, b: T) => a === b;

export const SelectInput = forwardRef<HTMLInputElement, SelectInputProps>(
  <T,>(
    {
      className,
      items,
      renderItem = defaultRenderItem,
      value,
      multiple,
      clearable,
      allowAddition,
      onNewItemAdded,
      search,
      searchPredicate = defaultSearchPredicate,
      selectPredicate = defaultSelectPredicate,
      onChange,
      readOnly,
      parentRef,
      ...props
    }: SelectInputProps<T>,
    ref: ForwardedRef<HTMLInputElement>,
  ): JSX.Element => {
    const [open, setOpen] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const pureItems = useMemo(
      () => items.flatMap((item: SelectItem<T, boolean>) => (item.group ? item.items : [item])),
      [items],
    );
    const selectedItems = useMemo<SelectItem<T>[]>(
      () =>
        isNotNullOrUndefined(value)
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
      [multiple, pureItems, selectPredicate, value],
    );

    const filteredItems = useMemo(
      () =>
        !search || !searchValue
          ? items
          : items.flatMap<SelectItem<T, boolean>>((item: SelectItem<T, boolean>) =>
              item.group
                ? item.items.some((subItem) => searchPredicate(subItem, searchValue))
                  ? [
                      {
                        ...item,
                        items: item.items.filter((subItem) =>
                          searchPredicate(subItem, searchValue),
                        ),
                      },
                    ]
                  : []
                : searchPredicate(item, searchValue)
                  ? [item]
                  : [],
            ),
      [items, search, searchPredicate, searchValue],
    );

    const text = useMemo(
      () =>
        selectedItems.length
          ? !multiple
            ? selectedItems[0].label
            : selectedItems.map((item) => item.label).join(', ')
          : undefined,
      [multiple, selectedItems],
    );

    const selectedMap = useMemo(
      () =>
        selectedItems.reduce<Record<string | number, T>>(
          (prev, curr) => ({ ...prev, [curr.id]: curr.value }),
          {},
        ),
      [selectedItems],
    );

    const handleOnSelect = useCallback(
      (id: string | number) => {
        !multiple && setOpen(false);
        if (!multiple) {
          if (clearable && selectedItems[0]?.id === id) {
            onChange?.(undefined);
          } else {
            onChange?.(pureItems.find((item) => item.id === id)?.value);
          }
        } else if (multiple) {
          if (isNotNullOrUndefined(selectedMap[id])) {
            onChange?.(selectedItems.filter((item) => item.id !== id).map((item) => item.value));
          } else {
            onChange?.(
              [
                ...selectedItems.map((item) => item.value),
                pureItems.find((item) => item.id === id)?.value,
              ].filter(Boolean) as T[],
            );
          }
        }
      },
      [clearable, multiple, onChange, pureItems, selectedItems, selectedMap],
    );

    const handleOnSearchValueChange = (event: ChangeEvent<HTMLInputElement>) => {
      event.stopPropagation();

      setSearchValue(event.target.value);
    };

    const clearSearchValue = () => setSearchValue('');

    const handleOnClear = () => {
      if (readOnly) return;

      onChange?.(undefined);
    };

    const handleOnAddItemClicked = () => {
      onNewItemAdded?.(searchValue);
      setSearchValue('');
    };

    const GroupComponent = multiple ? DropdownMenu.Group : DropdownMenu.RadioGroup;
    const ItemComponent = multiple ? DropdownMenu.CheckboxItem : DropdownMenu.RadioItem;

    const RenderOption = useCallback(
      (option: SelectItem<T>) => {
        return (
          <ItemComponent
            className={cn('w-full cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700', {
              'bg-slate-200 dark:bg-slate-700': isNotNullOrUndefined(selectedMap[option.id]),
            })}
            value={String(option.id)}
            checked={isNotNullOrUndefined(selectedMap[option.id])}
            onSelect={(event) => {
              multiple && event.preventDefault();
              handleOnSelect(option.id);
            }}
          >
            <span>{renderItem(option, isNotNullOrUndefined(selectedMap[option.id]))}</span>
          </ItemComponent>
        );
      },
      [ItemComponent, handleOnSelect, multiple, renderItem, selectedMap],
    );

    return (
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenu.Trigger className={cn('w-full', className)}>
          <TextInput
            className="[&>div>*]:cursor-pointer"
            inputClassName="text-left"
            {...props}
            value={text ?? ''}
            clearable={clearable && !!selectedItems.length}
            onClear={handleOnClear}
            suffixIcon={ChevronDownIcon}
            onSuffixIconClick={() => setOpen((open) => !open)}
            ref={ref}
            readOnly
          />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content className="flex max-h-80 w-[calc(var(--radix-popper-anchor-width))] flex-col overflow-hidden">
          {search && (
            <>
              <TextInput
                value={searchValue}
                placeholder="Search..."
                size={props.size}
                onChange={handleOnSearchValueChange}
                onKeyUp={(event) => event.stopPropagation()}
                onKeyDown={(event) => event.stopPropagation()}
                clearable={!!searchValue.length}
                onClear={clearSearchValue}
              />
              <DropdownMenu.Separator className="w-full" />
            </>
          )}
          {filteredItems.length === 0 &&
            (allowAddition && searchValue ? (
              <button
                className="rounded bg-slate-100 py-1.5 text-center hover:bg-slate-200 dark:bg-slate-900/30 dark:hover:bg-slate-700/30"
                onClick={handleOnAddItemClicked}
              >
                Add '{searchValue}'
              </button>
            ) : (
              <div className="py-1.5 text-center text-slate-500">No items.</div>
            ))}
          <GroupComponent
            className="flex flex-col gap-1 overflow-auto"
            value={!multiple && selectedItems.length ? String(selectedItems[0].id) : undefined}
          >
            {filteredItems.map((item, index) =>
              item.group ? (
                <Flex key={item.id} className="gap-1" direction="column" fullWidth>
                  <DropdownMenu.Label className="sticky top-0 z-[51] w-full rounded-md border bg-white py-1 dark:bg-slate-900">
                    {item.label}
                  </DropdownMenu.Label>
                  {item.items.map((subItem) => (
                    <RenderOption key={subItem.id} {...subItem} />
                  ))}
                  {index < filteredItems.length - 1 && (
                    <div className="mb-1 h-px w-full bg-slate-200 dark:bg-slate-700" />
                  )}
                </Flex>
              ) : (
                <RenderOption key={item.id} {...item} />
              ),
            )}
          </GroupComponent>
        </DropdownMenu.Content>
      </DropdownMenu>
    );
  },
) as (<T>(props: SelectInputProps<T> & { ref?: ForwardedRef<HTMLDivElement> }) => JSX.Element) & {
  readonly $$typeof: symbol;
};

function isNotNullOrUndefined<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}
