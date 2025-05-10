import { render, screen } from '@testing-library/react';

import { Table } from '..';

describe('Table Component', () => {
  describe('Main Table Component', () => {
    it('renders correctly with default props', () => {
      render(
        <Table>
          <Table.Body>
            <Table.Row>
              <Table.Cell>Test Cell</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>,
      );

      const table = screen.getByTestId('table');
      expect(table).toBeInTheDocument();
      expect(table.tagName).toBe('TABLE');
      expect(table).toHaveClass('min-w-full', 'divide-y');
    });

    it('applies custom className to the container', () => {
      render(
        <Table className="custom-class">
          <Table.Body>
            <Table.Row>
              <Table.Cell>Test Cell</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>,
      );

      const flexContainer = screen.getByTestId('table').parentElement;
      expect(flexContainer).toHaveClass('custom-class');
      expect(flexContainer).toHaveClass('overflow-auto', 'rounded-lg'); // Default classes
    });

    it('applies custom dataTestId', () => {
      render(
        <Table dataTestId="custom-table">
          <Table.Body>
            <Table.Row>
              <Table.Cell>Test Cell</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>,
      );

      const table = screen.getByTestId('custom-table');
      expect(table).toBeInTheDocument();
    });

    it('passes additional props to the table element', () => {
      render(
        <Table id="test-id" aria-label="Test Table">
          <Table.Body>
            <Table.Row>
              <Table.Cell>Test Cell</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>,
      );

      const table = screen.getByTestId('table');
      expect(table).toHaveAttribute('id', 'test-id');
      expect(table).toHaveAttribute('aria-label', 'Test Table');
    });
  });

  describe('Table.Head Component', () => {
    it('renders correctly with default props', () => {
      render(
        <Table>
          <Table.Head>
            <Table.Row>
              <Table.HeadCell>Header</Table.HeadCell>
            </Table.Row>
          </Table.Head>
        </Table>,
      );

      const head = screen.getByTestId('table-head');
      expect(head).toBeInTheDocument();
      expect(head.tagName).toBe('THEAD');
      expect(head).toHaveClass('border-b', 'bg-background', 'text-slate-800');
    });

    it('applies custom className while maintaining default classes', () => {
      render(
        <Table>
          <Table.Head className="custom-head-class">
            <Table.Row>
              <Table.HeadCell>Header</Table.HeadCell>
            </Table.Row>
          </Table.Head>
        </Table>,
      );

      const head = screen.getByTestId('table-head');
      expect(head).toHaveClass('custom-head-class');
      expect(head).toHaveClass('border-b', 'bg-background'); // Default classes
    });

    it('applies custom dataTestId', () => {
      render(
        <Table>
          <Table.Head dataTestId="custom-head">
            <Table.Row>
              <Table.HeadCell>Header</Table.HeadCell>
            </Table.Row>
          </Table.Head>
        </Table>,
      );

      const head = screen.getByTestId('custom-head');
      expect(head).toBeInTheDocument();
    });
  });

  describe('Table.HeadCell Component', () => {
    it('renders correctly with default props', () => {
      render(
        <Table>
          <Table.Head>
            <Table.Row>
              <Table.HeadCell>Header Cell</Table.HeadCell>
            </Table.Row>
          </Table.Head>
        </Table>,
      );

      const headCell = screen.getByTestId('table-head-cell');
      expect(headCell).toBeInTheDocument();
      expect(headCell.tagName).toBe('TH');
      expect(headCell).toHaveClass('px-4', 'py-2', 'font-medium');
      expect(headCell).toHaveTextContent('Header Cell');
    });

    it('applies custom className while maintaining default classes', () => {
      render(
        <Table>
          <Table.Head>
            <Table.Row>
              <Table.HeadCell className="custom-head-cell-class">Header Cell</Table.HeadCell>
            </Table.Row>
          </Table.Head>
        </Table>,
      );

      const headCell = screen.getByTestId('table-head-cell');
      expect(headCell).toHaveClass('custom-head-cell-class');
      expect(headCell).toHaveClass('px-4', 'py-2', 'font-medium'); // Default classes
    });

    it('applies custom dataTestId', () => {
      render(
        <Table>
          <Table.Head>
            <Table.Row>
              <Table.HeadCell dataTestId="custom-head-cell">Header Cell</Table.HeadCell>
            </Table.Row>
          </Table.Head>
        </Table>,
      );

      const headCell = screen.getByTestId('custom-head-cell');
      expect(headCell).toBeInTheDocument();
    });

    it('passes additional props to the th element', () => {
      render(
        <Table>
          <Table.Head>
            <Table.Row>
              <Table.HeadCell colSpan={2} scope="col">
                Header Cell
              </Table.HeadCell>
            </Table.Row>
          </Table.Head>
        </Table>,
      );

      const headCell = screen.getByTestId('table-head-cell');
      expect(headCell).toHaveAttribute('colSpan', '2');
      expect(headCell).toHaveAttribute('scope', 'col');
    });
  });

  describe('Table.Body Component', () => {
    it('renders correctly with default props', () => {
      render(
        <Table>
          <Table.Body>
            <Table.Row>
              <Table.Cell>Cell</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>,
      );

      const body = screen.getByTestId('table-body');
      expect(body).toBeInTheDocument();
      expect(body.tagName).toBe('TBODY');
      expect(body).toHaveClass('divide-y', 'bg-background');
    });

    it('applies custom className while maintaining default classes', () => {
      render(
        <Table>
          <Table.Body className="custom-body-class">
            <Table.Row>
              <Table.Cell>Cell</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>,
      );

      const body = screen.getByTestId('table-body');
      expect(body).toHaveClass('custom-body-class');
      expect(body).toHaveClass('divide-y', 'bg-background'); // Default classes
    });

    it('applies custom dataTestId', () => {
      render(
        <Table>
          <Table.Body dataTestId="custom-body">
            <Table.Row>
              <Table.Cell>Cell</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>,
      );

      const body = screen.getByTestId('custom-body');
      expect(body).toBeInTheDocument();
    });
  });

  describe('Table.Row Component', () => {
    it('renders correctly with default props', () => {
      render(
        <Table>
          <Table.Body>
            <Table.Row>
              <Table.Cell>Cell</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>,
      );

      const row = screen.getByTestId('table-row');
      expect(row).toBeInTheDocument();
      expect(row.tagName).toBe('TR');
    });

    it('applies custom dataTestId', () => {
      render(
        <Table>
          <Table.Body>
            <Table.Row dataTestId="custom-row">
              <Table.Cell>Cell</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>,
      );

      const row = screen.getByTestId('custom-row');
      expect(row).toBeInTheDocument();
    });

    it('passes additional props to the tr element', () => {
      render(
        <Table>
          <Table.Body>
            <Table.Row id="test-row" className="custom-row-class">
              <Table.Cell>Cell</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>,
      );

      const row = screen.getByTestId('table-row');
      expect(row).toHaveAttribute('id', 'test-row');
      expect(row).toHaveClass('custom-row-class');
    });
  });

  describe('Table.Cell Component', () => {
    it('renders correctly with default props', () => {
      render(
        <Table>
          <Table.Body>
            <Table.Row>
              <Table.Cell>Cell Content</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>,
      );

      const cell = screen.getByTestId('table-cell');
      expect(cell).toBeInTheDocument();
      expect(cell.tagName).toBe('TD');
      expect(cell).toHaveClass('px-4', 'py-2');
      expect(cell).toHaveTextContent('Cell Content');
    });

    it('applies custom className while maintaining default classes', () => {
      render(
        <Table>
          <Table.Body>
            <Table.Row>
              <Table.Cell className="custom-cell-class">Cell Content</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>,
      );

      const cell = screen.getByTestId('table-cell');
      expect(cell).toHaveClass('custom-cell-class');
      expect(cell).toHaveClass('px-4', 'py-2'); // Default classes
    });

    it('applies custom dataTestId', () => {
      render(
        <Table>
          <Table.Body>
            <Table.Row>
              <Table.Cell dataTestId="custom-cell">Cell Content</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>,
      );

      const cell = screen.getByTestId('custom-cell');
      expect(cell).toBeInTheDocument();
    });

    it('passes additional props to the td element', () => {
      render(
        <Table>
          <Table.Body>
            <Table.Row>
              <Table.Cell colSpan={2} align="center">
                Cell Content
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>,
      );

      const cell = screen.getByTestId('table-cell');
      expect(cell).toHaveAttribute('colSpan', '2');
      expect(cell).toHaveAttribute('align', 'center');
    });
  });

  describe('Table.Footer Component', () => {
    it('renders correctly with default props', () => {
      render(
        <Table>
          <Table.Footer>
            <Table.Row>
              <Table.Cell>Footer</Table.Cell>
            </Table.Row>
          </Table.Footer>
        </Table>,
      );

      const footer = screen.getByTestId('table-footer');
      expect(footer).toBeInTheDocument();
      expect(footer.tagName).toBe('TFOOT');
      expect(footer).toHaveClass('bg-background', 'text-slate-800');
    });

    it('applies custom className while maintaining default classes', () => {
      render(
        <Table>
          <Table.Footer className="custom-footer-class">
            <Table.Row>
              <Table.Cell>Footer</Table.Cell>
            </Table.Row>
          </Table.Footer>
        </Table>,
      );

      const footer = screen.getByTestId('table-footer');
      expect(footer).toHaveClass('custom-footer-class');
      expect(footer).toHaveClass('bg-background', 'text-slate-800'); // Default classes
    });

    it('applies custom dataTestId', () => {
      render(
        <Table>
          <Table.Footer dataTestId="custom-footer">
            <Table.Row>
              <Table.Cell>Footer</Table.Cell>
            </Table.Row>
          </Table.Footer>
        </Table>,
      );

      const footer = screen.getByTestId('custom-footer');
      expect(footer).toBeInTheDocument();
    });
  });

  describe('Complete Table Structure', () => {
    it('renders a complete table structure correctly', () => {
      render(
        <Table dataTestId="complete-table">
          <Table.Head dataTestId="complete-head">
            <Table.Row dataTestId="head-row">
              <Table.HeadCell dataTestId="head-cell-1">Name</Table.HeadCell>
              <Table.HeadCell dataTestId="head-cell-2">Age</Table.HeadCell>
            </Table.Row>
          </Table.Head>
          <Table.Body dataTestId="complete-body">
            <Table.Row dataTestId="body-row-1">
              <Table.Cell dataTestId="body-cell-1">John</Table.Cell>
              <Table.Cell dataTestId="body-cell-2">25</Table.Cell>
            </Table.Row>
            <Table.Row dataTestId="body-row-2">
              <Table.Cell dataTestId="body-cell-3">Jane</Table.Cell>
              <Table.Cell dataTestId="body-cell-4">24</Table.Cell>
            </Table.Row>
          </Table.Body>
          <Table.Footer dataTestId="complete-footer">
            <Table.Row dataTestId="footer-row">
              <Table.Cell dataTestId="footer-cell" colSpan={2}>
                Total: 2 users
              </Table.Cell>
            </Table.Row>
          </Table.Footer>
        </Table>,
      );

      // Check that all parts exist
      expect(screen.getByTestId('complete-table')).toBeInTheDocument();
      expect(screen.getByTestId('complete-head')).toBeInTheDocument();
      expect(screen.getByTestId('head-row')).toBeInTheDocument();
      expect(screen.getByTestId('head-cell-1')).toHaveTextContent('Name');
      expect(screen.getByTestId('head-cell-2')).toHaveTextContent('Age');

      expect(screen.getByTestId('complete-body')).toBeInTheDocument();
      expect(screen.getByTestId('body-row-1')).toBeInTheDocument();
      expect(screen.getByTestId('body-cell-1')).toHaveTextContent('John');
      expect(screen.getByTestId('body-cell-2')).toHaveTextContent('25');
      expect(screen.getByTestId('body-row-2')).toBeInTheDocument();
      expect(screen.getByTestId('body-cell-3')).toHaveTextContent('Jane');
      expect(screen.getByTestId('body-cell-4')).toHaveTextContent('24');

      expect(screen.getByTestId('complete-footer')).toBeInTheDocument();
      expect(screen.getByTestId('footer-row')).toBeInTheDocument();
      expect(screen.getByTestId('footer-cell')).toHaveTextContent('Total: 2 users');
      expect(screen.getByTestId('footer-cell')).toHaveAttribute('colSpan', '2');

      // Check the basic structure
      const table = screen.getByTestId('complete-table');
      const head = screen.getByTestId('complete-head');
      const body = screen.getByTestId('complete-body');
      const footer = screen.getByTestId('complete-footer');

      expect(table.contains(head)).toBe(true);
      expect(table.contains(body)).toBe(true);
      expect(table.contains(footer)).toBe(true);
    });
  });
});
