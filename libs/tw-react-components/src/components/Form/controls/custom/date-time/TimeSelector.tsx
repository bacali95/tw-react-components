import dayjs from 'dayjs';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import type { FC, WheelEvent } from 'react';

import { compareDates } from '../../../../../helpers';
import { useLongPress } from '../../../../../hooks';

type TimeSelectorProps = {
  date: Date;
  step?: number;
  minDate?: Date | null;
  maxDate?: Date | null;
  setNewDate: (date: Date) => void;
};

export const TimeSelector: FC<TimeSelectorProps> = ({
  date,
  step = 1,
  minDate,
  maxDate,
  setNewDate,
}) => {
  const editDateField = (field: 'hours' | 'minutes', diff: number) => () => {
    const newDate = dayjs(date).add(diff, field).toDate();

    if (minDate && compareDates(newDate, new Date(minDate), 'minute') < 0) return;
    if (maxDate && compareDates(newDate, new Date(maxDate), 'minute') > 0) return;

    setNewDate(newDate);
  };

  const increaseHours = useLongPress(editDateField('hours', 1));
  const decreaseHours = useLongPress(editDateField('hours', -1));
  const increaseMinutes = useLongPress(editDateField('minutes', step));
  const decreaseMinutes = useLongPress(editDateField('minutes', -step));
  const onWheel = (field: 'hours' | 'minutes') => (event: WheelEvent<HTMLSpanElement>) =>
    editDateField(field, (event.deltaY < 0 ? 1 : -1) * (field === 'hours' ? 1 : step))();

  return (
    <>
      <label className="text-sm text-slate-700 dark:text-slate-300">Time</label>
      <div className="flex flex-grow justify-center gap-2">
        <div className="flex flex-col items-center justify-center">
          <ChevronUpIcon
            className="h-4 w-4 rounded hover:bg-slate-100 dark:hover:bg-slate-700"
            onClick={editDateField('hours', 1)}
            {...increaseHours}
          />
          <ChevronDownIcon
            className="h-4 w-4 rounded hover:bg-slate-100 dark:hover:bg-slate-700"
            onClick={editDateField('hours', -1)}
            {...decreaseHours}
          />
        </div>
        <div className="flex items-center rounded-lg border border-slate-100 bg-slate-100 text-right dark:border-slate-700 dark:bg-slate-800">
          <span className="flex px-2" onWheel={onWheel('hours')}>
            {date.getHours().toString().padStart(2, '0')}
          </span>
          <span>:</span>
          <span className="flex px-2" onWheel={onWheel('minutes')}>
            {date.getMinutes().toString().padStart(2, '0')}
          </span>
        </div>
        <div className="flex flex-col items-center justify-center">
          <ChevronUpIcon
            className="h-4 w-4 rounded hover:bg-slate-100 dark:hover:bg-slate-700"
            onClick={editDateField('minutes', step)}
            {...increaseMinutes}
          />
          <ChevronDownIcon
            className="h-4 w-4 rounded hover:bg-slate-100 dark:hover:bg-slate-700"
            onClick={editDateField('minutes', -step)}
            {...decreaseMinutes}
          />
        </div>
      </div>
    </>
  );
};
