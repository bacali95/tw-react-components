import { render, screen } from '@testing-library/react';

import { Resizable } from '..';

describe('Resizable Components', () => {
  describe('ResizablePanelGroup', () => {
    it('renders with default props', () => {
      render(
        <Resizable.PanelGroup direction="horizontal">
          <Resizable.Panel>Panel 1</Resizable.Panel>
          <Resizable.Handle />
          <Resizable.Panel>Panel 2</Resizable.Panel>
        </Resizable.PanelGroup>,
      );

      const panelGroup = screen.getByTestId('resizable-panel-group');
      expect(panelGroup).toBeInTheDocument();
      expect(panelGroup).toHaveClass('flex', 'h-full', 'w-full');
    });

    it('renders with custom className', () => {
      render(
        <Resizable.PanelGroup direction="horizontal" className="custom-class">
          <Resizable.Panel>Panel 1</Resizable.Panel>
          <Resizable.Handle />
          <Resizable.Panel>Panel 2</Resizable.Panel>
        </Resizable.PanelGroup>,
      );

      const panelGroup = screen.getByTestId('resizable-panel-group');
      expect(panelGroup).toHaveClass('custom-class');
    });

    it('renders with custom dataTestId', () => {
      render(
        <Resizable.PanelGroup direction="horizontal" dataTestId="custom-test-id">
          <Resizable.Panel>Panel 1</Resizable.Panel>
          <Resizable.Handle />
          <Resizable.Panel>Panel 2</Resizable.Panel>
        </Resizable.PanelGroup>,
      );

      const panelGroup = screen.getByTestId('custom-test-id');
      expect(panelGroup).toBeInTheDocument();
    });
  });

  describe('ResizablePanel', () => {
    it('renders with default props', () => {
      render(
        <Resizable.PanelGroup direction="horizontal">
          <Resizable.Panel>Panel Content</Resizable.Panel>
        </Resizable.PanelGroup>,
      );

      const panel = screen.getByTestId('resizable-panel');
      expect(panel).toBeInTheDocument();
      expect(panel).toHaveTextContent('Panel Content');
    });

    it('renders with custom dataTestId', () => {
      render(
        <Resizable.PanelGroup direction="horizontal">
          <Resizable.Panel dataTestId="custom-panel-id">Panel Content</Resizable.Panel>
        </Resizable.PanelGroup>,
      );

      const panel = screen.getByTestId('custom-panel-id');
      expect(panel).toBeInTheDocument();
    });
  });

  describe('ResizableHandle', () => {
    it('renders without handle by default', () => {
      render(
        <Resizable.PanelGroup direction="horizontal">
          <Resizable.Panel>Panel 1</Resizable.Panel>
          <Resizable.Handle />
          <Resizable.Panel>Panel 2</Resizable.Panel>
        </Resizable.PanelGroup>,
      );

      const handle = screen.getByTestId('resizable-handle');
      expect(handle).toBeInTheDocument();
      expect(screen.queryByTestId('resizable-handle-handle')).not.toBeInTheDocument();
    });

    it('renders with handle when withHandle prop is true', () => {
      render(
        <Resizable.PanelGroup direction="horizontal">
          <Resizable.Panel>Panel 1</Resizable.Panel>
          <Resizable.Handle withHandle />
          <Resizable.Panel>Panel 2</Resizable.Panel>
        </Resizable.PanelGroup>,
      );

      const handle = screen.getByTestId('resizable-handle');
      const handleIcon = screen.getByTestId('resizable-handle-handle');
      expect(handle).toBeInTheDocument();
      expect(handleIcon).toBeInTheDocument();
    });

    it('renders with custom dataTestId', () => {
      render(
        <Resizable.PanelGroup direction="horizontal">
          <Resizable.Panel>Panel 1</Resizable.Panel>
          <Resizable.Handle dataTestId="custom-handle-id" />
          <Resizable.Panel>Panel 2</Resizable.Panel>
        </Resizable.PanelGroup>,
      );

      const handle = screen.getByTestId('custom-handle-id');
      expect(handle).toBeInTheDocument();
    });

    it('renders with custom className', () => {
      render(
        <Resizable.PanelGroup direction="horizontal">
          <Resizable.Panel>Panel 1</Resizable.Panel>
          <Resizable.Handle className="custom-handle-class" />
          <Resizable.Panel>Panel 2</Resizable.Panel>
        </Resizable.PanelGroup>,
      );

      const handle = screen.getByTestId('resizable-handle');
      expect(handle).toHaveClass('custom-handle-class');
    });
  });
});
