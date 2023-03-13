import { ChevronDownIcon, XMarkIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';
import {
  ChangeEvent,
  ForwardedRef,
  KeyboardEvent,
  ReactNode,
  RefObject,
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { useOutsideClick } from '../../../../../hooks';
import { Flex } from '../../../../Flex';
import { BasicInputProps, CheckboxInput, TextInput } from '../../primitive';

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
    const prefixId = useId();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [hoveredId, setHoveredId] = useState<string | number | undefined>(undefined);
    const [searchValue, setSearchValue] = useState('');
    const [reverseDropdown, setReverseDropdown] = useState<boolean>();
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

    const containerRef = useRef<HTMLDivElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useOutsideClick(containerRef, () => setIsOpen(false));

    useEffect(() => {
      if (!isOpen) {
        setSearchValue('');
        setHoveredId(undefined);
      }
    }, [isOpen]);

    useEffect(() => {
      setHoveredId(undefined);
    }, [searchValue]);

    useEffect(() => {
      const element = document.getElementById(`${prefixId}-item-${hoveredId}`);
      element?.scrollIntoView({ block: 'nearest' });
    }, [hoveredId, prefixId]);

    useLayoutEffect(() => {
      const element = parentRef?.current ?? document.documentElement;

      if (dropdownRef.current && isOpen) {
        const boundaries = dropdownRef.current.getBoundingClientRect();

        setReverseDropdown((reverseDropdown) =>
          reverseDropdown === undefined ? boundaries.bottom > element.clientHeight : reverseDropdown
        );
      }

      const onResize = () => setReverseDropdown(undefined);

      window.addEventListener('resize', onResize);

      return () => window.removeEventListener('resize', onResize);
    }, [isOpen, parentRef]);

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

    const selectItem = useCallback(
      (item: SelectItem<T>) => () => {
        if (!multiple) {
          if (clearable && selectedItems[0]?.id === item.id) {
            onChange?.(undefined);
          } else {
            onChange?.(item.value);
          }
        } else {
          if (selectedItems.some((i) => i.id === item.id)) {
            onChange?.(selectedItems.filter((i) => i.id !== item.id).map((i) => i.value));
          } else {
            onChange?.([...selectedItems, item].map((i) => i.value));
          }
        }
        if (!multiple) setIsOpen(false);
      },
      [clearable, multiple, onChange, selectedItems]
    );

    const handleOnClick = () => {
      if (readOnly) return;

      setIsOpen((open) => !open);
      containerRef.current?.focus();
    };

    const handleOnSearchValueChange = (event: ChangeEvent<HTMLInputElement>) =>
      setSearchValue(event.target.value);

    const clearSearchValue = () => setSearchValue('');

    const handleOnKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
      switch (event.key) {
        case 'ArrowDown':
          setHoveredId(getNextIndex(filteredItems, 1));
          break;
        case 'ArrowUp':
          setHoveredId(getNextIndex(filteredItems, -1));
          break;
        case 'Home':
          setHoveredId(filteredItems[0].group ? filteredItems[0].items[0].id : filteredItems[0].id);
          break;
        case 'End':
          setHoveredId(filteredItems.length - 1);
          break;
        case ' ':
        case 'Enter':
          event.preventDefault();
          event.stopPropagation();
          if (!isOpen) {
            setIsOpen(true);
          } else if (hoveredId !== undefined) {
            let item = filteredItems.find((item) =>
              item.group
                ? item.items.some((subItem) => subItem.id === hoveredId)
                : item.id === hoveredId
            );

            if (item?.group) {
              item = item.items.find((item) => item.id === hoveredId);
            }

            if (item && !item.group) {
              selectItem(item)();
            }
          }
          break;
        case 'Escape':
          setIsOpen(false);
      }
    };

    const handleOnClear = () => {
      if (readOnly) return;

      onChange?.(undefined);
    };

    const handleOnAddItemClicked = () => {
      onNewItemAdded?.(searchValue);
      setSearchValue('');
    };

    const renderOption = (item: SelectItem<T>) => (
      <Flex
        id={`${prefixId}-item-${item.id}`}
        key={`item-${item.id}`}
        align="center"
        justify="between"
        fullWidth
        className={classNames(
          'cursor-pointer rounded p-2 hover:bg-gray-300 hover:bg-gray-300 active:bg-gray-300 dark:hover:bg-gray-700 dark:hover:bg-gray-700 dark:active:!bg-gray-900',
          {
            'bg-gray-100 dark:bg-gray-700/40': selectedMap[item.id],
            'bg-gray-300 dark:!bg-gray-900': item.id === hoveredId,
          }
        )}
        onClick={selectItem(item)}
      >
        <span>{renderItem(item, !!selectedMap[item.id])}</span>
        {selectedMap[item.id] && <CheckboxInput className="-my-2 w-min" checked readOnly />}
      </Flex>
    );

    return (
      <div
        className={classNames(className, 'relative w-full')}
        onKeyDown={handleOnKeyDown}
        ref={containerRef}
      >
        <TextInput
          className="[&>div>*]:cursor-pointer"
          {...props}
          value={text ?? ''}
          ExtraIcon={clearable && selectedItems.length ? XMarkIcon : ChevronDownIcon}
          onExtraIconClick={clearable && selectedItems.length ? handleOnClear : handleOnClick}
          onClick={handleOnClick}
          ref={ref}
          readOnly
        />
        {isOpen && (
          <div
            className={classNames(
              'absolute z-20 mt-2 flex max-h-80 w-full flex-col overflow-hidden rounded-md border bg-white py-1 shadow dark:border-gray-700 dark:bg-gray-800 dark:text-white',
              {
                'mt-2': !reverseDropdown,
                'bottom-full mb-2': reverseDropdown,
              }
            )}
            tabIndex={0}
            ref={dropdownRef}
          >
            {search && (
              <TextInput
                className="px-1 pb-1"
                value={searchValue}
                placeholder="Search..."
                onChange={handleOnSearchValueChange}
                ExtraIcon={XMarkIcon}
                onExtraIconClick={clearSearchValue}
              />
            )}
            {filteredItems.length === 0 &&
              (allowAddition && searchValue ? (
                <button
                  className="mx-1 rounded bg-gray-100 p-2 text-center hover:bg-gray-200 dark:bg-gray-900/30 dark:hover:bg-gray-700/30"
                  onClick={handleOnAddItemClicked}
                >
                  Add '{searchValue}'
                </button>
              ) : (
                <div className="p-2 text-center text-gray-500">No items.</div>
              ))}
            <div className="flex flex-col gap-1 overflow-auto px-1">
              {filteredItems.map((item) =>
                item.group
                  ? [
                      <div
                        id={`${prefixId}-group-${item.id}`}
                        key={`group-${item.id}`}
                        className="relative flex items-center rounded bg-gray-300 px-2 py-1.5 text-sm dark:bg-gray-900"
                      >
                        {item.label}
                      </div>,
                      item.items.map((subItem) => renderOption(subItem)),
                    ]
                  : renderOption(item)
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
) as (<T>(props: SelectInputProps<T> & { ref?: ForwardedRef<HTMLDivElement> }) => JSX.Element) & {
  readonly $$typeof: symbol;
};

function getNextIndex(
  items: SelectItem<any, boolean>[],
  step: 1 | -1
): (index: string | number | undefined) => string | number | undefined {
  return (previousId) => {
    const allPureItems = items.flatMap((item) => (item.group ? item.items : [item]));
    const previousIndex =
      previousId === undefined
        ? undefined
        : allPureItems.findIndex((item) => item.id === previousId);

    if (!allPureItems.length || previousIndex === -1) return previousId;

    return allPureItems[
      previousIndex !== undefined
        ? (previousIndex + step + allPureItems.length) % allPureItems.length
        : 0
    ].id;
  };
}
