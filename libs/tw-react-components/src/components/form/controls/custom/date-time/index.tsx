import { XMarkIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';
import dayjs from 'dayjs';
import { FC, forwardRef, useEffect, useMemo, useRef, useState } from 'react';

import { getDisplayDate } from '@helpers';
import { useOutsideClick } from '@hooks';

import { Label } from '../../Label';
import { BasicInput, BasicInputProps } from '../../primitive';
import { DateSelector, View } from './DateSelector';
import { TimeSelector } from './TimeSelector';

export type DateTimeInputType = 'date' | 'time' | 'datetime-local';

export type DateTimeInputProps = {
  value?: string | Date;
  type?: DateTimeInputType;
  hasErrors?: boolean;
  clearable?: boolean;
  minDate?: Date;
  maxDate?: Date;
  displayFormat?: string;
  displayLocale?: string;
} & Omit<BasicInputProps<'text'>, 'value' | 'type' | 'min' | 'max' | 'pattern'>;

export const DateTimeInput = forwardRef(
  (
    {
      className,
      name,
      label,
      description,
      value,
      placeholder,
      required,
      clearable,
      type = 'datetime-local',
      minDate,
      maxDate,
      disabled,
      hasErrors,
      onChange,
      onBlur,
      displayFormat = 'dddd, MMMM Do YYYY, HH:mm:ss',
      displayLocale = 'en',
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState<boolean>();
    const [calendarView, setCalendarView] = useState<View>('days');

    const date = useMemo(() => (value ? new Date(value) : new Date()), [value]);
    const displayDate = useMemo(
      () => value && getDisplayDate(date, displayFormat, displayLocale),
      [date, value, displayFormat, displayLocale]
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

      onChange?.(newDate as any);

      if (type === 'date') {
        setIsOpen(false);
      }
    };

    const clearDate = () => {
      onChange?.(undefined as any);
    };

    return (
      <div className={classNames(className, 'flex flex-col')} onBlur={onBlur} ref={ref}>
        <Label description={description} required={required} hasErrors={hasErrors}>
          {label}
        </Label>
        <div className={classNames('relative', { 'mt-1': !!label })}>
          <BasicInput
            type="text"
            placeholder={placeholder ?? label ?? 'Select date'}
            readOnly
            disabled={disabled}
            value={displayDate ?? ''}
            onClick={() => setIsOpen(!isOpen)}
            hasErrors={hasErrors}
            ExtraIcon={clearable && displayDate ? XMarkIcon : undefined}
            onExtraIconClick={clearDate}
          />

          {isOpen && (
            <div className="relative z-10 dark:text-white">
              <div
                className="absolute mt-1 flex origin-top-left flex-col rounded-md border bg-white shadow duration-200 dark:border-gray-700 dark:bg-gray-800"
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
                        minDate={minDate}
                        maxDate={maxDate}
                        setNewDate={setNewDate}
                      />
                    )}
                    <div
                      className="cursor-pointer rounded border border-transparent p-1 text-sm font-bold uppercase text-blue-600 transition duration-100 ease-in-out hover:bg-gray-100 dark:text-blue-500 dark:hover:bg-gray-700"
                      onClick={() => setIsOpen(false)}
                    >
                      OK
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
) as FC<DateTimeInputProps>;
