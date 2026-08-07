import { useCallback, useMemo } from 'react';

import type { DataTableColumn, DataTableColumns } from '../components/DataTable';
import { useLayoutContext } from '../contexts';

export type ColumnsState = { order: string[]; hidden: string[] };

export const DEFAULT_COLUMNS_STATE: ColumnsState = { order: [], hidden: [] };
export const COLUMNS_COOKIE_NAME = 'tables:columns:state';
export const COLUMNS_COOKIE_MAX_AGE = 60 * 60 * 24 * 30;

function applyColumnsState<T extends { field: string; hide?: boolean }>(
  columns: T[],
  state: ColumnsState,
): T[] {
  const forcedHidden = columns.filter((column) => column.hide === true);
  const pickable = columns.filter((column) => column.hide !== true);
  const pickableFields = new Set(pickable.map((column) => column.field));

  const orderedKnownFields = state.order.filter((field) => pickableFields.has(field));
  const newFields = pickable
    .map((column) => column.field)
    .filter((field) => !orderedKnownFields.includes(field));
  const finalOrder = [...orderedKnownFields, ...newFields];

  const hiddenFields = new Set(state.hidden.filter((field) => pickableFields.has(field)));
  const byField = new Map(pickable.map((column) => [column.field, column]));

  return [
    ...finalOrder.map((field) => ({ ...byField.get(field)!, hide: hiddenFields.has(field) }) as T),
    ...forcedHidden,
  ];
}

export type ColumnsPickerProps<T> = {
  columns: DataTableColumn<T>[];
  onReorder: (fields: string[]) => void;
  onToggleHidden: (field: string) => void;
  onReset: () => void;
};

export function useColumns<T>(
  key: string,
  baseColumns: DataTableColumns<T> | DataTableColumn<T>[],
): { columns: DataTableColumn<T>[]; pickerProps: ColumnsPickerProps<T> } {
  const { columnsState, setColumnsState } = useLayoutContext();

  const state = useMemo<ColumnsState>(
    () => columnsState[key] ?? DEFAULT_COLUMNS_STATE,
    [columnsState, key],
  );

  const _baseColumns: DataTableColumn<T>[] = useMemo(
    () => (Array.isArray(baseColumns) ? baseColumns : Object.values(baseColumns)),
    [baseColumns],
  );

  const columns = useMemo(() => applyColumnsState(_baseColumns, state), [_baseColumns, state]);

  const pickableColumns = useMemo(
    () =>
      applyColumnsState(
        _baseColumns.filter((column) => column.hide !== true),
        state,
      ),
    [_baseColumns, state],
  );

  const persist = useCallback(
    (next: ColumnsState) => {
      setColumnsState(key, next);
    },
    [key, setColumnsState],
  );

  const onReorder = useCallback(
    (fields: string[]) => persist({ ...state, order: fields }),
    [state, persist],
  );

  const onToggleHidden = useCallback(
    (field: string) =>
      persist({
        ...state,
        hidden: state.hidden.includes(field)
          ? state.hidden.filter((f) => f !== field)
          : [...state.hidden, field],
      }),
    [state, persist],
  );

  const onReset = useCallback(() => persist(DEFAULT_COLUMNS_STATE), [persist]);

  return {
    columns,
    pickerProps: { columns: pickableColumns, onReorder, onToggleHidden, onReset },
  };
}
