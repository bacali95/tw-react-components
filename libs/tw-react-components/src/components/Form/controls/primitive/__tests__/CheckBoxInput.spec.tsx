import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';

import { CheckboxInput } from '../CheckBoxInput';

describe('CheckboxInput', () => {
  it('should render checkbox input with correct type', () => {
    render(<CheckboxInput onChange={jest.fn()} />);

    const checkbox = screen.getByTestId('checkbox-input-checkbox');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toHaveAttribute('type', 'checkbox');
  });

  it('should handle checked state changes', async () => {
    const onChange = jest.fn();
    const Wrapper = () => {
      const [checked, setChecked] = useState(false);

      return (
        <CheckboxInput
          checked={checked}
          onChange={(event) => {
            setChecked(event.target.checked);
            onChange(event.target.checked);
          }}
        />
      );
    };

    render(<Wrapper />);

    const checkbox = screen.getByTestId('checkbox-input-checkbox');
    await userEvent.click(checkbox);

    expect(onChange).toHaveBeenCalledWith(true);
    expect((checkbox as HTMLInputElement).checked).toBe(true);

    await userEvent.click(checkbox);
    expect(onChange).toHaveBeenCalledWith(false);
    expect((checkbox as HTMLInputElement).checked).toBe(false);
  });

  it('should render with label', () => {
    render(<CheckboxInput label="Test Checkbox" onChange={jest.fn()} />);

    const container = screen.getByTestId('checkbox-input');
    const checkbox = screen.getByTestId('checkbox-input-checkbox');
    const label = screen.getByText('Test Checkbox');

    expect(container).toContainElement(checkbox);
    expect(container).toContainElement(label);
    // Verify label comes after checkbox in the DOM
    expect(checkbox.compareDocumentPosition(label)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
  });

  it('should handle disabled state', () => {
    render(<CheckboxInput disabled onChange={jest.fn()} />);

    const checkbox = screen.getByTestId('checkbox-input-checkbox');
    expect(checkbox).toBeDisabled();
    expect(checkbox).toHaveClass('opacity-60');
  });

  it('should apply error styles when hasErrors is true', () => {
    render(<CheckboxInput hasErrors onChange={jest.fn()} />);

    const checkbox = screen.getByTestId('checkbox-input-checkbox');
    expect(checkbox).toHaveClass('bg-red-100');
  });

  it('should handle different sizes', () => {
    const { rerender } = render(<CheckboxInput size="small" onChange={jest.fn()} />);

    let checkbox = screen.getByTestId('checkbox-input-checkbox');
    expect(checkbox).toHaveClass('w-3', 'h-3');

    rerender(<CheckboxInput size="medium" onChange={jest.fn()} />);
    checkbox = screen.getByTestId('checkbox-input-checkbox');
    expect(checkbox).toHaveClass('w-4', 'h-4');
  });

  it('should pass through additional props to BasicInput', () => {
    const onFocus = jest.fn();
    render(
      <CheckboxInput
        label="Test Checkbox"
        required
        disabled
        onFocus={onFocus}
        onChange={jest.fn()}
      />,
    );

    const checkbox = screen.getByTestId('checkbox-input-checkbox');
    expect(screen.getByText('Test Checkbox')).toBeInTheDocument();
    expect(checkbox).toHaveAttribute('required');
    expect(checkbox).toBeDisabled();
  });
});
