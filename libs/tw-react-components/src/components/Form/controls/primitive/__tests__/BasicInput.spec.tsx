import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { XIcon } from 'lucide-react';

import { BasicInput } from '../BasicInput';

describe('BasicInput', () => {
  describe('Text Input', () => {
    it('should render text input with default props', () => {
      render(<BasicInput />);

      const input = screen.getByTestId('basic-input-input');
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute('type', 'text');
      expect(input).toHaveClass('text-base', 'md:text-sm', 'py-1', 'px-3', 'h-9'); // medium size classes
    });

    it('should handle value changes', async () => {
      const onChange = jest.fn();
      render(
        <BasicInput
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChange(event.target.value)}
        />,
      );

      const input = screen.getByTestId('basic-input-input');
      await userEvent.type(input, 'test');

      expect(input).toHaveValue('test');
      expect(onChange).toHaveBeenCalledTimes(4);
      for (let i = 0; i < 4; i++) {
        expect(onChange).toHaveBeenNthCalledWith(i + 1, 'test'.slice(0, i + 1));
      }
    });

    it.skip('should render with label and description', async () => {
      render(<BasicInput label="Test Label" description="Test description" />);

      expect(screen.getByText('Test Label')).toBeInTheDocument();

      await userEvent.hover(screen.getByTestId('basic-input-label-description-tooltip-trigger'));

      await waitFor(() => {
        expect(screen.getByText('Test description')).toBeInTheDocument();
      });
    });

    it('should apply error styles when hasErrors is true', () => {
      render(<BasicInput hasErrors />);

      const input = screen.getByTestId('basic-input-wrapper');
      expect(input).toHaveClass(
        'aria-invalid:!ring-destructive/20 dark:aria-invalid:!ring-destructive/40 aria-invalid:[&>input,&>textarea,&>div]:border-destructive',
      );
    });

    it('should handle clearable functionality', async () => {
      const onClear = jest.fn();
      const onChange = jest.fn();
      render(<BasicInput value="test" clearable onClear={onClear} onChange={onChange} />);

      const clearButton = screen.getByTestId('basic-input-clear');
      await userEvent.click(clearButton);

      expect(onClear).toHaveBeenCalled();
      expect(onChange).toHaveBeenCalledWith(
        expect.objectContaining({ target: { value: '', checked: false } }),
      );
    });

    it('should render with suffix icon', async () => {
      const onSuffixClick = jest.fn();
      render(<BasicInput suffixIcon={XIcon} onSuffixIconClick={onSuffixClick} />);

      const suffix = screen.getByTestId('basic-input-suffix');
      expect(suffix).toBeInTheDocument();

      await userEvent.click(suffix);
      expect(onSuffixClick).toHaveBeenCalled();
    });

    it('should apply different sizes correctly', () => {
      const { rerender } = render(<BasicInput size="small" />);

      let input = screen.getByTestId('basic-input-input');
      expect(input).toHaveClass('text-sm', 'md:text-xs', 'py-0.5', 'px-2', 'h-6');

      rerender(<BasicInput size="medium" />);
      input = screen.getByTestId('basic-input-input');
      expect(input).toHaveClass('text-base', 'md:text-sm', 'py-1', 'px-3', 'h-9');
    });

    it('should handle disabled state', () => {
      render(<BasicInput disabled />);

      const input = screen.getByTestId('basic-input-input');
      expect(input).toBeDisabled();
      expect(input).toHaveClass('disabled:opacity-50');
    });
  });

  describe('Textarea Input', () => {
    it('should render textarea when type is textarea', () => {
      render(<BasicInput type="textarea" />);

      const textarea = screen.getByTestId('basic-input-textarea');
      expect(textarea).toBeInTheDocument();
      expect(textarea.tagName.toLowerCase()).toBe('textarea');
    });

    it('should handle textarea value changes', async () => {
      const onChange = jest.fn();
      render(<BasicInput type="textarea" onChange={(event) => onChange(event.target.value)} />);

      const textarea = screen.getByTestId('basic-input-textarea');
      await userEvent.type(textarea, 'test');

      expect(textarea).toHaveValue('test');
      expect(onChange).toHaveBeenCalledTimes(4);
      for (let i = 0; i < 4; i++) {
        expect(onChange).toHaveBeenNthCalledWith(i + 1, 'test'.slice(0, i + 1));
      }
    });
  });

  describe('Checkbox Input', () => {
    it('should render checkbox when type is checkbox', () => {
      render(<BasicInput type="checkbox" onChange={jest.fn()} />);

      const checkbox = screen.getByTestId('basic-input-checkbox');
      expect(checkbox).toBeInTheDocument();
      expect(checkbox).toHaveAttribute('type', 'checkbox');
    });

    it('should handle checkbox state changes', async () => {
      const onChange = jest.fn();
      render(
        <BasicInput
          type="checkbox"
          checked={false}
          onChange={(event) => onChange(event.target.checked)}
        />,
      );

      const checkbox = screen.getByTestId('basic-input-checkbox');
      await userEvent.click(checkbox);

      expect(onChange).toHaveBeenCalledWith(true);
    });

    it('should render label after checkbox when type is checkbox', () => {
      render(<BasicInput type="checkbox" label="Checkbox Label" onChange={jest.fn()} />);

      const container = screen.getByTestId('basic-input');
      const checkbox = screen.getByTestId('basic-input-checkbox');
      const label = screen.getByText('Checkbox Label');

      expect(container).toContainElement(checkbox);
      expect(container).toContainElement(label);
      // Verify label comes after checkbox in the DOM
      expect(checkbox.compareDocumentPosition(label)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
    });
  });

  describe('BasicInputExtension', () => {
    it('should apply correct styles based on props', () => {
      render(<BasicInput suffixIcon={XIcon} hasErrors disabled />);

      const extension = screen.getByTestId('basic-input-suffix');
      expect(extension).toHaveClass('aria-disabled:opacity-50');
    });

    it('should handle click events', async () => {
      const onSuffixClick = jest.fn();
      render(<BasicInput suffixIcon={XIcon} onSuffixIconClick={onSuffixClick} />);

      const extension = screen.getByTestId('basic-input-suffix');
      await userEvent.click(extension);

      expect(onSuffixClick).toHaveBeenCalled();
    });
  });
});
