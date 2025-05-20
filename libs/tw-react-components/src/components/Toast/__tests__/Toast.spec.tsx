import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Toast } from '..';

describe('Toast Component', () => {
  describe('Toast.Provider', () => {
    it('renders children correctly', () => {
      render(
        <Toast.Provider>
          <div data-testid="test-child">Test Content</div>
        </Toast.Provider>,
      );

      expect(screen.getByTestId('test-child')).toBeInTheDocument();
      expect(screen.getByText('Test Content')).toBeInTheDocument();
    });
  });

  describe('Toast.Viewport', () => {
    it('renders with default props', () => {
      render(
        <Toast.Provider>
          <Toast.Viewport />
        </Toast.Provider>,
      );

      const viewport = screen.getByTestId('toast-viewport');
      expect(viewport).toBeInTheDocument();
      expect(viewport).toHaveClass(
        'fixed',
        'top-0',
        'z-[100]',
        'flex',
        'max-h-screen',
        'w-full',
        'flex-col-reverse',
        'p-4',
      );
    });

    it('applies custom className', () => {
      render(
        <Toast.Provider>
          <Toast.Viewport className="custom-class" />
        </Toast.Provider>,
      );

      const viewport = screen.getByTestId('toast-viewport');
      expect(viewport).toHaveClass('custom-class');
    });

    it('applies custom dataTestId', () => {
      render(
        <Toast.Provider>
          <Toast.Viewport dataTestId="custom-viewport" />
        </Toast.Provider>,
      );

      const viewport = screen.getByTestId('custom-viewport');
      expect(viewport).toBeInTheDocument();
    });
  });

  describe('Toast.Root', () => {
    it('renders with default variant', () => {
      render(
        <Toast.Provider>
          <Toast.Root>
            <Toast.Title>Toast Title</Toast.Title>
            <Toast.Description>Toast Description</Toast.Description>
          </Toast.Root>

          <Toast.Viewport />
        </Toast.Provider>,
      );

      const toast = screen.getByTestId('toast');
      expect(toast).toBeInTheDocument();
      expect(toast).toHaveClass('border', 'bg-background', 'text-foreground');
    });

    it('renders with success variant', () => {
      render(
        <Toast.Provider>
          <Toast.Root variant="success">
            <Toast.Title>Success Toast</Toast.Title>
            <Toast.Description>Success Description</Toast.Description>
          </Toast.Root>

          <Toast.Viewport />
        </Toast.Provider>,
      );

      const toast = screen.getByTestId('toast');
      expect(toast).toHaveClass(
        'success',
        'border-success',
        'bg-success',
        'text-success-foreground',
      );
    });

    it('renders with destructive variant', () => {
      render(
        <Toast.Provider>
          <Toast.Root variant="destructive">
            <Toast.Title>Error Toast</Toast.Title>
            <Toast.Description>Error Description</Toast.Description>
          </Toast.Root>

          <Toast.Viewport />
        </Toast.Provider>,
      );

      const toast = screen.getByTestId('toast');
      expect(toast).toHaveClass(
        'destructive',
        'border-destructive',
        'bg-destructive',
        'text-destructive-foreground',
      );
    });

    it('applies custom className', () => {
      render(
        <Toast.Provider>
          <Toast.Root className="custom-class">
            <Toast.Title>Custom Toast</Toast.Title>
          </Toast.Root>

          <Toast.Viewport />
        </Toast.Provider>,
      );

      const toast = screen.getByTestId('toast');
      expect(toast).toHaveClass('custom-class');
    });

    it('applies custom dataTestId', () => {
      render(
        <Toast.Provider>
          <Toast.Root dataTestId="custom-toast">
            <Toast.Title>Custom Toast</Toast.Title>
          </Toast.Root>

          <Toast.Viewport />
        </Toast.Provider>,
      );

      const toast = screen.getByTestId('custom-toast');
      expect(toast).toBeInTheDocument();
    });
  });

  describe('Toast.Title', () => {
    it('renders with default props', () => {
      render(
        <Toast.Provider>
          <Toast.Root>
            <Toast.Title>Toast Title</Toast.Title>
          </Toast.Root>

          <Toast.Viewport />
        </Toast.Provider>,
      );

      const title = screen.getByTestId('toast-title');
      expect(title).toBeInTheDocument();
      expect(title).toHaveClass('font-semibold');
      expect(title).toHaveTextContent('Toast Title');
    });

    it('applies custom className', () => {
      render(
        <Toast.Provider>
          <Toast.Root>
            <Toast.Title className="custom-title-class">Custom Title</Toast.Title>
          </Toast.Root>

          <Toast.Viewport />
        </Toast.Provider>,
      );

      const title = screen.getByTestId('toast-title');
      expect(title).toHaveClass('custom-title-class');
    });

    it('applies custom dataTestId', () => {
      render(
        <Toast.Provider>
          <Toast.Root>
            <Toast.Title dataTestId="custom-title">Custom Title</Toast.Title>
          </Toast.Root>

          <Toast.Viewport />
        </Toast.Provider>,
      );

      const title = screen.getByTestId('custom-title');
      expect(title).toBeInTheDocument();
    });
  });

  describe('Toast.Description', () => {
    it('renders with default props', () => {
      render(
        <Toast.Provider>
          <Toast.Root>
            <Toast.Description>Toast Description</Toast.Description>
          </Toast.Root>

          <Toast.Viewport />
        </Toast.Provider>,
      );

      const description = screen.getByTestId('toast-description');
      expect(description).toBeInTheDocument();
      expect(description).toHaveClass('opacity-90');
      expect(description).toHaveTextContent('Toast Description');
    });

    it('applies custom className', () => {
      render(
        <Toast.Provider>
          <Toast.Root>
            <Toast.Description className="custom-description-class">
              Custom Description
            </Toast.Description>
          </Toast.Root>

          <Toast.Viewport />
        </Toast.Provider>,
      );

      const description = screen.getByTestId('toast-description');
      expect(description).toHaveClass('custom-description-class');
    });

    it('applies custom dataTestId', () => {
      render(
        <Toast.Provider>
          <Toast.Root>
            <Toast.Description dataTestId="custom-description">
              Custom Description
            </Toast.Description>
          </Toast.Root>

          <Toast.Viewport />
        </Toast.Provider>,
      );

      const description = screen.getByTestId('custom-description');
      expect(description).toBeInTheDocument();
    });
  });

  describe('Toast.Close', () => {
    it('renders with default props', () => {
      render(
        <Toast.Provider>
          <Toast.Root>
            <Toast.Close />
          </Toast.Root>

          <Toast.Viewport />
        </Toast.Provider>,
      );

      const closeButton = screen.getByTestId('toast-close');
      expect(closeButton).toBeInTheDocument();
      expect(closeButton).toHaveClass('text-foreground/50', 'hover:text-foreground');
      expect(closeButton.querySelector('svg')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(
        <Toast.Provider>
          <Toast.Root>
            <Toast.Close className="custom-close-class" />
          </Toast.Root>

          <Toast.Viewport />
        </Toast.Provider>,
      );

      const closeButton = screen.getByTestId('toast-close');
      expect(closeButton).toHaveClass('custom-close-class');
    });

    it('applies custom dataTestId', () => {
      render(
        <Toast.Provider>
          <Toast.Root>
            <Toast.Close dataTestId="custom-close" />
          </Toast.Root>

          <Toast.Viewport />
        </Toast.Provider>,
      );

      const closeButton = screen.getByTestId('custom-close');
      expect(closeButton).toBeInTheDocument();
    });
  });

  describe('Toast.Action', () => {
    it('renders with default props', () => {
      render(
        <Toast.Provider>
          <Toast.Root>
            <Toast.Action altText="Action">Action</Toast.Action>
          </Toast.Root>

          <Toast.Viewport />
        </Toast.Provider>,
      );

      const action = screen.getByTestId('toast-action');
      expect(action).toBeInTheDocument();
      expect(action).toHaveClass(
        'hover:bg-secondary',
        'focus:ring-ring',
        'inline-flex',
        'h-8',
        'shrink-0',
        'cursor-pointer',
      );
      expect(action).toHaveTextContent('Action');
    });

    it('applies custom className', () => {
      render(
        <Toast.Provider>
          <Toast.Root>
            <Toast.Action className="custom-action-class" altText="Custom Action">
              Custom Action
            </Toast.Action>
          </Toast.Root>

          <Toast.Viewport />
        </Toast.Provider>,
      );

      const action = screen.getByTestId('toast-action');
      expect(action).toHaveClass('custom-action-class');
    });

    it('applies custom dataTestId', () => {
      render(
        <Toast.Provider>
          <Toast.Root>
            <Toast.Action dataTestId="custom-action" altText="Custom Action">
              Custom Action
            </Toast.Action>
          </Toast.Root>

          <Toast.Viewport />
        </Toast.Provider>,
      );

      const action = screen.getByTestId('custom-action');
      expect(action).toBeInTheDocument();
    });
  });

  describe('Complete Toast Example', () => {
    it('renders a complete toast with all components', () => {
      render(
        <Toast.Provider>
          <Toast.Viewport>
            <Toast.Root>
              <Toast.Title>Complete Toast</Toast.Title>
              <Toast.Description>This is a complete toast example</Toast.Description>
              <Toast.Close />
              <Toast.Action altText="Action">Action</Toast.Action>
            </Toast.Root>
          </Toast.Viewport>
        </Toast.Provider>,
      );

      expect(screen.getByTestId('toast-viewport')).toBeInTheDocument();
      expect(screen.getByTestId('toast')).toBeInTheDocument();
      expect(screen.getByTestId('toast-title')).toHaveTextContent('Complete Toast');
      expect(screen.getByTestId('toast-description')).toHaveTextContent(
        'This is a complete toast example',
      );
      expect(screen.getByTestId('toast-close')).toBeInTheDocument();
      expect(screen.getByTestId('toast-action')).toHaveTextContent('Action');
    });
  });
});
