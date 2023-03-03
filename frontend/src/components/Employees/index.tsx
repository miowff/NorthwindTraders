import { EmployeeModel } from '@backend/models/employees-models/employee';
import { useQuery } from '@tanstack/react-query';
import React, { useMemo } from 'react';
import styled from 'styled-components';

import { getEmployees } from '@/api';
import routes from '@/components/common/Sidebar/routes';
import SimpleAvatar from '@/components/common/SimpleAvatar';
import TableLink from '@/components/common/TableLink';

import Page from '../common/Page';
import SimpleTable, { Columns } from '../common/SimpleTable';

const columns: Columns<EmployeeModel> = [
  {
    field: '',
    renderCell: ({ name }) => <SimpleAvatar name={name} />,
    style: { width: '30px', padding: '5px 15px' },
  },
  {
    field: 'Name',
    renderCell: ({ name, id }) => (
      <TableLink to={`${routes.employees.path}/${id}`}>
        {name}
      </TableLink>
    ),
  },
  {
    field: 'Title',
    renderCell: ({ title }) => title,
  },
  {
    field: 'City',
    renderCell: ({ city }) => city,
  },
  {
    field: 'Phone',
    renderCell: ({ phone }) => phone,
  },
  {
    field: 'Country',
    renderCell: ({ country }) => country,
  },
];

const queryKey = 'getEmployees';

const Employees: React.FC = () => {

  const query = useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      const result = await getEmployees();
      return result.data;
    },
  });

  const dataArray = useMemo(() => query.data?.allValues, [query.data?.allValues]);

  return (
    <StyledPage title="Employees" query={query}>
      <SimpleTable columns={columns} dataArray={dataArray!} />
    </StyledPage>
  );
};

const StyledPage = styled(Page)`
`;

export default Employees;
