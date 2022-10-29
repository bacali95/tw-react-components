import { Listbox } from '@headlessui/react';
import { ChevronUpDownIcon, ExclamationCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';
import {
  ChangeEvent,
  FocusEvent,
  Fragment,
  KeyboardEvent,
  MouseEvent,
  ReactElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { get, useFormContext } from 'react-hook-form';

import { isEmpty, resolveTargetObject } from '../../../helpers';
import { Label } from './Label';
import { BasicInputProps } from './primitive';

export type OptionOrGroup<T> =
  | {
      __group: false;
      __hide?: boolean;
      item: T;
    }
  | {
      __group: true;
      __hide?: boolean;
      label: string;
      items: OptionOrGroup<T>[];
    };

type Props<R> = {
  field: string;
  options?: OptionOrGroup<R>[];
  optionsIdFieldChain?: string[];
  optionsTextFieldChain?: string[];
  optionsValueFieldChain?: string[];
  search?: boolean;
  multiple?: boolean;
  allowAdditions?: boolean;
} & BasicInputProps<'text'>;

type Option<T> = { key: string; text: string; value: T };

export function DropdownInput<R = any>({
  className,
  field,
  label,
  placeholder,
  required,
  readOnly,
  options,
  optionsIdFieldChain,
  optionsTextFieldChain,
  optionsValueFieldChain,
  search,
  multiple,
  allowAdditions,
  description,
}: Props<R>): ReactElement {
  const {
    register,
    setValue,
    watch,
    clearErrors,
    formState: { errors },
  } = useFormContext();

  const [optionsState, setOptions] = useState<OptionOrGroup<Option<R>>[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);
  const optionsRef = useRef<HTMLUListElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const currentValue = watch(field);

  useEffect(() => {
    register(field, {
      required,
      validate: (item) => !required || !isEmpty(item),
    });
  }, [field, register, required]);

  const makeInternalGroupedOptions: (item: OptionOrGroup<any>) => OptionOrGroup<Option<R>> =
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useCallback(
      makeGroupedOptions<OptionOrGroup<any>, Option<R>>(
        (item) => item.__group,
        (item) => (item.__group ? item.label : ''),
        (item) => (item.__group ? item.items.map(makeInternalGroupedOptions) : []),
        (item) => {
          const { item: value } = item as { __group: false; item: R };

          return {
            __group: false,
            item:
              typeof value === 'object'
                ? {
                    key: resolveTargetObject(value, optionsIdFieldChain ?? ['id']),
                    text: resolveTargetObject(value, optionsTextFieldChain ?? ['id']),
                    value: optionsValueFieldChain
                      ? resolveTargetObject(value, optionsValueFieldChain)
                      : value,
                  }
                : {
                    key: value,
                    text: value,
                    value: value,
                  },
          };
        }
      ),
      [optionsIdFieldChain, optionsTextFieldChain, optionsValueFieldChain]
    );

  useEffect(() => {
    setOptions((options ?? []).map(makeInternalGroupedOptions));
  }, [
    options,
    makeInternalGroupedOptions,
    optionsIdFieldChain,
    optionsTextFieldChain,
    optionsValueFieldChain,
  ]);

  const selectedValues: Option<R>[] = multiple
    ? ((currentValue as any) ?? []).map((value: any) =>
        typeof value === 'object'
          ? {
              key: resolveTargetObject(value, optionsIdFieldChain ?? ['id']),
              text:
                findInGroupedOptions<Option<R>>(
                  optionsState,
                  (option) =>
                    option.key === resolveTargetObject(value, optionsIdFieldChain ?? ['id'])
                )?.item.text ?? resolveTargetObject(value, optionsTextFieldChain ?? ['id']),
            }
          : {
              key: value,
              text:
                findInGroupedOptions<Option<R>>(optionsState, (option) => option.key === value)
                  ?.item.text ?? value,
            }
      )
    : typeof currentValue === 'object' && currentValue !== null
    ? [
        {
          key: resolveTargetObject(currentValue, optionsIdFieldChain ?? ['id']),
          text:
            findInGroupedOptions<Option<R>>(
              optionsState,
              (option) =>
                option.key === resolveTargetObject(currentValue, optionsIdFieldChain ?? ['id'])
            )?.item.text ?? resolveTargetObject(currentValue, optionsTextFieldChain ?? ['id']),
        },
      ]
    : currentValue
    ? [
        {
          key: currentValue,
          text:
            findInGroupedOptions<Option<R>>(optionsState, (option) => option.key === currentValue)
              ?.item.text ?? currentValue,
        },
      ]
    : [];

  const isOptionSelected = (key: string) =>
    multiple
      ? !!((currentValue as any) ?? []).find(
          (value: any) =>
            (typeof value === 'object'
              ? resolveTargetObject(value, optionsIdFieldChain ?? ['id'])
              : value) === key
        )
      : typeof currentValue === 'object' && currentValue !== null
      ? resolveTargetObject(currentValue, optionsIdFieldChain ?? ['id']) === key
      : currentValue === key;

  const filteredOptions = filterGroupedOptions<Option<R>>(
    optionsState,
    ({ key, text }) =>
      !(allowAdditions || search) ||
      (!isOptionSelected(key) && text?.toLowerCase().includes(searchValue.toLowerCase().trim()))
  );

  const selectOption = (key: string, value?: any) => {
    if (isOptionSelected(key)) {
      inputRef.current && (inputRef.current.value = '');
      setSearchValue('');
      return;
    }

    if (!value) {
      value = findInGroupedOptions<Option<R>>(optionsState, (option) => option.key === key)?.item
        ?.value;
    }

    inputRef.current && (inputRef.current.value = '');
    setSearchValue('');

    setValue(field, multiple ? [...(currentValue ?? []), value] : value);
    clearErrors(field);
  };

  const unselectValue = (key: string) => (event?: MouseEvent<HTMLOrSVGElement>) => {
    event?.stopPropagation();

    setValue(
      field,
      ((currentValue as any) ?? []).filter(
        (value: any) =>
          (typeof value === 'object'
            ? resolveTargetObject(value, optionsIdFieldChain ?? ['id'])
            : value) !== key
      )
    );

    inputRef.current && (inputRef.current.value = '');
    setSearchValue('');
  };

  const addOptionAndSelect = (event: KeyboardEvent<HTMLInputElement>) => {
    event.stopPropagation();
    const value = event.currentTarget.value;
    if (event.key === 'Enter' && value) {
      if (!filteredOptions.length && allowAdditions) {
        selectOption(value, value);
      } else if (filteredOptions.length) {
        const firstNonGroupOption = filteredOptions
          .filter((item) => !item.__group)
          .map((item) => !item.__group && item.item.key)[0];

        if (firstNonGroupOption) {
          selectOption(firstNonGroupOption);
        }
      }
    } else if (event.key === 'Backspace' && !value && selectedValues.length) {
      unselectValue(selectedValues[selectedValues.length - 1].key)();
    } else if (triggerRef.current?.getAttribute('aria-expanded') === 'false') {
      triggerRef.current?.click();
    }
  };

  const onInputBlur = (event: FocusEvent<HTMLInputElement>) => {
    if (triggerRef.current === event.relatedTarget || optionsRef.current === event.relatedTarget) {
      event.currentTarget.focus();
    }
  };

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) =>
    setSearchValue(event.target.value);

  return (
    <div className={className}>
      <Listbox value="" onChange={selectOption} disabled={readOnly}>
        <div className="relative">
          <Label description={description} required={required} hasErrors={get(errors, field)}>
            {label}
          </Label>
          <Listbox.Button
            className={classNames(
              'relative w-full cursor-default rounded-md border border-gray-300 bg-white text-left shadow-sm focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white',
              {
                'border-red-600 placeholder-red-900 opacity-70 dark:border-red-500 dark:placeholder-red-500':
                  get(errors, field),
                'mt-1': !!label,
              }
            )}
            ref={triggerRef}
          >
            <div className="flex flex-wrap items-center gap-2 py-2 pl-3 pr-8">
              {!selectedValues.length && !allowAdditions && !search && (
                <div className="block gap-x-1 truncate text-gray-500 dark:text-gray-400">
                  {placeholder ?? label}
                </div>
              )}
              {selectedValues.map(({ key, text }) => (
                <div
                  key={key}
                  className={classNames({
                    'text-gray-500': !selectedValues,
                    'flex items-center rounded bg-gray-200 pl-2 text-sm dark:bg-gray-800': multiple,
                  })}
                >
                  {text}
                  {multiple && (
                    <XMarkIcon
                      className="mx-1 h-4 w-4 rounded-md hover:bg-gray-300 dark:hover:bg-gray-700"
                      onClick={unselectValue(key)}
                    />
                  )}
                </div>
              ))}
              {(allowAdditions || search) && (
                <input
                  type="text"
                  ref={inputRef}
                  className="flex-grow border-none bg-transparent p-0 focus:outline-none focus:ring-0 dark:placeholder-gray-400"
                  placeholder={allowAdditions ? 'Add option...' : 'Search option...'}
                  onChange={onInputChange}
                  onKeyUp={addOptionAndSelect}
                  onBlur={onInputBlur}
                />
              )}
            </div>
            {get(errors, field) && (
              <div className="absolute inset-y-0 right-5 flex items-center px-3">
                <ExclamationCircleIcon className="h-6 w-6 text-red-600" />
              </div>
            )}
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon className="h-5 w-5 text-gray-400" />
            </div>
          </Listbox.Button>
          {((!search && !allowAdditions) || search || filteredOptions.length > 0) && (
            <Listbox.Options
              className="absolute z-50 mt-2 max-h-80 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-800"
              ref={optionsRef}
            >
              {!filteredOptions.length && (
                <Listbox.Option
                  className="relative cursor-default select-none p-2 pl-3 text-gray-500 dark:text-gray-200"
                  value="-1"
                >
                  <span className="block truncate font-normal">No options</span>
                </Listbox.Option>
              )}
              <GroupedOptions<Option<R>>
                multiple={multiple}
                options={filteredOptions}
                getOptionKey={(item) => item.key}
                getOptionText={(item) => item.text}
                isOptionSelected={(item) => isOptionSelected(item.key)}
              />
            </Listbox.Options>
          )}
        </div>
      </Listbox>
    </div>
  );
}

function GroupedOptions<T>({
  depth = 0,
  multiple,
  options,
  getOptionKey,
  getOptionText,
  isOptionSelected,
}: {
  depth?: number;
  multiple?: boolean;
  options: OptionOrGroup<T>[];
  getOptionKey: (item: T) => string;
  getOptionText: (item: T) => string;
  isOptionSelected: (item: T) => boolean;
}): ReactElement {
  return (
    <>
      {options.map((option) => {
        if (option.__group)
          return (
            !option.__hide && (
              <Fragment key={option.label}>
                <li className="select-none bg-gray-300 p-2 pl-3 text-gray-900 dark:bg-gray-900/80 dark:text-gray-200">
                  <div className="flex items-center gap-1" style={{ paddingLeft: depth * 10 }}>
                    {depth > 0 && <i className="uil uil-corner-down-right-alt text-lg" />}
                    {option.label}
                  </div>
                </li>
                <GroupedOptions
                  depth={depth + 1}
                  multiple={multiple}
                  options={option.items}
                  getOptionKey={getOptionKey}
                  getOptionText={getOptionText}
                  isOptionSelected={isOptionSelected}
                />
              </Fragment>
            )
          );

        const optionSelected = isOptionSelected(option.item);

        return (
          (!multiple || !optionSelected) &&
          !option.__hide && (
            <Listbox.Option
              key={getOptionKey(option.item)}
              className={classNames(
                'cursor-pointer select-none p-2 pl-3 text-gray-900 dark:text-gray-200',
                {
                  'bg-gray-200 dark:bg-gray-500': optionSelected,
                  'hover:bg-gray-100 dark:hover:bg-gray-600': !optionSelected,
                }
              )}
              value={getOptionKey(option.item)}
            >
              <div
                className="block flex items-center gap-2 truncate font-normal"
                style={{ paddingLeft: depth * 10 }}
              >
                {depth > 0 && <i className="uil uil-corner-down-right-alt" />}
                {getOptionText(option.item)}
              </div>
            </Listbox.Option>
          )
        );
      })}
    </>
  );
}

export function makeGroupedOptions<T, R>(
  isGroup: (item: T) => boolean,
  resolveLabel: (item: T) => string,
  resolveItems: (item: T) => OptionOrGroup<R>[],
  resolveSingle: (item: T) => { __group: false; item: R }
): (item: T) => OptionOrGroup<R> {
  return (item) =>
    isGroup(item)
      ? {
          __group: true,
          label: resolveLabel(item),
          items: resolveItems(item),
        }
      : resolveSingle(item);
}

function findInGroupedOptions<T>(
  options: OptionOrGroup<T>[],
  predict: (item: T) => boolean
): { __group: false; item: T } | undefined {
  let result = undefined;

  for (const option of options) {
    if (option.__group) {
      result = findInGroupedOptions(option.items, predict);
    } else if (predict(option.item)) {
      result = option;
    }

    if (result) return result;
  }

  return result;
}

function filterGroupedOptions<T>(
  options: OptionOrGroup<T>[],
  predict: (item: T) => boolean
): OptionOrGroup<T>[] {
  return options.filter((option) => {
    if (option.__group) {
      option.__hide = filterGroupedOptions(option.items, predict).length === 0;
    } else {
      option.__hide = !predict(option.item);
    }
    return !option.__hide;
  });
}
