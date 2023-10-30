import { Children, cloneElement, isValidElement } from 'react';
import { TableBody } from '@ssa-ui-kit/core';
import { BotsTableProps } from './types';
import {
  BotsTableWrapper,
  BotsTableCell,
  BotsTableHead,
  BotsTableRow,
} from '.';

export const BotsTable = ({ children, columns, className }: BotsTableProps) => (
  <BotsTableWrapper className={className}>
    <BotsTableHead>
      <BotsTableRow>
        {columns.map((columnName) => (
          <BotsTableCell key={`column-${columnName.toLowerCase()}`}>
            {columnName}
          </BotsTableCell>
        ))}
      </BotsTableRow>
    </BotsTableHead>
    <TableBody>
      {Children.map(children, (child) => {
        if (isValidElement(child)) {
          return cloneElement(child, {
            key: child.props.id,
          });
        }
      })}
    </TableBody>
  </BotsTableWrapper>
);
