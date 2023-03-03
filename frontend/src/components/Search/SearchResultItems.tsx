import { SearchResultCustomer } from '@backend/models/customer-models/searchResultCustomer';
import { SearchResultProduct } from '@backend/models/product-models/searchResultProduct';
import React from 'react';
import styled from 'styled-components';

import routes from '@/components/common/Sidebar/routes';
import TableLink from '@/components/common/TableLink';

export const ProductItem: React.FC<{ item: SearchResultProduct }> = ({ item }) => {
  return (
    <ResultItem>
      <TableLink to={`${routes.products.path}/${item.id}`}>
        {item.name}
      </TableLink>
      <SecondaryText>
        #1, Quantity Per Unit: {item.quantityPerUnit}, Price: {item.price}, Stock: {item.stock}
      </SecondaryText>
    </ResultItem>
  );
};

export const CustomerItem: React.FC<{ item: SearchResultCustomer }> = ({ item }) => {
  return (
    <ResultItem>
      <TableLink to={`${routes.customers.path}/${item.customerId}`}>
        {item.companyName}
      </TableLink>
      <SecondaryText>
        #1, Contact: {item.contactName}, Title: {item.contactTitle}, Phone: {item.phone}
      </SecondaryText>
    </ResultItem>
  );
};

const SecondaryText = styled.div`
  color: #9ca3af;
  font-size: 17.5px;
`;

const ResultItem = styled.div`
  margin-top: 10px;
`;
