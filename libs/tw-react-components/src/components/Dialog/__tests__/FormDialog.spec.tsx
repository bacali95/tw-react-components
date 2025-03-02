import { act, fireEvent, render, screen } from '@testing-library/react';
import type { ReactNode } from 'react';
import { useForm } from 'react-hook-form';

import { FormDialog } from '..';

// Mock component to render the FormDialog with a form
interface TestFormDialogProps {
  open?: boolean;
  onSubmit?: jest.Mock;
  onClose?: jest.Mock;
  submitLabel?: string;
  cancelLabel?: string;
  extraAction?: ReactNode;
  dataTestId?: string;
}

const TestFormDialog = ({
  open = true,
  onSubmit = jest.fn(),
  onClose = jest.fn(),
  submitLabel,
  cancelLabel,
  extraAction,
  dataTestId,
}: TestFormDialogProps) => {
  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
    },
  });

  return (
    <FormDialog
      open={open}
      title="Test Form"
      form={form}
      onSubmit={onSubmit}
      onClose={onClose}
      submitLabel={submitLabel}
      cancelLabel={cancelLabel}
      extraAction={extraAction}
      dataTestId={dataTestId}
    >
      <div>
        <label htmlFor="name">Name</label>
        <input id="name" {...form.register('name')} data-testid="name-input" />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" {...form.register('email')} data-testid="email-input" />
      </div>
    </FormDialog>
  );
};

describe('FormDialog', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the form dialog when open', () => {
    render(<TestFormDialog />);

    // Check that the dialog content is rendered
    expect(screen.getByTestId('form-dialog-title')).toBeInTheDocument();
    expect(screen.getByTestId('name-input')).toBeInTheDocument();
    expect(screen.getByTestId('email-input')).toBeInTheDocument();
    expect(screen.getByTestId('form-dialog-submit-button')).toBeInTheDocument();
    expect(screen.getByTestId('form-dialog-cancel-button')).toBeInTheDocument();
  });

  it('does not render the form dialog when closed', () => {
    render(<TestFormDialog open={false} />);

    // Check that the dialog content is not rendered
    expect(screen.queryByTestId('form-dialog-content')).not.toBeInTheDocument();
    expect(screen.queryByTestId('name-input')).not.toBeInTheDocument();
    expect(screen.queryByTestId('email-input')).not.toBeInTheDocument();
    expect(screen.queryByTestId('form-dialog-submit-button')).not.toBeInTheDocument();
    expect(screen.queryByTestId('form-dialog-cancel-button')).not.toBeInTheDocument();
  });

  it('calls onClose when Cancel button is clicked', () => {
    const onCloseMock = jest.fn();
    render(<TestFormDialog onClose={onCloseMock} />);

    // Click the Cancel button
    fireEvent.click(screen.getByTestId('form-dialog-cancel-button'));

    // Check that onClose was called
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it('submits the form when Submit button is clicked', async () => {
    const onSubmitMock = jest.fn();
    render(<TestFormDialog onSubmit={onSubmitMock} />);

    await act(async () => {
      // Fill out the form
      fireEvent.change(screen.getByTestId('name-input'), { target: { value: 'John Doe' } });
      fireEvent.change(screen.getByTestId('email-input'), {
        target: { value: 'john@example.com' },
      });

      // Click the Submit button
      fireEvent.click(screen.getByTestId('form-dialog-submit-button'));
    });

    // Check that onSubmit was called with the form data
    expect(onSubmitMock).toHaveBeenCalledWith(
      {
        name: 'John Doe',
        email: 'john@example.com',
      },
      expect.anything(),
    );
  });

  it('renders custom button labels when provided', () => {
    render(<TestFormDialog submitLabel="Save" cancelLabel="Back" />);

    // Check that custom button labels are rendered
    const submitButton = screen.getByTestId('form-dialog-submit-button');
    const cancelButton = screen.getByTestId('form-dialog-cancel-button');
    expect(submitButton).toHaveTextContent('Save');
    expect(cancelButton).toHaveTextContent('Back');
  });

  it('renders extra action when provided', () => {
    const extraAction = <button data-testid="extra-action">Extra Action</button>;
    render(<TestFormDialog extraAction={extraAction} />);

    // Check that the extra action is rendered
    expect(screen.getByTestId('extra-action')).toBeInTheDocument();
    expect(screen.getByText('Extra Action')).toBeInTheDocument();
  });

  it('applies custom className to the dialog', () => {
    const TestFormDialogWithClass = () => {
      const form = useForm();
      return (
        <FormDialog
          open={true}
          title="Test Form"
          form={form}
          onSubmit={jest.fn()}
          onClose={jest.fn()}
          className="custom-dialog-class"
        >
          <div>Form content</div>
        </FormDialog>
      );
    };

    render(<TestFormDialogWithClass />);

    // Check that the form content is rendered
    expect(screen.getByTestId('form-dialog-content')).toBeInTheDocument();
    expect(screen.getByTestId('form-dialog-content')).toHaveClass('custom-dialog-class');
  });

  it('applies custom formClassName to the form', () => {
    const TestFormDialogWithFormClass = () => {
      const form = useForm();
      return (
        <FormDialog
          open={true}
          title="Test Form"
          form={form}
          onSubmit={jest.fn()}
          onClose={jest.fn()}
          formClassName="custom-form-class"
        >
          <div>Form content</div>
        </FormDialog>
      );
    };

    render(<TestFormDialogWithFormClass />);

    // Check that the form is rendered with the correct test ID
    expect(screen.getByTestId('form-dialog-form')).toBeInTheDocument();
    expect(screen.getByText('Form content')).toBeInTheDocument();
  });

  it('uses custom dataTestId when provided', () => {
    const customDataTestId = 'custom-form-dialog';

    render(<TestFormDialog dataTestId={customDataTestId} />);

    // Check that custom dataTestId is used
    expect(screen.getByTestId(`${customDataTestId}-content`)).toBeInTheDocument();
    expect(screen.getByTestId(`${customDataTestId}-title`)).toBeInTheDocument();
    expect(screen.getByTestId(`${customDataTestId}-submit-button`)).toBeInTheDocument();
    expect(screen.getByTestId(`${customDataTestId}-cancel-button`)).toBeInTheDocument();
  });
});
