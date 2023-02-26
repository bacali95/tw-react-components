import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import dayjs from 'dayjs';
import { FC, WheelEvent } from 'react';

import { compareDates } from '../../../../../helpers';
import { useLongPress } from '../../../../../hooks';

type TimeSelectorProps = {
  date: Date;
  minDate?: Date;
  maxDate?: Date;
  setNewDate: (date: Date) => void;
};

export const TimeSelector: FC<TimeSelectorProps> = ({ date, minDate, maxDate, setNewDate }) => {
  const editDateField = (field: 'hours' | 'minutes', diff: 1 | -1) => () => {
    const newDate = dayjs(date).add(diff, field).toDate();

    if (minDate && compareDates(newDate, new Date(minDate), 'minute') < 0) return;
    if (maxDate && compareDates(newDate, new Date(maxDate), 'minute') > 0) return;

    setNewDate(newDate);
  };

  const increaseHours = useLongPress(editDateField('hours', 1));
  const decreaseHours = useLongPress(editDateField('hours', -1));
  const increaseMinutes = useLongPress(editDateField('minutes', 1));
  const decreaseMinutes = useLongPress(editDateField('minutes', -1));
  const onWheel = (field: 'hours' | 'minutes') => (event: WheelEvent<HTMLSpanElement>) =>
    editDateField(field, event.deltaY < 0 ? 1 : -1)();

  return (
    <>
      <label className="text-sm text-gray-700 dark:text-gray-300">Time</label>
      <div className="flex flex-grow justify-center gap-2">
        <div className="flex flex-col items-center justify-center">
          <ChevronUpIcon
            className="h-4 w-4 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={editDateField('hours', 1)}
            {...increaseHours}
          />
          <ChevronDownIcon
            className="h-4 w-4 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={editDateField('hours', -1)}
            {...decreaseHours}
          />
        </div>
        <div className="flex items-center rounded-lg border border-gray-100 bg-gray-100 text-right dark:border-gray-700 dark:bg-gray-700">
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
            className="h-4 w-4 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={editDateField('minutes', 1)}
            {...increaseMinutes}
          />
          <ChevronDownIcon
            className="h-4 w-4 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={editDateField('minutes', -1)}
            {...decreaseMinutes}
          />
        </div>
      </div>
    </>
  );
};
