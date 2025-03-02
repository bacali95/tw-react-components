import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { TextInput } from '../TextInput';

describe('TextInput', () => {
  it('should render text input with correct type', () => {
    render(<TextInput />);

    const input = screen.getByTestId('text-input-input');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'text');
  });

  it('should handle value changes', async () => {
    const onChange = jest.fn();
    render(<TextInput onChange={(event) => onChange(event.target.value)} />);

    const input = screen.getByTestId('text-input-input');
    await userEvent.type(input, 'test');

    expect(input).toHaveValue('test');
    expect(onChange).toHaveBeenCalledTimes(4);
    for (let i = 0; i < 4; i++) {
      expect(onChange).toHaveBeenNthCalledWith(i + 1, 'test'.slice(0, i + 1));
    }
  });

  it('should pass through additional props to BasicInput', () => {
    render(<TextInput label="Text Input" placeholder="Enter text" required disabled />);

    const input = screen.getByTestId('text-input-input');
    expect(screen.getByText('Text Input')).toBeInTheDocument();
    expect(input).toHaveAttribute('placeholder', 'Enter text');
    expect(input).toHaveAttribute('required');
    expect(input).toBeDisabled();
  });
});
