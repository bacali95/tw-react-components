import { renderHook } from '@testing-library/react';
import dayjs from 'dayjs';
import 'dayjs/locale/en';
import 'dayjs/locale/es';
import 'dayjs/locale/fr';
import localeData from 'dayjs/plugin/localeData.js';

import { useMonths } from '../useMonths';

// Ensure locale data is available
dayjs.extend(localeData);

describe('useMonths hook', () => {
  it('returns 12 months with correct format', () => {
    const { result } = renderHook(() => useMonths());

    expect(result.current).toHaveLength(12);

    result.current.forEach((month: { name: string; shortName: string; index: number }) => {
      expect(month).toHaveProperty('name');
      expect(month).toHaveProperty('shortName');
      expect(month).toHaveProperty('index');
      expect(typeof month.name).toBe('string');
      expect(typeof month.shortName).toBe('string');
      expect(typeof month.index).toBe('number');
    });
  });

  it('returns English months by default', () => {
    const { result } = renderHook(() => useMonths());

    const expectedMonths = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    const expectedShortMonths = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    result.current.forEach(
      (month: { name: string; shortName: string; index: number }, index: number) => {
        expect(month.name).toBe(expectedMonths[index]);
        expect(month.shortName).toBe(expectedShortMonths[index]);
        expect(month.index).toBe(index);
      },
    );
  });

  it('returns French months when locale is fr', () => {
    const { result } = renderHook(() => useMonths('fr'));

    // Check a few known French month names
    expect(result.current[0].name.toLowerCase()).toContain('janvier');
    expect(result.current[6].name.toLowerCase()).toContain('juillet');
    expect(result.current[11].name.toLowerCase()).toContain('décembre');

    // For short names, check first characters
    expect(result.current[0].shortName.toLowerCase().startsWith('j')).toBeTruthy();
    expect(result.current[6].shortName.toLowerCase().startsWith('j')).toBeTruthy();
  });

  it('returns Spanish months when locale is es', () => {
    const { result } = renderHook(() => useMonths('es'));

    // Check a few known Spanish month names
    expect(result.current[0].name.toLowerCase()).toContain('enero');
    expect(result.current[6].name.toLowerCase()).toContain('julio');
    expect(result.current[11].name.toLowerCase()).toContain('diciembre');

    // For short names, check first characters
    expect(result.current[0].shortName.toLowerCase().startsWith('e')).toBeTruthy();
    expect(result.current[6].shortName.toLowerCase().startsWith('j')).toBeTruthy();
  });

  it('memoizes the result for the same locale', () => {
    const { result, rerender } = renderHook(() => useMonths('en'));

    const firstResult = result.current;

    // Rerender with the same locale
    rerender();

    // The result should be the same object reference
    expect(result.current).toBe(firstResult);
  });

  it('returns a new result for different locales', () => {
    const { result, rerender } = renderHook(({ locale }: { locale: string }) => useMonths(locale), {
      initialProps: { locale: 'en' },
    });

    const firstResult = result.current;

    // Rerender with a different locale
    rerender({ locale: 'fr' });

    // The result should be a different object reference
    expect(result.current).not.toBe(firstResult);
  });
});
