import { ProductInOrder } from '@backend/models/product-models/productInOrder';
import { useQuery } from '@tanstack/react-query';
import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { getOrderById } from '@/api';
import DetailsTableCell, { DetailsTableColumns, detailsTableColumns } from '@/components/common/DetailsTableCell';
import Page from '@/components/common/Page';
import routes from '@/components/common/Sidebar/routes';
import SimpleTable, { Columns } from '@/components/common/SimpleTable';
import TableLink from '@/components/common/TableLink';
import { dateFormat, priceFormat } from '@/utils/formatters';

const queryKey = 'getOrderById';

const columns: Columns<ProductInOrder> = [
  {
    field: 'Product',
    renderCell: ({ productName, productId }) => (
      <TableLink to={`${routes.products.path}/${productId}`}>
        {productName}
      </TableLink>
    ),
  },
  {
    field: 'Quantity',
    renderCell: ({ quantity }) => quantity,
  },
  {
    field: 'Order Price',
    renderCell: ({ orderPrice }) => priceFormat(orderPrice),
  },
  {
    field: 'Total Price',
    renderCell: ({ totalPrice }) => priceFormat(totalPrice),
  },
  {
    field: 'Discount',
    renderCell: ({ discount }) => `${discount}%`,
  },
];

const OrderDetails: React.FC = () => {
  const { orderId } = useParams();

  const query = useQuery({
    queryKey: [queryKey, orderId],
    queryFn: async () => {
      const result = await getOrderById(Number(orderId));
      return result.data;
    },
  });

  const { orderData, productsData } = useMemo(() => ({
    orderData: query.data?.data,
    productsData: query.data?.data.productsInOrder,
  }), [query.data?.data]);

  const orderRows = useMemo<DetailsTableColumns[] | undefined>(() => orderData && ([
    {
      column1: <DetailsTableCell title="Customer Id" info={(
        <TableLink to={`${routes.customers.path}/${orderData.customerId}`}>
          {orderData.customerId}
        </TableLink>
      )} />,
      column2: <DetailsTableCell title="Order Date" info={dateFormat(orderData.orderDate)} />,
    },
    {
      column1: <DetailsTableCell title="Ship Name" info={orderData.shipName} />,
      column2: <DetailsTableCell title="Required Date" info={dateFormat(orderData.requiredDate)} />,
    },
    {
      column1: <DetailsTableCell title="Total Products" info={orderData.totalProducts} />,
      column2: <DetailsTableCell title="Shipped Date" info={dateFormat(orderData.shippedDate)} />,
    },
    {
      column1: <DetailsTableCell title="Total Quantity" info={orderData.totalQuantity} />,
      column2: <DetailsTableCell title="Ship City" info={orderData.shipCity} />,
    },
    {
      column1: <DetailsTableCell title="Total Price" info={priceFormat(orderData.totalPrice)} />,
      column2: <DetailsTableCell title="Ship Region" info={orderData.shipCountry} />,
    },
    {
      column1: <DetailsTableCell title="Total Discount" info={priceFormat(orderData.totalDiscount)} />,
      column2: <DetailsTableCell title="Ship Postal Code" info={orderData.shipPostalCode} />,
    },
    {
      column1: <DetailsTableCell title="Ship Via" info={orderData.shipVia} />,
      column2: <DetailsTableCell title="Ship Country" info={orderData.shipCountry} />,
    },
    {
      column1: <DetailsTableCell title="Freight" info={priceFormat(orderData.freight)} />,
      column2: null,
    },
  ]), [orderData]);

  return (
    <>
      <StyledPage title="Order information" query={query}>
        <SimpleTable columns={detailsTableColumns} dataArray={orderRows!}/>
      </StyledPage>
      <Page title="Products in Order" query={query} withBack>
        <SimpleTable columns={columns} dataArray={productsData!}/>
      </Page>
    </>
  );
};

const StyledPage = styled(Page)`
  padding: 30px 45px;
`;

export default OrderDetails;
