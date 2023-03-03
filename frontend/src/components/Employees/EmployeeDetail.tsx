import { useQuery } from '@tanstack/react-query';
import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { getEmployeeById } from '@/api';
import DetailsTableCell, { DetailsTableColumns, detailsTableColumns } from '@/components/common/DetailsTableCell';
import routes from '@/components/common/Sidebar/routes';
import TableLink from '@/components/common/TableLink';
import { dateFormat } from '@/utils/formatters';

import Page from '../common/Page';
import SimpleTable  from '../common/SimpleTable';

const queryKey = 'getEmployeeById';

const EmployeeDetails: React.FC = () => {
  const { employeeId } = useParams();

  const query = useQuery({
    queryKey: [queryKey, employeeId],
    queryFn: async () => {
      const result = await getEmployeeById(Number(employeeId));
      return result.data;
    },
  });

  const employeeData = useMemo(() => query.data?.data, [query.data?.data]);

  const rows = useMemo<DetailsTableColumns[] | undefined>(() => employeeData && ([
    {
      column1: <DetailsTableCell title="Name" info={employeeData.name} />,
      column2: <DetailsTableCell title="Postal Code" info={dateFormat(employeeData.postalCode)} />,
    },
    {
      column1: <DetailsTableCell title="Title" info={employeeData.title} />,
      column2: <DetailsTableCell title="Country" info={employeeData.country} />,
    },
    {
      column1: <DetailsTableCell title="Title Of Courtesy" info={employeeData.titleOfCourtesy} />,
      column2: <DetailsTableCell title="Home Phone" info={employeeData.homePhone} />,
    },
    {
      column1: <DetailsTableCell title="Birth Date" info={dateFormat(employeeData.birthDate)} />,
      column2: <DetailsTableCell title="Extension" info={employeeData.extension} />,
    },
    {
      column1: <DetailsTableCell title="Hire Date" info={dateFormat(employeeData.hireDate)} />,
      column2: <DetailsTableCell title="Notes" info={employeeData.notes} />,
    },
    {
      column1: <DetailsTableCell title="Address" info={employeeData.address} />,
      column2: employeeData.reportsTo ? (<DetailsTableCell title="Reports To" info={(
        <TableLink to={`${routes.employees.path}/${employeeData.reportsTo.id}`}>
          {employeeData.reportsTo.name}
        </TableLink>
      )} />) : null,
    },
    {
      column1: <DetailsTableCell title="City" info={employeeData.city} />,
      column2: null,
    },
  ]), [employeeData]);

  return (
    <StyledPage title="Employee information" query={query} withBack>
      <SimpleTable columns={detailsTableColumns} dataArray={rows!}/>
    </StyledPage>
  );
};

const StyledPage = styled(Page)`
  padding: 30px 45px;
`;

export default EmployeeDetails;
