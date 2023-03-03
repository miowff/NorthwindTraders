import { useQuery } from '@tanstack/react-query';
import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { getSupplierById } from '@/api';
import DetailsTableCell, { DetailsTableColumns, detailsTableColumns } from '@/components/common/DetailsTableCell';

import Page from '../common/Page';
import SimpleTable  from '../common/SimpleTable';

const queryKey = 'getSupplierById';

const SupplierDetails: React.FC = () => {
  const { supplierId } = useParams();

  const query = useQuery({
    queryKey: [queryKey, supplierId],
    queryFn: async () => {
      const result = await getSupplierById(Number(supplierId));
      return result.data;
    },
  });

  const supplierData = useMemo(() => query.data?.data, [query.data?.data]);

  const rows = useMemo<DetailsTableColumns[] | undefined>(() => supplierData && ([
    {
      column1: <DetailsTableCell title="Company Name" info={supplierData.companyName} />,
      column2: <DetailsTableCell title="Region" info={supplierData.country} />,
    },
    {
      column1: <DetailsTableCell title="Contact Name" info={supplierData.contactName} />,
      column2: <DetailsTableCell title="Postal Code" info={supplierData.postalCode} />,
    },
    {
      column1: <DetailsTableCell title="Contact Title" info={supplierData.contactTitle} />,
      column2: <DetailsTableCell title="Country" info={supplierData.country} />,
    },
    {
      column1: <DetailsTableCell title="Address" info={supplierData.address} />,
      column2: <DetailsTableCell title="Phone" info={supplierData.phone} />,
    },
    {
      column1: <DetailsTableCell title="City" info={supplierData.city} />,
      column2: null,
    },
  ]), [supplierData]);

  return (
    <StyledPage title="Supplier information" query={query} withBack>
      <SimpleTable columns={detailsTableColumns} dataArray={rows!}/>
    </StyledPage>
  );
};

const StyledPage = styled(Page)`
  padding: 30px 45px;
`;

export default SupplierDetails;
