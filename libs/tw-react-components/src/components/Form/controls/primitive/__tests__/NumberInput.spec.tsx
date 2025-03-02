import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { NumberInput } from '../NumberInput';

describe('NumberInput', () => {
  it('should render number input with correct type', () => {
    render(<NumberInput />);

    const input = screen.getByTestId('number-input-input');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'number');
  });

  it('should handle value changes', async () => {
    const onChange = jest.fn();
    render(<NumberInput value="" onChange={(event) => onChange(event.target.value)} />);

    const input = screen.getByTestId('number-input-input');
    await userEvent.type(input, '123');

    expect(onChange).toHaveBeenCalledTimes(3);
    expect(onChange).toHaveBeenNthCalledWith(1, '1');
    expect(onChange).toHaveBeenNthCalledWith(2, '2');
    expect(onChange).toHaveBeenNthCalledWith(3, '3');
  });

  it('should handle min and max constraints', async () => {
    const { container } = render(<NumberInput min={0} max={100} required />);
    const input = screen.getByTestId('number-input-input');

    await userEvent.type(input, '-1');
    expect(container.querySelector(':invalid')).toBeTruthy();

    await userEvent.clear(input);
    await userEvent.type(input, '101');
    expect(container.querySelector(':invalid')).toBeTruthy();

    await userEvent.clear(input);
    await userEvent.type(input, '50');
    expect(container.querySelector(':invalid')).toBeFalsy();
  });

  it('should handle step attribute', async () => {
    const { container } = render(<NumberInput step={0.5} required />);
    const input = screen.getByTestId('number-input-input');

    await userEvent.type(input, '1.7');
    expect(container.querySelector(':invalid')).toBeTruthy();

    await userEvent.clear(input);
    await userEvent.type(input, '1.5');
    expect(container.querySelector(':invalid')).toBeFalsy();
  });

  it('should pass through additional props to BasicInput', () => {
    render(<NumberInput label="Number Input" placeholder="Enter number" required disabled />);

    const input = screen.getByTestId('number-input-input');
    expect(screen.getByText('Number Input')).toBeInTheDocument();
    expect(input).toHaveAttribute('placeholder', 'Enter number');
    expect(input).toHaveAttribute('required');
    expect(input).toBeDisabled();
  });

  it('should handle clearable functionality', async () => {
    const onClear = jest.fn();
    const onChange = jest.fn();
    render(<NumberInput value="123" clearable onClear={onClear} onChange={onChange} />);

    const clearButton = screen.getByTestId('number-input-clear');
    await userEvent.click(clearButton);

    expect(onClear).toHaveBeenCalled();
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({ target: { value: '', checked: false } }),
    );
  });

  it('should prevent non-numeric input', async () => {
    const onChange = jest.fn();
    render(<NumberInput value="" onChange={onChange} />);

    const input = screen.getByTestId('number-input-input');
    await userEvent.type(input, 'abc');

    expect(onChange).not.toHaveBeenCalled();
    expect(input).toHaveValue(null);
  });
});
