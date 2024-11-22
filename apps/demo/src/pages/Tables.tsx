import dayjs from 'dayjs';
import LocalizedFormat from 'dayjs/plugin/localizedFormat.js';
import { PencilIcon, TrashIcon } from 'lucide-react';
import type { FC } from 'react';
import { useMemo, useState } from 'react';

import type { DataTableColumns, DataTablePageSize, DataTableSorting } from 'tw-react-components';
import { DataTable, Flex, getDisplayDate } from 'tw-react-components';

import type { Person } from '../data/people';
import { people } from '../data/people';

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
              : sorting.comparator(b[sorting.field], a[sorting.field]),
          )
        : people),
    ],
    [sorting],
  );

  const rows = useMemo(
    () => sortedPeople.slice(page * pageSize, (page + 1) * pageSize),
    [page, pageSize, sortedPeople],
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
      Data Table
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
        rowExtraContent={{
          idGetter: (item) => item.id,
          component: ({ item }) => (
            <Flex className="px-4 py-2 dark:bg-slate-900">
              Extra information for '{item.firstName} {item.lastLame}'
            </Flex>
          ),
        }}
        rowClassName={(item) => (item.gender === 'Female' ? 'bg-pink-500/20' : 'bg-blue-500/20')}
        actions={[
          {
            color: 'yellow',
            icon: PencilIcon,
            hasNotification: (user) =>
              user.gender === 'Male'
                ? {
                    type: 'badge',
                    props: {
                      children: 1,
                      className: 'text-xs rounded-full aspect-square justify-center',
                    },
                  }
                : { type: 'dot', props: { ping: true } },
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
