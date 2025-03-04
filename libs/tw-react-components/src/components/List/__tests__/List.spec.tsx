import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Info } from 'lucide-react';

import { List } from '..';

describe('List Component', () => {
  it('renders correctly with default props', () => {
    render(
      <List>
        <List.Label>Category</List.Label>
        <List.Item>Item 1</List.Item>
        <List.Separator />
        <List.Item>Item 2</List.Item>
      </List>,
    );

    const listElement = screen.getByTestId('list');
    const labelElement = screen.getByTestId('list-label');
    const itemElements = screen.getAllByTestId('list-item');
    const separatorElement = screen.getByTestId('list-separator');

    expect(listElement).toBeInTheDocument();
    expect(labelElement).toBeInTheDocument();
    expect(itemElements).toHaveLength(2);
    expect(separatorElement).toBeInTheDocument();

    expect(labelElement).toHaveTextContent('Category');
    expect(itemElements[0]).toHaveTextContent('Item 1');
    expect(itemElements[1]).toHaveTextContent('Item 2');
  });

  it('renders with indicator and icon', () => {
    render(
      <List>
        <List.Item>
          <List.Indicator icon={Info} iconClassName="text-blue-500" />
          <List.Icon icon={Info} />
          Item with Icon
        </List.Item>
      </List>,
    );

    const indicatorElement = screen.getByTestId('list-indicator');
    const iconElement = screen.getByTestId('list-icon');

    expect(indicatorElement).toBeInTheDocument();
    expect(iconElement).toBeInTheDocument();
  });

  it('renders with different sizes', () => {
    render(
      <List>
        <List.Label size="small">Small Label</List.Label>
        <List.Item size="small">Small Item</List.Item>
        <List.Label size="medium">Medium Label</List.Label>
        <List.Item size="medium">Medium Item</List.Item>
      </List>,
    );

    const smallLabel = screen.getByText('Small Label');
    const smallItem = screen.getByText('Small Item');
    const mediumLabel = screen.getByText('Medium Label');
    const mediumItem = screen.getByText('Medium Item');

    expect(smallLabel).toHaveClass('text-sm');
    expect(smallItem).toHaveClass('text-sm');
    expect(mediumLabel).not.toHaveClass('text-sm');
    expect(mediumItem).not.toHaveClass('text-sm');
  });

  it('renders with inset items and labels', () => {
    render(
      <List>
        <List.Label inset>Inset Label</List.Label>
        <List.Item inset>Inset Item</List.Item>
      </List>,
    );

    const insetLabel = screen.getByText('Inset Label');
    const insetItem = screen.getByText('Inset Item');

    expect(insetLabel).toHaveClass('pl-8');
    expect(insetItem).toHaveClass('pl-8');
  });

  it('uses custom dataTestId when provided', () => {
    render(
      <List dataTestId="custom-list">
        <List.Label dataTestId="custom-label">Custom Label</List.Label>
        <List.Item dataTestId="custom-item">Custom Item</List.Item>
        <List.Separator dataTestId="custom-separator" />
        <List.Item>
          <List.Indicator icon={Info} iconClassName="text-blue-500" dataTestId="custom-indicator" />
          <List.Icon icon={Info} dataTestId="custom-icon" />
          Item with Custom Test IDs
        </List.Item>
      </List>,
    );

    // Check custom dataTestIds are used
    expect(screen.getByTestId('custom-list')).toBeInTheDocument();
    expect(screen.getByTestId('custom-label')).toBeInTheDocument();
    expect(screen.getByTestId('custom-item')).toBeInTheDocument();
    expect(screen.getByTestId('custom-separator')).toBeInTheDocument();
    expect(screen.getByTestId('custom-indicator')).toBeInTheDocument();
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();

    // Check default dataTestIds are not used
    expect(screen.queryByTestId('list')).not.toBeInTheDocument();
    expect(screen.queryByTestId('list-label')).not.toBeInTheDocument();
  });

  it('applies additional className to components', () => {
    render(
      <List className="custom-list-class">
        <List.Label className="custom-label-class">Label with Class</List.Label>
        <List.Item className="custom-item-class">Item with Class</List.Item>
        <List.Separator className="custom-separator-class" />
      </List>,
    );

    expect(screen.getByTestId('list')).toHaveClass('custom-list-class');
    expect(screen.getByTestId('list-label')).toHaveClass('custom-label-class');
    expect(screen.getByTestId('list-item')).toHaveClass('custom-item-class');
    expect(screen.getByTestId('list-separator')).toHaveClass('custom-separator-class');
  });
});
