import { fireEvent, render, screen } from '@testing-library/react';

import { Dialog } from '..';

describe('Dialog', () => {
  // Test basic rendering
  it('renders the dialog when open', () => {
    const onOpenChangeMock = jest.fn();

    render(
      <Dialog open={true} onOpenChange={onOpenChangeMock}>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>Test Dialog</Dialog.Title>
            <Dialog.Description>This is a test dialog</Dialog.Description>
          </Dialog.Header>
          <div>Dialog content</div>
          <Dialog.Footer>
            <Dialog.Close asChild>
              <button data-testid="dialog-close-button">Close</button>
            </Dialog.Close>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog>,
    );

    // Check that the dialog content is rendered
    expect(screen.getByTestId('dialog-content')).toBeInTheDocument();
    expect(screen.getByTestId('dialog-title')).toBeInTheDocument();
    expect(screen.getByTestId('dialog-description')).toBeInTheDocument();
    expect(screen.getByTestId('dialog-content')).toBeInTheDocument();
    expect(screen.getByTestId('dialog-close-button')).toBeInTheDocument();
  });

  it('does not render the dialog when closed', () => {
    const onOpenChangeMock = jest.fn();

    render(
      <Dialog open={false} onOpenChange={onOpenChangeMock}>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>Test Dialog</Dialog.Title>
          </Dialog.Header>
          <div data-testid="dialog-content">Dialog content</div>
        </Dialog.Content>
      </Dialog>,
    );

    // Check that the dialog content is not rendered
    expect(screen.queryByTestId('dialog-content')).not.toBeInTheDocument();
    expect(screen.queryByTestId('dialog-title')).not.toBeInTheDocument();
    expect(screen.queryByTestId('dialog-content')).not.toBeInTheDocument();
  });

  it('calls onOpenChange when close button is clicked', () => {
    const onOpenChangeMock = jest.fn();

    render(
      <Dialog open={true} onOpenChange={onOpenChangeMock}>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>Test Dialog</Dialog.Title>
          </Dialog.Header>
          <div data-testid="dialog-content">Dialog content</div>
          <Dialog.Footer>
            <Dialog.Close asChild>
              <button data-testid="dialog-close-button">Close</button>
            </Dialog.Close>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog>,
    );

    // Click the close button
    fireEvent.click(screen.getByTestId('dialog-close-button'));

    // Check that onOpenChange was called with false
    expect(onOpenChangeMock).toHaveBeenCalledWith(false);
  });

  it('renders a fullScreen dialog when specified', () => {
    render(
      <Dialog open={true}>
        <Dialog.Content fullScreen>
          <Dialog.Header>
            <Dialog.Title>Full Screen Dialog</Dialog.Title>
          </Dialog.Header>
          <div>Dialog content</div>
        </Dialog.Content>
      </Dialog>,
    );

    // Check that the dialog content has the fullScreen class
    const dialogContent = screen.getByTestId('dialog-content');
    expect(dialogContent).toHaveClass('h-full');
    expect(dialogContent).toHaveClass('max-h-none');
    expect(dialogContent).toHaveClass('w-full');
    expect(dialogContent).toHaveClass('max-w-none');
    expect(dialogContent).toHaveClass('rounded-none');
  });

  it('renders dialog with custom className', () => {
    const customClass = 'custom-dialog-class';

    render(
      <Dialog open={true}>
        <Dialog.Content className={customClass}>
          <Dialog.Header>
            <Dialog.Title>Custom Class Dialog</Dialog.Title>
          </Dialog.Header>
          <div>Dialog content</div>
        </Dialog.Content>
      </Dialog>,
    );

    // Check that the dialog content has the custom class
    expect(screen.getByTestId('dialog-content')).toHaveClass(customClass);
  });

  it('renders dialog header with custom className', () => {
    const customClass = 'custom-header-class';

    render(
      <Dialog open={true}>
        <Dialog.Content>
          <Dialog.Header className={customClass}>
            <Dialog.Title>Header with Custom Class</Dialog.Title>
          </Dialog.Header>
          <div>Dialog content</div>
        </Dialog.Content>
      </Dialog>,
    );

    // Check that the dialog header has the custom class
    expect(screen.getByTestId('dialog-header')).toHaveClass(customClass);
  });

  it('renders dialog footer with custom className', () => {
    const customClass = 'custom-footer-class';

    render(
      <Dialog open={true}>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>Footer with Custom Class</Dialog.Title>
          </Dialog.Header>
          <div>Dialog content</div>
          <Dialog.Footer className={customClass}>
            <button>Action</button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog>,
    );

    // Check that the dialog footer has the custom class
    expect(screen.getByTestId('dialog-footer')).toHaveClass(customClass);
  });
});
