import dayjs from 'dayjs';
import { CalendarIcon, ClockIcon } from 'lucide-react';
import type { FocusEvent, KeyboardEvent } from 'react';
import { forwardRef, useEffect, useMemo, useRef, useState } from 'react';

import { cn, getDisplayDate } from '../../../../../helpers';
import { useOutsideClick } from '../../../../../hooks';
import type { BasicInputProps } from '../../primitive';
import { BasicInput } from '../../primitive';
import type { View } from './DateSelector';
import { DateSelector } from './DateSelector';
import { TimeSelector } from './TimeSelector';

export type DateTimeInputType = 'date' | 'time' | 'datetime-local';

export type DateTimeInputProps = {
  value?: string | Date | null;
  type?: DateTimeInputType;
  hasErrors?: boolean;
  clearable?: boolean;
  step?: number;
  minDate?: Date | null;
  maxDate?: Date | null;
  displayFormat?: string;
  displayLocale?: string;
  onChange?: (date?: Date | null) => void;
} & Pick<
  BasicInputProps<'text'>,
  | 'className'
  | 'inputClassName'
  | 'extensionClassName'
  | 'label'
  | 'name'
  | 'description'
  | 'placeholder'
  | 'required'
  | 'disabled'
  | 'onBlur'
  | 'size'
  | 'readOnly'
>;

export const DateTimeInput = forwardRef<HTMLDivElement, DateTimeInputProps>(
  (
    {
      className,
      value,
      clearable,
      type = 'datetime-local',
      step = 1,
      minDate,
      maxDate,
      hasErrors,
      onChange,
      onBlur,
      displayFormat = 'dddd, MMMM Do YYYY, HH:mm:ss',
      displayLocale = 'en',
      ...props
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = useState<boolean>();
    const [calendarView, setCalendarView] = useState<View>('days');

    const date = useMemo(() => {
      const result = value
        ? new Date(value)
        : new Date(
            Math.min(
              Math.max(new Date(minDate ?? Date.now()).getTime(), Date.now()),
              new Date(maxDate ?? Date.now()).getTime(),
            ),
          );

      result.setMinutes(result.getMinutes() - ((result.getMinutes() + step) % step));

      return result;
    }, [step, maxDate, minDate, value]);
    const displayDate = useMemo(
      () => value && getDisplayDate(date, displayFormat, displayLocale),
      [date, value, displayFormat, displayLocale],
    );

    const calendarRef = useRef<HTMLDivElement>(null);

    useOutsideClick(calendarRef, () => setIsOpen(false));

    useEffect(() => {
      if (!isOpen) {
        setCalendarView('days');
      }
    }, [isOpen]);

    const setNewDate = (newDate: Date) => {
      if (type === 'date') {
        newDate = dayjs(newDate).startOf('day').toDate();
      }

      onChange?.(newDate);

      if (type === 'date') {
        setIsOpen(false);
      }
    };

    const clearDate = () => {
      onChange?.(null);
    };

    const handleOnClick = () => {
      if (props.readOnly) return;

      setIsOpen((open) => !open);
      calendarRef.current?.focus();
    };

    const handleOnBlur = (event: FocusEvent<HTMLInputElement>) => {
      if (props.readOnly) return;

      setIsOpen(false);
      onBlur?.(event);
    };

    const handleOnKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
      switch (event.key) {
        case ' ':
          setIsOpen(!isOpen);
          break;
        case 'Escape':
          setIsOpen(false);
      }
    };

    return (
      <div className={cn('relative w-full', className)} ref={ref}>
        <BasicInput
          {...props}
          type="text"
          readOnly
          value={displayDate ?? ''}
          hasErrors={hasErrors}
          onClick={handleOnClick}
          onKeyUp={handleOnKeyUp}
          clearable={clearable && !!displayDate}
          onClear={clearDate}
          suffixIcon={type?.includes('date') ? CalendarIcon : ClockIcon}
          onSuffixIconClick={handleOnClick}
        />

        {isOpen && (
          <div
            className="absolute z-20 mt-2 flex origin-top-left flex-col rounded-md border bg-white shadow duration-200 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
            tabIndex={0}
            onBlur={handleOnBlur}
            ref={calendarRef}
          >
            {type?.includes('date') && (
              <DateSelector
                date={date}
                value={value}
                minDate={minDate}
                maxDate={maxDate}
                locale={displayLocale}
                calendarView={calendarView}
                setCalendarView={setCalendarView}
                setNewDate={setNewDate}
              />
            )}
            {calendarView === 'days' && (
              <div className="flex select-none items-center justify-end gap-2 px-3 py-2">
                {type?.includes('time') && (
                  <TimeSelector
                    date={date}
                    step={step}
                    minDate={minDate}
                    maxDate={maxDate}
                    setNewDate={setNewDate}
                  />
                )}
                <div
                  className="cursor-pointer rounded-lg border border-transparent p-1 text-sm font-bold uppercase text-blue-600 transition duration-100 ease-in-out hover:bg-slate-100 dark:text-blue-500 dark:hover:bg-slate-700"
                  onClick={() => setIsOpen(false)}
                >
                  OK
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  },
);
