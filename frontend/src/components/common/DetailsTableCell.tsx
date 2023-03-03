import React, { ReactNode } from 'react';
import styled from 'styled-components';

import { Columns } from '@/components/common/SimpleTable';


export interface DetailsTableColumns {
  column1: ReactNode;
  column2: ReactNode;
}

export const detailsTableColumns: Columns<DetailsTableColumns> = [
  {
    field: '',
    renderCell: ({ column1 }) => column1,
  },
  {
    field: '',
    renderCell: ({ column2 }) => column2,
  },
];

interface Props {
  title: string | number | null | JSX.Element;
  info: string | number | null | JSX.Element;
}

const DetailsTableCell: React.FC<Props> = ({ title, info }) => {
  return (
    <div>
      <Title>{title}</Title>
      <div>{info}</div>
    </div>
  );
};

const Title = styled.div`
  margin-bottom: 10px;
  font-weight: 700;
`;

export default DetailsTableCell;
