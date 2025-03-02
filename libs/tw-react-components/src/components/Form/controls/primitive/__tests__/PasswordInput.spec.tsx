import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { PasswordInput } from '../PasswordInput';

describe('PasswordInput', () => {
  it('should render password input with correct type', () => {
    render(<PasswordInput />);

    const input = screen.getByTestId('password-input-input');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'password');
  });

  it('should handle value changes', async () => {
    const onChange = jest.fn();
    render(<PasswordInput onChange={(event) => onChange(event.target.value)} />);

    const input = screen.getByTestId('password-input-input');
    await userEvent.type(input, 'password123');

    expect(input).toHaveValue('password123');
    expect(onChange).toHaveBeenCalledTimes(11);
    for (let i = 0; i < 11; i++) {
      expect(onChange).toHaveBeenNthCalledWith(i + 1, 'password123'.slice(0, i + 1));
    }
  });

  it('should toggle password visibility', async () => {
    render(<PasswordInput value="password123" onChange={jest.fn()} />);

    const input = screen.getByTestId('password-input-input');
    const toggleButton = screen.getByTestId('password-input-suffix');

    // Initial state - password hidden
    expect(input).toHaveAttribute('type', 'password');
    expect(toggleButton.querySelector('svg')).toHaveClass('lucide-eye');

    // Click to show password
    await userEvent.click(toggleButton);
    expect(input).toHaveAttribute('type', 'text');
    expect(toggleButton.querySelector('svg')).toHaveClass('lucide-eye-off');

    // Click to hide password
    await userEvent.click(toggleButton);
    expect(input).toHaveAttribute('type', 'password');
    expect(toggleButton.querySelector('svg')).toHaveClass('lucide-eye');
  });

  it('should pass through additional props to BasicInput', () => {
    render(<PasswordInput label="Password Input" placeholder="Enter password" required disabled />);

    const input = screen.getByTestId('password-input-input');
    expect(screen.getByText('Password Input')).toBeInTheDocument();
    expect(input).toHaveAttribute('placeholder', 'Enter password');
    expect(input).toHaveAttribute('required');
    expect(input).toBeDisabled();
  });

  it('should handle clearable functionality', async () => {
    const onClear = jest.fn();
    const onChange = jest.fn();
    render(<PasswordInput value="password123" clearable onClear={onClear} onChange={onChange} />);

    const clearButton = screen.getByTestId('password-input-clear');
    await userEvent.click(clearButton);

    expect(onClear).toHaveBeenCalled();
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({ target: { value: '', checked: false } }),
    );
  });

  it('should maintain password visibility state when value changes', async () => {
    const { rerender } = render(<PasswordInput value="password123" onChange={jest.fn()} />);

    const input = screen.getByTestId('password-input-input');
    const toggleButton = screen.getByTestId('password-input-suffix');

    // Show password
    await userEvent.click(toggleButton);
    expect(input).toHaveAttribute('type', 'text');

    // Update value
    rerender(<PasswordInput value="newpassword" />);

    // Password should still be visible
    expect(input).toHaveAttribute('type', 'text');
    expect(input).toHaveValue('newpassword');
  });
});
