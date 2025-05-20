import { render, screen } from '@testing-library/react';

import { Toaster } from '..';
import * as ToastHook from '../../../hooks';

// Mock the useToast hook
jest.mock('../../../hooks', () => ({
  useToast: jest.fn(),
}));

describe('Toaster Component', () => {
  beforeEach(() => {
    // Reset mock before each test
    jest.clearAllMocks();
  });

  it('renders nothing when there are no toasts', () => {
    // Mock empty toasts array
    (ToastHook.useToast as jest.Mock).mockReturnValue({ toasts: [] });

    render(<Toaster />);

    // Should only render the viewport
    expect(screen.getByTestId('toast-viewport')).toBeInTheDocument();
    expect(screen.queryByTestId('toast')).not.toBeInTheDocument();
  });

  it('renders a single toast with title and description', () => {
    // Mock a single toast
    (ToastHook.useToast as jest.Mock).mockReturnValue({
      toasts: [
        {
          id: '1',
          title: 'Test Title',
          description: 'Test Description',
          variant: 'default',
        },
      ],
    });

    render(<Toaster />);

    expect(screen.getByTestId('toast-viewport')).toBeInTheDocument();
    expect(screen.getByTestId('toast')).toBeInTheDocument();
    expect(screen.getByTestId('toast-title')).toHaveTextContent('Test Title');
    expect(screen.getByTestId('toast-description')).toHaveTextContent('Test Description');
    expect(screen.getByTestId('toast-close')).toBeInTheDocument();
  });

  it('renders multiple toasts', () => {
    // Mock multiple toasts
    (ToastHook.useToast as jest.Mock).mockReturnValue({
      toasts: [
        {
          id: '1',
          title: 'First Toast',
          description: 'First Description',
          variant: 'default',
        },
        {
          id: '2',
          title: 'Second Toast',
          description: 'Second Description',
          variant: 'success',
        },
      ],
    });

    render(<Toaster />);

    const toasts = screen.getAllByTestId('toast');
    expect(toasts).toHaveLength(2);
    expect(screen.getByText('First Toast')).toBeInTheDocument();
    expect(screen.getByText('Second Toast')).toBeInTheDocument();
  });

  it('renders toast with action', () => {
    // Mock toast with action
    (ToastHook.useToast as jest.Mock).mockReturnValue({
      toasts: [
        {
          id: '1',
          title: 'Action Toast',
          description: 'Action Description',
          action: <button>Click Me</button>,
        },
      ],
    });

    render(<Toaster />);

    expect(screen.getByTestId('toast')).toBeInTheDocument();
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });

  it('renders toast with different variants', () => {
    // Mock toasts with different variants
    (ToastHook.useToast as jest.Mock).mockReturnValue({
      toasts: [
        {
          id: '1',
          title: 'Default Toast',
          variant: 'default',
        },
        {
          id: '2',
          title: 'Success Toast',
          variant: 'success',
        },
        {
          id: '3',
          title: 'Destructive Toast',
          variant: 'destructive',
        },
      ],
    });

    render(<Toaster />);

    const toasts = screen.getAllByTestId('toast');
    expect(toasts[0]).toHaveClass('border', 'bg-background', 'text-foreground');
    expect(toasts[1]).toHaveClass(
      'success',
      'border-success',
      'bg-success',
      'text-success-foreground',
    );
    expect(toasts[2]).toHaveClass(
      'destructive',
      'border-destructive',
      'bg-destructive',
      'text-destructive-foreground',
    );
  });

  it('renders toast without title or description', () => {
    // Mock toast without title or description
    (ToastHook.useToast as jest.Mock).mockReturnValue({
      toasts: [
        {
          id: '1',
          variant: 'default',
        },
      ],
    });

    render(<Toaster />);

    expect(screen.getByTestId('toast')).toBeInTheDocument();
    expect(screen.queryByTestId('toast-title')).not.toBeInTheDocument();
    expect(screen.queryByTestId('toast-description')).not.toBeInTheDocument();
  });

  it('forwards additional props to Toast.Root', () => {
    // Mock toast with additional props
    (ToastHook.useToast as jest.Mock).mockReturnValue({
      toasts: [
        {
          id: '1',
          title: 'Custom Toast',
          className: 'custom-toast-class',
          'data-custom': 'test-value',
        },
      ],
    });

    render(<Toaster />);

    const toast = screen.getByTestId('toast');
    expect(toast).toHaveClass('custom-toast-class');
    expect(toast).toHaveAttribute('data-custom', 'test-value');
  });
});
