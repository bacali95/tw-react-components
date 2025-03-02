import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { EmailInput } from '../EmailInput';

describe('EmailInput', () => {
  it('should render email input with correct type', () => {
    render(<EmailInput />);

    const input = screen.getByTestId('email-input-input');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'email');
  });

  it('should handle value changes', async () => {
    const onChange = jest.fn();
    render(<EmailInput onChange={(event) => onChange(event.target.value)} />);

    const input = screen.getByTestId('email-input-input');
    await userEvent.type(input, 'test@example.com');

    expect(input).toHaveValue('test@example.com');
    expect(onChange).toHaveBeenCalledTimes(16);
    for (let i = 0; i < 16; i++) {
      expect(onChange).toHaveBeenNthCalledWith(i + 1, 'test@example.com'.slice(0, i + 1));
    }
  });

  it('should validate email format', async () => {
    const { container } = render(<EmailInput required />);
    const input = screen.getByTestId('email-input-input');

    await userEvent.type(input, 'invalid-email');
    expect(container.querySelector(':invalid')).toBeTruthy();

    await userEvent.clear(input);
    await userEvent.type(input, 'valid@email.com');
    expect(container.querySelector(':invalid')).toBeFalsy();
  });

  it('should pass through additional props to BasicInput', () => {
    render(<EmailInput label="Email Input" placeholder="Enter email" required disabled />);

    const input = screen.getByTestId('email-input-input');
    expect(screen.getByText('Email Input')).toBeInTheDocument();
    expect(input).toHaveAttribute('placeholder', 'Enter email');
    expect(input).toHaveAttribute('required');
    expect(input).toBeDisabled();
  });
});
