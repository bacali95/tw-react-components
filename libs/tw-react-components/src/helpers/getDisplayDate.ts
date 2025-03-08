import dayjs from 'dayjs';
import 'dayjs/locale/en';
import advancedFormat from 'dayjs/plugin/advancedFormat.js';

dayjs.extend(advancedFormat);

export function getDisplayDate(
  date: Date,
  {
    format = 'YYYY-MM-DD HH:mm:ss',
    locale = 'en',
    offset = 0,
  }: {
    format?: string;
    locale?: string;
    offset?: number;
  },
): string {
  const dateWithOffset = dayjs(date).add(offset, 'minutes');

  return (locale ? dateWithOffset.locale(locale) : dateWithOffset).format(format);
}
