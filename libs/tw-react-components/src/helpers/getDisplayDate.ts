import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';

dayjs.extend(advancedFormat);

export function getDisplayDate(date: Date, format: string, locale?: string): string {
  return (locale ? dayjs(date).locale(locale) : dayjs(date)).format(format);
}
