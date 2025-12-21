import { render, screen } from '@testing-library/react';

import { Resizable } from '..';

describe('Resizable Components', () => {
  describe('ResizablePanelGroup', () => {
    it('renders with default props', () => {
      render(
        <Resizable.Group orientation="horizontal" dataTestId="resizable-group">
          <Resizable.Panel>Panel 1</Resizable.Panel>
          <Resizable.Separator />
          <Resizable.Panel>Panel 2</Resizable.Panel>
        </Resizable.Group>,
      );

      const panelGroup = screen.getByTestId('resizable-group');
      expect(panelGroup).toBeInTheDocument();
      expect(panelGroup).toHaveClass('flex', 'h-full', 'w-full');
    });

    it('renders with custom className', () => {
      render(
        <Resizable.Group
          orientation="horizontal"
          className="custom-class"
          dataTestId="resizable-group"
        >
          <Resizable.Panel>Panel 1</Resizable.Panel>
          <Resizable.Separator />
          <Resizable.Panel>Panel 2</Resizable.Panel>
        </Resizable.Group>,
      );

      const panelGroup = screen.getByTestId('resizable-group');
      expect(panelGroup).toHaveClass('custom-class');
    });
  });

  describe('ResizablePanel', () => {
    it('renders with default props', () => {
      render(
        <Resizable.Group orientation="horizontal">
          <Resizable.Panel dataTestId="resizable-panel">Panel Content</Resizable.Panel>
        </Resizable.Group>,
      );

      const panel = screen.getByTestId('resizable-panel');
      expect(panel).toBeInTheDocument();
      expect(panel).toHaveTextContent('Panel Content');
    });
  });

  describe('ResizableHandle', () => {
    it('renders without handle by default', () => {
      render(
        <Resizable.Group orientation="horizontal">
          <Resizable.Panel>Panel 1</Resizable.Panel>
          <Resizable.Separator dataTestId="resizable-separator" />
          <Resizable.Panel>Panel 2</Resizable.Panel>
        </Resizable.Group>,
      );

      const handle = screen.getByTestId('resizable-separator');
      expect(handle).toBeInTheDocument();
      expect(screen.queryByTestId('resizable-separator-handle')).not.toBeInTheDocument();
    });

    it('renders with handle when withHandle prop is true', () => {
      render(
        <Resizable.Group orientation="horizontal">
          <Resizable.Panel>Panel 1</Resizable.Panel>
          <Resizable.Separator withHandle dataTestId="resizable-separator" />
          <Resizable.Panel>Panel 2</Resizable.Panel>
        </Resizable.Group>,
      );

      const handle = screen.getByTestId('resizable-separator');
      const handleIcon = screen.getByTestId('resizable-separator-handle');
      expect(handle).toBeInTheDocument();
      expect(handleIcon).toBeInTheDocument();
    });

    it('renders with custom className', () => {
      render(
        <Resizable.Group orientation="horizontal">
          <Resizable.Panel>Panel 1</Resizable.Panel>
          <Resizable.Separator className="custom-handle-class" dataTestId="resizable-separator" />
          <Resizable.Panel>Panel 2</Resizable.Panel>
        </Resizable.Group>,
      );

      const handle = screen.getByTestId('resizable-separator');
      expect(handle).toHaveClass('custom-handle-class');
    });
  });
});
