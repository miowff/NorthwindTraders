import {
  Table, TableBody, TableCell, TableHead, TableRow,
} from '@mui/material';
import React, { PropsWithChildren, ReactNode } from 'react';
import styled from 'styled-components';

export interface Column<T> {
  field: string;
  renderCell: (data: T) => ReactNode;
  style?: React.CSSProperties;
}

export type Columns<T> = Array<Column<T>>;

interface Props<T> {
  columns: Columns<T>;
  dataArray: T[];
}

function SimpleTable<T>({ columns, dataArray }: PropsWithChildren<Props<T>>): JSX.Element {
  return (
    <StyledTable columnCount={columns.length}>
      <TableHead>
        <TableRow>
          {columns.map((column) => <TableCell style={column.style}>{column.field}</TableCell>)}
        </TableRow>
      </TableHead>
      <TableBody sx={{ '& td': { border: 0 } }}>
        {dataArray.map((data, rowIndex) => (
          <TableRow>
            {columns.map((column) => {
              const renderElement = column.renderCell(data);
              let rowSpan = 1;
              for (let i = rowIndex + 1; i < dataArray.length; i++) {
                if (column.renderCell(dataArray[i]) === null) {
                  rowSpan++;
                } else {
                  break;
                }
              }

              if (renderElement === null) {
                return null;
              }

              return (
                <TableCell rowSpan={rowSpan} style={column.style}>
                  {renderElement}
                </TableCell>
              );
            })}
          </TableRow>
        ))}
      </TableBody>
    </StyledTable>
  );
}

const StyledTable = styled(Table)<{ columnCount: number }>`
  & th {
    font-weight: 700;
  }
  & td, & th {
    vertical-align: top;
    font-size: 20px;
    border: none;
    padding: 10px 15px;
    ${({ columnCount }) => columnCount === 2 ? 'width: 50%;' : ''}
  }
`;

export default SimpleTable;
