import { SearchResultCustomer } from '@backend/models/customer-models/searchResultCustomer';
import { SearchResultProduct } from '@backend/models/product-models/searchResultProduct';
import { SearchRounded } from '@mui/icons-material';
import { FormControlLabel, OutlinedInput, Radio, RadioGroup } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React, { useMemo, useState } from 'react';
import styled from 'styled-components';

import { searchCustomers, searchProducts } from '@/api';
import Page from '@/components/common/Page';
import { CustomerItem, ProductItem } from '@/components/Search/SearchResultItems';

enum TableSwitch { Product = 'Product', Customer = 'Customer' }

const searchProductsQueryKey = 'searchProductQueryKey';
const searchCustomersQueryKey = 'searchCustomerQueryKey';

const Suppliers: React.FC = () => {
  const [tableSwitch, setTableSwitch] = useState<TableSwitch>(TableSwitch.Product);
  const [searchInput, setSearchInput] = useState('');

  const searchProductsQuery = useQuery({
    queryKey: [searchProductsQueryKey, searchInput],
    queryFn: async () => {
      const result = await searchProducts(searchInput);
      return result.data;
    },
    enabled: Boolean(searchInput) && tableSwitch === TableSwitch.Product,
  });

  const searchCustomerQuery = useQuery({
    queryKey: [searchCustomersQueryKey, searchInput],
    queryFn: async () => {
      const result = await searchCustomers(searchInput);
      return result.data;
    },
    enabled: Boolean(searchInput) && tableSwitch === TableSwitch.Customer,
  });

  const query = useMemo(
    () => tableSwitch === TableSwitch.Product ? searchProductsQuery : searchCustomerQuery,
    [searchCustomerQuery, searchProductsQuery, tableSwitch],
  );

  const dataArray = useMemo(() => query.data?.allValues, [query.data?.allValues]);

  return (
    <StyledPage title={null}>
      <Title>Search Database</Title>
      <OutlinedInput
        onChange={(e) => setSearchInput(e.target.value)}
        startAdornment={<SearchRounded fontSize="small" sx={{ mr: 1.5 }} />}
        size="small"
      />

      <Title>Tables</Title>
      <StyledRadioGroup
        defaultValue={TableSwitch.Product}
        onChange={(event, value) => setTableSwitch(value as TableSwitch)}
      >
        <FormControlLabel value={TableSwitch.Product} control={<Radio />} label="Products" />
        <FormControlLabel value={TableSwitch.Customer} control={<Radio />} label="Customers" />
      </StyledRadioGroup>

      <Title>Search results</Title>
      {dataArray && dataArray.length && !query.isLoading ? (
        <div>
          {dataArray.map((item) => {
            if (tableSwitch === TableSwitch.Product) {
              return (
                <ProductItem item={item as SearchResultProduct} />
              );
            }
            return (
              <CustomerItem item={item as SearchResultCustomer} />
            );
          })}
        </div>
      ) : (
          <div>
            {query.isLoading && searchInput ? 'Loading...' : 'No results'}
          </div>
      )}
    </StyledPage>
  );
};

const StyledPage = styled(Page)`
  padding: 30px 60px;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: 700;
  margin: 10px 0;
`;

const StyledRadioGroup = styled(RadioGroup)`
  display: flex;
  flex-direction: row;
`;

export default Suppliers;
