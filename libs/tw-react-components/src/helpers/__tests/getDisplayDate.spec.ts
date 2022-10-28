import 'dayjs/locale/en';
import 'dayjs/locale/fr';

import { getDisplayDate } from '..';

describe('getDisplayDate', () => {
  it('should format given date to the local date format', () => {
    expect(getDisplayDate(new Date('2022-01-01T00:00:00'), 'DD/MM/YYYY')).toBe('01/01/2022');
    expect(
      getDisplayDate(new Date('2022-01-01T00:00:00'), 'dddd, MMMM Do YYYY, HH:mm:ss', 'fr')
    ).toBe('samedi, janvier 1er 2022, 00:00:00');
    expect(
      getDisplayDate(new Date('2022-01-01T00:00:00'), 'dddd, MMMM Do YYYY, HH:mm:ss', 'en')
    ).toBe('Saturday, January 1st 2022, 00:00:00');
  });
});
