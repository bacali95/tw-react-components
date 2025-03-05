import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Pagination } from '..';

describe('Pagination Component', () => {
  const defaultProps = {
    totalItems: 100,
    currentPage: 0,
    setCurrentPage: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with default props', () => {
    render(<Pagination {...defaultProps} />);

    // Check if pagination container is rendered
    const pagination = screen.getByTestId('pagination');
    expect(pagination).toBeInTheDocument();

    // Check navigation buttons
    expect(screen.getByTestId('pagination-first-page')).toBeInTheDocument();
    expect(screen.getByTestId('pagination-previous-page')).toBeInTheDocument();
    expect(screen.getByTestId('pagination-next-page')).toBeInTheDocument();
    expect(screen.getByTestId('pagination-last-page')).toBeInTheDocument();

    // Check page numbers are rendered
    expect(screen.getByTestId('pagination-page-1')).toHaveTextContent('1');
    expect(screen.getByTestId('pagination-page-1')).toHaveClass('bg-slate-100');
  });

  it('renders correct number of pages based on totalItems and pageSize', () => {
    render(<Pagination {...defaultProps} pageSize={20} />);

    // With 100 items and pageSize 20, we should have 5 pages
    expect(screen.getByTestId('pagination-page-1')).toBeInTheDocument();
    expect(screen.getByTestId('pagination-page-2')).toBeInTheDocument();
    expect(screen.getByTestId('pagination-page-3')).toBeInTheDocument();
    expect(screen.getByTestId('pagination-page-4')).toBeInTheDocument();
    expect(screen.getByTestId('pagination-page-5')).toBeInTheDocument();
  });

  it('disables first and previous buttons on first page', () => {
    render(<Pagination {...defaultProps} currentPage={0} />);

    const firstPageButton = screen.getByTestId('pagination-first-page');
    const prevPageButton = screen.getByTestId('pagination-previous-page');

    expect(firstPageButton).toHaveClass('text-slate-400');
    expect(prevPageButton).toHaveClass('text-slate-400');

    // Next and last should be enabled
    const nextPageButton = screen.getByTestId('pagination-next-page');
    const lastPageButton = screen.getByTestId('pagination-last-page');

    expect(nextPageButton).not.toHaveClass('text-slate-400');
    expect(lastPageButton).not.toHaveClass('text-slate-400');
  });

  it('disables next and last buttons on last page', () => {
    render(<Pagination {...defaultProps} currentPage={9} />);

    const nextPageButton = screen.getByTestId('pagination-next-page');
    const lastPageButton = screen.getByTestId('pagination-last-page');

    expect(nextPageButton).toHaveClass('text-slate-400');
    expect(lastPageButton).toHaveClass('text-slate-400');

    // First and previous should be enabled
    const firstPageButton = screen.getByTestId('pagination-first-page');
    const prevPageButton = screen.getByTestId('pagination-previous-page');

    expect(firstPageButton).not.toHaveClass('text-slate-400');
    expect(prevPageButton).not.toHaveClass('text-slate-400');
  });

  it('navigates to first page when clicking first page button', async () => {
    render(<Pagination {...defaultProps} currentPage={5} />);

    const firstPageButton = screen.getByTestId('pagination-first-page');
    await userEvent.click(firstPageButton);

    expect(defaultProps.setCurrentPage).toHaveBeenCalledWith(0);
  });

  it('navigates to previous page when clicking previous button', async () => {
    render(<Pagination {...defaultProps} currentPage={5} />);

    const prevPageButton = screen.getByTestId('pagination-previous-page');
    await userEvent.click(prevPageButton);

    expect(defaultProps.setCurrentPage).toHaveBeenCalledWith(4);
  });

  it('navigates to next page when clicking next button', async () => {
    render(<Pagination {...defaultProps} currentPage={5} />);

    const nextPageButton = screen.getByTestId('pagination-next-page');
    await userEvent.click(nextPageButton);

    expect(defaultProps.setCurrentPage).toHaveBeenCalledWith(6);
  });

  it('navigates to last page when clicking last page button', async () => {
    render(<Pagination {...defaultProps} currentPage={5} />);

    const lastPageButton = screen.getByTestId('pagination-last-page');
    await userEvent.click(lastPageButton);

    expect(defaultProps.setCurrentPage).toHaveBeenCalledWith(9);
  });

  it('navigates to a specific page when clicking page number', async () => {
    render(<Pagination {...defaultProps} currentPage={0} />);

    // Click on page 3
    const page3Button = screen.getByTestId('pagination-page-3');
    await userEvent.click(page3Button);

    expect(defaultProps.setCurrentPage).toHaveBeenCalledWith(2);
  });

  it('renders ellipsis (...) for large page ranges', () => {
    render(<Pagination totalItems={200} currentPage={5} setCurrentPage={jest.fn()} />);

    // Should show ellipsis with many pages
    const ellipsisElements = screen.getAllByText('...');
    expect(ellipsisElements.length).toBeGreaterThan(0);
  });

  it('applies custom dataTestId', () => {
    render(<Pagination {...defaultProps} dataTestId="custom-pagination" />);

    expect(screen.getByTestId('custom-pagination')).toBeInTheDocument();
    expect(screen.getByTestId('custom-pagination-first-page')).toBeInTheDocument();
    expect(screen.getByTestId('custom-pagination-previous-page')).toBeInTheDocument();
    expect(screen.getByTestId('custom-pagination-next-page')).toBeInTheDocument();
    expect(screen.getByTestId('custom-pagination-last-page')).toBeInTheDocument();
    expect(screen.getByTestId('custom-pagination-page-1')).toBeInTheDocument();
  });

  it('disables all buttons when disabled prop is true', () => {
    render(<Pagination {...defaultProps} disabled />);

    const firstPageButton = screen.getByTestId('pagination-first-page');
    const prevPageButton = screen.getByTestId('pagination-previous-page');
    const nextPageButton = screen.getByTestId('pagination-next-page');
    const lastPageButton = screen.getByTestId('pagination-last-page');
    const page1Button = screen.getByTestId('pagination-page-1');

    expect(firstPageButton).toHaveClass('text-slate-400');
    expect(prevPageButton).toHaveClass('text-slate-400');
    expect(nextPageButton).toHaveClass('text-slate-400');
    expect(lastPageButton).toHaveClass('text-slate-400');
    expect(page1Button).toHaveClass('text-slate-400');
  });

  it('handles dark mode styling correctly', () => {
    render(<Pagination {...defaultProps} />);

    const paginationContainer = screen.getByTestId('pagination').firstChild;
    expect(paginationContainer).toHaveClass('dark:divide-slate-700');
    expect(paginationContainer).toHaveClass('dark:border-slate-700');
    expect(paginationContainer).toHaveClass('dark:bg-slate-800');
  });

  it('maintains currentPage within valid range when totalItems changes', () => {
    const setCurrentPage = jest.fn();
    const { rerender } = render(
      <Pagination totalItems={100} currentPage={9} setCurrentPage={setCurrentPage} />,
    );

    // Update with fewer items (5 pages instead of 10)
    rerender(<Pagination totalItems={50} currentPage={9} setCurrentPage={setCurrentPage} />);

    // Should adjust the currentPage to be within the new valid range
    expect(setCurrentPage).toHaveBeenCalled();
  });

  it('adjusts active page highlight when currentPage changes', () => {
    const { rerender } = render(<Pagination {...defaultProps} currentPage={0} />);

    // First page should be active
    expect(screen.getByTestId('pagination-page-1')).toHaveClass('bg-slate-100');

    // Update to page 2
    rerender(<Pagination {...defaultProps} currentPage={1} />);

    // Second page should now be active
    expect(screen.getByTestId('pagination-page-2')).toHaveClass('bg-slate-100');
  });
});
