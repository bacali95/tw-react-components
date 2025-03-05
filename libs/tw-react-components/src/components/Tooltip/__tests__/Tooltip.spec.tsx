import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { Tooltip } from '..';

describe('Tooltip Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with default props', async () => {
    render(<Tooltip content="Tooltip content">Hover me</Tooltip>);

    // Check trigger element
    const trigger = screen.getByTestId('tooltip-trigger');
    expect(trigger).toBeInTheDocument();
    expect(trigger.textContent).toBe('Hover me');

    await userEvent.hover(trigger);

    // Check content element
    const content = await screen.findByTestId('tooltip-content');
    expect(content).toBeInTheDocument();
    expect(content.textContent).toContain('Tooltip content');
  });

  it('applies custom className to content', async () => {
    render(
      <Tooltip content="Tooltip content" className="custom-tooltip-class">
        Hover me
      </Tooltip>,
    );

    await userEvent.hover(screen.getByTestId('tooltip-trigger'));

    const content = await screen.findByTestId('tooltip-content');
    expect(content).toHaveClass('custom-tooltip-class');
    // Should also have default classes
    expect(content).toHaveClass('z-[101]', 'rounded-md', 'border');
  });

  it('applies custom dataTestId', async () => {
    render(
      <Tooltip content="Tooltip content" dataTestId="custom-tooltip">
        Hover me
      </Tooltip>,
    );

    expect(screen.getByTestId('custom-tooltip-trigger')).toBeInTheDocument();

    await userEvent.hover(screen.getByTestId('custom-tooltip-trigger'));

    expect(await screen.findByTestId('custom-tooltip-content')).toBeInTheDocument();
  });

  it('renders with asChild prop', () => {
    render(
      <Tooltip content="Tooltip content" asChild>
        <button data-as-child>Hover me</button>
      </Tooltip>,
    );

    const trigger = screen.getByTestId('tooltip-trigger');
    expect(trigger).toHaveAttribute('data-as-child', 'true');
  });

  it('renders with custom placement', async () => {
    render(
      <Tooltip content="Tooltip content" placement="bottom">
        Hover me
      </Tooltip>,
    );

    await userEvent.hover(screen.getByTestId('tooltip-trigger'));

    const content = await screen.findByTestId('tooltip-content');
    expect(content).toHaveAttribute('data-side', 'bottom');
  });

  it('renders with different placements', async () => {
    const placements = ['top', 'right', 'bottom', 'left'] as const;

    for (const placement of placements) {
      const { unmount } = render(
        <Tooltip content="Tooltip content" placement={placement}>
          Hover me
        </Tooltip>,
      );

      await userEvent.hover(screen.getByTestId('tooltip-trigger'));

      expect(await screen.findByTestId('tooltip-content')).toHaveAttribute('data-side', placement);

      unmount();
    }
  });

  it('renders with complex content', async () => {
    render(
      <Tooltip
        content={
          <div data-testid="complex-content">
            <h4>Title</h4>
            <p>Description</p>
          </div>
        }
      >
        Hover me
      </Tooltip>,
    );

    await userEvent.hover(screen.getByTestId('tooltip-trigger'));

    await waitFor(() => {
      const tooltipContent = screen.getByTestId('tooltip-content');
      const complexContent = screen.getAllByTestId('complex-content').at(-1);
      expect(tooltipContent).toContainElement(complexContent!);
      expect(complexContent).toBeInTheDocument();
    });
  });

  it('renders with a non-button trigger', () => {
    render(
      <Tooltip content="Tooltip content">
        <span>Hover this span</span>
      </Tooltip>,
    );

    const trigger = screen.getByTestId('tooltip-trigger');
    expect(trigger.textContent).toBe('Hover this span');
  });

  it('renders with asChild and a custom component', () => {
    const CustomButton = ({ children, ...props }: React.PropsWithChildren<{}>) => (
      <button {...props} data-testid="custom-button">
        {children}
      </button>
    );

    render(
      <Tooltip content="Tooltip content" asChild>
        <CustomButton>Custom button</CustomButton>
      </Tooltip>,
    );

    expect(screen.getByTestId('custom-button')).toBeInTheDocument();
    expect(screen.getByText('Custom button')).toBeInTheDocument();
  });

  it('applies correct sideOffset', async () => {
    render(<Tooltip content="Tooltip content">Hover me</Tooltip>);

    await userEvent.hover(screen.getByTestId('tooltip-trigger'));

    await waitFor(() => {
      const content = screen.getByTestId('tooltip-content');
      expect(content.parentElement).toHaveStyle('transform: translate(0px, -5px)');
    });
  });
});
