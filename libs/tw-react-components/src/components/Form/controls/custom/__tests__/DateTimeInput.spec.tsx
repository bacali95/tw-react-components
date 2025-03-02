import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';

import { DateTimeInput } from '../date-time';

describe('DateTimeInput', () => {
  it('should render with correct structure', () => {
    render(<DateTimeInput />);

    const input = screen.getByTestId('date-time-input');
    expect(input).toBeInTheDocument();
    expect(screen.getByTestId('date-time-input-suffix')).toBeInTheDocument();
  });

  it('should display formatted date value', () => {
    const date = new Date('2024-03-15T14:30:00');
    render(<DateTimeInput value={date} />);

    const input = screen.getByTestId('date-time-input-input');
    expect(input).toHaveValue('Friday, March 15th 2024, 14:30:00');
  });

  it('should open popup on input click', async () => {
    render(<DateTimeInput />);

    const input = screen.getByTestId('date-time-input-input');
    await userEvent.click(input);

    expect(screen.getByTestId('date-time-input-popup')).toBeInTheDocument();
    expect(screen.getByTestId('date-time-input-date-selector')).toBeInTheDocument();
    expect(screen.getByTestId('date-time-input-time-selector')).toBeInTheDocument();
  });

  it('should handle date selection', async () => {
    const onChange = jest.fn();
    const initialDate = new Date('2024-03-15T14:30:00');
    render(<DateTimeInput type="date" value={initialDate} onChange={onChange} />);

    // Open the popup
    await userEvent.click(screen.getByTestId('date-time-input-input'));

    // Select a different date
    const dateCell = screen.getByTestId('date-time-input-date-selector-days-day-20');
    await userEvent.click(dateCell);

    expect(onChange).toHaveBeenCalled();
    const selectedDate = onChange.mock.calls[0][0];
    expect(selectedDate.getDate()).toBe(20);
    expect(selectedDate.getMonth()).toBe(2); // March
    expect(selectedDate.getFullYear()).toBe(2024);
  });

  it('should handle time selection', async () => {
    const onChange = jest.fn();

    const Wrapper = () => {
      const [value, setValue] = useState<Date | null | undefined>(new Date('2024-03-15T14:30:00'));

      return (
        <DateTimeInput
          type="time"
          value={value}
          onChange={(date) => {
            setValue(date);
            onChange(date);
          }}
        />
      );
    };

    render(<Wrapper />);

    await userEvent.click(screen.getByTestId('date-time-input-input'));

    // Find and interact with time selectors
    const hourInput = screen.getByTestId('date-time-input-time-selector-hours-up');
    const minuteInput = screen.getByTestId('date-time-input-time-selector-minutes-up');

    await userEvent.click(hourInput);
    for (let i = 0; i < 15; i++) {
      await userEvent.click(minuteInput);
    }

    await userEvent.click(screen.getByTestId('date-time-input-ok'));

    expect(onChange).toHaveBeenCalled();
    const selectedTime = onChange.mock.calls.at(-1)?.[0];
    expect(selectedTime.getHours()).toBe(15);
    expect(selectedTime.getMinutes()).toBe(45);
  });

  it('should handle min and max date constraints', async () => {
    const currentDate = new Date('2024-03-15T14:30:00');
    const minDate = new Date('2024-03-10T00:00:00');
    const maxDate = new Date('2024-03-20T23:59:59');

    render(<DateTimeInput value={currentDate} minDate={minDate} maxDate={maxDate} />);

    // Open the popup
    await userEvent.click(screen.getByTestId('date-time-input-input'));

    // Dates before minDate should be disabled
    const disabledDate = screen.getAllByTestId('date-time-input-date-selector-days-day-5')[0];
    expect(disabledDate).toHaveClass('text-slate-400 dark:text-slate-500');

    // Dates after maxDate should be disabled
    const disabledFutureDate = screen.getAllByTestId(
      'date-time-input-date-selector-days-day-25',
    )[0];
    expect(disabledFutureDate).toHaveClass('text-slate-400 dark:text-slate-500');

    // Dates within range should be enabled
    const enabledDate = screen.getByTestId('date-time-input-date-selector-days-day-15');
    expect(enabledDate).toHaveClass('bg-blue-500 text-white');
  });

  it('should handle keyboard navigation', async () => {
    render(<DateTimeInput />);

    const input = screen.getByTestId('date-time-input-input');
    await userEvent.click(input);
    await userEvent.keyboard('{Escape}');

    expect(screen.queryByTestId('date-time-input-popup')).not.toBeInTheDocument();

    await userEvent.keyboard(' ');
    expect(screen.getByTestId('date-time-input-popup')).toBeInTheDocument();
  });

  it('should handle clearable prop', async () => {
    const onChange = jest.fn();
    const date = new Date('2024-03-15T14:30:00');
    render(<DateTimeInput value={date} onChange={onChange} clearable />);

    const clearButton = screen.getByTestId('date-time-input-clear');
    await userEvent.click(clearButton);

    expect(onChange).toHaveBeenCalledWith(null);
  });

  it('should handle different display formats', () => {
    const date = new Date('2024-03-15T14:30:00');
    render(<DateTimeInput value={date} displayFormat="YYYY-MM-DD HH:mm" displayLocale="en" />);

    const input = screen.getByTestId('date-time-input-input');
    expect(input).toHaveValue('2024-03-15 14:30');
  });

  it('should handle disabled state', () => {
    render(<DateTimeInput disabled />);

    const input = screen.getByTestId('date-time-input-input');
    expect(input).toBeDisabled();
  });

  it('should handle read-only state', async () => {
    render(<DateTimeInput readOnly />);

    const input = screen.getByTestId('date-time-input-input');
    await userEvent.click(input);

    expect(screen.queryByTestId('date-time-input-popup')).not.toBeInTheDocument();
  });

  it('should render different icons based on type', () => {
    const { rerender } = render(<DateTimeInput type="date" />);
    expect(screen.getByTestId('date-time-input-suffix').querySelector('svg')).toHaveClass(
      'lucide-calendar',
    );

    rerender(<DateTimeInput type="time" />);
    expect(screen.getByTestId('date-time-input-suffix').querySelector('svg')).toHaveClass(
      'lucide-clock',
    );
  });
});
