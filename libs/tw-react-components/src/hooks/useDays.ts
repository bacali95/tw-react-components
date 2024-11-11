import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData.js';
import { useMemo } from 'react';

dayjs.extend(localeData);

export function useDays(locale = 'en'): { name: string; shortName: string; index: number }[] {
  return useMemo(() => {
    dayjs.extend(localeData).locale(locale);
    const names = dayjs.weekdays();
    const shortNames = dayjs.weekdaysShort();

    return names.map((name, index) => ({ name, shortName: shortNames[index], index }));
  }, [locale]);
}
