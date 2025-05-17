import { act, fireEvent, render, screen } from '@testing-library/react';

import { ConfirmDialog } from '..';

describe('ConfirmDialog', () => {
  const defaultProps = {
    open: true,
    title: 'Confirm Action',
    onConfirm: jest.fn(),
    onClose: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the dialog with default props when open', () => {
    render(<ConfirmDialog {...defaultProps}>Are you sure?</ConfirmDialog>);

    // Check that the dialog content is rendered
    expect(screen.getByTestId('confirm-dialog-title')).toBeInTheDocument();
    expect(screen.getByText('Are you sure?')).toBeInTheDocument();
    expect(screen.getByTestId('confirm-dialog-yes-button')).toBeInTheDocument();
    expect(screen.getByTestId('confirm-dialog-no-button')).toBeInTheDocument();
  });

  it('does not render the dialog when closed', () => {
    render(
      <ConfirmDialog {...defaultProps} open={false}>
        Are you sure?
      </ConfirmDialog>,
    );

    // Check that the dialog content is not rendered
    expect(screen.queryByTestId('confirm-dialog-content')).not.toBeInTheDocument();
    expect(screen.queryByText('Are you sure?')).not.toBeInTheDocument();
    expect(screen.queryByTestId('confirm-dialog-yes-button')).not.toBeInTheDocument();
    expect(screen.queryByTestId('confirm-dialog-no-button')).not.toBeInTheDocument();
  });

  it('calls onConfirm and onClose when Yes button is clicked', async () => {
    render(<ConfirmDialog {...defaultProps}>Are you sure?</ConfirmDialog>);

    await act(async () => {
      // Click the Yes button
      fireEvent.click(screen.getByTestId('confirm-dialog-yes-button'));
    });

    // Check that onConfirm was called
    expect(defaultProps.onConfirm).toHaveBeenCalledTimes(1);
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when No button is clicked', () => {
    render(<ConfirmDialog {...defaultProps}>Are you sure?</ConfirmDialog>);

    // Click the No button
    fireEvent.click(screen.getByTestId('confirm-dialog-no-button'));

    // Check that onClose was called via the onOpenChange handler
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when dialog is closed', () => {
    render(<ConfirmDialog {...defaultProps}>Are you sure?</ConfirmDialog>);

    // Simulate dialog closing (by clicking the close button)
    fireEvent.click(screen.getByTestId('confirm-dialog-content-close-button'));

    // Check that onClose was called
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });

  it('renders custom button labels when provided', () => {
    const customProps = {
      ...defaultProps,
      yesLabel: 'Confirm',
      noLabel: 'Cancel',
    };

    render(<ConfirmDialog {...customProps}>Are you sure?</ConfirmDialog>);

    // Check that custom button labels are rendered
    const yesButton = screen.getByTestId('confirm-dialog-yes-button');
    const noButton = screen.getByTestId('confirm-dialog-no-button');
    expect(yesButton).toHaveTextContent('Confirm');
    expect(noButton).toHaveTextContent('Cancel');
  });

  it('renders ReactNode title correctly', () => {
    const customTitle = (
      <div>
        <span data-testid="custom-title-part">Custom</span> Title
      </div>
    );

    render(
      <ConfirmDialog {...defaultProps} title={customTitle}>
        Are you sure?
      </ConfirmDialog>,
    );

    // Check that the custom title is rendered correctly
    expect(screen.getByTestId('custom-title-part')).toBeInTheDocument();
    expect(screen.getByText('Title')).toBeInTheDocument();
  });

  it('uses custom dataTestId when provided', () => {
    const customDataTestId = 'custom-confirm-dialog';

    render(
      <ConfirmDialog {...defaultProps} dataTestId={customDataTestId}>
        Are you sure?
      </ConfirmDialog>,
    );

    // Check that custom dataTestId is used
    expect(screen.getByTestId(`${customDataTestId}-content`)).toBeInTheDocument();
    expect(screen.getByTestId(`${customDataTestId}-title`)).toBeInTheDocument();
    expect(screen.getByTestId(`${customDataTestId}-yes-button`)).toBeInTheDocument();
    expect(screen.getByTestId(`${customDataTestId}-no-button`)).toBeInTheDocument();
  });
});
