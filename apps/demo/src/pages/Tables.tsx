import dayjs from 'dayjs';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import { FC, useMemo, useState } from 'react';

import {
  Card,
  DataTable,
  DataTableColumn,
  DataTableSorting,
  Flex,
  Table,
  getDisplayDate,
} from 'tw-react-components';

import { Person, people } from '../data/people';

dayjs.extend(LocalizedFormat);

export const Tables: FC = () => {
  const [sorting, setSorting] = useState<DataTableSorting<Person>>();

  const rows = useMemo(
    () =>
      (sorting
        ? people.sort((a, b) =>
            sorting.direction === 'asc'
              ? sorting.comparator(a[sorting.field], b[sorting.field])
              : sorting.comparator(b[sorting.field], a[sorting.field])
          )
        : people
      ).slice(0, 10),
    [sorting]
  );

  const columns: DataTableColumn<Person>[] = [
    { header: 'ID', field: 'id' },
    { header: 'First Name', field: 'firstName' },
    { header: 'Last Name', field: 'lastLame' },
    { header: 'Email', field: 'email' },
    { header: 'Gender', field: 'gender' },
    {
      header: 'Birth Date',
      field: 'birthDate',
      render: (item) => getDisplayDate(new Date(item.birthDate), 'LL'),
    },
    { header: 'IP Address', field: 'ipAddress' },
  ];

  return (
    <Flex direction="column" fullWidth>
      <Card fullWidth>Simple Table</Card>
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.HeadCell>ID</Table.HeadCell>
            <Table.HeadCell>Name</Table.HeadCell>
            <Table.HeadCell>Title</Table.HeadCell>
            <Table.HeadCell>Company</Table.HeadCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row>
            <Table.Cell align="center">1</Table.Cell>
            <Table.Cell align="center">Nasreddine</Table.Cell>
            <Table.Cell align="center">Software Engineer</Table.Cell>
            <Table.Cell align="center">Zoover</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell align="center">2</Table.Cell>
            <Table.Cell align="center">Nesrine</Table.Cell>
            <Table.Cell align="center">Software Engineer</Table.Cell>
            <Table.Cell align="center">AH</Table.Cell>
          </Table.Row>
        </Table.Body>
        <Table.Footer>
          <Table.Row>
            <Table.Cell colSpan={4} align="center">
              Footer
            </Table.Cell>
          </Table.Row>
        </Table.Footer>
      </Table>
      <Card fullWidth>Data Table</Card>
      <DataTable columns={columns} rows={rows} onSortingChange={setSorting} />
    </Flex>
  );
};
