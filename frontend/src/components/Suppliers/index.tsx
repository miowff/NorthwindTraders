import { SupplierModel } from '@backend/models/supplier-models/supplier';
import { useQuery } from '@tanstack/react-query';
import React, { useMemo } from 'react';

import { getSuppliers } from '@/api';
import routes from '@/components/common/Sidebar/routes';
import SimpleAvatar from '@/components/common/SimpleAvatar';
import TableLink from '@/components/common/TableLink';

import Page from '../common/Page';
import SimpleTable, { Columns } from '../common/SimpleTable';

const columns: Columns<SupplierModel> = [
  {
    field: '',
    renderCell: ({ contactName }) => <SimpleAvatar name={contactName} />,
    style: { width: '30px', padding: '5px 15px' },
  },
  {
    field: 'Company',
    renderCell: ({ companyName, supplierId }) => (
      <TableLink to={`${routes.suppliers.path}/${supplierId}`}>
        {companyName}
      </TableLink>
    ),
  },
  {
    field: 'Contact',
    renderCell: ({ contactName, contactTitle }) => `${contactName} ${contactTitle}`,
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

const queryKey = 'getSuppliers';

const Suppliers: React.FC = () => {

  const query = useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      const result = await getSuppliers();
      return result.data;
    },
  });

  const dataArray = useMemo(() => query.data?.allValues, [query.data?.allValues]);

  return (
    <Page title="Suppliers" query={query}>
      <SimpleTable columns={columns} dataArray={dataArray!}/>
    </Page>
  );
};

export default Suppliers;
