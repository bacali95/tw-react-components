import { renderHook } from '@testing-library/react';
import dayjs from 'dayjs';
import 'dayjs/locale/en';
import 'dayjs/locale/es';
import 'dayjs/locale/fr';
import localeData from 'dayjs/plugin/localeData.js';

import { useDays } from '../useDays';

// Ensure locale data is available
dayjs.extend(localeData);

describe('useDays hook', () => {
  it('returns 7 days with correct format', () => {
    const { result } = renderHook(() => useDays());

    expect(result.current).toHaveLength(7);

    result.current.forEach((day: { name: string; shortName: string; index: number }) => {
      expect(day).toHaveProperty('name');
      expect(day).toHaveProperty('shortName');
      expect(day).toHaveProperty('index');
      expect(typeof day.name).toBe('string');
      expect(typeof day.shortName).toBe('string');
      expect(typeof day.index).toBe('number');
    });
  });

  it('returns English days by default', () => {
    const { result } = renderHook(() => useDays());

    const expectedDays = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];

    const expectedShortDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    result.current.forEach(
      (day: { name: string; shortName: string; index: number }, index: number) => {
        expect(day.name).toBe(expectedDays[index]);
        expect(day.shortName).toBe(expectedShortDays[index]);
        expect(day.index).toBe(index);
      },
    );
  });

  it('returns French days when locale is fr', () => {
    const { result } = renderHook(() => useDays('fr'));

    // Check a few known French day names
    expect(result.current[0].name.toLowerCase()).toContain('dimanche');
    expect(result.current[1].name.toLowerCase()).toContain('lundi');
    expect(result.current[6].name.toLowerCase()).toContain('samedi');

    // For short names, check first characters
    expect(result.current[0].shortName.toLowerCase().startsWith('d')).toBeTruthy();
    expect(result.current[1].shortName.toLowerCase().startsWith('l')).toBeTruthy();
  });

  it('returns Spanish days when locale is es', () => {
    const { result } = renderHook(() => useDays('es'));

    // Check a few known Spanish day names
    expect(result.current[0].name.toLowerCase()).toContain('domingo');
    expect(result.current[1].name.toLowerCase()).toContain('lunes');
    expect(result.current[6].name.toLowerCase()).toContain('sábado');

    // For short names, check first characters
    expect(result.current[0].shortName.toLowerCase().startsWith('d')).toBeTruthy();
    expect(result.current[1].shortName.toLowerCase().startsWith('l')).toBeTruthy();
  });

  it('memoizes the result for the same locale', () => {
    const { result, rerender } = renderHook(() => useDays('en'));

    const firstResult = result.current;

    // Rerender with the same locale
    rerender();

    // The result should be the same object reference
    expect(result.current).toBe(firstResult);
  });

  it('returns a new result for different locales', () => {
    const { result, rerender } = renderHook(({ locale }: { locale: string }) => useDays(locale), {
      initialProps: { locale: 'en' },
    });

    const firstResult = result.current;

    // Rerender with a different locale
    rerender({ locale: 'fr' });

    // The result should be a different object reference
    expect(result.current).not.toBe(firstResult);
  });
});
