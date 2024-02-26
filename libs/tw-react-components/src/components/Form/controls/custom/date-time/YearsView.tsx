import { FC, useMemo } from 'react';

import { compareDates } from '../../../../../helpers';
import { cn } from '../../../../../helpers';

type YearsViewProps = {
  date: Date;
  value?: string | Date | null;
  years: number[];
  minDate?: Date;
  maxDate?: Date;
  selectYear: (month: number) => () => void;
};

export const YearsView: FC<YearsViewProps> = ({
  date,
  value,
  years,
  minDate,
  maxDate,
  selectYear,
}) => (
  <div className="grid grid-cols-4 gap-1 px-3 py-2">
    {years.map((year, index) => (
      <Year
        key={index}
        date={date}
        value={value}
        year={year}
        minDate={minDate}
        maxDate={maxDate}
        selectYear={selectYear}
      />
    ))}
  </div>
);

type YearProps = {
  date: Date;
  value?: string | Date | null;
  year: number;
  minDate?: Date;
  maxDate?: Date;
  selectYear: (month: number) => () => void;
};

const Year: FC<YearProps> = ({ date, value, year, minDate, maxDate, selectYear }) => {
  const dayDate = useMemo(
    () => new Date(year, date.getMonth(), date.getDate(), date.getHours(), date.getMinutes()),
    [date, year]
  );

  const isSelectable = useMemo(
    () =>
      (!minDate || compareDates(dayDate, new Date(minDate), 'year') >= 0) &&
      (!maxDate || compareDates(dayDate, new Date(maxDate), 'year') <= 0),
    [dayDate, minDate, maxDate]
  );

  const isSelected = useMemo(
    () => !!value && !compareDates(dayDate, new Date(value), 'year'),
    [dayDate, value]
  );

  const isEqualThisYear = useMemo(() => !compareDates(dayDate, new Date(), 'year'), [dayDate]);

  return (
    <div
      className={cn('mx-auto flex w-14 items-center justify-center rounded border py-3 text-sm', {
        'border-blue-500': isEqualThisYear,
        'border-transparent': !isEqualThisYear,
        'bg-blue-500 text-white': isSelected,
        'cursor-pointer': isSelectable,
        'hover:bg-blue-100 dark:hover:bg-blue-900': isSelectable && !isSelected,
        'text-slate-400 dark:text-slate-500': !isSelectable,
      })}
      onClick={isSelectable ? selectYear(year) : undefined}
    >
      {year}
    </div>
  );
};
