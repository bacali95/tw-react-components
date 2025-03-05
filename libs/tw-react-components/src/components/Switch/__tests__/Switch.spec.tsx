import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Switch } from '..';

describe('Switch Component', () => {
  it('renders correctly with default props', () => {
    render(<Switch />);

    const switchElement = screen.getByTestId('switch');
    expect(switchElement).toBeInTheDocument();
    expect(switchElement).toHaveAttribute('data-state', 'unchecked');
    expect(switchElement.querySelector('span')).toBeInTheDocument(); // thumb element
  });

  it('renders in checked state when defaultChecked is true', () => {
    render(<Switch defaultChecked />);

    const switchElement = screen.getByTestId('switch');
    expect(switchElement).toHaveAttribute('data-state', 'checked');
  });

  it('applies custom className to root element', () => {
    render(<Switch className="custom-class" />);

    const switchElement = screen.getByTestId('switch');
    expect(switchElement).toHaveClass('custom-class');
    // Still has default classes
    expect(switchElement).toHaveClass('peer', 'inline-flex', 'rounded-full');
  });

  it('applies custom thumbProps', () => {
    render(<Switch thumbProps={{ className: 'thumb-custom-class' }} />);

    const thumbElement = screen.getByTestId('switch-thumb');

    expect(thumbElement).toHaveClass('thumb-custom-class');
    // Still has default classes
    expect(thumbElement).toHaveClass('pointer-events-none', 'rounded-full');
  });

  it('applies custom dataTestId when provided', () => {
    render(<Switch dataTestId="custom-switch" />);

    const switchElement = screen.getByTestId('custom-switch');
    expect(switchElement).toBeInTheDocument();
  });

  it('calls onCheckedChange when clicked', async () => {
    const handleChange = jest.fn();
    render(<Switch onCheckedChange={handleChange} />);

    const switchElement = screen.getByTestId('switch');
    await userEvent.click(switchElement);

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(true);
  });

  it('toggles state when clicked', async () => {
    render(<Switch />);

    const switchElement = screen.getByTestId('switch');
    expect(switchElement).toHaveAttribute('data-state', 'unchecked');

    await userEvent.click(switchElement);
    expect(switchElement).toHaveAttribute('data-state', 'checked');

    await userEvent.click(switchElement);
    expect(switchElement).toHaveAttribute('data-state', 'unchecked');
  });

  it('is disabled when disabled prop is true', () => {
    render(<Switch disabled />);

    const switchElement = screen.getByTestId('switch');
    expect(switchElement).toBeDisabled();
  });

  it('does not change state when clicked while disabled', async () => {
    render(<Switch disabled />);

    const switchElement = screen.getByTestId('switch');
    expect(switchElement).toHaveAttribute('data-state', 'unchecked');

    await userEvent.click(switchElement);
    expect(switchElement).toHaveAttribute('data-state', 'unchecked');
  });

  it('passes additional props to the root element', () => {
    render(<Switch id="switch-id" aria-label="switch" />);

    const switchElement = screen.getByTestId('switch');
    expect(switchElement).toHaveAttribute('id', 'switch-id');
    expect(switchElement).toHaveAttribute('aria-label', 'switch');
  });

  it('toggles via keyboard interaction', async () => {
    render(<Switch />);

    const switchElement = screen.getByTestId('switch');
    expect(switchElement).toHaveAttribute('data-state', 'unchecked');

    // Focus the switch
    switchElement.focus();
    // Press Space key
    await userEvent.keyboard('[Space]');

    expect(switchElement).toHaveAttribute('data-state', 'checked');
  });

  it('has correct accessible roles', () => {
    render(<Switch />);

    const switchElement = screen.getByTestId('switch');
    expect(switchElement).toBeInTheDocument();
    expect(switchElement).toHaveAttribute('aria-checked', 'false');
  });
});
