import { act, fireEvent, render, renderHook, screen } from '@testing-library/react';
import type { ReactNode } from 'react';

import type { DataTableColumn } from '../../components/DataTable';
import { LayoutContextProvider } from '../../contexts';
import type { ColumnsState } from '../useColumns';
import { useColumns } from '../useColumns';

type Row = { id: number; name: string; email: string; secret: string };

const baseColumns: DataTableColumn<Row>[] = [
  { field: 'id', header: 'ID' },
  { field: 'name', header: 'Name' },
  { field: 'email', header: 'Email' },
];

function renderUseColumns(
  key: string,
  columns: DataTableColumn<Row>[] = baseColumns,
  bootstrapColumnsState?: Record<string, ColumnsState>,
) {
  return renderHook(() => useColumns<Row>(key, columns), {
    wrapper: ({ children }: { children: ReactNode }) => (
      <LayoutContextProvider columnsState={bootstrapColumnsState ?? {}}>
        {children}
      </LayoutContextProvider>
    ),
  });
}

describe('useColumns hook', () => {
  beforeEach(() => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));
  });

  it('returns the base columns unchanged when nothing is saved', () => {
    const { result } = renderUseColumns('orders');

    expect(result.current.columns.map((column) => column.field)).toEqual(['id', 'name', 'email']);
    expect(result.current.columns.every((column) => !column.hide)).toBe(true);
    expect(result.current.pickerProps.columns.map((column) => column.field)).toEqual([
      'id',
      'name',
      'email',
    ]);
  });

  it('excludes forced-hidden columns from pickerProps but keeps them in columns', () => {
    const columns: DataTableColumn<Row>[] = [
      ...baseColumns,
      { field: 'secret', header: 'Secret', hide: true },
    ];

    const { result } = renderUseColumns('orders', columns);

    expect(result.current.columns.map((column) => column.field)).toEqual([
      'id',
      'name',
      'email',
      'secret',
    ]);
    expect(result.current.columns.find((column) => column.field === 'secret')?.hide).toBe(true);
    expect(result.current.pickerProps.columns.map((column) => column.field)).toEqual([
      'id',
      'name',
      'email',
    ]);
  });

  it('applies the order and hidden fields bootstrapped from LayoutContext', () => {
    const { result } = renderUseColumns('orders', baseColumns, {
      orders: { order: ['email', 'id', 'name'], hidden: ['name'] },
    });

    expect(result.current.columns.map((column) => column.field)).toEqual(['email', 'id', 'name']);
    expect(result.current.columns.find((column) => column.field === 'name')?.hide).toBe(true);
  });

  it('appends new columns that are not part of a saved order', () => {
    const { result } = renderUseColumns('orders', baseColumns, {
      orders: { order: ['email', 'id'], hidden: [] },
    });

    expect(result.current.columns.map((column) => column.field)).toEqual(['email', 'id', 'name']);
  });

  it('drops stale fields from a saved order that no longer exist', () => {
    const { result } = renderUseColumns('orders', baseColumns, {
      orders: { order: ['ghost', 'name', 'id', 'email'], hidden: [] },
    });

    expect(result.current.columns.map((column) => column.field)).toEqual(['name', 'id', 'email']);
  });

  it('persists the new order via the LayoutContext setColumnsState', () => {
    const { result } = renderUseColumns('orders');

    act(() => {
      result.current.pickerProps.onReorder(['email', 'name', 'id']);
    });

    expect(result.current.columns.map((column) => column.field)).toEqual(['email', 'name', 'id']);
  });

  it('toggles a column visibility', () => {
    const { result } = renderUseColumns('orders');

    act(() => {
      result.current.pickerProps.onToggleHidden('name');
    });

    expect(result.current.columns.find((column) => column.field === 'name')?.hide).toBe(true);
    expect(result.current.pickerProps.columns.find((column) => column.field === 'name')?.hide).toBe(
      true,
    );

    act(() => {
      result.current.pickerProps.onToggleHidden('name');
    });

    expect(result.current.columns.find((column) => column.field === 'name')?.hide).toBe(false);
  });

  it('resets state to the default order and visibility', () => {
    const { result } = renderUseColumns('orders', baseColumns, {
      orders: { order: ['email', 'name', 'id'], hidden: ['email'] },
    });

    expect(result.current.columns.map((column) => column.field)).toEqual(['email', 'name', 'id']);
    expect(result.current.columns.find((column) => column.field === 'email')?.hide).toBe(true);

    act(() => {
      result.current.pickerProps.onReset();
    });

    expect(result.current.columns.map((column) => column.field)).toEqual(['id', 'name', 'email']);
    expect(result.current.columns.every((column) => !column.hide)).toBe(true);
  });

  describe('sharing state via LayoutContext', () => {
    const DualColumnsProbe = ({ keyA, keyB }: { keyA: string; keyB: string }) => {
      const a = useColumns<Row>(keyA, baseColumns);
      const b = useColumns<Row>(keyB, baseColumns);

      return (
        <div>
          <div data-testid="a-order">{a.columns.map((column) => column.field).join(',')}</div>
          <div data-testid="b-order">{b.columns.map((column) => column.field).join(',')}</div>
          <button
            data-testid="reorder-a"
            onClick={() => a.pickerProps.onReorder(['email', 'name', 'id'])}
          >
            Reorder A
          </button>
        </div>
      );
    };

    it('shares state between multiple useColumns calls using the same key', () => {
      render(
        <LayoutContextProvider columnsState={{}}>
          <DualColumnsProbe keyA="shared" keyB="shared" />
        </LayoutContextProvider>,
      );

      fireEvent.click(screen.getByTestId('reorder-a'));

      expect(screen.getByTestId('a-order').textContent).toBe('email,name,id');
      expect(screen.getByTestId('b-order').textContent).toBe('email,name,id');
    });

    it('keeps independent state for different keys', () => {
      render(
        <LayoutContextProvider columnsState={{}}>
          <DualColumnsProbe keyA="orders" keyB="invoices" />
        </LayoutContextProvider>,
      );

      fireEvent.click(screen.getByTestId('reorder-a'));

      expect(screen.getByTestId('a-order').textContent).toBe('email,name,id');
      expect(screen.getByTestId('b-order').textContent).toBe('id,name,email');
    });
  });
});
