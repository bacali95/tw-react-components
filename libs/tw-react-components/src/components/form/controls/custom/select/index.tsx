import { CheckIcon, ChevronDownIcon, XMarkIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';
import {
  ChangeEvent,
  FocusEvent,
  ForwardedRef,
  KeyboardEvent,
  ReactNode,
  forwardRef,
  useCallback,
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
  value: T;
};

export type SelectInputProps<T = any> = {
  items: SelectItem<T>[];
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
    'className' | 'label' | 'placeholder' | 'required' | 'hasErrors' | 'onBlur'
  >;

export const SelectInput = forwardRef<HTMLDivElement, SelectInputProps>(
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
      onBlur,
      predicate,
      ...props
    }: SelectInputProps<T>,
    ref: ForwardedRef<HTMLDivElement>
  ): JSX.Element => {
    const [isOpen, setIsOpen] = useState<boolean>();
    const [hoverIndex, setHoverIndex] = useState<number | undefined>(undefined);
    const [searchValue, setSearchValue] = useState('');
    const [selectedItems, setSelectedItems] = useState<SelectItem<T>[]>(
      value
        ? !multiple
          ? items.find((item) => (predicate ? predicate(item.value, value) : item.value === value))
            ? [
                items.find((item) =>
                  predicate ? predicate(item.value, value) : item.value === value
                )!,
              ]
            : []
          : value
              .map<SelectItem<T>>(
                (v) =>
                  items.find((item) => (predicate ? predicate(item.value, v) : item.value === v))!
              )
              .filter(Boolean)
        : []
    );

    const dropdownRef = useRef<HTMLDivElement>(null);

    useOutsideClick(dropdownRef, () => setIsOpen(false));

    const filteredItems = useMemo(
      () =>
        !search || !searchValue
          ? items
          : items.filter((item) => item.label.toLowerCase().includes(searchValue.toLowerCase())),
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

    const handleOnBlur = (event: FocusEvent<HTMLInputElement>) => {
      setIsOpen(false);
      onBlur?.(event);
    };

    const handleOnSearchValueChange = (event: ChangeEvent<HTMLInputElement>) =>
      setSearchValue(event.target.value);

    const handleOnKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
      switch (event.key) {
        case 'ArrowDown':
          setHoverIndex((index) => (index === undefined ? 0 : (index + 1) % filteredItems.length));
          break;
        case 'ArrowUp':
          setHoverIndex((index) =>
            index === undefined
              ? filteredItems.length - 1
              : (index - 1 + filteredItems.length) % filteredItems.length
          );
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
          if (!isOpen) setIsOpen(true);
          else if (hoverIndex !== undefined) selectItem(filteredItems[hoverIndex])();
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
      <div className={classNames(className, 'relative')} onKeyDown={handleOnKeyDown} ref={ref}>
        <TextInput
          className="[&>div>*]:cursor-pointer"
          {...props}
          value={text ?? ''}
          ExtraIcon={clearable && selectedItems.length ? XMarkIcon : ChevronDownIcon}
          onExtraIconClick={clearable && selectedItems.length ? handleOnClear : undefined}
          onClick={handleOnClick}
          readOnly
        />
        {isOpen && (
          <div
            className="absolute z-10 mt-2 flex w-full flex-col gap-1 rounded-md border bg-white py-1 shadow dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            tabIndex={0}
            onBlur={handleOnBlur}
            ref={dropdownRef}
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
                className={classNames(
                  'relative flex cursor-pointer items-center p-2 hover:bg-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700 dark:hover:bg-gray-700',
                  {
                    'bg-gray-100 dark:bg-gray-700/40': selectedMap[item.id],
                    'bg-gray-300 dark:!bg-gray-900': hoverIndex === index,
                  }
                )}
                onMouseEnter={() => setHoverIndex(undefined)}
                onClick={selectItem(item)}
              >
                {renderItem(item, !!selectedMap[item.id])}
                {selectedMap[item.id] && <CheckIcon className="absolute right-0 mr-2 h-6 w-6" />}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
) as <T>(props: SelectInputProps<T> & { ref?: ForwardedRef<HTMLDivElement> }) => JSX.Element;
