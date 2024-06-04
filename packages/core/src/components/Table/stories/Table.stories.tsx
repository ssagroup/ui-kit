import { css } from '@emotion/react';
import type { Meta, StoryObj } from '@storybook/react';

import Badge from '@components/Badge';
import Icon from '@components/Icon';
import Wrapper from '@components/Wrapper';
import Table from '@components/Table';
import TableHead from '@components/TableHead';
import TableRow from '@components/TableRow';
import TableCell from '@components/TableCell';
import TableBody from '@components/TableBody';
import { SortableTable } from './SortableTable';
import { SortInfo } from './types';

export default {
  title: 'Components/Table',
  component: Table,
  parameters: {
    controls: { disable: true },
  },
} as Meta<typeof Table>;

export const Default: StoryObj<typeof Table> = () => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Col</TableCell>
          <TableCell>
            <Wrapper
              css={css`
                svg {
                  margin-right: 10px;
                }
              `}>
              <Icon name="calendar" size={16} />
              Col
            </Wrapper>
          </TableCell>
          <TableCell align="center">Col 3</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>Row</TableCell>
          <TableCell>
            <Badge>Row</Badge>
          </TableCell>
          <TableCell align="center">Row</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Row 2</TableCell>
          <TableCell>
            <Badge color="green">Row 2</Badge>
          </TableCell>
          <TableCell align="center">Row 2</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

Default.storyName = 'Table';

export const TableSorting: StoryObj<typeof Table> = () => {
  const handleSortingChange = (sortInfo: SortInfo) => {
    alert('Sorting changed to ' + JSON.stringify(sortInfo));
  };
  return <SortableTable onSortingChange={handleSortingChange} />;
};

TableSorting.args = {};
