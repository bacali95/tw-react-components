import type { FC } from 'react';
import { useCallback, useMemo } from 'react';

import { cn, compareDates } from '../../../../../helpers';
import { useDays } from '../../../../../hooks';

type DaysViewProps = {
  date: Date;
  value?: string | Date | null;
  month: number;
  year: number;
  minDate?: Date | null;
  maxDate?: Date | null;
  locale?: string;
  dataTestId?: string;
  setNewDate: (date: Date) => void;
};

export const DaysView: FC<DaysViewProps> = ({
  date,
  value,
  month,
  year,
  minDate,
  maxDate,
  locale,
  dataTestId = 'days-view',
  setNewDate,
}) => {
  const days = useDays(locale);

  const monthDays = useMemo(() => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const daysInMonthArr: number[] = [];
    for (let i = 1; i <= daysInMonth; i++) {
      daysInMonthArr.push(i);
    }

    return daysInMonthArr;
  }, [month, year]);

  const prefixDays = useMemo(() => {
    const firstDay = new Date(year, month);
    const dayOfWeek = firstDay.getDay();
    firstDay.setDate(firstDay.getDate() - 1);
    const lastDay = firstDay.getDate();

    const prefixDays: number[] = [];
    for (let i = 1; i <= dayOfWeek; i++) {
      prefixDays.push(lastDay - dayOfWeek + i);
    }

    return prefixDays;
  }, [month, year]);

  const suffixDays = useMemo(() => {
    const lastDay = new Date(year, month + 1);
    lastDay.setDate(lastDay.getDate() - 1);
    const dayOfWeek = lastDay.getDay();

    const suffixDays: number[] = [];
    for (let i = dayOfWeek; i < 6; i++) {
      suffixDays.push(i - dayOfWeek + 1);
    }

    return suffixDays;
  }, [month, year]);

  const setDayNumber = useCallback(
    (newDay: number, newMonth = month, newYear = year) =>
      () => {
        const newDate = new Date(newYear, newMonth, newDay, date.getHours(), date.getMinutes());

        if (minDate) {
          const _minDate = new Date(minDate);
          if (
            _minDate.getFullYear() === newYear &&
            _minDate.getMonth() === newMonth &&
            _minDate.getDate() === newDay
          ) {
            newDate.setHours(Math.max(newDate.getHours(), _minDate.getHours()));
            if (newDate.getHours() === _minDate.getHours()) {
              newDate.setMinutes(Math.max(newDate.getMinutes(), _minDate.getMinutes()));
            }
          }
        }

        if (maxDate) {
          const _maxDate = new Date(maxDate);
          if (
            _maxDate.getFullYear() === newYear &&
            _maxDate.getMonth() === newMonth &&
            _maxDate.getDate() === newDay
          ) {
            newDate.setHours(Math.min(newDate.getHours(), _maxDate.getHours()));
            if (newDate.getHours() === _maxDate.getHours()) {
              newDate.setMinutes(Math.min(newDate.getMinutes(), _maxDate.getMinutes()));
            }
          }
        }

        setNewDate(newDate);
      },
    [date, maxDate, minDate, month, setNewDate, year],
  );

  return (
    <div className="gap-1 px-3 py-2" data-testid={dataTestId}>
      <div className="grid grid-cols-7">
        {days.map((day, index) => (
          <span
            key={index}
            className="flex h-8 w-8 items-center justify-center text-xs text-slate-500 uppercase dark:text-slate-400"
            data-testid={`${dataTestId}-weekday-${index}`}
          >
            {day.shortName}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {prefixDays.map((dayNumber, index) => (
          <Day
            key={`${dayNumber}-${index}`}
            value={value}
            day={dayNumber}
            month={(month - 1 + 12) % 12}
            year={month % 12 ? year : year - 1}
            minDate={minDate}
            maxDate={maxDate}
            setDayNumber={setDayNumber}
            dataTestId={dataTestId}
          />
        ))}
        {monthDays.map((dayNumber, index) => (
          <Day
            key={`${dayNumber}-${index}`}
            value={value}
            day={dayNumber}
            month={month}
            year={year}
            minDate={minDate}
            maxDate={maxDate}
            primary
            setDayNumber={setDayNumber}
            dataTestId={dataTestId}
          />
        ))}
        {suffixDays.map((dayNumber, index) => (
          <Day
            key={`${dayNumber}-${index}`}
            value={value}
            day={dayNumber}
            month={(month + 1) % 12}
            year={(month + 1) % 12 ? year : year + 1}
            minDate={minDate}
            maxDate={maxDate}
            setDayNumber={setDayNumber}
            dataTestId={dataTestId}
          />
        ))}
      </div>
    </div>
  );
};

type DayProps = {
  value?: string | Date | null;
  day: number;
  month: number;
  year: number;
  minDate?: Date | null;
  maxDate?: Date | null;
  primary?: boolean;
  dataTestId?: string;
  setDayNumber: (day: number, month: number, year: number) => () => void;
};

const Day: FC<DayProps> = ({
  value,
  day,
  month,
  year,
  minDate,
  maxDate,
  primary,
  dataTestId = 'day',
  setDayNumber,
}) => {
  const dayDate = useMemo(() => new Date(year, month, day), [day, month, year]);

  const isSelectable = useMemo(
    () =>
      (!minDate || compareDates(dayDate, new Date(minDate), 'day') >= 0) &&
      (!maxDate || compareDates(dayDate, new Date(maxDate), 'day') <= 0),
    [minDate, dayDate, maxDate],
  );

  const isSelected = useMemo(
    () => !!value && !compareDates(dayDate, new Date(value), 'day'),
    [dayDate, value],
  );

  const isEqualToday = useMemo(() => !compareDates(dayDate, new Date(), 'day'), [dayDate]);

  return (
    <div
      className={cn('mx-auto flex h-8 w-8 items-center justify-center rounded-lg text-sm', {
        'border-2 border-blue-500': isEqualToday,
        'bg-blue-500 text-white': isSelected,
        'cursor-pointer': isSelectable,
        'hover:bg-blue-100 dark:hover:bg-blue-800': isSelectable && !isSelected,
        'text-slate-400 dark:text-slate-500': !isSelectable || !primary,
      })}
      onClick={isSelectable ? setDayNumber(day, month, year) : undefined}
      data-testid={`${dataTestId}-day-${day}`}
    >
      {day}
    </div>
  );
};
