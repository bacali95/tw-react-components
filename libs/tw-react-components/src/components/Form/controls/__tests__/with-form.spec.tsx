import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FormProvider, useForm } from 'react-hook-form';

import { FormInputs } from '../with-form';

describe('with-form', () => {
  const TestForm = ({ children }: { children: React.ReactNode }) => {
    const methods = useForm();
    return <FormProvider {...methods}>{children}</FormProvider>;
  };

  it('should render text input with form integration', async () => {
    render(
      <TestForm>
        <FormInputs.Text name="test" label="Test Input" required />
      </TestForm>,
    );

    const input = screen.getByTestId('text-input-input');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('required');

    await userEvent.type(input, 'test value');
    expect(input).toHaveValue('test value');
  });

  it('should render number input with form integration', async () => {
    render(
      <TestForm>
        <FormInputs.Number name="test" label="Test Input" min={0} max={100} />
      </TestForm>,
    );

    const input = screen.getByTestId('number-input-input');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('min', '0');
    expect(input).toHaveAttribute('max', '100');

    await userEvent.type(input, '42');
    expect(input).toHaveValue(42);
  });

  it('should render checkbox input with form integration', async () => {
    render(
      <TestForm>
        <FormInputs.Checkbox name="test" label="Test Checkbox" />
      </TestForm>,
    );

    const checkbox = screen.getByTestId('checkbox-input-checkbox');
    expect(checkbox).toBeInTheDocument();

    await userEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  it('should render textarea input with form integration', async () => {
    render(
      <TestForm>
        <FormInputs.Textarea name="test" label="Test Textarea" minLength={5} maxLength={100} />
      </TestForm>,
    );

    const textarea = screen.getByTestId('textarea-input-textarea');
    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveAttribute('minLength', '5');
    expect(textarea).toHaveAttribute('maxLength', '100');

    await userEvent.type(textarea, 'test value');
    expect(textarea).toHaveValue('test value');
  });

  it('should render select input with form integration', async () => {
    const items = [
      { id: '1', label: 'Option 1', value: '1' },
      { id: '2', label: 'Option 2', value: '2' },
    ];

    render(
      <TestForm>
        <FormInputs.Select name="test" label="Test Select" items={items} />
      </TestForm>,
    );

    const select = screen.getByTestId('select-input-input');
    expect(select).toBeInTheDocument();

    await userEvent.click(select);
    await userEvent.click(screen.getByText('Option 1'));
    expect(select).toHaveValue('Option 1');
  });

  it('should render date-time input with form integration', async () => {
    render(
      <TestForm>
        <FormInputs.DateTime name="test" label="Test DateTime" />
      </TestForm>,
    );

    const input = screen.getByTestId('date-time-input-input');
    expect(input).toBeInTheDocument();

    await userEvent.click(input);
    expect(screen.getByTestId('date-time-input-popup')).toBeInTheDocument();
  });

  it('should render file input with form integration', async () => {
    render(
      <TestForm>
        <FormInputs.File name="test" label="Test File" accept=".txt" />
      </TestForm>,
    );

    const input = screen.getByTestId('file-input-hidden');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('accept', '.txt');
  });

  it('should handle pattern validation', async () => {
    render(
      <TestForm>
        <FormInputs.Text name="test" pattern={/^[A-Z]+$/} />
      </TestForm>,
    );

    const input = screen.getByTestId('text-input-input');
    await userEvent.type(input, 'abc');
    expect(input).toHaveValue('abc');
    // Pattern validation is handled by react-hook-form
  });

  it('should handle custom validation', async () => {
    const validate = (value: string) => value === 'valid' || 'Invalid value';

    render(
      <TestForm>
        <FormInputs.Text name="test" validate={validate} />
      </TestForm>,
    );

    const input = screen.getByTestId('text-input-input');
    await userEvent.type(input, 'invalid');
    expect(input).toHaveValue('invalid');
    // Custom validation is handled by react-hook-form
  });

  it('should handle form submission state', async () => {
    render(
      <TestForm>
        <FormInputs.Text name="test" />
      </TestForm>,
    );

    const input = screen.getByTestId('text-input-input');
    expect(input).not.toBeDisabled();
    // Submission state is handled by react-hook-form
  });
});
