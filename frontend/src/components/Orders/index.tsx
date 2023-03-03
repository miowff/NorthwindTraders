import { OrderModel } from '@backend/models/order-models/order';
import { useQuery } from '@tanstack/react-query';
import React, { useMemo } from 'react';
import styled from 'styled-components';

import { getOrders } from '@/api';
import routes from '@/components/common/Sidebar/routes';
import TableLink from '@/components/common/TableLink';
import { dateFormat, priceFormat } from '@/utils/formatters';

import Page from '../common/Page';
import SimpleTable, { Columns } from '../common/SimpleTable';

const columns: Columns<OrderModel> = [
  {
    field: 'Id',
    renderCell: ({ id }) => (
      <TableLink to={`${routes.orders.path}/${id}`}>
        {id}
      </TableLink>
    ),
  },
  {
    field: 'Total Price',
    renderCell: ({ totalPrice }) => priceFormat(totalPrice),
  },
  {
    field: 'Products',
    renderCell: ({ totalProducts }) => totalProducts,
  },
  {
    field: 'Quantity',
    renderCell: ({ totalQuantity }) => totalQuantity,
  },
  {
    field: 'Shipped',
    renderCell: ({ shippedDate }) => dateFormat(shippedDate),
  },
  {
    field: 'Ship Name',
    renderCell: ({ shipName }) => shipName,
  },
  {
    field: 'City',
    renderCell: ({ shipCity }) => shipCity,
  },
  {
    field: 'Country',
    renderCell: ({ shipCountry }) => shipCountry,
  },
];

const queryKey = 'getOrders';

const Orders: React.FC = () => {

  const query = useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      const result = await getOrders();
      return result.data;
    },
  });

  const dataArray = useMemo(() => query.data?.allValues, [query.data?.allValues]);

  return (
    <StyledPage title="Orders" query={query}>
      <SimpleTable columns={columns} dataArray={dataArray!}/>
    </StyledPage>
  );
};

const StyledPage = styled(Page)`
`;

export default Orders;
