import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { FC, useEffect, useMemo, useState } from 'react';

import { useMonths } from '../../../../../hooks';
import { DaysView } from './DaysView';
import { MonthsView } from './MonthsView';
import { YearsView } from './YearsView';

export type View = 'days' | 'months' | 'years';

type DateSelectorProps = {
  date: Date;
  value?: string | Date;
  minDate?: Date;
  maxDate?: Date;
  locale?: string;
  calendarView: View;
  setCalendarView: (view: View) => void;
  setNewDate: (date: Date) => void;
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
    <div className="select-none">
      <div className="flex justify-between px-3 pt-2">
        <div
          className="flex cursor-pointer items-center justify-center rounded-lg px-1 transition duration-100 ease-in-out hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-gray-700"
          onClick={editCalendarViewPage('subtract')}
        >
          <ChevronLeftIcon className="h-5 w-5 text-gray-400" />
        </div>
        <div
          className="flex cursor-pointer items-center gap-1 rounded-lg px-2 py-1 transition duration-100 ease-in-out hover:bg-gray-100 dark:hover:bg-gray-700"
          onClick={nextCalendarView}
        >
          {calendarView === 'days' && <span className="capitalize">{months[month].name}</span>}
          {calendarView !== 'years' ? (
            <span className="text-gray-500 dark:text-gray-300">{year}</span>
          ) : (
            <span className="text-gray-500 dark:text-gray-300">
              {yearsRange[0]} - {yearsRange[11]}
            </span>
          )}
        </div>
        <div
          className="flex cursor-pointer items-center justify-center rounded-lg px-1 transition duration-100 ease-in-out hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-gray-700"
          onClick={editCalendarViewPage('add')}
        >
          <ChevronRightIcon className="h-5 w-5 text-gray-400" />
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
        />
      ) : (
        <YearsView
          date={date}
          value={value}
          years={yearsRange}
          minDate={minDate}
          maxDate={maxDate}
          selectYear={selectYear}
        />
      )}
    </div>
  );
};
