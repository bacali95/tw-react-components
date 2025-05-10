import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import type { FC } from 'react';
import { useEffect, useMemo, useState } from 'react';

import { useMonths } from '../../../../../hooks';
import { DaysView } from './DaysView';
import { MonthsView } from './MonthsView';
import { YearsView } from './YearsView';

export type View = 'days' | 'months' | 'years';

type DateSelectorProps = {
  date: Date;
  value?: string | Date | null;
  minDate?: Date | null;
  maxDate?: Date | null;
  locale?: string;
  calendarView: View;
  setCalendarView: (view: View) => void;
  setNewDate: (date: Date) => void;
  dataTestId?: string;
};

export const DateSelector: FC<DateSelectorProps> = ({
  date,
  value,
  minDate,
  maxDate,
  locale,
  calendarView,
  setCalendarView,
  setNewDate,
  dataTestId = 'date-selector',
}) => {
  const months = useMonths(locale);

  const [month, setMonth] = useState<number>(date.getMonth());
  const [year, setYear] = useState<number>(date.getFullYear());
  const [yearOffset, setYearOffset] = useState<number>(0);

  useEffect(() => {
    setMonth(date.getMonth());
    setYear(date.getFullYear());
  }, [date]);

  const yearsRange = useMemo(() => {
    const yearsRangeArr: number[] = [];
    for (let i = year + yearOffset - 6; i < year + yearOffset + 6; i++) {
      yearsRangeArr.push(i);
    }

    return yearsRangeArr;
  }, [year, yearOffset]);

  const editCalendarViewPage = (type: 'add' | 'subtract') => () => {
    let newYear: number = year;
    let newMonth: number = month;
    if (calendarView === 'days') {
      if (type === 'add') {
        newMonth = (month + 1) % 12;
        newYear = newMonth ? year : year + 1;
      } else {
        newMonth = (month - 1 + 12) % 12;
        newYear = month % 12 ? year : year - 1;
      }
    } else if (calendarView === 'months') {
      newYear = year + (type === 'add' ? 1 : -1);
    } else {
      setYearOffset((yearOffset) => yearOffset + (type === 'add' ? 12 : -12));
    }

    setYear(newYear);
    setMonth(newMonth);
  };

  const nextCalendarView = () => {
    setMonth(date.getMonth());
    setYear(date.getFullYear());
    if (calendarView === 'days') {
      setCalendarView('months');
    } else if (calendarView === 'months') {
      setCalendarView('years');
    } else {
      setCalendarView('days');
    }
  };

  const selectMonth = (month: number) => () => {
    setMonth(month);
    setCalendarView('days');
  };

  const selectYear = (year: number) => () => {
    setYear(year);
    setCalendarView('months');
  };

  return (
    <div className="select-none" data-testid={dataTestId}>
      <div className="flex justify-between px-3 pt-2">
        <div
          className="flex cursor-pointer items-center justify-center rounded-lg px-1 transition duration-100 ease-in-out hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-slate-700"
          onClick={editCalendarViewPage('subtract')}
          data-testid={`${dataTestId}-prev`}
        >
          <ChevronLeftIcon className="h-5 w-5 text-slate-400" />
        </div>
        <div
          className="flex cursor-pointer items-center gap-1 rounded-sm px-2 py-1 transition duration-100 ease-in-out hover:bg-slate-100 dark:hover:bg-slate-700"
          onClick={nextCalendarView}
          data-testid={`${dataTestId}-view-selector`}
        >
          {calendarView === 'days' && (
            <span className="capitalize" data-testid={`${dataTestId}-month`}>
              {months[month].name}
            </span>
          )}
          {calendarView !== 'years' ? (
            <span className="text-slate-500 dark:text-slate-300" data-testid={`${dataTestId}-year`}>
              {year}
            </span>
          ) : (
            <span
              className="text-slate-500 dark:text-slate-300"
              data-testid={`${dataTestId}-year-range`}
            >
              {yearsRange[0]} - {yearsRange[11]}
            </span>
          )}
        </div>
        <div
          className="flex cursor-pointer items-center justify-center rounded-lg px-1 transition duration-100 ease-in-out hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-slate-700"
          onClick={editCalendarViewPage('add')}
          data-testid={`${dataTestId}-next`}
        >
          <ChevronRightIcon className="h-5 w-5 text-slate-400" />
        </div>
      </div>
      {calendarView === 'days' ? (
        <DaysView
          date={date}
          value={value}
          month={month}
          year={year}
          minDate={minDate}
          maxDate={maxDate}
          locale={locale}
          setNewDate={setNewDate}
          dataTestId={`${dataTestId}-days`}
        />
      ) : calendarView === 'months' ? (
        <MonthsView
          date={date}
          value={value}
          year={year}
          minDate={minDate}
          maxDate={maxDate}
          locale={locale}
          selectMonth={selectMonth}
          dataTestId={`${dataTestId}-months`}
        />
      ) : (
        <YearsView
          date={date}
          value={value}
          years={yearsRange}
          minDate={minDate}
          maxDate={maxDate}
          selectYear={selectYear}
          dataTestId={`${dataTestId}-years`}
        />
      )}
    </div>
  );
};
