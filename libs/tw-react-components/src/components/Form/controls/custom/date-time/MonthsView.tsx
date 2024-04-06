import { FC, useMemo } from 'react';

import { cn, compareDates } from '../../../../../helpers';
import { useMonths } from '../../../../../hooks';

type MonthsViewProps = {
  date: Date;
  value?: string | Date | null;
  year: number;
  minDate?: Date;
  maxDate?: Date;
  locale?: string;
  selectMonth: (month: number) => () => void;
};

export const MonthsView: FC<MonthsViewProps> = ({
  date,
  value,
  year,
  minDate,
  maxDate,
  locale,
  selectMonth,
}) => {
  const months = useMonths(locale);

  return (
    <div className="grid grid-cols-4 gap-1 px-3 py-2">
      {months.map((month, index) => (
        <Month
          key={index}
          date={date}
          value={value}
          shortName={month.shortName}
          month={index}
          year={year}
          minDate={minDate}
          maxDate={maxDate}
          selectMonth={selectMonth}
        />
      ))}
    </div>
  );
};

type MonthProps = {
  date: Date;
  value?: string | Date | null;
  shortName: string;
  month: number;
  year: number;
  minDate?: Date;
  maxDate?: Date;
  selectMonth: (month: number) => () => void;
};

const Month: FC<MonthProps> = ({
  date,
  value,
  shortName,
  month,
  year,
  minDate,
  maxDate,
  selectMonth,
}) => {
  const dayDate = useMemo(
    () => new Date(year, month, date.getDate(), date.getHours(), date.getMinutes()),
    [date, month, year],
  );

  const isSelectable = useMemo(
    () =>
      (!minDate || compareDates(dayDate, new Date(minDate), 'month') >= 0) &&
      (!maxDate || compareDates(dayDate, new Date(maxDate), 'month') <= 0),
    [dayDate, minDate, maxDate],
  );

  const isSelected = useMemo(
    () => !!value && !compareDates(dayDate, new Date(value), 'month'),
    [dayDate, value],
  );

  const isEqualThisMonth = useMemo(() => !compareDates(dayDate, new Date(), 'month'), [dayDate]);

  return (
    <div
      className={cn('mx-auto flex w-14 items-center justify-center rounded border py-3 text-sm', {
        'border-blue-500': isEqualThisMonth,
        'border-transparent': !isEqualThisMonth,
        'bg-blue-500 text-white': isSelected,
        'cursor-pointer': isSelectable,
        'hover:bg-blue-100 dark:hover:bg-blue-900': isSelectable && !isSelected,
        'text-slate-400 dark:text-slate-500': !isSelectable,
      })}
      onClick={isSelectable ? selectMonth(month) : undefined}
    >
      {shortName}
    </div>
  );
};
