import { CustomerModel } from '@backend/models/customer-models/customer';
import { useQuery } from '@tanstack/react-query';
import React, { useMemo } from 'react';

import { getCustomers } from '@/api';
import routes from '@/components/common/Sidebar/routes';
import SimpleAvatar from '@/components/common/SimpleAvatar';
import TableLink from '@/components/common/TableLink';

import Page from '../common/Page';
import SimpleTable, { Columns } from '../common/SimpleTable';

const columns: Columns<CustomerModel> = [
  {
    field: '',
    renderCell: ({ contactName }) => <SimpleAvatar name={contactName} />,
    style: { width: '30px', padding: '5px 15px' },
  },
  {
    field: 'Company',
    renderCell: ({ companyName, customerId }) => (
      <TableLink to={`${routes.customers.path}/${customerId}`}>
        {companyName}
      </TableLink>
    ),
  },
  {
    field: 'Contact',
    renderCell: ({ contactName }) => contactName,
  },
  {
    field: 'Title',
    renderCell: ({ contactTitle }) => contactTitle,
  },
  {
    field: 'City',
    renderCell: ({ city }) => city,
  },
  {
    field: 'Country',
    renderCell: ({ country }) => country,
  },
];

const queryKey = 'getCustomers';

const Customers: React.FC = () => {

  const query = useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      const result = await getCustomers();
      return result.data;
    },
  });

  const dataArray = useMemo(() => query.data?.allValues, [query.data?.allValues]);

  return (
    <Page title="Customers" query={query}>
      <SimpleTable columns={columns} dataArray={dataArray!}/>
    </Page>
  );
};

export default Customers;
