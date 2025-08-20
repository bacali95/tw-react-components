import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { TextareaInput } from '../TextareaInput';

describe('TextareaInput', () => {
  it('should render textarea element', () => {
    render(<TextareaInput />);

    const textarea = screen.getByTestId('textarea-input-textarea');
    expect(textarea).toBeInTheDocument();
    expect(textarea.tagName.toLowerCase()).toBe('textarea');
  });

  it('should handle value changes', async () => {
    const onChange = jest.fn();
    render(<TextareaInput onChange={(event) => onChange(event.target.value)} />);

    const textarea = screen.getByTestId('textarea-input-textarea');
    await userEvent.type(textarea, 'test\ntext');

    expect(textarea).toHaveValue('test\ntext');
    expect(onChange).toHaveBeenCalledTimes(9);
    for (let i = 0; i < 9; i++) {
      expect(onChange).toHaveBeenNthCalledWith(i + 1, 'test\ntext'.slice(0, i + 1));
    }
  });

  it('should handle multiline input', async () => {
    render(<TextareaInput />);

    const textarea = screen.getByTestId('textarea-input-textarea');
    await userEvent.type(textarea, 'Line 1{enter}Line 2{enter}Line 3');

    expect(textarea).toHaveValue('Line 1\nLine 2\nLine 3');
  });

  it('should pass through additional props to BasicInput', () => {
    render(
      <TextareaInput label="Textarea Input" placeholder="Enter text" required disabled rows={5} />,
    );

    const textarea = screen.getByTestId('textarea-input-textarea');
    expect(screen.getByText('Textarea Input')).toBeInTheDocument();
    expect(textarea).toHaveAttribute('placeholder', 'Enter text');
    expect(textarea).toHaveAttribute('required');
    expect(textarea).toBeDisabled();
    expect(textarea).toHaveAttribute('rows', '5');
  });

  it('should handle clearable functionality', async () => {
    const onClear = jest.fn();
    const onChange = jest.fn();
    render(<TextareaInput value="test text" clearable onClear={onClear} onChange={onChange} />);

    const clearButton = screen.getByTestId('textarea-input-clear');
    await userEvent.click(clearButton);

    expect(onClear).toHaveBeenCalled();
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({ target: { value: '', checked: false } }),
    );
  });

  it('should apply error styles when hasErrors is true', () => {
    render(<TextareaInput hasErrors />);

    const textarea = screen.getByTestId('textarea-input-wrapper');
    expect(textarea).toHaveClass(
      'aria-invalid:!ring-destructive/20 dark:aria-invalid:!ring-destructive/40 aria-invalid:[&>input,&>textarea,&>div]:border-destructive',
    );
  });
});
