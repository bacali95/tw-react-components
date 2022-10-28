import dayjs, { OpUnitType } from 'dayjs';

export function compareDates(date1: Date, date2: Date, startOf?: OpUnitType) {
  if (startOf) {
    date1 = dayjs(date1).startOf(startOf).toDate();
    date2 = dayjs(date2).startOf(startOf).toDate();
  }

  return date1.getTime() - date2.getTime();
}
