import { Children, cloneElement, isValidElement } from 'react';
import { TableBody } from '@ssa-ui-kit/core';
import { TableBotsProps } from './types';
import { TableBot, TableCellBot, TableHeadBot, TableRowBot } from '.';

export const TableBots = ({ children, columns, className }: TableBotsProps) => (
  <TableBot className={className}>
    <TableHeadBot>
      <TableRowBot>
        {columns.map((columnName) => (
          <TableCellBot key={`column-${columnName.toLowerCase()}`}>
            {columnName}
          </TableCellBot>
        ))}
      </TableRowBot>
    </TableHeadBot>
    <TableBody>
      {Children.map(children, (child) => {
        if (isValidElement(child)) {
          const { id } = child.props;

          return cloneElement(child, {
            key: id,
          });
        }
      })}
    </TableBody>
  </TableBot>
);
