import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { Tabs } from '..';

describe('Tabs Component', () => {
  describe('Main Tabs Component', () => {
    it('renders correctly with default props', () => {
      render(
        <Tabs defaultValue="tab1">
          <Tabs.List>
            <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
            <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="tab1">Content 1</Tabs.Content>
          <Tabs.Content value="tab2">Content 2</Tabs.Content>
        </Tabs>,
      );

      const tabs = screen.getByTestId('tabs');
      expect(tabs).toBeInTheDocument();
      expect(tabs).toHaveClass('flex', 'flex-col', 'gap-2');
    });

    it('applies custom className', () => {
      render(
        <Tabs defaultValue="tab1" className="custom-tabs-class">
          <Tabs.List>
            <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="tab1">Content 1</Tabs.Content>
        </Tabs>,
      );

      const tabs = screen.getByTestId('tabs');
      expect(tabs).toHaveClass('custom-tabs-class');
      expect(tabs).toHaveClass('flex', 'flex-col', 'gap-2'); // Default classes
    });

    it('applies custom dataTestId', () => {
      render(
        <Tabs defaultValue="tab1" dataTestId="custom-tabs">
          <Tabs.List>
            <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="tab1">Content 1</Tabs.Content>
        </Tabs>,
      );

      const tabs = screen.getByTestId('custom-tabs');
      expect(tabs).toBeInTheDocument();
    });

    it('passes additional props to the root element', () => {
      render(
        <Tabs defaultValue="tab1" id="test-id" aria-label="Tabs Example">
          <Tabs.List>
            <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="tab1">Content 1</Tabs.Content>
        </Tabs>,
      );

      const tabs = screen.getByTestId('tabs');
      expect(tabs).toHaveAttribute('id', 'test-id');
      expect(tabs).toHaveAttribute('aria-label', 'Tabs Example');
    });
  });

  describe('Tabs.List Component', () => {
    it('renders correctly with default props', () => {
      render(
        <Tabs defaultValue="tab1">
          <Tabs.List>
            <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="tab1">Content 1</Tabs.Content>
        </Tabs>,
      );

      const list = screen.getByTestId('tabs-list');
      expect(list).toBeInTheDocument();
      expect(list).toHaveClass('inline-flex', 'w-full', 'rounded-lg', 'border');
    });

    it('applies custom className while maintaining default classes', () => {
      render(
        <Tabs defaultValue="tab1">
          <Tabs.List className="custom-list-class">
            <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="tab1">Content 1</Tabs.Content>
        </Tabs>,
      );

      const list = screen.getByTestId('tabs-list');
      expect(list).toHaveClass('custom-list-class');
      expect(list).toHaveClass('inline-flex', 'w-full', 'rounded-lg'); // Some default classes
    });

    it('applies custom dataTestId', () => {
      render(
        <Tabs defaultValue="tab1">
          <Tabs.List dataTestId="custom-tabs-list">
            <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="tab1">Content 1</Tabs.Content>
        </Tabs>,
      );

      const list = screen.getByTestId('custom-tabs-list');
      expect(list).toBeInTheDocument();
    });
  });

  describe('Tabs.Trigger Component', () => {
    it('renders correctly with default props', () => {
      render(
        <Tabs defaultValue="tab1">
          <Tabs.List>
            <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="tab1">Content 1</Tabs.Content>
        </Tabs>,
      );

      const trigger = screen.getByTestId('tabs-trigger');
      expect(trigger).toBeInTheDocument();
      expect(trigger).toHaveClass('inline-flex', 'w-full', 'rounded-md');
      expect(trigger).toHaveAttribute('data-state', 'active');
      expect(trigger).toHaveTextContent('Tab 1');
    });

    it('applies custom className while maintaining default classes', () => {
      render(
        <Tabs defaultValue="tab1">
          <Tabs.List>
            <Tabs.Trigger value="tab1" className="custom-trigger-class">
              Tab 1
            </Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="tab1">Content 1</Tabs.Content>
        </Tabs>,
      );

      const trigger = screen.getByTestId('tabs-trigger');
      expect(trigger).toHaveClass('custom-trigger-class');
      expect(trigger).toHaveClass('inline-flex', 'w-full', 'rounded-md'); // Default classes
    });

    it('applies custom dataTestId', () => {
      render(
        <Tabs defaultValue="tab1">
          <Tabs.List>
            <Tabs.Trigger value="tab1" dataTestId="custom-tabs-trigger">
              Tab 1
            </Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="tab1">Content 1</Tabs.Content>
        </Tabs>,
      );

      const trigger = screen.getByTestId('custom-tabs-trigger');
      expect(trigger).toBeInTheDocument();
    });

    it('correctly shows inactive state', () => {
      render(
        <Tabs defaultValue="tab1">
          <Tabs.List>
            <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
            <Tabs.Trigger value="tab2" dataTestId="inactive-trigger">
              Tab 2
            </Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="tab1">Content 1</Tabs.Content>
          <Tabs.Content value="tab2">Content 2</Tabs.Content>
        </Tabs>,
      );

      const trigger = screen.getByTestId('inactive-trigger');
      expect(trigger).toHaveAttribute('data-state', 'inactive');
    });

    it('changes active tab when clicked', async () => {
      render(
        <Tabs defaultValue="tab1">
          <Tabs.List>
            <Tabs.Trigger value="tab1" dataTestId="trigger-1">
              Tab 1
            </Tabs.Trigger>
            <Tabs.Trigger value="tab2" dataTestId="trigger-2">
              Tab 2
            </Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="tab1" dataTestId="content-1">
            Content 1
          </Tabs.Content>
          <Tabs.Content value="tab2" dataTestId="content-2">
            Content 2
          </Tabs.Content>
        </Tabs>,
      );

      expect(screen.getByTestId('trigger-1')).toHaveAttribute('data-state', 'active');
      expect(screen.getByTestId('trigger-2')).toHaveAttribute('data-state', 'inactive');
      expect(screen.getByTestId('content-1')).toHaveAttribute('data-state', 'active');
      expect(screen.getByTestId('content-2')).toHaveAttribute('data-state', 'inactive');

      await userEvent.click(screen.getByTestId('trigger-2'));

      expect(screen.getByTestId('trigger-1')).toHaveAttribute('data-state', 'inactive');
      expect(screen.getByTestId('trigger-2')).toHaveAttribute('data-state', 'active');
      expect(screen.getByTestId('content-1')).toHaveAttribute('data-state', 'inactive');
      expect(screen.getByTestId('content-2')).toHaveAttribute('data-state', 'active');
    });
  });

  describe('Tabs.Content Component', () => {
    it('renders correctly with default props', () => {
      render(
        <Tabs defaultValue="tab1">
          <Tabs.List>
            <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="tab1">Content 1</Tabs.Content>
        </Tabs>,
      );

      const content = screen.getByTestId('tabs-content');
      expect(content).toBeInTheDocument();
      expect(content).toHaveAttribute('data-state', 'active');
      expect(content).toHaveTextContent('Content 1');
    });

    it('applies custom dataTestId', () => {
      render(
        <Tabs defaultValue="tab1">
          <Tabs.List>
            <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="tab1" dataTestId="custom-tabs-content">
            Content 1
          </Tabs.Content>
        </Tabs>,
      );

      const content = screen.getByTestId('custom-tabs-content');
      expect(content).toBeInTheDocument();
    });

    it('correctly shows inactive state', () => {
      render(
        <Tabs defaultValue="tab1">
          <Tabs.List>
            <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
            <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="tab1">Content 1</Tabs.Content>
          <Tabs.Content value="tab2" dataTestId="inactive-content">
            Content 2
          </Tabs.Content>
        </Tabs>,
      );

      const content = screen.getByTestId('inactive-content');
      expect(content).toHaveAttribute('data-state', 'inactive');
    });
  });

  describe('Complete Tabs Integration', () => {
    it('renders a complete tabs structure correctly', () => {
      render(
        <Tabs defaultValue="tab1" dataTestId="complete-tabs">
          <Tabs.List dataTestId="complete-list">
            <Tabs.Trigger value="tab1" dataTestId="tab1-trigger">
              First Tab
            </Tabs.Trigger>
            <Tabs.Trigger value="tab2" dataTestId="tab2-trigger">
              Second Tab
            </Tabs.Trigger>
            <Tabs.Trigger value="tab3" dataTestId="tab3-trigger">
              Third Tab
            </Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="tab1" dataTestId="tab1-content">
            First tab content
          </Tabs.Content>
          <Tabs.Content value="tab2" dataTestId="tab2-content">
            Second tab content
          </Tabs.Content>
          <Tabs.Content value="tab3" dataTestId="tab3-content">
            Third tab content
          </Tabs.Content>
        </Tabs>,
      );

      // Check that all parts exist and have correct states
      expect(screen.getByTestId('complete-tabs')).toBeInTheDocument();
      expect(screen.getByTestId('complete-list')).toBeInTheDocument();

      expect(screen.getByTestId('tab1-trigger')).toHaveAttribute('data-state', 'active');
      expect(screen.getByTestId('tab2-trigger')).toHaveAttribute('data-state', 'inactive');
      expect(screen.getByTestId('tab3-trigger')).toHaveAttribute('data-state', 'inactive');

      expect(screen.getByTestId('tab1-content')).toHaveAttribute('data-state', 'active');
      expect(screen.getByTestId('tab1-content')).toHaveTextContent('First tab content');
      expect(screen.getByTestId('tab2-content')).toHaveAttribute('data-state', 'inactive');
      expect(screen.getByTestId('tab3-content')).toHaveAttribute('data-state', 'inactive');
    });

    it('switches tabs correctly with controlled value', async () => {
      const TabsTest = () => {
        const [value, setValue] = React.useState('tab1');

        return (
          <>
            <button onClick={() => setValue('tab2')} data-testid="external-control">
              Switch to Tab 2
            </button>
            <Tabs value={value} onValueChange={setValue} dataTestId="controlled-tabs">
              <Tabs.List>
                <Tabs.Trigger value="tab1" dataTestId="controlled-tab1">
                  Tab 1
                </Tabs.Trigger>
                <Tabs.Trigger value="tab2" dataTestId="controlled-tab2">
                  Tab 2
                </Tabs.Trigger>
              </Tabs.List>
              <Tabs.Content value="tab1" dataTestId="controlled-content1">
                Content 1
              </Tabs.Content>
              <Tabs.Content value="tab2" dataTestId="controlled-content2">
                Content 2
              </Tabs.Content>
            </Tabs>
          </>
        );
      };

      render(<TabsTest />);

      expect(screen.getByTestId('controlled-tab1')).toHaveAttribute('data-state', 'active');
      expect(screen.getByTestId('controlled-tab2')).toHaveAttribute('data-state', 'inactive');
      expect(screen.getByTestId('controlled-content1')).toHaveAttribute('data-state', 'active');
      expect(screen.getByTestId('controlled-content2')).toHaveAttribute('data-state', 'inactive');

      await userEvent.click(screen.getByTestId('external-control'));

      expect(screen.getByTestId('controlled-tab1')).toHaveAttribute('data-state', 'inactive');
      expect(screen.getByTestId('controlled-tab2')).toHaveAttribute('data-state', 'active');
      expect(screen.getByTestId('controlled-content1')).toHaveAttribute('data-state', 'inactive');
      expect(screen.getByTestId('controlled-content2')).toHaveAttribute('data-state', 'active');
    });
  });
});
