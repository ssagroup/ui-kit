import { TableBot, TableCellBot, TableHeadBot, TableRowBot } from '.';
import { TableBody } from '@ssa-ui-kit/core';
import { TableBotsProps } from './types';
import { Children, cloneElement, isValidElement } from 'react';

export const TableBots = ({ children }: TableBotsProps) => {
  /*
    +++ tableBotsData.map
    +++ children => map
    +++ children => pass to the props
    +++ Story: about the same content do
    +++ menu => click on the row => optional do in the story
    +++ table rows in the children do

    Status column => give output idea from the Indicator component?

    Icons probably will be external

    svg do in the base64 encoding

    DO all components for the table (pass to the Story)
  */
  return (
    <TableBot>
      <TableHeadBot>
        <TableRowBot>
          <TableCellBot>Name</TableCellBot>
          <TableCellBot>Creation Date</TableCellBot>
          <TableCellBot>Exchange</TableCellBot>
          <TableCellBot>Status</TableCellBot>
          <TableCellBot>Pair</TableCellBot>
          <TableCellBot>PNL</TableCellBot>
          <TableCellBot>ROI</TableCellBot>
          <TableCellBot></TableCellBot>
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
};
