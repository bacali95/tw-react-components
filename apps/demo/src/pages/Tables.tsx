import dayjs from 'dayjs';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import { PencilIcon, TrashIcon } from 'lucide-react';
import { FC, useMemo, useState } from 'react';

import {
  Card,
  DataTable,
  DataTableColumns,
  DataTablePageSize,
  DataTableSorting,
  getDisplayDate,
} from 'tw-react-components';

import { Person, people } from '../data/people';

dayjs.extend(LocalizedFormat);

export const Tables: FC = () => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState<DataTablePageSize>(10);
  const [sorting, setSorting] = useState<DataTableSorting<Person>>();

  const sortedPeople = useMemo(
    () => [
      ...(sorting
        ? people.sort((a, b) =>
            sorting.direction === 'asc'
              ? sorting.comparator(a[sorting.field], b[sorting.field])
              : sorting.comparator(b[sorting.field], a[sorting.field])
          )
        : people),
    ],
    [sorting]
  );

  const rows = useMemo(
    () => sortedPeople.slice(page * pageSize, (page + 1) * pageSize),
    [page, pageSize, sortedPeople]
  );

  const columns: DataTableColumns<Person> = {
    id: { header: 'ID', field: 'id' },
    firstName: { header: 'First Name', field: 'firstName' },
    lastLame: { header: 'Last Name', field: 'lastLame' },
    email: { header: 'Email', field: 'email' },
    gender: { header: 'Gender', field: 'gender' },
    birthDate: {
      header: 'Birth Date',
      field: 'birthDate',
      render: (item) => getDisplayDate(new Date(item.birthDate), 'LL'),
    },
    ipAddress: { header: 'IP Address', field: 'ipAddress' },
  };

  return (
    <>
      <Card fullWidth>Data Table</Card>
      <DataTable
        rows={rows}
        columns={columns}
        sorting={{ sorting, onSortingChange: setSorting }}
        pagination={{
          pageSize,
          currentPage: page,
          setCurrentPage: setPage,
          totalItems: people.length,
          onPageSizeChange: setPageSize,
        }}
        actions={[
          {
            color: 'yellow',
            icon: PencilIcon,
            onClick: (item) => alert(`Edit clicked for ${item.firstName}!`),
          },
          {
            color: 'red',
            icon: TrashIcon,
            onClick: (item) => alert(`Delete clicked for ${item.firstName}!`),
          },
        ]}
        onRowClick={(item) => alert(`Row clicked for ${item.firstName}!`)}
      />
    </>
  );
};