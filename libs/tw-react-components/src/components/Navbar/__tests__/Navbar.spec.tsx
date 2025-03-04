import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { Navbar } from '..';

// Mock the Sidebar component since we're only testing Navbar functionality
jest.mock('../../Sidebar', () => ({
  Sidebar: {
    Trigger: jest.fn(({ className }) => (
      <button data-testid="mocked-sidebar-trigger" className={className}>
        Sidebar Trigger
      </button>
    )),
  },
}));

describe('Navbar Component', () => {
  it('renders correctly with default props', () => {
    render(<Navbar />);

    // The navbar should be present with default test ID
    const navbar = screen.getByTestId('navbar');
    expect(navbar).toBeInTheDocument();
    expect(navbar).toHaveClass('border-b', 'p-2');

    // The sidebar trigger should be present
    const sidebarTrigger = screen.getByTestId('mocked-sidebar-trigger');
    expect(sidebarTrigger).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Navbar className="custom-navbar-class" />);

    const navbar = screen.getByTestId('navbar');
    expect(navbar).toHaveClass('custom-navbar-class');
    expect(navbar).toHaveClass('border-b', 'p-2'); // Default classes should still be applied
  });

  it('applies custom sidebarTriggerClassName', () => {
    render(<Navbar sidebarTriggerClassName="custom-trigger-class" />);

    const sidebarTrigger = screen.getByTestId('mocked-sidebar-trigger');
    expect(sidebarTrigger).toHaveClass('custom-trigger-class');
  });

  it('renders leftSlot content', () => {
    render(<Navbar leftSlot={<div data-testid="left-slot-content">Left Slot Content</div>} />);

    const leftSlotContent = screen.getByTestId('left-slot-content');
    expect(leftSlotContent).toBeInTheDocument();
    expect(leftSlotContent).toHaveTextContent('Left Slot Content');

    // The sidebar trigger should still be present
    expect(screen.getByTestId('mocked-sidebar-trigger')).toBeInTheDocument();
  });

  it('renders rightSlot content', () => {
    render(<Navbar rightSlot={<div data-testid="right-slot-content">Right Slot Content</div>} />);

    const rightSlotContent = screen.getByTestId('right-slot-content');
    expect(rightSlotContent).toBeInTheDocument();
    expect(rightSlotContent).toHaveTextContent('Right Slot Content');
  });

  it('renders both leftSlot and rightSlot content', () => {
    render(
      <Navbar
        leftSlot={<div data-testid="left-slot-content">Left Slot Content</div>}
        rightSlot={<div data-testid="right-slot-content">Right Slot Content</div>}
      />,
    );

    expect(screen.getByTestId('left-slot-content')).toBeInTheDocument();
    expect(screen.getByTestId('right-slot-content')).toBeInTheDocument();
  });

  it('renders complex content in slots', () => {
    render(
      <Navbar
        leftSlot={
          <>
            <span data-testid="left-slot-item-1">Item 1</span>
            <span data-testid="left-slot-item-2">Item 2</span>
          </>
        }
        rightSlot={
          <>
            <button data-testid="right-slot-button">Action</button>
            <div data-testid="right-slot-dropdown">Dropdown</div>
          </>
        }
      />,
    );

    // Verify left slot items
    expect(screen.getByTestId('left-slot-item-1')).toBeInTheDocument();
    expect(screen.getByTestId('left-slot-item-2')).toBeInTheDocument();

    // Verify right slot items
    expect(screen.getByTestId('right-slot-button')).toBeInTheDocument();
    expect(screen.getByTestId('right-slot-dropdown')).toBeInTheDocument();
  });

  it('uses custom dataTestId when provided', () => {
    render(<Navbar dataTestId="custom-navbar" />);

    // Should use the custom dataTestId
    expect(screen.getByTestId('custom-navbar')).toBeInTheDocument();

    // Default dataTestId should not be present
    expect(screen.queryByTestId('navbar')).not.toBeInTheDocument();
  });

  it('has the correct structure with all slots', () => {
    render(
      <Navbar
        className="test-navbar"
        sidebarTriggerClassName="test-trigger"
        leftSlot={<div data-testid="left-content">Left</div>}
        rightSlot={<div data-testid="right-content">Right</div>}
      />,
    );

    const navbar = screen.getByTestId('navbar');
    expect(navbar).toHaveClass('test-navbar');

    const sidebarTrigger = screen.getByTestId('mocked-sidebar-trigger');
    expect(sidebarTrigger).toHaveClass('test-trigger');

    const leftContent = screen.getByTestId('left-content');
    expect(leftContent).toBeInTheDocument();

    const rightContent = screen.getByTestId('right-content');
    expect(rightContent).toBeInTheDocument();

    // Ensure the left slot items are rendered after the sidebar trigger in the DOM
    expect(navbar.innerHTML).toMatch(/Sidebar Trigger.*Left/s);
  });

  it('applies dark mode classes correctly', () => {
    render(<Navbar />);

    const navbar = screen.getByTestId('navbar');
    expect(navbar).toHaveClass('dark:border-slate-700');
  });
});
