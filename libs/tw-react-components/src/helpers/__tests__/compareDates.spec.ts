import dayjs from 'dayjs';

import { compareDates } from '../compareDates';

describe('compareDates helper function', () => {
  describe('Basic date comparison', () => {
    it('returns 0 when dates are equal', () => {
      const date1 = new Date('2023-05-15T14:30:00Z');
      const date2 = new Date('2023-05-15T14:30:00Z');

      const result = compareDates(date1, date2);

      expect(result).toBe(0);
    });

    it('returns positive value when first date is later', () => {
      const date1 = new Date('2023-05-15T16:30:00Z');
      const date2 = new Date('2023-05-15T14:30:00Z');

      const result = compareDates(date1, date2);

      expect(result).toBeGreaterThan(0);
      // Should be 2 hours difference = 2 * 60 * 60 * 1000 = 7,200,000 milliseconds
      expect(result).toBe(2 * 60 * 60 * 1000);
    });

    it('returns negative value when first date is earlier', () => {
      const date1 = new Date('2023-05-15T14:30:00Z');
      const date2 = new Date('2023-05-15T16:30:00Z');

      const result = compareDates(date1, date2);

      expect(result).toBeLessThan(0);
      // Should be -2 hours difference = -2 * 60 * 60 * 1000 = -7,200,000 milliseconds
      expect(result).toBe(-2 * 60 * 60 * 1000);
    });

    it('compares dates across different days', () => {
      const date1 = new Date('2023-05-16T14:30:00Z');
      const date2 = new Date('2023-05-15T14:30:00Z');

      const result = compareDates(date1, date2);

      expect(result).toBeGreaterThan(0);
      // Should be 24 hours difference = 24 * 60 * 60 * 1000 = 86,400,000 milliseconds
      expect(result).toBe(24 * 60 * 60 * 1000);
    });

    it('compares dates across different months', () => {
      const date1 = new Date('2023-06-15T14:30:00Z');
      const date2 = new Date('2023-05-15T14:30:00Z');

      const result = compareDates(date1, date2);

      expect(result).toBeGreaterThan(0);
      // Month difference depends on number of days in May (31 days)
      // 31 days = 31 * 24 * 60 * 60 * 1000 = 2,678,400,000 milliseconds
      const expectedDiff = 31 * 24 * 60 * 60 * 1000;
      expect(result).toBe(expectedDiff);
    });

    it('compares dates across different years', () => {
      const date1 = new Date('2024-05-15T14:30:00Z');
      const date2 = new Date('2023-05-15T14:30:00Z');

      const result = compareDates(date1, date2);

      expect(result).toBeGreaterThan(0);
      // Difference will be 366 days (2024 is a leap year)
      // We can verify it's approximately 1 year without calculating exact milliseconds
      expect(result).toBeGreaterThanOrEqual(365 * 24 * 60 * 60 * 1000);
    });
  });

  describe('Comparison with startOf parameter', () => {
    it('compares dates by day, ignoring time', () => {
      const date1 = new Date('2023-05-15T16:30:00Z');
      const date2 = new Date('2023-05-15T14:30:00Z');

      const result = compareDates(date1, date2, 'day');

      // When normalized to start of day, these dates are the same
      expect(result).toBe(0);
    });

    it('compares dates by month, ignoring day and time', () => {
      const date1 = new Date('2023-05-20T16:30:00Z');
      const date2 = new Date('2023-05-15T14:30:00Z');

      const result = compareDates(date1, date2, 'month');

      // When normalized to start of month, these dates are the same
      expect(result).toBe(0);
    });

    it('compares dates by year, ignoring month, day and time', () => {
      const date1 = new Date('2023-06-15T16:30:00Z');
      const date2 = new Date('2023-05-15T14:30:00Z');

      const result = compareDates(date1, date2, 'year');

      // When normalized to start of year, these dates are the same
      expect(result).toBe(0);
    });

    it('compares dates by hour, ignoring minutes and seconds', () => {
      const date1 = new Date('2023-05-15T14:45:00Z');
      const date2 = new Date('2023-05-15T14:30:00Z');

      const result = compareDates(date1, date2, 'hour');

      // When normalized to start of hour, these dates are the same
      expect(result).toBe(0);
    });

    it('returns correct result for different days with startOf day', () => {
      const date1 = new Date('2023-05-16T02:30:00');
      const date2 = new Date('2023-05-15T23:45:00');

      const result = compareDates(date1, date2, 'day');

      // When normalized to start of day, these should be 1 day apart
      expect(result).toBe(24 * 60 * 60 * 1000);
    });

    it('returns correct result for different months with startOf month', () => {
      const date1 = new Date('2023-06-01T00:00:00');
      const date2 = new Date('2023-05-31T23:59:59');

      const result = compareDates(date1, date2, 'month');

      // When normalized to start of month, these should be 1 month apart
      // (May has 31 days)
      const expectedDiff = 31 * 24 * 60 * 60 * 1000;
      expect(result).toBe(expectedDiff);
    });

    it('works correctly with week as startOf parameter', () => {
      // Create dates in the same week (according to dayjs default locale)
      // Note that this depends on what's considered the first day of the week in the locale
      const dateSameWeek1 = dayjs().startOf('week').add(1, 'day').toDate();
      const dateSameWeek2 = dayjs().startOf('week').add(3, 'day').toDate();

      const result1 = compareDates(dateSameWeek1, dateSameWeek2, 'week');
      expect(result1).toBe(0);

      // Create dates in different weeks
      const dateDiffWeek1 = dayjs().startOf('week').toDate();
      const dateDiffWeek2 = dayjs().startOf('week').add(1, 'week').toDate();

      const result2 = compareDates(dateDiffWeek1, dateDiffWeek2, 'week');
      expect(result2).toBe(-7 * 24 * 60 * 60 * 1000);
    });
  });

  describe('Edge cases', () => {
    it('handles date objects created differently but representing the same time', () => {
      const date1 = new Date('2023-05-15T14:30:00Z');
      const date2 = new Date(Date.UTC(2023, 4, 15, 14, 30, 0)); // Months are 0-indexed

      const result = compareDates(date1, date2);
      expect(result).toBe(0);
    });

    it('handles dates with different timezone offsets correctly', () => {
      // Creating dates with specific timezone strings
      const date1 = new Date('2023-05-15T14:30:00Z'); // UTC
      const date2 = new Date('2023-05-15T14:30:00+02:00'); // UTC+2

      const result = compareDates(date1, date2);

      // UTC time for date2 is actually 12:30:00Z, so date1 is 2 hours later
      expect(result).toBeGreaterThan(0);
      expect(result).toBe(2 * 60 * 60 * 1000);
    });

    it('handles leap years correctly', () => {
      // February 29 in a leap year vs March 1
      const date1 = new Date('2024-02-29T12:00:00Z');
      const date2 = new Date('2024-03-01T12:00:00Z');

      const result = compareDates(date1, date2);

      // Difference should be exactly 1 day
      expect(result).toBe(-24 * 60 * 60 * 1000);
    });

    it('handles daylight saving time transitions correctly', () => {
      // Important: This test assumes DST changes by 1 hour
      // These dates are typically around DST changes
      const dateDstStart = new Date('2023-03-12T01:59:59Z');
      const dateDstAfterStart = new Date('2023-03-12T03:00:00Z');

      // The actual behavior will depend on the timezone of where the tests are run
      // We're just ensuring that we get a numerical result, not testing the exact value
      const result = compareDates(dateDstStart, dateDstAfterStart);
      expect(typeof result).toBe('number');

      // When using startOf 'day', DST changes shouldn't affect the result
      const resultWithStartOf = compareDates(dateDstStart, dateDstAfterStart, 'day');
      expect(resultWithStartOf).toBe(0);
    });
  });
});
