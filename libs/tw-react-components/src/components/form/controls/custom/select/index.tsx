import { CheckIcon, ChevronDownIcon, XMarkIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';
import {
  ChangeEvent,
  ForwardedRef,
  KeyboardEvent,
  ReactNode,
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { useOutsideClick } from '../../../../../hooks';
import { BasicInputProps, TextInput } from '../../primitive';

export type SelectInputType = 'select';

export type SelectItem<T> = {
  id: string | number;
  label: string;
  groupHeader?: false;
  value: T;
};

export type GroupHeader = Pick<SelectItem<any>, 'id'> & {
  label: ReactNode;
  groupHeader: true;
};

export type SelectInputProps<T = any> = {
  items: (SelectItem<T> | GroupHeader)[];
  renderItem?: (item: SelectItem<T>, selected?: boolean) => ReactNode;
  clearable?: boolean;
  search?: boolean;
  predicate?: (a: T, b: T) => boolean;
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
    'className' | 'name' | 'label' | 'placeholder' | 'required' | 'hasErrors'
  >;

export const SelectInput = forwardRef<HTMLInputElement, SelectInputProps>(
  <T,>(
    {
      className,
      items,
      renderItem = (item: SelectItem<T>) => item.value as any,
      value,
      multiple,
      clearable,
      search,
      onChange,
      predicate,
      ...props
    }: SelectInputProps<T>,
    ref: ForwardedRef<HTMLInputElement>
  ): JSX.Element => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [hoverIndex, setHoverIndex] = useState<number | undefined>(undefined);
    const [searchValue, setSearchValue] = useState('');
    const pureItems = useMemo(
      () => items.filter((item) => !item.groupHeader) as SelectItem<T>[],
      [items]
    );
    const [selectedItems, setSelectedItems] = useState<SelectItem<T>[]>(
      value
        ? !multiple
          ? pureItems.find((item) =>
              predicate ? predicate(item.value, value) : item.value === value
            )
            ? [
                pureItems.find((item) =>
                  predicate ? predicate(item.value, value) : item.value === value
                )!,
              ]
            : []
          : value
              .map<SelectItem<T>>(
                (v) =>
                  pureItems.find((item) =>
                    predicate ? predicate(item.value, v) : item.value === v
                  )!
              )
              .filter(Boolean)
        : []
    );

    const dropdownRef = useRef<HTMLDivElement>(null);

    useOutsideClick(dropdownRef, () => setIsOpen(false));

    useEffect(() => {
      return () => {
        setHoverIndex(undefined);
      };
    }, []);

    const filteredItems = useMemo(
      () =>
        !search || !searchValue
          ? items
          : pureItems.filter((item) =>
              item.label.toLowerCase().includes(searchValue.toLowerCase())
            ),
      [items, pureItems, search, searchValue]
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

    const selectItem = useCallback(
      (item: SelectItem<T>) => () => {
        setSelectedItems((selected) => {
          if (!multiple) {
            onChange?.(item.value);
            return [item];
          }
          if (selected.some((i) => i.id === item.id)) {
            onChange?.(selected.filter((i) => i.id !== item.id).map((i) => i.value));
            return selected.filter((i) => i.id !== item.id);
          }
          onChange?.([...selected, item].map((i) => i.value));
          return [...selected, item];
        });
        if (!multiple) setIsOpen(false);
      },
      [multiple, onChange]
    );

    const handleOnClick = () => {
      setIsOpen((open) => !open);
      dropdownRef.current?.focus();
    };

    const handleOnSearchValueChange = (event: ChangeEvent<HTMLInputElement>) =>
      setSearchValue(event.target.value);

    const handleOnKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
      switch (event.key) {
        case 'ArrowDown':
          setHoverIndex(getNextIndex(filteredItems, 1));
          break;
        case 'ArrowUp':
          setHoverIndex(getNextIndex(filteredItems, -1));
          break;
        case 'Home':
          setHoverIndex(0);
          break;
        case 'End':
          setHoverIndex(filteredItems.length - 1);
          break;
        case ' ':
        case 'Enter':
          event.preventDefault();
          event.stopPropagation();
          if (!isOpen) {
            setIsOpen(true);
          } else if (hoverIndex !== undefined) {
            const item = filteredItems[hoverIndex];
            !item.groupHeader && selectItem(item)();
          }
          break;
        case 'Escape':
          setIsOpen(false);
      }
    };

    const handleOnClear = () => {
      setSelectedItems([]);
      onChange?.(undefined);
    };

    return (
      <div
        className={classNames(className, 'relative')}
        onKeyDown={handleOnKeyDown}
        ref={dropdownRef}
      >
        <TextInput
          className="[&>div>*]:cursor-pointer"
          {...props}
          value={text ?? ''}
          ExtraIcon={clearable && selectedItems.length ? XMarkIcon : ChevronDownIcon}
          onExtraIconClick={clearable && selectedItems.length ? handleOnClear : undefined}
          onClick={handleOnClick}
          ref={ref}
          readOnly
        />
        {isOpen && (
          <div
            className="absolute z-10 mt-2 flex w-full flex-col gap-1 rounded-md border bg-white py-1 shadow dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            tabIndex={0}
          >
            {search && (
              <TextInput
                className="px-1 pb-1"
                value={searchValue}
                placeholder="Search..."
                onChange={handleOnSearchValueChange}
              />
            )}
            {filteredItems.length === 0 && (
              <div className="p-2 text-center text-gray-500">No items.</div>
            )}
            {filteredItems.map((item, index) => (
              <div
                key={item.id}
                className={classNames('relative flex items-center', {
                  'cursor-pointer p-2 hover:bg-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700 dark:hover:bg-gray-700':
                    !item.groupHeader,
                  'bg-gray-900/40 px-2 py-1.5 text-sm': item.groupHeader,
                  'bg-gray-100 dark:bg-gray-700/40': selectedMap[item.id],
                  'bg-gray-300 dark:!bg-gray-900': hoverIndex === index,
                })}
                onMouseEnter={() => setHoverIndex(undefined)}
                onClick={!item.groupHeader ? selectItem(item) : undefined}
              >
                {item.groupHeader ? item.label : renderItem(item, !!selectedMap[item.id])}
                {selectedMap[item.id] && <CheckIcon className="absolute right-0 mr-2 h-6 w-6" />}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
) as <T>(props: SelectInputProps<T> & { ref?: ForwardedRef<HTMLDivElement> }) => JSX.Element;

function getNextIndex(
  items: (SelectItem<any> | GroupHeader)[],
  step: 1 | -1
): (index: number | undefined) => number | undefined {
  return (index) => {
    if (items.every((item) => item.groupHeader)) return index;

    const [newIndex, newItems] =
      step === 1
        ? [index === undefined ? 0 : index + step, items]
        : [items.length - 1 - (index === undefined ? 0 : index + step), [...items].reverse()];
    let nextPureItemIndex: number | undefined;

    nextPureItemIndex = newItems.findIndex(
      (item, _index) => _index >= newIndex && !item.groupHeader
    );

    if (nextPureItemIndex === -1) {
      nextPureItemIndex = newItems.findIndex(
        (item, _index) => _index < newIndex && !item.groupHeader
      );
    }

    return nextPureItemIndex === -1
      ? undefined
      : step === 1
      ? nextPureItemIndex
      : items.length - 1 - nextPureItemIndex;
  };
}
