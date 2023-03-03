import { useQuery } from '@tanstack/react-query';
import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { getProductById } from '@/api';
import DetailsTableCell, { DetailsTableColumns, detailsTableColumns } from '@/components/common/DetailsTableCell';
import { priceFormat } from '@/utils/formatters';

import Page from '../common/Page';
import SimpleTable  from '../common/SimpleTable';

const queryKey = 'getProductById';

const ProductDetails: React.FC = () => {
  const { productId } = useParams();

  const query = useQuery({
    queryKey: [queryKey, productId],
    queryFn: async () => {
      const result = await getProductById(Number(productId));
      return result.data;
    },
  });

  const productData = useMemo(() => query.data?.data, [query.data?.data]);

  const rows = useMemo<DetailsTableColumns[] | undefined>(() => productData && ([
    {
      column1: <DetailsTableCell title="Product Name" info={productData.name} />,
      column2: <DetailsTableCell title="Units In Stock" info={productData.stock} />,
    },
    {
      column1: <DetailsTableCell title="Supplier" info={productData.supplier} />,
      column2: <DetailsTableCell title="Units In Order" info={productData.unitsInOrder} />,
    },
    {
      column1: <DetailsTableCell title="Quantity Per Unit" info={productData.quantityPerUnit} />,
      column2: <DetailsTableCell title="Reorder Level" info={productData.reorderLevel} />,
    },
    {
      column1: <DetailsTableCell title="Unit Price" info={priceFormat(productData.price)} />,
      column2: <DetailsTableCell title="Discontinued" info={productData.discontinued} />,
    },
  ]), [productData]);

  return (
    <StyledPage title="Product information" query={query} withBack>
      <SimpleTable columns={detailsTableColumns} dataArray={rows!}/>
    </StyledPage>
  );
};

const StyledPage = styled(Page)`
  padding: 30px 45px;
`;

export default ProductDetails;
