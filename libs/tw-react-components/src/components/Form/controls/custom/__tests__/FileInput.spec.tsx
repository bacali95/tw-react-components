import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { FileInput } from '../file';

describe('FileInput', () => {
  it('should render file input with correct structure', () => {
    render(<FileInput />);

    const visibleInput = screen.getByTestId('file-input-input');
    const hiddenInput = screen.getByTestId('file-input-hidden');
    const uploadIcon = screen.getByTestId('file-input-suffix');

    expect(visibleInput).toBeInTheDocument();
    expect(hiddenInput).toBeInTheDocument();
    expect(uploadIcon).toBeInTheDocument();
    expect(uploadIcon.querySelector('svg')).toHaveClass('lucide-cloud-upload');
  });

  it('should handle file selection', async () => {
    const onChange = jest.fn();
    const onFileChange = jest.fn();
    const file = new File(['test content'], 'test.txt', { type: 'text/plain' });

    render(<FileInput onChange={onChange} onFileChange={onFileChange} />);

    const hiddenInput = screen.getByTestId('file-input-hidden');
    await userEvent.upload(hiddenInput, file);

    expect(onChange).toHaveBeenCalledWith('test.txt');
    expect(onFileChange).toHaveBeenCalledWith(file);
  });

  it('should trigger file selection when clicking input or icon', async () => {
    render(<FileInput />);

    const visibleInput = screen.getByTestId('file-input-input');
    const uploadIcon = screen.getByTestId('file-input-suffix');
    const hiddenInput = screen.getByTestId('file-input-hidden');

    // Mock click on hidden input
    const clickSpy = jest.spyOn(hiddenInput, 'click');

    // Click visible input
    await userEvent.click(visibleInput);
    expect(clickSpy).toHaveBeenCalledTimes(1);

    // Click upload icon
    await userEvent.click(uploadIcon);
    expect(clickSpy).toHaveBeenCalledTimes(2);
  });

  it('should display selected file name', () => {
    render(<FileInput value="test.txt" />);

    const visibleInput = screen.getByTestId('file-input-input');
    expect(visibleInput).toHaveValue('test.txt');
  });

  it('should handle file type restrictions', async () => {
    render(<FileInput accept=".txt,text/plain" />);

    const hiddenInput = screen.getByTestId('file-input-hidden');
    expect(hiddenInput).toHaveAttribute('accept', '.txt,text/plain');
  });

  it('should pass through additional props', () => {
    render(
      <FileInput label="Upload File" placeholder="Choose a file" required disabled hasErrors />,
    );

    const visibleInput = screen.getByTestId('file-input-input');
    expect(screen.getByText('Upload File')).toBeInTheDocument();
    expect(visibleInput).toHaveAttribute('placeholder', 'Choose a file');
    expect(visibleInput).toHaveAttribute('required');
    expect(visibleInput).toBeDisabled();
    expect(visibleInput).toHaveClass('text-red-600', 'border-red-500');
  });

  it('should handle disabled state', () => {
    render(<FileInput disabled />);

    const visibleInput = screen.getByTestId('file-input-input');
    const uploadIcon = screen.getByTestId('file-input-suffix');

    expect(visibleInput).toBeDisabled();
    expect(uploadIcon).toHaveClass('opacity-60');
  });

  it('should apply custom classes', () => {
    render(
      <FileInput
        className="custom-wrapper"
        inputClassName="custom-input"
        extensionClassName="custom-extension"
      />,
    );

    const wrapper = screen.getByTestId('file-input');
    const input = screen.getByTestId('file-input-input');
    const extension = screen.getByTestId('file-input-suffix');

    expect(wrapper).toHaveClass('custom-wrapper');
    expect(input).toHaveClass('custom-input');
    expect(extension).toHaveClass('custom-extension');
  });
});
