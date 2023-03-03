import { ProductModel } from '@backend/models/product-models/product';
import { useQuery } from '@tanstack/react-query';
import React, { useMemo } from 'react';
import styled from 'styled-components';

import { getProducts } from '@/api';
import routes from '@/components/common/Sidebar/routes';
import TableLink from '@/components/common/TableLink';
import { priceFormat } from '@/utils/formatters';

import Page from '../common/Page';
import SimpleTable, { Columns } from '../common/SimpleTable';

const columns: Columns<ProductModel> = [
  {
    field: 'Name',
    renderCell: ({ name, id }) => (
      <TableLink to={`${routes.products.path}/${id}`}>
        {name}
      </TableLink>
    ),
  },
  {
    field: 'Qt per unit',
    renderCell: ({ quantityPerUnit }) => quantityPerUnit,
  },
  {
    field: 'Price',
    renderCell: ({ price }) => priceFormat(price),
  },
  {
    field: 'Stock',
    renderCell: ({ stock }) => stock,
  },
  {
    field: 'Orders',
    renderCell: ({ orders }) => orders,
  },
];

const queryKey = 'getProducts';

const Products: React.FC = () => {

  const query = useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      const result = await getProducts();
      return result.data;
    },
  });

  const dataArray = useMemo(() => query.data?.allValues, [query.data?.allValues]);

  return (
    <StyledPage title="Products" query={query}>
      <SimpleTable columns={columns} dataArray={dataArray!}/>
    </StyledPage>
  );
};

const StyledPage = styled(Page)`
`;

export default Products;
