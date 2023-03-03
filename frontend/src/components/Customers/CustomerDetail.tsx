import { useQuery } from '@tanstack/react-query';
import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { getCustomerById } from '@/api';
import DetailsTableCell, { DetailsTableColumns, detailsTableColumns } from '@/components/common/DetailsTableCell';

import Page from '../common/Page';
import SimpleTable  from '../common/SimpleTable';

const queryKey = 'getCustomerById';

const CustomerDetails: React.FC = () => {
  const { customerId } = useParams();

  const query = useQuery({
    queryKey: [queryKey, customerId],
    queryFn: async () => {
      const result = await getCustomerById(String(customerId));
      return result.data;
    },
  });

  const customerData = useMemo(() => query.data?.data, [query.data?.data]);

  const rows = useMemo<DetailsTableColumns[] | undefined>(() => customerData && ([
    {
      column1: <DetailsTableCell title="Company Name" info={customerData.companyName} />,
      column2: <DetailsTableCell title="Region" info={customerData.region} />,
    },
    {
      column1: <DetailsTableCell title="Contact Name" info={customerData.contactName} />,
      column2: <DetailsTableCell title="Postal Code" info={customerData.postalCode} />,
    },
    {
      column1: <DetailsTableCell title="Contact Title" info={customerData.contactTitle} />,
      column2: <DetailsTableCell title="Country" info={customerData.country} />,
    },
    {
      column1: <DetailsTableCell title="Address" info={customerData.address} />,
      column2: <DetailsTableCell title="Phone" info={customerData.phone} />,
    },
    {
      column1: <DetailsTableCell title="City" info={customerData.city} />,
      column2: null,
    },
  ]), [customerData]);

  return (
    <StyledPage title="Customer information" query={query} withBack>
      <SimpleTable columns={detailsTableColumns} dataArray={rows!}/>
    </StyledPage>
  );
};

const StyledPage = styled(Page)`
  padding: 30px 45px;
`;

export default CustomerDetails;
